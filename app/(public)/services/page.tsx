import Link from "next/link";
import { getAllServices } from "@/lib/modules/services/service";
import { GraduationCap, FileCheck, BookOpen, Plane, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Consultancy & Visa Services",
  description:
    "Comprehensive abroad study, university admissions, and visa guidance for USA, Australia, UK, Canada, and Europe.",
};

const iconMap: Record<string, typeof GraduationCap> = {
  GraduationCap,
  FileCheck,
  BookOpen,
  Plane,
};

export default async function ServicesPage() {
  const services = await getAllServices();

  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-brand-red font-bold text-xs uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full">
            Our Services
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
            Comprehensive Education & Visa Solutions
          </h1>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every student's profile is unique. We provide bespoke admissions, scholarship guidance,
            and visa file management to ensure maximum approval odds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => {
            const Icon = iconMap[service.iconName || ""] || GraduationCap;
            const deliverables = JSON.parse(service.deliverables || "[]") as string[];

            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-navy/5 text-brand-navy flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">{service.title}</h2>
                  <p className="text-xs font-semibold text-brand-red">{service.tagline}</p>
                  <p className="text-xs text-slate-600 leading-relaxed">{service.description}</p>

                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider block">
                      Key Highlights & Deliverables:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {deliverables.map((item, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <span className="text-emerald-500 font-bold">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center space-x-1.5 text-xs font-bold text-brand-navy hover:text-brand-red transition"
                  >
                    <span>Read Full Service Breakdown</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href="/contact"
                    className="bg-brand-red hover:bg-brand-red-600 text-white text-xs font-bold px-4 py-2 rounded-lg transition"
                  >
                    Inquire Now
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
