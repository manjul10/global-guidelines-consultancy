import Link from "next/link";
import Image from "next/image";
import { getPublishedArticles } from "@/lib/modules/articles/service";
import { Calendar, ArrowRight, BookOpen } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const metadata = {
  title: "Insights & Visa Policy News",
  description:
    "Stay informed with the latest international student visa guidelines, university application deadlines, and test prep tips from Global Guidelines.",
};

export default async function InsightsPage() {
  const articles = await getPublishedArticles();

  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-brand-red font-bold text-xs uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full">
            Knowledge & News Hub
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
            Latest Visa Updates & Educational Guides
          </h1>
          <p className="text-xs text-slate-600 leading-relaxed">
            Essential analysis of embassy policy changes, genuine student requirements, scholarship
            deadlines, and score booster techniques.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((art) => (
            <article
              key={art.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition flex flex-col justify-between"
            >
              <div>
                {art.coverImageUrl ? (
                  <div className="h-52 relative overflow-hidden bg-slate-100">
                    <Image
                      src={art.coverImageUrl}
                      alt={art.title}
                      fill
                      className="object-cover hover:scale-105 transition duration-300"
                    />
                  </div>
                ) : (
                  <div className="h-40 bg-gradient-to-r from-brand-navy-900 to-slate-900 flex items-center justify-center text-white/40">
                    <BookOpen className="w-12 h-12" />
                  </div>
                )}

                <div className="p-6 space-y-3">
                  <div className="flex items-center space-x-2 text-[11px] text-slate-500">
                    <span className="bg-red-50 text-brand-red font-semibold px-2 py-0.5 rounded">
                      {art.category}
                    </span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(art.publishedAt)}</span>
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-slate-900 hover:text-brand-navy transition leading-snug">
                    <Link href={`/insights/${art.slug}`}>{art.title}</Link>
                  </h2>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <Link
                  href={`/insights/${art.slug}`}
                  className="text-xs font-bold text-brand-red hover:underline inline-flex items-center space-x-1"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-[10px] text-slate-400 font-medium">
                  By {art.author.name}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
