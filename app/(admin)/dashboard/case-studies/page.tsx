import { getAllCaseStudies } from "@/lib/modules/case-studies/service";
import Link from "next/link";
import { Trophy, ExternalLink } from "lucide-react";

export default async function AdminCaseStudiesPage() {
  const caseStudies = await getAllCaseStudies();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-brand-navy">Visa Success Stories</h1>
        <p className="text-xs text-slate-500">
          Manage documented student outcomes, scholarship grants, and embassy approvals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {caseStudies.map((study) => {
          const results = JSON.parse(study.results || "[]") as { metric: string; label: string }[];

          return (
            <div
              key={study.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-brand-red bg-red-50 px-2.5 py-1 rounded-md">
                  {study.industry}
                </span>
                <span className="text-slate-500 font-medium">Student: {study.clientName}</span>
              </div>

              <h2 className="text-base font-bold text-slate-900">{study.title}</h2>
              <p className="text-xs text-slate-600 line-clamp-2">{study.challenge}</p>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100">
                {results.map((r, i) => (
                  <div key={i} className="bg-slate-50 p-2 rounded-lg text-center border border-slate-100">
                    <div className="text-xs font-black text-brand-navy">{r.metric}</div>
                    <div className="text-[9px] text-slate-500">{r.label}</div>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono text-[11px]">/case-studies/{study.slug}</span>
                <Link
                  href={`/case-studies/${study.slug}`}
                  target="_blank"
                  className="text-brand-navy hover:text-brand-red font-bold inline-flex items-center space-x-1"
                >
                  <span>View Live</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
