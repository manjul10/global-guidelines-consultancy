import { notFound } from "next/navigation";
import Link from "next/link";
import { getServiceBySlug, getAllServices } from "@/lib/modules/services/service";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

export async function generateStaticParams() {
  const services = await getAllServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const service = await getServiceBySlug(params.slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: `${service.title} | Global Guidelines Consultancy`,
    description: service.tagline,
  };
}

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = await getServiceBySlug(params.slug);
  if (!service) notFound();

  const deliverables = JSON.parse(service.deliverables || "[]") as string[];

  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <Link
          href="/services"
          className="inline-flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-brand-navy transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Services</span>
        </Link>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-8">
          <div className="space-y-3">
            <span className="text-brand-red font-bold text-xs uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full">
              Specialized Guidance
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
              {service.title}
            </h1>
            <p className="text-base text-brand-red font-semibold">{service.tagline}</p>
          </div>

          <div className="prose max-w-none text-slate-700 text-sm leading-relaxed border-t border-slate-100 pt-6">
            <p>{service.description}</p>
          </div>

          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200/80 space-y-4">
            <h2 className="text-base font-black text-brand-navy uppercase tracking-wider">
              Comprehensive Service Deliverables
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {deliverables.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-3 bg-white p-4 rounded-xl border border-slate-100 shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-700 font-medium leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-brand-navy-900 to-slate-900 text-white p-8 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-lg font-bold">Ready to take the next step?</h3>
              <p className="text-xs text-slate-300">
                Book a consultation with our counselors to get your eligibility reviewed.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 bg-brand-red hover:bg-brand-red-600 text-white font-bold text-xs px-6 py-3 rounded-xl transition shadow"
            >
              <span>Schedule Free Counseling</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
