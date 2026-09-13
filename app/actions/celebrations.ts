"use server";

import {
  createCelebrationMoment,
  updateCelebrationMoment,
  deleteCelebrationMoment,
} from "@/lib/modules/celebrations/service";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import { revalidatePath } from "next/cache";

export async function saveCelebrationMomentAction(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return { success: false, error: "Unauthorized" };

  const id = formData.get("id") as string | null;
  const title = formData.get("title") as string;
  const subtitle = (formData.get("subtitle") as string) || "";
  const imageUrl = formData.get("imageUrl") as string;
  const category = (formData.get("category") as string) || "Celebration";
  const displayOrder = parseInt(formData.get("displayOrder") as string, 10) || 0;
  const active = formData.get("active") === "true";

  if (!title || !imageUrl) {
    return { success: false, error: "Title and Image are required." };
  }

  try {
    if (id) {
      const updated = await updateCelebrationMoment(id, {
        title,
        subtitle,
        imageUrl,
        category,
        displayOrder,
        active,
      });
      revalidatePath("/dashboard/celebrations");
      revalidatePath("/");
      return { success: true, item: updated };
    } else {
      const created = await createCelebrationMoment({
        title,
        subtitle,
        imageUrl,
        category,
        displayOrder,
        active,
      });
      revalidatePath("/dashboard/celebrations");
      revalidatePath("/");
      return { success: true, item: created };
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to save celebration moment";
    return { success: false, error: msg };
  }
}

export async function deleteCelebrationMomentAction(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return { success: false, error: "Unauthorized" };

  try {
    await deleteCelebrationMoment(id);
    revalidatePath("/dashboard/celebrations");
    revalidatePath("/");
    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to delete celebration moment";
    return { success: false, error: msg };
  }
}
