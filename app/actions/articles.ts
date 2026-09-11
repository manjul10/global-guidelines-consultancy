"use server";

import { createArticle, updateArticle, deleteArticle } from "@/lib/modules/articles/service";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import { revalidatePath } from "next/cache";

export async function saveArticleAction(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return { success: false, error: "Unauthorized" };
  }

  const id = formData.get("id") as string | null;
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const coverImageUrl = (formData.get("coverImageUrl") as string) || undefined;
  const category = formData.get("category") as string;
  const tags = (formData.get("tags") as string) || "";
  const published = formData.get("published") === "true";
  const metaTitle = (formData.get("metaTitle") as string) || title;
  const metaDescription = (formData.get("metaDescription") as string) || excerpt;

  if (!title || !content || !category) {
    return { success: false, error: "Title, category, and content are required." };
  }

  const userId = (session.user as { id?: string }).id;
  if (!userId) {
    return { success: false, error: "Invalid user session." };
  }

  try {
    if (id) {
      const updated = await updateArticle(id, {
        title,
        slug,
        excerpt,
        content,
        coverImageUrl,
        category,
        tags,
        published,
        metaTitle,
        metaDescription,
      });
      return { success: true, article: updated };
    } else {
      const created = await createArticle({
        title,
        slug,
        excerpt,
        content,
        coverImageUrl,
        category,
        tags,
        published,
        metaTitle,
        metaDescription,
        authorId: userId,
      });
      return { success: true, article: created };
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to save article";
    return { success: false, error: msg };
  }
}

export async function deleteArticleAction(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return { success: false, error: "Unauthorized" };

  try {
    await deleteArticle(id);
    revalidatePath("/dashboard/articles");
    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to delete article";
    return { success: false, error: msg };
  }
}
