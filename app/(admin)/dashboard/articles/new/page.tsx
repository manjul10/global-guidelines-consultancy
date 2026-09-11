import ArticleForm from "@/components/admin/ArticleForm";

export default function NewArticlePage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-brand-navy">Write New Article</h1>
        <p className="text-xs text-slate-500">
          Create rich content, configure SEO previews, and publish to the live portal.
        </p>
      </div>

      <ArticleForm />
    </div>
  );
}
