import Link from "next/link";
import { getAllResources } from "@/lib/modules/resources/service";
import { FileDown, Download, ShieldCheck, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Free Resources & Visa Checklists",
  description:
    "Download free university admission guides, visa document checklists, and test prep materials prepared by Global Guidelines experts.",
};

export default async function ResourcesPage() {
  const resources = await getAllResources();

  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-brand-red font-bold text-xs uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full">
            Knowledge Vault
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
            Free Study Abroad & Visa Checklists
          </h1>
          <p className="text-xs text-slate-600 leading-relaxed">
            Curated frameworks, documentation matrices, and country guides to de-risk your application
            process from day one.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((res) => (
            <div
              key={res.id}
              className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-red-50 text-brand-red flex items-center justify-center">
                  <FileDown className="w-6 h-6" />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {res.fileType.toUpperCase()} Guide • {(res.fileSizeBytes / (1024 * 1024)).toFixed(1)} MB
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 leading-snug">
                    {res.title}
                  </h2>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {res.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-medium">
                  {res.downloadCount} Downloads
                </span>

                <Link
                  href="/contact"
                  className="inline-flex items-center space-x-1.5 bg-brand-navy hover:bg-brand-navy-900 text-white text-xs font-bold px-4 py-2 rounded-lg transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Get Free Copy</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center max-w-xl mx-auto space-y-4 shadow-sm">
          <ShieldCheck className="w-10 h-10 text-emerald-500 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900">Need a Customized Visa Checklist?</h3>
          <p className="text-xs text-slate-600">
            Every embassy has unique financial and affidavit specifications depending on your family sponsorship.
            Our team will build a tailored checklist for your specific situation.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-brand-red hover:underline"
          >
            <span>Request Custom Document Checklist</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
