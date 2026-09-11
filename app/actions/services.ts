"use server";

import { createService, updateService, deleteService } from "@/lib/modules/services/service";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import { revalidatePath } from "next/cache";

export async function saveServiceAction(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return { success: false, error: "Unauthorized" };

  const id = formData.get("id") as string | null;
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const tagline = formData.get("tagline") as string;
  const description = formData.get("description") as string;
  const deliverablesRaw = formData.get("deliverables") as string;
  const iconName = (formData.get("iconName") as string) || "GraduationCap";
  const featured = formData.get("featured") === "true";

  if (!title || !description) {
    return { success: false, error: "Title and description are required." };
  }

  const deliverables = deliverablesRaw
    ? deliverablesRaw.split("\n").map((d) => d.trim()).filter(Boolean)
    : [];

  try {
    if (id) {
      const updated = await updateService(id, {
        title,
        slug,
        tagline,
        description,
        deliverables,
        iconName,
        featured,
      });
      revalidatePath("/dashboard/services");
      revalidatePath("/services");
      revalidatePath("/");
      return { success: true, service: updated };
    } else {
      const created = await createService({
        title,
        slug,
        tagline,
        description,
        deliverables,
        iconName,
        featured,
      });
      revalidatePath("/dashboard/services");
      revalidatePath("/services");
      revalidatePath("/");
      return { success: true, service: created };
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to save service";
    return { success: false, error: msg };
  }
}

export async function deleteServiceAction(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return { success: false, error: "Unauthorized" };

  try {
    await deleteService(id);
    revalidatePath("/dashboard/services");
    revalidatePath("/services");
    revalidatePath("/");
    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to delete service";
    return { success: false, error: msg };
  }
}
