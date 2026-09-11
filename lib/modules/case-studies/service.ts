import { prisma } from "@/lib/db/prisma";
import { slugify } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export interface CaseStudyInput {
  title: string;
  slug?: string;
  clientName: string;
  industry: string;
  challenge: string;
  solution: string;
  results: { metric: string; label: string }[];
  coverImage?: string;
  published?: boolean;
}

export async function getPublishedCaseStudies() {
  return await prisma.caseStudy.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getAllCaseStudies() {
  return await prisma.caseStudy.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getCaseStudyBySlug(slug: string) {
  return await prisma.caseStudy.findUnique({
    where: { slug },
  });
}

export async function createCaseStudy(data: CaseStudyInput) {
  const slug = data.slug ? slugify(data.slug) : slugify(data.title);

  const study = await prisma.caseStudy.create({
    data: {
      title: data.title,
      slug,
      clientName: data.clientName,
      industry: data.industry,
      challenge: data.challenge,
      solution: data.solution,
      results: JSON.stringify(data.results || []),
      coverImage: data.coverImage,
      published: !!data.published,
    },
  });

  revalidatePath("/case-studies");
  revalidatePath("/");
  return study;
}

export async function updateCaseStudy(id: string, data: Partial<CaseStudyInput>) {
  const updated = await prisma.caseStudy.update({
    where: { id },
    data: {
      title: data.title,
      slug: data.slug ? slugify(data.slug) : undefined,
      clientName: data.clientName,
      industry: data.industry,
      challenge: data.challenge,
      solution: data.solution,
      results: data.results ? JSON.stringify(data.results) : undefined,
      coverImage: data.coverImage,
      published: data.published,
    },
  });

  revalidatePath("/case-studies");
  revalidatePath(`/case-studies/${updated.slug}`);
  revalidatePath("/");
  return updated;
}

export async function deleteCaseStudy(id: string) {
  const deleted = await prisma.caseStudy.delete({ where: { id } });
  revalidatePath("/case-studies");
  revalidatePath("/");
  return deleted;
}
