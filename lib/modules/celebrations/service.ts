import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export interface CelebrationMomentInput {
  title: string;
  subtitle?: string;
  imageUrl: string;
  category?: string;
  displayOrder?: number;
  active?: boolean;
}

export async function getActiveCelebrationMoments() {
  try {
    if (!prisma || !("celebrationMoment" in prisma) || !prisma.celebrationMoment) {
      return [];
    }
    return await prisma.celebrationMoment.findMany({
      where: { active: true },
      orderBy: { displayOrder: "asc" },
    });
  } catch (err) {
    console.error("Error in getActiveCelebrationMoments:", err);
    return [];
  }
}

export async function getAllCelebrationMoments() {
  try {
    if (!prisma || !("celebrationMoment" in prisma) || !prisma.celebrationMoment) {
      return [];
    }
    return await prisma.celebrationMoment.findMany({
      orderBy: { displayOrder: "asc" },
    });
  } catch (err) {
    console.error("Error in getAllCelebrationMoments:", err);
    return [];
  }
}

export async function createCelebrationMoment(data: CelebrationMomentInput) {
  try {
    if (!prisma || !("celebrationMoment" in prisma) || !prisma.celebrationMoment) {
      throw new Error("Database client initializing. Please retry.");
    }
    const item = await prisma.celebrationMoment.create({
      data: {
        title: data.title,
        subtitle: data.subtitle || "",
        imageUrl: data.imageUrl,
        category: data.category || "Celebration",
        displayOrder: data.displayOrder ?? 0,
        active: data.active ?? true,
      },
    });

    revalidatePath("/");
    revalidatePath("/dashboard/celebrations");
    return item;
  } catch (err) {
    console.error("Error in createCelebrationMoment:", err);
    throw err;
  }
}

export async function updateCelebrationMoment(id: string, data: Partial<CelebrationMomentInput>) {
  try {
    if (!prisma || !("celebrationMoment" in prisma) || !prisma.celebrationMoment) {
      throw new Error("Database client initializing. Please retry.");
    }
    const updated = await prisma.celebrationMoment.update({
      where: { id },
      data: {
        title: data.title,
        subtitle: data.subtitle,
        imageUrl: data.imageUrl,
        category: data.category,
        displayOrder: data.displayOrder,
        active: data.active,
      },
    });

    revalidatePath("/");
    revalidatePath("/dashboard/celebrations");
    return updated;
  } catch (err) {
    console.error("Error in updateCelebrationMoment:", err);
    throw err;
  }
}

export async function deleteCelebrationMoment(id: string) {
  try {
    if (!prisma || !("celebrationMoment" in prisma) || !prisma.celebrationMoment) {
      throw new Error("Database client initializing. Please retry.");
    }
    const deleted = await prisma.celebrationMoment.delete({
      where: { id },
    });

    revalidatePath("/");
    revalidatePath("/dashboard/celebrations");
    return deleted;
  } catch (err) {
    console.error("Error in deleteCelebrationMoment:", err);
    throw err;
  }
}
