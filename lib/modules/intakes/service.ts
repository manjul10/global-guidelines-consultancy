import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export interface HeroSettingInput {
  badgeText: string;
  heading: string;
  subheading: string;
  ctaText: string;
  ctaLink: string;
}

export interface IntakeTrackInput {
  country: string;
  flag: string;
  intake: string;
  statusTag: string;
  statusColor: string;
  displayOrder?: number;
  active?: boolean;
}

const DEFAULT_HERO_SETTING = {
  id: "default",
  badgeText: "Admissions Open 2026",
  heading: "Global Study Intake 2026 / 2027",
  subheading: "Priority processing currently active for upcoming university intakes:",
  ctaText: "Check Your Eligibility Now",
  ctaLink: "/contact",
  updatedAt: new Date(),
};

export async function getHeroSetting() {
  try {
    if (!prisma || !("heroSetting" in prisma) || !prisma.heroSetting) {
      return DEFAULT_HERO_SETTING;
    }
    const setting = await prisma.heroSetting.findUnique({
      where: { id: "default" },
    });
    return setting || DEFAULT_HERO_SETTING;
  } catch (err) {
    console.error("Error in getHeroSetting:", err);
    return DEFAULT_HERO_SETTING;
  }
}

export async function updateHeroSetting(data: HeroSettingInput) {
  try {
    if (!prisma || !("heroSetting" in prisma) || !prisma.heroSetting) {
      return DEFAULT_HERO_SETTING;
    }
    const updated = await prisma.heroSetting.upsert({
      where: { id: "default" },
      update: {
        badgeText: data.badgeText,
        heading: data.heading,
        subheading: data.subheading,
        ctaText: data.ctaText,
        ctaLink: data.ctaLink,
      },
      create: {
        id: "default",
        badgeText: data.badgeText,
        heading: data.heading,
        subheading: data.subheading,
        ctaText: data.ctaText,
        ctaLink: data.ctaLink,
      },
    });

    revalidatePath("/");
    revalidatePath("/dashboard/intakes");
    return updated;
  } catch (err) {
    console.error("Error in updateHeroSetting:", err);
    throw err;
  }
}

export async function getActiveIntakeTracks() {
  try {
    if (!prisma || !("intakeTrack" in prisma) || !prisma.intakeTrack) {
      return [];
    }
    return await prisma.intakeTrack.findMany({
      where: { active: true },
      orderBy: { displayOrder: "asc" },
    });
  } catch (err) {
    console.error("Error in getActiveIntakeTracks:", err);
    return [];
  }
}

export async function getAllIntakeTracks() {
  try {
    if (!prisma || !("intakeTrack" in prisma) || !prisma.intakeTrack) {
      return [];
    }
    return await prisma.intakeTrack.findMany({
      orderBy: { displayOrder: "asc" },
    });
  } catch (err) {
    console.error("Error in getAllIntakeTracks:", err);
    return [];
  }
}

export async function createIntakeTrack(data: IntakeTrackInput) {
  try {
    if (!prisma || !("intakeTrack" in prisma) || !prisma.intakeTrack) {
      throw new Error("Database client initializing. Please retry.");
    }
    const track = await prisma.intakeTrack.create({
      data: {
        country: data.country,
        flag: data.flag || "🌍",
        intake: data.intake,
        statusTag: data.statusTag || "Active",
        statusColor: data.statusColor || "brand-red",
        displayOrder: data.displayOrder ?? 0,
        active: data.active ?? true,
      },
    });

    revalidatePath("/");
    revalidatePath("/dashboard/intakes");
    return track;
  } catch (err) {
    console.error("Error in createIntakeTrack:", err);
    throw err;
  }
}

export async function updateIntakeTrack(id: string, data: Partial<IntakeTrackInput>) {
  try {
    if (!prisma || !("intakeTrack" in prisma) || !prisma.intakeTrack) {
      throw new Error("Database client initializing. Please retry.");
    }
    const updated = await prisma.intakeTrack.update({
      where: { id },
      data: {
        country: data.country,
        flag: data.flag,
        intake: data.intake,
        statusTag: data.statusTag,
        statusColor: data.statusColor,
        displayOrder: data.displayOrder,
        active: data.active,
      },
    });

    revalidatePath("/");
    revalidatePath("/dashboard/intakes");
    return updated;
  } catch (err) {
    console.error("Error in updateIntakeTrack:", err);
    throw err;
  }
}

export async function deleteIntakeTrack(id: string) {
  try {
    if (!prisma || !("intakeTrack" in prisma) || !prisma.intakeTrack) {
      throw new Error("Database client initializing. Please retry.");
    }
    const deleted = await prisma.intakeTrack.delete({
      where: { id },
    });

    revalidatePath("/");
    revalidatePath("/dashboard/intakes");
    return deleted;
  } catch (err) {
    console.error("Error in deleteIntakeTrack:", err);
    throw err;
  }
}
