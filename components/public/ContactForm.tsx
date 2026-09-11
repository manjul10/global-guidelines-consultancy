"use client";

import { useState } from "react";
import { submitInquiryAction } from "@/app/actions/inquiries";
import { CheckCircle2, AlertCircle, Send, Loader2 } from "lucide-react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await submitInquiryAction(formData);

    setLoading(false);
    if (result.success) {
      setSubmitted(true);
    } else {
      setError(result.error || "Failed to submit inquiry. Please try again.");
    }
  }

  if (submitted) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-4">
        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-emerald-900">Inquiry Received!</h3>
        <p className="text-xs text-emerald-700 max-w-md mx-auto leading-relaxed">
          Thank you for contacting Global Guidelines Consultancy. One of our senior education
          advisors will review your profile and reach out within 24 hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-xs font-bold text-emerald-800 hover:underline pt-2"
        >
          Submit another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
      {error && (
        <div className="flex items-center space-x-2 bg-red-50 text-brand-red p-3 rounded-lg text-xs font-medium border border-red-100">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder="e.g. Aashish Sharma"
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-navy focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="e.g. aashish@gmail.com"
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-navy focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Phone / WhatsApp
          </label>
          <input
            type="tel"
            name="phone"
            placeholder="+977 98XXXXXXXX"
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-navy focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Target Destination / Service
          </label>
          <select
            name="destination"
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-navy focus:outline-none bg-white"
          >
            <option value="USA">Study in USA (F-1 Visa)</option>
            <option value="Australia">Study in Australia (Subclass 500)</option>
            <option value="UK">Study in United Kingdom</option>
            <option value="Canada">Study in Canada</option>
            <option value="Europe">Study in Europe</option>
            <option value="IELTS/PTE">Test Preparation (IELTS / PTE)</option>
            <option value="Visitor Visa">Tourist / Visitor Visa</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
          Your Academic Background & Query *
        </label>
        <textarea
          name="message"
          rows={4}
          required
          placeholder="Mention your completed degree, GPA/grades, English test score (if any), and your questions..."
          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-navy focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full inline-flex items-center justify-center space-x-2 bg-brand-red hover:bg-brand-red-600 disabled:opacity-70 text-white font-bold py-3.5 rounded-xl transition shadow-md text-xs tracking-wide"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Submitting Profile...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Send Free Consultation Request</span>
          </>
        )}
      </button>
    </form>
  );
}
