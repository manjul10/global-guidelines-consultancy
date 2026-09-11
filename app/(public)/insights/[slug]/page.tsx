import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getArticleBySlug, getAllArticles } from "@/lib/modules/articles/service";
import { ArrowLeft, Calendar, User, Tag, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.filter((a) => a.published).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);
  if (!article) return { title: "Article Not Found" };
  return {
    title: `${article.metaTitle || article.title} | Global Guidelines`,
    description: article.metaDescription || article.excerpt,
  };
}

export default async function InsightDetailPage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);
  if (!article || !article.published) notFound();

  const tagsList = article.tags
    ? article.tags.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <Link
          href="/insights"
          className="inline-flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-brand-navy transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Insights & News</span>
        </Link>

        <article className="bg-white rounded-3xl p-8 sm:p-14 border border-slate-200 shadow-sm space-y-8">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span className="bg-red-50 text-brand-red font-bold px-3 py-1 rounded-full">
                {article.category}
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{formatDate(article.publishedAt)}</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>By {article.author.name}</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-navy tracking-tight leading-tight">
              {article.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed border-l-4 border-brand-red pl-4 py-1 italic">
              {article.excerpt}
            </p>
          </div>

          {article.coverImageUrl && (
            <div className="rounded-2xl overflow-hidden relative h-72 sm:h-96 w-full shadow-sm">
              <Image
                src={article.coverImageUrl}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Rich Content Output */}
          <div
            className="prose prose-slate max-w-none text-slate-800 leading-relaxed text-sm sm:text-base border-t border-slate-100 pt-8"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {tagsList.length > 0 && (
            <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <Tag className="w-4 h-4 text-slate-400" />
              {tagsList.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs bg-slate-100 text-slate-600 font-medium px-2.5 py-1 rounded-md"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* CTA Box */}
          <div className="bg-gradient-to-r from-brand-navy-950 to-slate-900 text-white p-8 sm:p-10 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-6 mt-12">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-lg font-bold">Have Questions About This Policy?</h3>
              <p className="text-xs text-slate-300">
                Book a personalized session with our country counselors today.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 bg-brand-red hover:bg-brand-red-600 text-white font-bold text-xs px-6 py-3 rounded-xl transition shadow"
            >
              <span>Speak with a Counselor</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
