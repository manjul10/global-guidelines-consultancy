import { getAllTestimonials } from "@/lib/modules/testimonials/service";
import { Star } from "lucide-react";

export default async function AdminTestimonialsPage() {
  const testimonials = await getAllTestimonials();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-brand-navy">Student Testimonials</h1>
        <p className="text-xs text-slate-500">
          Manage social proof, student quotes, and ratings displayed on the homepage.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex text-amber-400 space-x-0.5">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                {t.featured && (
                  <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200">
                    Featured
                  </span>
                )}
              </div>

              <blockquote className="text-xs text-slate-700 italic leading-relaxed">
                "{t.quote}"
              </blockquote>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-brand-navy text-white font-bold flex items-center justify-center text-xs">
                {t.clientName[0]}
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">{t.clientName}</div>
                <div className="text-[10px] text-slate-500">
                  {t.clientRole} • {t.companyName}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
