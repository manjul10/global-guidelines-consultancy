import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-10 sm:p-14 border border-slate-200 shadow-xl max-w-lg text-center space-y-6">
        <div className="w-16 h-16 bg-red-50 text-brand-red rounded-2xl flex items-center justify-center mx-auto">
          <Compass className="w-8 h-8 animate-pulse" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-brand-red uppercase tracking-widest">
            Error 404
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-navy">Page Not Found</h1>
          <p className="text-xs text-slate-600 leading-relaxed">
            The page, article, or service you are looking for may have been relocated or unpublished.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-brand-red hover:bg-brand-red-600 text-white font-bold text-xs px-6 py-3 rounded-xl shadow transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            href="/services"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs px-6 py-3 rounded-xl transition"
          >
            <span>Browse Services</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
