import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";

const UPLOAD_BASE = path.join(process.cwd(), "public", "uploads", "student-documents");

export async function POST(req: NextRequest) {
  try {
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

    // Prepare upload directory
    const studentFolder = `${refCode}_${name.replace(/[^a-zA-Z0-9]/g, "_")}`;
    const uploadDir = path.join(UPLOAD_BASE, studentFolder);
    await fs.mkdir(uploadDir, { recursive: true });

    // Collect all uploaded files
    const uploadedDocs: Array<{
      filename: string;
      docType: string;
      url: string;
      sizeBytes: number;
    }> = [];

    const allowedMimes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/webp",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const entries = Array.from(formData.entries());

    for (const [key, value] of entries) {
      if (key.startsWith("file_") && value instanceof File) {
        const file = value;
        const index = key.replace("file_", "");
        const docType = (formData.get(`type_${index}`) as string) || "General Document";

        if (file.size > 25 * 1024 * 1024) {
          return NextResponse.json(
            { error: `File "${file.name}" exceeds 25MB limit.` },
            { status: 400 }
          );
        }

        if (!allowedMimes.includes(file.type)) {
          return NextResponse.json(
            { error: `Unsupported file type for "${file.name}". Please upload PDF or image files.` },
            { status: 400 }
          );
        }

        const cleanFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
        const uniqueFilename = `${Date.now()}_${cleanFilename}`;
        const filePath = path.join(uploadDir, uniqueFilename);

        const buffer = Buffer.from(await file.arrayBuffer());
        await fs.writeFile(filePath, buffer);

        const publicUrl = `/uploads/student-documents/${studentFolder}/${uniqueFilename}`;

        uploadedDocs.push({
          filename: file.name,
          docType,
          url: publicUrl,
          sizeBytes: file.size,
        });
      }
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
