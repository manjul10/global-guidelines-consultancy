import { getAllServices } from "@/lib/modules/services/service";
import Link from "next/link";
import { Plus, CheckCircle, ExternalLink } from "lucide-react";

export default async function AdminServicesPage() {
  const services = await getAllServices();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-brand-navy">Consulting Services</h1>
          <p className="text-xs text-slate-500">
            Manage your consultancy packages, study tracks, and visa offerings.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((svc) => {
          const deliverables = JSON.parse(svc.deliverables || "[]") as string[];

          return (
            <div
              key={svc.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900">{svc.title}</h2>
                  <span className="text-xs font-semibold text-brand-red">{svc.tagline}</span>
                </div>
                {svc.featured && (
                  <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200">
                    Featured on Home
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-600 line-clamp-2">{svc.description}</p>

              <div className="pt-2 border-t border-slate-100 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Deliverables ({deliverables.length})
                </span>
                <ul className="text-xs text-slate-600 space-y-1">
                  {deliverables.slice(0, 2).map((d, i) => (
                    <li key={i} className="flex items-center space-x-1.5">
                      <span className="text-emerald-500">✓</span>
                      <span className="truncate">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono text-[11px]">/services/{svc.slug}</span>
                <Link
                  href={`/services/${svc.slug}`}
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
