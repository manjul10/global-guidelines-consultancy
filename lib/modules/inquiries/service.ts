import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export interface InquiryInput {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  serviceOfInterest?: string;
  message: string;
}

export async function createInquiry(data: InquiryInput) {
  const inquiry = await prisma.inquiry.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      company: data.company || null,
      serviceOfInterest: data.serviceOfInterest || null,
      message: data.message,
      status: "NEW",
    },
  });

  revalidatePath("/dashboard/inquiries");
  return inquiry;
}

export async function getAllInquiries() {
  return await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function updateInquiryStatus(id: string, status: string) {
  const updated = await prisma.inquiry.update({
    where: { id },
    data: { status },
  });

  revalidatePath("/dashboard/inquiries");
  revalidatePath("/dashboard");
  return updated;
}

export async function getInquiryStats() {
  const [total, newCount, contacted, qualified] = await Promise.all([
    prisma.inquiry.count(),
    prisma.inquiry.count({ where: { status: "NEW" } }),
    prisma.inquiry.count({ where: { status: "CONTACTED" } }),
    prisma.inquiry.count({ where: { status: "QUALIFIED" } }),
  ]);

  return { total, newCount, contacted, qualified };
}
