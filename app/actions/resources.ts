"use server";

import { createResource, updateResource, deleteResource } from "@/lib/modules/resources/service";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import { revalidatePath } from "next/cache";

export async function saveResourceAction(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return { success: false, error: "Unauthorized" };

  const id = formData.get("id") as string | null;
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const fileUrl = formData.get("fileUrl") as string;
  const fileType = formData.get("fileType") as string;
  const fileSizeBytes = parseInt(formData.get("fileSizeBytes") as string, 10) || 1024 * 1024;
  const isGated = formData.get("isGated") === "true";

  if (!title || !description || !fileUrl) {
    return { success: false, error: "Title, description, and file URL are required." };
  }

  try {
    if (id) {
      const updated = await updateResource(id, {
        title,
        slug,
        description,
        fileUrl,
        fileType: fileType || "PDF",
        fileSizeBytes,
        isGated,
      });
      revalidatePath("/dashboard/resources");
      revalidatePath("/resources");
      revalidatePath("/");
      return { success: true, resource: updated };
    } else {
      const created = await createResource({
        title,
        slug,
        description,
        fileUrl,
        fileType: fileType || "PDF",
        fileSizeBytes,
        isGated,
      });
      revalidatePath("/dashboard/resources");
      revalidatePath("/resources");
      revalidatePath("/");
      return { success: true, resource: created };
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to save resource";
    return { success: false, error: msg };
  }
}

export async function deleteResourceAction(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return { success: false, error: "Unauthorized" };

  try {
    await deleteResource(id);
    revalidatePath("/dashboard/resources");
    revalidatePath("/resources");
    revalidatePath("/");
    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to delete resource";
    return { success: false, error: msg };
  }
}
