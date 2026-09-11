"use server";

import { createTeamMember, updateTeamMember, deleteTeamMember } from "@/lib/modules/team/service";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import { revalidatePath } from "next/cache";

export async function saveTeamMemberAction(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return { success: false, error: "Unauthorized" };

  const id = formData.get("id") as string | null;
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const bio = formData.get("bio") as string;
  const avatarUrl = (formData.get("avatarUrl") as string) || "";
  const linkedinUrl = (formData.get("linkedinUrl") as string) || "";
  const displayOrder = parseInt(formData.get("displayOrder") as string, 10) || 0;

  if (!name || !role || !bio) {
    return { success: false, error: "Name, role, and bio are required." };
  }

  try {
    if (id) {
      const updated = await updateTeamMember(id, {
        name,
        role,
        bio,
        avatarUrl: avatarUrl || undefined,
        linkedinUrl: linkedinUrl || undefined,
        displayOrder,
      });
      revalidatePath("/dashboard/team");
      revalidatePath("/team");
      revalidatePath("/");
      return { success: true, member: updated };
    } else {
      const created = await createTeamMember({
        name,
        role,
        bio,
        avatarUrl: avatarUrl || undefined,
        linkedinUrl: linkedinUrl || undefined,
        displayOrder,
      });
      revalidatePath("/dashboard/team");
      revalidatePath("/team");
      revalidatePath("/");
      return { success: true, member: created };
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to save team member";
    return { success: false, error: msg };
  }
}

export async function deleteTeamMemberAction(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return { success: false, error: "Unauthorized" };

  try {
    await deleteTeamMember(id);
    revalidatePath("/dashboard/team");
    revalidatePath("/team");
    revalidatePath("/");
    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to delete team member";
    return { success: false, error: msg };
  }
}
