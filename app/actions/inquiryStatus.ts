"use server";

import { updateInquiryStatus } from "@/lib/modules/inquiries/service";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import { revalidatePath } from "next/cache";

export async function changeInquiryStatusAction(id: string, status: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return { success: false, error: "Unauthorized" };

  try {
    const updated = await updateInquiryStatus(id, status);
    revalidatePath("/dashboard/inquiries");
    revalidatePath("/dashboard");
    return { success: true, inquiry: updated };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to update status";
    return { success: false, error: msg };
  }
}
