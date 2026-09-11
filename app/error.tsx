"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Platform UI Error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-xl max-w-md text-center space-y-6">
        <div className="w-14 h-14 bg-red-50 text-brand-red rounded-2xl flex items-center justify-center mx-auto">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900">Something went wrong</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            An unexpected error occurred while loading this view. Our team has been notified.
          </p>
        </div>

        <div className="pt-2 flex items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="inline-flex items-center space-x-2 bg-brand-navy hover:bg-brand-navy-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition shadow"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
