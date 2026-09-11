import Link from "next/link";
import { prisma } from "@/lib/db/prisma";
import { getInquiryStats } from "@/lib/modules/inquiries/service";
import {
  FileText,
  Briefcase,
  Trophy,
  Inbox,
  Plus,
  ArrowRight,
  Clock,
  CheckCircle,
  ExternalLink,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const [stats, totalArticles, totalServices, totalCaseStudies, recentInquiries, recentArticles] =
    await Promise.all([
      getInquiryStats(),
      prisma.article.count(),
      prisma.service.count(),
      prisma.caseStudy.count(),
      prisma.inquiry.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
      prisma.article.findMany({ take: 5, orderBy: { updatedAt: "desc" } }),
    ]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-brand-navy">
            Welcome to Global Guidelines CMS
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage your dynamic services, published visa policy updates, and student leads.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/dashboard/articles/new"
            className="inline-flex items-center space-x-1.5 bg-brand-red hover:bg-brand-red-600 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            <span>New Article</span>
          </Link>
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-4 py-2.5 rounded-lg transition"
          >
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            <span>Live Site</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Student Inquiries</span>
            <Inbox className="w-4 h-4 text-brand-red" />
          </div>
          <div className="text-3xl font-black text-slate-900">{stats.total}</div>
          <div className="text-[11px] font-medium text-emerald-600 flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{stats.newCount} New Leads pending review</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Published Articles</span>
            <FileText className="w-4 h-4 text-brand-navy" />
          </div>
          <div className="text-3xl font-black text-slate-900">{totalArticles}</div>
          <div className="text-[11px] text-slate-500">Live on /insights</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Active Services</span>
            <Briefcase className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">{totalServices}</div>
          <div className="text-[11px] text-slate-500">Admissions & Visa tracks</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Visa Case Studies</span>
            <Trophy className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-black text-slate-900">{totalCaseStudies}</div>
          <div className="text-[11px] text-slate-500">Verified success stories</div>
        </div>
      </div>

      {/* Two-Column Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Inquiries */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
              <Inbox className="w-4 h-4 text-brand-red" />
              <span>Recent Counseling Inquiries</span>
            </h2>
            <Link
              href="/dashboard/inquiries"
              className="text-xs font-bold text-brand-red hover:underline inline-flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {recentInquiries.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-400">No student inquiries received yet.</div>
            ) : (
              recentInquiries.map((inq) => (
                <div key={inq.id} className="p-4 hover:bg-slate-50 transition flex items-center justify-between gap-4">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-slate-900">{inq.name}</span>
                      {inq.status === "NEW" && (
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          NEW
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">
                      {inq.serviceOfInterest ? `Target: ${inq.serviceOfInterest} • ` : ""}
                      {inq.email}
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <span className="text-[10px] text-slate-400 block">{formatDate(inq.createdAt)}</span>
                    <Link
                      href="/dashboard/inquiries"
                      className="text-[11px] font-bold text-brand-navy hover:underline"
                    >
                      Inspect Lead →
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Articles */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
              <FileText className="w-4 h-4 text-brand-navy" />
              <span>Articles & Insights</span>
            </h2>
            <Link
              href="/dashboard/articles"
              className="text-xs font-bold text-brand-red hover:underline inline-flex items-center space-x-1"
            >
              <span>Manage</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {recentArticles.map((art) => (
              <div key={art.id} className="p-4 hover:bg-slate-50 transition flex items-center justify-between gap-3">
                <div className="min-w-0 space-y-1">
                  <h3 className="text-xs font-bold text-slate-900 truncate">{art.title}</h3>
                  <div className="text-[10px] text-slate-400">
                    {art.category} • Updated {formatDate(art.updatedAt)}
                  </div>
                </div>
                <div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      art.published
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {art.published ? "Published" : "Draft"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
