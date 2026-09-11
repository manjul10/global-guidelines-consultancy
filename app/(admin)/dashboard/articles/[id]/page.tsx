import { notFound } from "next/navigation";
import { getArticleById } from "@/lib/modules/articles/service";
import ArticleForm from "@/components/admin/ArticleForm";

export default async function EditArticlePage({ params }: { params: { id: string } }) {
  const article = await getArticleById(params.id);
  if (!article) notFound();

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-brand-navy">Edit Article</h1>
        <p className="text-xs text-slate-500">
          Update article content, category, or publish settings.
        </p>
      </div>

      <ArticleForm initialData={article} />
    </div>
  );
}
