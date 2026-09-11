import { prisma } from "@/lib/db/prisma";
import { slugify } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export interface ArticleInput {
  title: string;
  slug?: string;
  excerpt: string;
  content: string;
  coverImageUrl?: string;
  category: string;
  tags?: string;
  published?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  authorId: string;
}

export async function getPublishedArticles(options?: { limit?: number; category?: string }) {
  const where: { published: boolean; category?: string } = { published: true };
  if (options?.category) {
    where.category = options.category;
  }

  return await prisma.article.findMany({
    where,
    orderBy: { publishedAt: "desc" },
    take: options?.limit,
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });
}

export async function getAllArticles() {
  return await prisma.article.findMany({
    orderBy: { updatedAt: "desc" },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });
}

export async function getArticleBySlug(slug: string) {
  return await prisma.article.findUnique({
    where: { slug },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });
}

export async function getArticleById(id: string) {
  return await prisma.article.findUnique({
    where: { id },
  });
}

export async function createArticle(data: ArticleInput) {
  const generatedSlug = data.slug ? slugify(data.slug) : slugify(data.title);
  
  // Ensure unique slug
  let uniqueSlug = generatedSlug;
  let counter = 1;
  while (await prisma.article.findUnique({ where: { slug: uniqueSlug } })) {
    uniqueSlug = `${generatedSlug}-${counter}`;
    counter++;
  }

  const article = await prisma.article.create({
    data: {
      title: data.title,
      slug: uniqueSlug,
      excerpt: data.excerpt,
      content: data.content,
      coverImageUrl: data.coverImageUrl,
      category: data.category,
      tags: data.tags || "",
      published: !!data.published,
      publishedAt: data.published ? new Date() : null,
      metaTitle: data.metaTitle || data.title,
      metaDescription: data.metaDescription || data.excerpt,
      authorId: data.authorId,
    },
  });

  revalidatePath("/insights");
  revalidatePath("/");
  return article;
}

export async function updateArticle(id: string, data: Partial<ArticleInput>) {
  const existing = await prisma.article.findUnique({ where: { id } });
  if (!existing) throw new Error("Article not found");

  let slug = existing.slug;
  if (data.title && !data.slug && data.title !== existing.title) {
    slug = slugify(data.title);
  } else if (data.slug) {
    slug = slugify(data.slug);
  }

  const wasPublished = existing.published;
  const isNowPublished = data.published !== undefined ? data.published : wasPublished;
  const publishedAt = !wasPublished && isNowPublished ? new Date() : existing.publishedAt;

  const updated = await prisma.article.update({
    where: { id },
    data: {
      title: data.title,
      slug,
      excerpt: data.excerpt,
      content: data.content,
      coverImageUrl: data.coverImageUrl,
      category: data.category,
      tags: data.tags,
      published: isNowPublished,
      publishedAt,
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
    },
  });

  revalidatePath("/insights");
  revalidatePath(`/insights/${updated.slug}`);
  revalidatePath("/");
  return updated;
}

export async function deleteArticle(id: string) {
  const deleted = await prisma.article.delete({ where: { id } });
  revalidatePath("/insights");
  revalidatePath("/");
  return deleted;
}
