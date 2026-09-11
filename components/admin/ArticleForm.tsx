"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TipTapEditor from "@/components/editor/TipTapEditor";
import { saveArticleAction } from "@/app/actions/articles";
import { slugify } from "@/lib/utils";
import { Loader2, ArrowLeft, Check, AlertCircle, Eye, Globe } from "lucide-react";
import Link from "next/link";

interface ArticleData {
  id?: string;
  title: string;
  slug?: string;
  excerpt: string;
  content: string;
  coverImageUrl?: string | null;
  category: string;
  tags?: string;
  published: boolean;
  metaTitle?: string | null;
  metaDescription?: string | null;
}

export default function ArticleForm({ initialData }: { initialData?: ArticleData }) {
  const router = useRouter();

  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [coverImageUrl, setCoverImageUrl] = useState(initialData?.coverImageUrl || "");
  const [category, setCategory] = useState(initialData?.category || "Australia Visa");
  const [tags, setTags] = useState(initialData?.tags || "");
  const [published, setPublished] = useState(initialData?.published ?? false);
  const [metaTitle, setMetaTitle] = useState(initialData?.metaTitle || "");
  const [metaDescription, setMetaDescription] = useState(initialData?.metaDescription || "");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!initialData?.id) {
      setSlug(slugify(val));
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    if (initialData?.id) formData.append("id", initialData.id);
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("excerpt", excerpt);
    formData.append("content", content);
    formData.append("coverImageUrl", coverImageUrl);
    formData.append("category", category);
    formData.append("tags", tags);
    formData.append("published", published ? "true" : "false");
    formData.append("metaTitle", metaTitle || title);
    formData.append("metaDescription", metaDescription || excerpt);

    const res = await saveArticleAction(formData);
    setLoading(false);

    if (res.success) {
      router.push("/dashboard/articles");
      router.refresh();
    } else {
      setError(res.error || "Failed to save article");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard/articles"
          className="inline-flex items-center space-x-1 text-xs font-bold text-slate-500 hover:text-slate-800 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Articles</span>
        </Link>

        <div className="flex items-center space-x-3">
          <label className="flex items-center space-x-2 text-xs font-bold text-slate-700 cursor-pointer bg-slate-100 px-3 py-2 rounded-lg">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="rounded text-brand-red focus:ring-brand-navy"
            />
            <span>Publish Immediately</span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center space-x-2 bg-brand-red hover:bg-brand-red-600 disabled:opacity-60 text-white text-xs font-bold px-5 py-2.5 rounded-lg shadow-sm transition"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
            <span>{initialData?.id ? "Update Article" : "Save & Publish"}</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center space-x-2 bg-red-50 text-brand-red p-3 rounded-lg text-xs font-medium border border-red-200">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Form Fields */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Article Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Australia Student Visa Changes 2026: Genuine Student Requirement"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-brand-navy focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                URL Slug
              </label>
              <div className="flex items-center">
                <span className="bg-slate-100 border border-r-0 border-slate-300 px-3 py-2 rounded-l-xl text-xs text-slate-500 font-mono">
                  /insights/
                </span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(slugify(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-r-xl border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-brand-navy focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Short Excerpt / Teaser *
              </label>
              <textarea
                rows={2}
                required
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="A compelling 1-2 sentence preview for search results and social cards..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-navy focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Body Content (Rich Text / TipTap) *
              </label>
              <TipTapEditor content={content} onChange={setContent} />
            </div>
          </div>
        </div>

        {/* Sidebar Settings & SEO */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
              Metadata & Category
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-navy focus:outline-none bg-white"
              >
                <option value="Australia Visa">Australia Visa</option>
                <option value="USA Visa">USA Visa</option>
                <option value="UK Visa">UK Visa</option>
                <option value="Canada Visa">Canada Visa</option>
                <option value="Test Preparation">Test Preparation (IELTS/PTE)</option>
                <option value="Scholarships">Scholarships & Grants</option>
                <option value="General News">General News</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Cover Image URL
              </label>
              <input
                type="url"
                value={coverImageUrl}
                onChange={(e) => setCoverImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/... or /uploads/..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-navy focus:outline-none"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Tip: Upload files in the Media Library to get an instant image URL.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Australia, Subclass500, GS"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-navy focus:outline-none"
              />
            </div>
          </div>

          {/* Live SEO Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center space-x-1.5">
              <Globe className="w-4 h-4 text-brand-red" />
              <span>Google Search Preview</span>
            </h3>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                Meta Title
              </label>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder={title || "SEO Meta Title"}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                Meta Description
              </label>
              <textarea
                rows={2}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder={excerpt || "SEO Meta Description"}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:outline-none"
              />
            </div>

            {/* Visual simulation of Google result */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1">
              <div className="text-[11px] text-slate-500 font-mono truncate">
                https://globalguidelines.com › insights › {slug || "article-slug"}
              </div>
              <div className="text-sm text-blue-700 font-medium hover:underline cursor-pointer truncate">
                {metaTitle || title || "Article Title Preview"}
              </div>
              <div className="text-[11px] text-slate-600 line-clamp-2">
                {metaDescription || excerpt || "Article snippet description preview appearing on Google search engine results..."}
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
