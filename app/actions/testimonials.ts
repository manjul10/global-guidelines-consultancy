"use server";

import { createTestimonial, deleteTestimonial } from "@/lib/modules/testimonials/service";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import { revalidatePath } from "next/cache";

export async function saveTestimonialAction(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return { success: false, error: "Unauthorized" };

  const id = formData.get("id") as string | null;
  const clientName = formData.get("clientName") as string;
  const clientRole = formData.get("clientRole") as string;
  const companyName = formData.get("companyName") as string;
  const quote = formData.get("quote") as string;
  const rating = parseInt((formData.get("rating") as string) || "5", 10);
  const avatarUrl = (formData.get("avatarUrl") as string) || undefined;
  const featured = formData.get("featured") === "true";

  if (!clientName || !quote) {
    return { success: false, error: "Student name and quote are required." };
  }

  try {
    if (id) {
      const updated = await prisma.testimonial.update({
        where: { id },
        data: {
          clientName,
          clientRole,
          companyName,
          quote,
          rating,
          avatarUrl,
          featured,
        },
      });
      revalidatePath("/");
      revalidatePath("/dashboard/testimonials");
      return { success: true, testimonial: updated };
    } else {
      const created = await createTestimonial({
        clientName,
        clientRole,
        companyName,
        quote,
        rating,
        avatarUrl,
        featured,
      });
      revalidatePath("/dashboard/testimonials");
      return { success: true, testimonial: created };
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to save testimonial";
    return { success: false, error: msg };
  }
}

export async function deleteTestimonialAction(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return { success: false, error: "Unauthorized" };

  try {
    await deleteTestimonial(id);
    revalidatePath("/dashboard/testimonials");
    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to delete testimonial";
    return { success: false, error: msg };
  }
}
