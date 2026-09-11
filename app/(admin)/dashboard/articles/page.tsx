import Link from "next/link";
import Image from "next/image";
import { getAllArticles } from "@/lib/modules/articles/service";
import { Plus, Edit3, ExternalLink, Calendar, Trash2 } from "lucide-react";
import { formatDate } from "@/lib/utils";
import DeleteArticleButton from "@/components/admin/DeleteArticleButton";

export default async function AdminArticlesPage() {
  const articles = await getAllArticles();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-brand-navy">Articles & Insights</h1>
          <p className="text-xs text-slate-500">
            Publish educational guides, visa policy alerts, and scholarship news.
          </p>
        </div>

        <Link
          href="/dashboard/articles/new"
          className="inline-flex items-center space-x-2 bg-brand-red hover:bg-brand-red-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </Link>
      </div>

      {/* Mobile Cards (Visible on screens < md) */}
      <div className="md:hidden space-y-3">
        {articles.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-xs text-slate-400">
            No articles found. Write your first article!
          </div>
        ) : (
          articles.map((art) => (
            <div key={art.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-start space-x-3">
                {art.coverImageUrl ? (
                  <div className="w-14 h-14 rounded-xl overflow-hidden relative flex-shrink-0 bg-slate-100">
                    <Image src={art.coverImageUrl} alt={art.title} fill className="object-cover" />
                  </div>
                ) : (
                  <div className="w-14 h-14 rounded-xl bg-slate-100 flex-shrink-0" />
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium text-[10px]">
                      {art.category}
                    </span>
                    <span
                      className={`font-bold px-2 py-0.5 rounded-full text-[10px] ${
                        art.published
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {art.published ? "Published" : "Draft"}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-xs mt-1.5 line-clamp-2">{art.title}</h3>
                  <div className="text-[10px] text-slate-400 font-mono truncate mt-0.5">
                    /insights/{art.slug}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 text-[11px] text-slate-500">
                <span>Updated {formatDate(art.updatedAt)}</span>
                <div className="flex items-center space-x-2">
                  {art.published && (
                    <Link
                      href={`/insights/${art.slug}`}
                      target="_blank"
                      className="p-2 rounded-lg text-slate-400 hover:text-brand-navy hover:bg-slate-100 transition"
                      title="View on live site"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  )}
                  <Link
                    href={`/dashboard/articles/${art.id}`}
                    className="p-2 rounded-lg text-slate-600 hover:text-brand-navy hover:bg-slate-100 transition"
                    title="Edit article"
                  >
                    <Edit3 className="w-4 h-4" />
                  </Link>
                  <DeleteArticleButton id={art.id} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop Table (Visible on screens >= md) */}
      <div className="hidden md:block bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">Article</th>
                <th className="p-4">Category</th>
                <th className="p-4">Author</th>
                <th className="p-4">Status</th>
                <th className="p-4">Last Updated</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {articles.map((art) => (
                <tr key={art.id} className="hover:bg-slate-50/80 transition">
                  <td className="p-4 max-w-xs">
                    <div className="flex items-center space-x-3">
                      {art.coverImageUrl ? (
                        <div className="w-12 h-10 rounded-lg overflow-hidden relative flex-shrink-0 bg-slate-100">
                          <Image src={art.coverImageUrl} alt={art.title} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="w-12 h-10 rounded-lg bg-slate-100 flex-shrink-0" />
                      )}
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 truncate">{art.title}</div>
                        <div className="text-[11px] text-slate-400 font-mono truncate">
                          /insights/{art.slug}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium text-[11px]">
                      {art.category}
                    </span>
                  </td>
                  <td className="p-4 text-slate-600">{art.author.name}</td>
                  <td className="p-4">
                    <span
                      className={`font-bold px-2 py-0.5 rounded-full text-[10px] ${
                        art.published
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {art.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="p-4 text-slate-500 text-[11px]">{formatDate(art.updatedAt)}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      {art.published && (
                        <Link
                          href={`/insights/${art.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-brand-navy hover:bg-slate-100 transition"
                          title="View on live site"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      )}
                      <Link
                        href={`/dashboard/articles/${art.id}`}
                        className="p-1.5 rounded-lg text-slate-600 hover:text-brand-navy hover:bg-slate-100 transition"
                        title="Edit article"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Link>
                      <DeleteArticleButton id={art.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
