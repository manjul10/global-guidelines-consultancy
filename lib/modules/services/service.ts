import { prisma } from "@/lib/db/prisma";
import { slugify } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export interface ServiceInput {
  title: string;
  slug?: string;
  tagline: string;
  description: string;
  deliverables: string[];
  iconName?: string;
  featured?: boolean;
  displayOrder?: number;
}

export async function getFeaturedServices() {
  return await prisma.service.findMany({
    where: { featured: true },
    orderBy: { displayOrder: "asc" },
  });
}

export async function getAllServices() {
  return await prisma.service.findMany({
    orderBy: { displayOrder: "asc" },
    include: {
      testimonials: true,
    },
  });
}

export async function getServiceBySlug(slug: string) {
  return await prisma.service.findUnique({
    where: { slug },
    include: {
      testimonials: true,
    },
  });
}

export async function createService(data: ServiceInput) {
  const slug = data.slug ? slugify(data.slug) : slugify(data.title);

  const service = await prisma.service.create({
    data: {
      title: data.title,
      slug,
      tagline: data.tagline,
      description: data.description,
      deliverables: JSON.stringify(data.deliverables || []),
      iconName: data.iconName || "Briefcase",
      featured: !!data.featured,
      displayOrder: data.displayOrder ?? 0,
    },
  });

  revalidatePath("/services");
  revalidatePath("/");
  return service;
}

export async function updateService(id: string, data: Partial<ServiceInput>) {
  const updated = await prisma.service.update({
    where: { id },
    data: {
      title: data.title,
      slug: data.slug ? slugify(data.slug) : undefined,
      tagline: data.tagline,
      description: data.description,
      deliverables: data.deliverables ? JSON.stringify(data.deliverables) : undefined,
      iconName: data.iconName,
      featured: data.featured,
      displayOrder: data.displayOrder,
    },
  });

  revalidatePath("/services");
  revalidatePath(`/services/${updated.slug}`);
  revalidatePath("/");
  return updated;
}

export async function deleteService(id: string) {
  const deleted = await prisma.service.delete({ where: { id } });
  revalidatePath("/services");
  revalidatePath("/");
  return deleted;
}
