import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export interface TestimonialInput {
  clientName: string;
  clientRole: string;
  companyName: string;
  avatarUrl?: string;
  quote: string;
  rating?: number;
  serviceId?: string;
  featured?: boolean;
}

export async function getFeaturedTestimonials() {
  return await prisma.testimonial.findMany({
    where: { featured: true },
    orderBy: { createdAt: "desc" },
    include: { service: { select: { title: true } } },
  });
}

export async function getAllTestimonials() {
  return await prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" },
    include: { service: { select: { title: true } } },
  });
}

export async function createTestimonial(data: TestimonialInput) {
  const testimonial = await prisma.testimonial.create({
    data: {
      clientName: data.clientName,
      clientRole: data.clientRole,
      companyName: data.companyName,
      avatarUrl: data.avatarUrl,
      quote: data.quote,
      rating: data.rating ?? 5,
      serviceId: data.serviceId || null,
      featured: !!data.featured,
    },
  });

  revalidatePath("/");
  return testimonial;
}

export async function deleteTestimonial(id: string) {
  const deleted = await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/");
  return deleted;
}
