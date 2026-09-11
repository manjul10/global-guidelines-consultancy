import { prisma } from "@/lib/db/prisma";
import { slugify } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export interface ResourceInput {
  title: string;
  slug?: string;
  description: string;
  fileUrl: string;
  fileType: string;
  fileSizeBytes: number;
  isGated?: boolean;
}

export async function getAllResources() {
  return await prisma.resource.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getResourceBySlug(slug: string) {
  return await prisma.resource.findUnique({
    where: { slug },
  });
}

export async function incrementDownloadCount(id: string) {
  return await prisma.resource.update({
    where: { id },
    data: {
      downloadCount: { increment: 1 },
    },
  });
}

export async function createResource(data: ResourceInput) {
  const slug = data.slug ? slugify(data.slug) : slugify(data.title);

  const resource = await prisma.resource.create({
    data: {
      title: data.title,
      slug,
      description: data.description,
      fileUrl: data.fileUrl,
      fileType: data.fileType,
      fileSizeBytes: data.fileSizeBytes,
      isGated: !!data.isGated,
    },
  });

  revalidatePath("/resources");
  return resource;
}

export async function updateResource(id: string, data: Partial<ResourceInput>) {
  const updated = await prisma.resource.update({
    where: { id },
    data: {
      title: data.title,
      slug: data.slug ? slugify(data.slug) : undefined,
      description: data.description,
      fileUrl: data.fileUrl,
      fileType: data.fileType,
      fileSizeBytes: data.fileSizeBytes,
      isGated: data.isGated,
    },
  });

  revalidatePath("/resources");
  revalidatePath(`/resources/${updated.slug}`);
  return updated;
}

export async function deleteResource(id: string) {
  const deleted = await prisma.resource.delete({ where: { id } });
  revalidatePath("/resources");
  return deleted;
}

