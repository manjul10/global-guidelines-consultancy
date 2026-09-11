import { getAllResources } from "@/lib/modules/resources/service";
import Link from "next/link";
import { FileDown, ExternalLink } from "lucide-react";

export default async function AdminResourcesPage() {
  const resources = await getAllResources();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-brand-navy">Downloadable Resources</h1>
        <p className="text-xs text-slate-500">
          Manage whitepapers, visa checklists, and downloadable country application guides.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((res) => (
          <div
            key={res.id}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4"
          >
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-lg bg-red-50 text-brand-red flex items-center justify-center flex-shrink-0">
                <FileDown className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h2 className="text-base font-bold text-slate-900 truncate">{res.title}</h2>
                <div className="text-[11px] text-slate-400">
                  {res.fileType.toUpperCase()} • {(res.fileSizeBytes / (1024 * 1024)).toFixed(1)} MB • {res.downloadCount} Downloads
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 line-clamp-2">{res.description}</p>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-mono text-[11px]">/resources/{res.slug}</span>
              <Link
                href="/resources"
                target="_blank"
                className="text-brand-navy hover:text-brand-red font-bold inline-flex items-center space-x-1"
              >
                <span>View Live Hub</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
