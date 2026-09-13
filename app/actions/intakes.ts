"use server";

import {
  updateHeroSetting,
  createIntakeTrack,
  updateIntakeTrack,
  deleteIntakeTrack,
} from "@/lib/modules/intakes/service";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import { revalidatePath } from "next/cache";

export async function saveHeroSettingAction(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return { success: false, error: "Unauthorized" };

  const badgeText = (formData.get("badgeText") as string) || "Admissions Open 2026";
  const heading = (formData.get("heading") as string) || "Global Study Intake 2026 / 2027";
  const subheading = (formData.get("subheading") as string) || "";
  const ctaText = (formData.get("ctaText") as string) || "Check Your Eligibility Now";
  const ctaLink = (formData.get("ctaLink") as string) || "/contact";

  try {
    const updated = await updateHeroSetting({
      badgeText,
      heading,
      subheading,
      ctaText,
      ctaLink,
    });
    revalidatePath("/dashboard/intakes");
    revalidatePath("/");
    return { success: true, setting: updated };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to save hero card settings";
    return { success: false, error: msg };
  }
}

export async function saveIntakeTrackAction(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return { success: false, error: "Unauthorized" };

  const id = formData.get("id") as string | null;
  const country = formData.get("country") as string;
  const flag = (formData.get("flag") as string) || "🌍";
  const intake = formData.get("intake") as string;
  const statusTag = (formData.get("statusTag") as string) || "Active";
  const statusColor = (formData.get("statusColor") as string) || "brand-red";
  const displayOrder = parseInt(formData.get("displayOrder") as string, 10) || 0;
  const active = formData.get("active") === "true";

  if (!country || !intake) {
    return { success: false, error: "Country and Intake details are required." };
  }

  try {
    if (id) {
      const updated = await updateIntakeTrack(id, {
        country,
        flag,
        intake,
        statusTag,
        statusColor,
        displayOrder,
        active,
      });
      revalidatePath("/dashboard/intakes");
      revalidatePath("/");
      return { success: true, track: updated };
    } else {
      const created = await createIntakeTrack({
        country,
        flag,
        intake,
        statusTag,
        statusColor,
        displayOrder,
        active,
      });
      revalidatePath("/dashboard/intakes");
      revalidatePath("/");
      return { success: true, track: created };
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to save intake track";
    return { success: false, error: msg };
  }
}

export async function deleteIntakeTrackAction(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return { success: false, error: "Unauthorized" };

  try {
    await deleteIntakeTrack(id);
    revalidatePath("/dashboard/intakes");
    revalidatePath("/");
    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to delete intake track";
    return { success: false, error: msg };
  }
}
