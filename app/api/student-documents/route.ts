import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { revalidatePath } from "next/cache";

const UPLOAD_BASE = path.join(process.cwd(), "public", "uploads", "student-documents");

// In-memory sliding-window IP rate limiter
const ipSubmissions = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_SUBMISSIONS_PER_WINDOW = 8; // Max 8 submissions per 10 minutes per IP

const ALLOWED_EXTENSIONS = new Set([
  ".pdf",
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".doc",
  ".docx",
]);

const ALLOWED_MIMES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

// Magic number verification for file integrity
function isValidFileSignature(buffer: Buffer, ext: string): boolean {
  if (buffer.length < 4) return false;

  switch (ext) {
    case ".pdf":
      // %PDF-
      return buffer[0] === 0x25 && buffer[1] === 0x50 && buffer[2] === 0x44 && buffer[3] === 0x46;
    case ".jpg":
    case ".jpeg":
      // 0xFF 0xD8 0xFF
      return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
    case ".png":
      // 0x89 P N G
      return buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47;
    case ".webp":
      // RIFF .... WEBP
      return (
        buffer[0] === 0x52 &&
        buffer[1] === 0x49 &&
        buffer[2] === 0x46 &&
        buffer[3] === 0x46 &&
        buffer.length >= 12 &&
        buffer[8] === 0x57 &&
        buffer[9] === 0x45 &&
        buffer[10] === 0x42 &&
        buffer[11] === 0x50
      );
    case ".docx":
      // PK\x03\x04 (ZIP)
      return buffer[0] === 0x50 && buffer[1] === 0x4b && buffer[2] === 0x03 && buffer[3] === 0x04;
    case ".doc":
      // 0xD0 0xCF 0x11 0xE0
      return buffer[0] === 0xd0 && buffer[1] === 0xcf && buffer[2] === 0x11 && buffer[3] === 0xe0;
    default:
      return true;
  }
}

export async function POST(req: NextRequest) {
  try {
    // 1. IP Rate Limiting Check
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "anonymous";

    const now = Date.now();
    const timestamps = ipSubmissions.get(clientIp) || [];
    const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

    if (recent.length >= MAX_SUBMISSIONS_PER_WINDOW) {
      return NextResponse.json(
        { error: "Too many upload requests. Please wait a few minutes before submitting again." },
        { status: 429 }
      );
    }
    recent.push(now);
    ipSubmissions.set(clientIp, recent);

    const formData = await req.formData();

    const name = (formData.get("name") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const phone = (formData.get("phone") as string)?.trim();
    const targetCountry = (formData.get("targetCountry") as string)?.trim() || "Undecided";
    const service = (formData.get("service") as string)?.trim() || "University Admission & Visa";
    const notes = (formData.get("notes") as string)?.trim() || "";

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Name, email, and phone/WhatsApp number are required." },
        { status: 400 }
      );
    }

    // Generate unique reference ID (e.g. GG-DOC-48291)
    const refCode = `GG-DOC-${Math.floor(10000 + Math.random() * 90000)}`;

    // Prepare upload directory with sanitized alphanumeric name
    const sanitizedStudentName = name.replace(/[^a-zA-Z0-9]/g, "_").substring(0, 32);
    const studentFolder = `${refCode}_${sanitizedStudentName}`;
    const uploadDir = path.join(UPLOAD_BASE, studentFolder);
    await fs.mkdir(uploadDir, { recursive: true });

    // Collect and validate uploaded files
    const uploadedDocs: Array<{
      filename: string;
      docType: string;
      url: string;
      sizeBytes: number;
    }> = [];

    const entries = Array.from(formData.entries());
    const fileEntries = entries.filter(([key, val]) => key.startsWith("file_") && val instanceof File);

    // Limit maximum number of files per submission to 10
    if (fileEntries.length > 10) {
      return NextResponse.json(
        { error: "Maximum 10 files allowed per submission." },
        { status: 400 }
      );
    }

    for (const [key, value] of fileEntries) {
      const file = value as File;
      const index = key.replace("file_", "");
      const docType = (formData.get(`type_${index}`) as string) || "General Document";

      // 1. Size Validation (25MB max per document)
      if (file.size > 25 * 1024 * 1024) {
        return NextResponse.json(
          { error: `File "${file.name}" exceeds 25MB limit.` },
          { status: 400 }
        );
      }

      // 2. Strict Extension Whitelist (prevents .html, .svg, .exe, .sh, script uploads)
      const rawExt = path.extname(file.name).toLowerCase();
      if (!ALLOWED_EXTENSIONS.has(rawExt)) {
        return NextResponse.json(
          {
            error: `Unsupported file extension "${rawExt}". Only PDF, JPG, PNG, WEBP, and DOC/DOCX files are permitted.`,
          },
          { status: 400 }
        );
      }

      // 3. MIME type check
      if (!ALLOWED_MIMES.has(file.type)) {
        return NextResponse.json(
          { error: `Unsupported MIME type for "${file.name}". Please upload PDF, images, or Word documents.` },
          { status: 400 }
        );
      }

      // 4. Read buffer & verify magic byte signature
      const buffer = Buffer.from(await file.arrayBuffer());
      if (!isValidFileSignature(buffer, rawExt)) {
        return NextResponse.json(
          { error: `File content for "${file.name}" does not match its ${rawExt} extension.` },
          { status: 400 }
        );
      }

      // 5. Generate secure random filename (prevents directory traversal & overwriting)
      const randomToken = crypto.randomBytes(6).toString("hex");
      const safeBasename = path
        .basename(file.name, rawExt)
        .replace(/[^a-zA-Z0-9_-]/g, "_")
        .substring(0, 36);
      const uniqueFilename = `${Date.now()}_${randomToken}_${safeBasename}${rawExt}`;
      const filePath = path.join(uploadDir, uniqueFilename);

      await fs.writeFile(filePath, buffer);

      const publicUrl = `/uploads/student-documents/${studentFolder}/${uniqueFilename}`;

      uploadedDocs.push({
        filename: path.basename(file.name),
        docType,
        url: publicUrl,
        sizeBytes: file.size,
      });
    }

    // Construct metadata payload for message body
    const docSummaryText = uploadedDocs
      .map((d, i) => `${i + 1}. [${d.docType}] ${d.filename} (${(d.sizeBytes / 1024 / 1024).toFixed(2)} MB)`)
      .join("\n");

    const fullMessage = [
      `=== STUDENT DOCUMENT PORTAL SUBMISSION ===`,
      `Reference ID: ${refCode}`,
      `Target Country: ${targetCountry}`,
      `Service / Intake: ${service}`,
      notes ? `Student Notes: ${notes}` : null,
      ``,
      `--- Uploaded Files (${uploadedDocs.length}) ---`,
      docSummaryText,
      ``,
      `__METADATA_JSON__:${JSON.stringify({ refCode, targetCountry, service, documents: uploadedDocs })}`,
    ]
      .filter(Boolean)
      .join("\n");

    // Save into Inquiry table
    const inquiry = await prisma.inquiry.create({
      data: {
        name,
        email,
        phone,
        company: refCode, // Storing reference ID in company field for easy lookup
        serviceOfInterest: `${targetCountry} - ${service}`,
        message: fullMessage,
        status: "NEW",
      },
    });

    revalidatePath("/dashboard/inquiries");
    revalidatePath("/dashboard");

    return NextResponse.json({
      success: true,
      refCode,
      inquiryId: inquiry.id,
      uploadedCount: uploadedDocs.length,
      documents: uploadedDocs,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to process document submission";
    console.error("Student Document Upload Error:", error);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
