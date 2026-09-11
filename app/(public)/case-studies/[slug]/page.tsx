import { notFound } from "next/navigation";
import Link from "next/link";
import { getCaseStudyBySlug, getAllCaseStudies } from "@/lib/modules/case-studies/service";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

export async function generateStaticParams() {
  const studies = await getAllCaseStudies();
  return studies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const study = await getCaseStudyBySlug(params.slug);
  if (!study) return { title: "Case Study Not Found" };
  return {
    title: `${study.title} | Global Guidelines Visa Success Stories`,
    description: study.challenge.substring(0, 150),
  };
}

export default async function CaseStudyDetailPage({ params }: { params: { slug: string } }) {
  const study = await getCaseStudyBySlug(params.slug);
  if (!study) notFound();

  const results = JSON.parse(study.results || "[]") as {
    metric: string;
    label: string;
  }[];

  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <Link
          href="/case-studies"
          className="inline-flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-brand-navy transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Success Stories</span>
        </Link>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-8">
          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-xs">
              <span className="bg-red-50 text-brand-red font-bold px-3 py-1 rounded-full">
                {study.industry}
              </span>
              <span className="text-slate-500">Student: {study.clientName}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
              {study.title}
            </h1>
          </div>

          {/* Metrics summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-brand-navy-900 text-white p-6 rounded-2xl">
            {results.map((r, i) => (
              <div key={i} className="text-center p-3">
                <div className="text-2xl sm:text-3xl font-black text-brand-red">{r.metric}</div>
                <div className="text-xs text-slate-300 font-medium mt-1">{r.label}</div>
              </div>
            ))}
          </div>

          <div className="space-y-6 pt-4 border-t border-slate-100">
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900">Background & Profile Challenge</h2>
              <p className="text-xs text-slate-600 leading-relaxed">{study.challenge}</p>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900">The Global Guidelines Strategy & Solution</h2>
              <p className="text-xs text-slate-600 leading-relaxed">{study.solution}</p>
            </div>
          </div>

          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-base font-bold text-slate-900">Have a similar profile or study gap?</h3>
              <p className="text-xs text-slate-600">
                Let our visa experts review your documents and craft your winning strategy.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 bg-brand-red hover:bg-brand-red-600 text-white font-bold text-xs px-6 py-3 rounded-xl transition shadow"
            >
              <span>Book Profile Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
