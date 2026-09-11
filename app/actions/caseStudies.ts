"use server";

import { createCaseStudy, updateCaseStudy, deleteCaseStudy } from "@/lib/modules/case-studies/service";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import { revalidatePath } from "next/cache";

export async function saveCaseStudyAction(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return { success: false, error: "Unauthorized" };

  const id = formData.get("id") as string | null;
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const clientName = formData.get("clientName") as string;
  const industry = formData.get("industry") as string;
  const challenge = formData.get("challenge") as string;
  const solution = formData.get("solution") as string;
  const coverImage = (formData.get("coverImage") as string) || "";
  const published = formData.get("published") === "true";
  const resultsRaw = formData.get("results") as string;

  if (!title || !clientName || !industry || !challenge || !solution) {
    return { success: false, error: "Title, student name, study track, challenge, and solution are required." };
  }

  // Parse results: can be JSON string or lines formatted as "Metric | Label"
  let parsedResults: { metric: string; label: string }[] = [];
  if (resultsRaw) {
    try {
      parsedResults = JSON.parse(resultsRaw);
    } catch {
      // Parse lines formatted as "Metric | Label" or "Metric: Label"
      parsedResults = resultsRaw
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
          const parts = line.includes("|") ? line.split("|") : line.split(":");
          return {
            metric: parts[0]?.trim() || "",
            label: parts.slice(1).join(" ").trim() || "",
          };
        })
        .filter((r) => r.metric && r.label);
    }
  }

  try {
    if (id) {
      const updated = await updateCaseStudy(id, {
        title,
        slug,
        clientName,
        industry,
        challenge,
        solution,
        results: parsedResults,
        coverImage: coverImage || undefined,
        published,
      });
      revalidatePath("/dashboard/case-studies");
      revalidatePath("/case-studies");
      revalidatePath("/");
      return { success: true, caseStudy: updated };
    } else {
      const created = await createCaseStudy({
        title,
        slug,
        clientName,
        industry,
        challenge,
        solution,
        results: parsedResults,
        coverImage: coverImage || undefined,
        published,
      });
      revalidatePath("/dashboard/case-studies");
      revalidatePath("/case-studies");
      revalidatePath("/");
      return { success: true, caseStudy: created };
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to save visa story";
    return { success: false, error: msg };
  }
}

export async function deleteCaseStudyAction(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return { success: false, error: "Unauthorized" };

  try {
    await deleteCaseStudy(id);
    revalidatePath("/dashboard/case-studies");
    revalidatePath("/case-studies");
    revalidatePath("/");
    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to delete story";
    return { success: false, error: msg };
  }
}
