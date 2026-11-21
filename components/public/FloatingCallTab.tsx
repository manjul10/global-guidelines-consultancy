"use client";

import { useState } from "react";
import { Phone, X, ArrowRight, MessageSquare, Clock, MapPin } from "lucide-react";

export default function FloatingCallTab() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* Floating Vertical Tab Pinned to Right Edge */}
      <button
        onClick={() => setModalOpen(true)}
        aria-label="Quick Call & Inquire"
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-brand-red hover:bg-brand-red-600 text-white py-3.5 px-2 rounded-l-2xl shadow-2xl transition transform hover:-translate-x-1 flex items-center space-x-1.5 cursor-pointer group border-y border-l border-white/20 select-none"
      >
        <span className="text-white font-black text-xs uppercase tracking-widest [writing-mode:vertical-rl] rotate-180 flex items-center gap-2 py-1">
          <Phone className="w-3.5 h-3.5 rotate-90 text-white animate-bounce" />
          <span>CALL NOW</span>
        </span>
      </button>

      {/* Quick Callback / Hotline Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="space-y-1">
              <span className="text-brand-red text-xs font-bold uppercase tracking-wider block">
                Direct Hotline • Putalisadak & Birgunj
              </span>
              <h3 className="text-xl font-black text-brand-navy">
                Speak with a Senior Advisor
              </h3>
              <p className="text-xs text-slate-500">
                MOEST Approved No: 1459 verified counselors ready to evaluate your transcripts and visa eligibility.
              </p>
            </div>

            {/* Phone Numbers */}
            <div className="space-y-3 pt-5">
              <a
                href="tel:+97714525327"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-red-50/70 border border-slate-200 hover:border-brand-red/40 transition group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-red text-white flex items-center justify-center shadow-xs">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800 group-hover:text-brand-red transition">
                      Kathmandu Head Office
                    </div>
                    <div className="text-sm font-black tracking-tight text-brand-navy">
                      01-4525327
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand-red group-hover:translate-x-1 transition" />
              </a>

              <a
                href="tel:+9779702709933"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-red-50/70 border border-slate-200 hover:border-brand-red/40 transition group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-navy text-white flex items-center justify-center shadow-xs">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800 group-hover:text-brand-red transition">
                      Mobile & WhatsApp Hotline
                    </div>
                    <div className="text-sm font-black tracking-tight text-brand-navy">
                      +977 970-2709933
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand-red group-hover:translate-x-1 transition" />
              </a>
            </div>

            {/* Timings & Address */}
            <div className="pt-5 mt-5 border-t border-slate-100 space-y-2 text-xs text-slate-600">
              <div className="flex items-center space-x-2">
                <Clock className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
                <span>Sunday – Friday: 9:00 AM – 5:00 PM NPT</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
                <span>Brihaspati Sadan (3rd Floor), Putalisadak, Kathmandu</span>
              </div>
            </div>

            {/* Counseling Appointment Button */}
            <div className="pt-4">
              <a
                href="/contact"
                onClick={() => setModalOpen(false)}
                className="w-full flex items-center justify-center space-x-2 bg-brand-navy hover:bg-brand-navy-900 text-white font-bold py-3 rounded-xl text-xs transition"
              >
                <span>Book In-Person Counseling Visit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
