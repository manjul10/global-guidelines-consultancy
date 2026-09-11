import { prisma } from "@/lib/db/prisma";
import fs from "fs/promises";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export async function getAllMediaAssets() {
  return await prisma.mediaAsset.findMany({
    orderBy: { createdAt: "desc" },
    include: { uploader: { select: { name: true, email: true } } },
  });
}

export async function saveMediaAsset(file: File, uploaderId: string) {
  // 1. Ensure directory exists
  await fs.mkdir(UPLOAD_DIR, { recursive: true });

  // 2. Validate MIME type
  const allowedMime = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/svg+xml",
    "application/pdf",
  ];
  if (!allowedMime.includes(file.type)) {
    throw new Error(`Unsupported file type: ${file.type}`);
  }

  // 3. Validate size (Images: 5MB, PDF: 25MB)
  const isPdf = file.type === "application/pdf";
  const maxSize = isPdf ? 25 * 1024 * 1024 : 5 * 1024 * 1024;
  if (file.size > maxSize) {
    throw new Error(`File exceeds maximum allowed size of ${isPdf ? "25MB" : "5MB"}`);
  }

  // 4. Generate unique clean filename
  const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
  const uniqueName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}_${cleanName}`;
  const filePath = path.join(UPLOAD_DIR, uniqueName);

  // 5. Write to disk
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(filePath, buffer);

  const publicUrl = `/uploads/${uniqueName}`;

  // 6. Record in DB
  const asset = await prisma.mediaAsset.create({
    data: {
      filename: file.name,
      url: publicUrl,
      mimeType: file.type,
      sizeBytes: file.size,
      uploaderId,
    },
  });

  return asset;
}
