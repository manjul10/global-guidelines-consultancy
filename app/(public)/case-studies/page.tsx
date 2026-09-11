import Link from "next/link";
import { getPublishedCaseStudies } from "@/lib/modules/case-studies/service";
import { ArrowRight, Trophy } from "lucide-react";

export const metadata = {
  title: "Visa Success Stories & Case Studies",
  description:
    "Explore how Global Guidelines Consultancy helps students overcome academic gaps, complex visa regulations, and win scholarships.",
};

export default async function CaseStudiesPage() {
  const caseStudies = await getPublishedCaseStudies();

  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-brand-red font-bold text-xs uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full">
            Proven Results
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
            Student Visa Success Stories
          </h1>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every visa grant represents careful planning, compliant documentation, and personalized
            guidance. Explore our recent student achievements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.map((study) => {
            const results = JSON.parse(study.results || "[]") as {
              metric: string;
              label: string;
            }[];

            return (
              <div
                key={study.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition flex flex-col justify-between"
              >
                <div className="p-8 space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-brand-red bg-red-50 px-2.5 py-1 rounded-md">
                      {study.industry}
                    </span>
                    <span className="text-slate-500 font-medium">Student: {study.clientName}</span>
                  </div>

                  <h2 className="text-xl font-bold text-slate-900 leading-snug">
                    {study.title}
                  </h2>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {study.challenge}
                  </p>

                  <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100">
                    {results.map((r, i) => (
                      <div key={i} className="bg-slate-50 p-2.5 rounded-xl text-center border border-slate-100">
                        <div className="text-sm font-black text-brand-navy">{r.metric}</div>
                        <div className="text-[10px] text-slate-500 font-medium leading-tight mt-0.5">
                          {r.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/case-studies/${study.slug}`}
                    className="text-xs font-bold text-brand-navy hover:text-brand-red inline-flex items-center space-x-1.5 transition"
                  >
                    <span>Read Full Story</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href="/contact"
                    className="text-xs font-semibold text-slate-500 hover:text-brand-red"
                  >
                    Check Your Odds
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
