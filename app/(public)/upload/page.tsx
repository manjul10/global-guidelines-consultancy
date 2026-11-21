"use client";

import { useState } from "react";
import Link from "next/link";
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  Trash2,
  Plus,
  ShieldCheck,
  AlertCircle,
  Phone,
  ArrowRight,
  Globe,
  Loader2,
  Sparkles,
  HelpCircle,
} from "lucide-react";

interface UploadItem {
  id: string;
  file: File;
  type: string;
}

const DOCUMENT_TYPES = [
  "Academic Transcript (SLC / +2 / Bachelor)",
  "Passport Bio-Data Page",
  "English Proficiency (IELTS / PTE / TOEFL)",
  "Statement of Purpose (SOP)",
  "Curriculum Vitae (CV / Resume)",
  "Recommendation Letter (LOR)",
  "Financial / Bank Sponsor Document",
  "Other Certificate / Document",
];

const TARGET_COUNTRIES = [
  "United Kingdom (UK)",
  "United States (USA)",
  "Australia",
  "Canada",
  "Europe / Schengen (Germany, France, Finland)",
  "New Zealand",
  "Japan",
  "Undecided / Exploring Options",
];

export default function StudentDocumentUploadPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [targetCountry, setTargetCountry] = useState(TARGET_COUNTRIES[0]);
  const [service, setService] = useState("University Admission & Student Visa");
  const [notes, setNotes] = useState("");

  const [files, setFiles] = useState<UploadItem[]>([]);
  const [selectedType, setSelectedType] = useState(DOCUMENT_TYPES[0]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const newFiles: UploadItem[] = Array.from(e.target.files).map((f) => ({
      id: Math.random().toString(36).substring(2, 9),
      file: f,
      type: selectedType,
    }));
    setFiles((prev) => [...prev, ...newFiles]);
    e.target.value = "";
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((item) => item.id !== id));
  };

  const updateFileType = (id: string, newType: string) => {
    setFiles((prev) =>
      prev.map((item) => (item.id === id ? { ...item, type: newType } : item))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setErrorMsg("Please fill in your name, email, and WhatsApp/phone number.");
      return;
    }

    if (files.length === 0) {
      setErrorMsg("Please attach at least one academic or identity document.");
      return;
    }

    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("targetCountry", targetCountry);
      formData.append("service", service);
      formData.append("notes", notes);

      files.forEach((item, index) => {
        formData.append(`file_${index}`, item.file);
        formData.append(`type_${index}`, item.type);
      });

      const res = await fetch("/api/student-documents", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit documents");
      }

      setSubmittedRef(data.refCode);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submittedRef) {
    const waText = encodeURIComponent(
      `Hello Global Guidelines Team! I just uploaded my study abroad documents on your portal with Reference ID: ${submittedRef}. Student Name: ${name}, Phone: ${phone}, Target Country: ${targetCountry}. Please review my file.`
    );
    const waUrl = `https://wa.me/9779702709933?text=${waText}`;

    return (
      <div className="min-h-[80vh] bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-8 sm:p-10 text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Documents Received Successfully
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-brand-navy">
              Application File Created
            </h1>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Your academic files have been cataloged and attached to our counselor review queue.
            </p>
          </div>

          {/* Reference Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Your Official Submission Reference ID:
            </span>
            <div className="text-3xl font-mono font-black text-brand-red tracking-wider">
              {submittedRef}
            </div>
            <p className="text-xs text-slate-500">
              Please save this ID. Our counselors will quote this reference when discussing your admission.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-emerald-600/20 transition transform hover:-translate-y-0.5 text-sm"
            >
              <Phone className="w-4 h-4" />
              <span>Notify Counselor on WhatsApp Directly</span>
            </a>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/"
                className="w-full inline-flex items-center justify-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-5 py-3 rounded-xl transition text-xs"
              >
                <span>Return to Homepage</span>
              </Link>
              <button
                onClick={() => {
                  setSubmittedRef(null);
                  setFiles([]);
                  setName("");
                  setEmail("");
                  setPhone("");
                  setNotes("");
                }}
                className="w-full inline-flex items-center justify-center space-x-2 bg-brand-navy hover:bg-brand-navy-900 text-white font-bold px-5 py-3 rounded-xl transition text-xs"
              >
                <span>Submit Another File</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Banner */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-brand-navy/5 border border-brand-navy/15 text-brand-navy px-3.5 py-1.5 rounded-full text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-brand-red" />
            <span>MOEST Reg. 1459 • Secure Student Document Portal</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-navy tracking-tight">
            Upload Your Documents for <br className="hidden sm:block" />
            <span className="text-brand-red">Free Eligibility Assessment</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Skip WhatsApp image compression and lost files. Submit your transcripts, passport, and test scores directly to our senior admissions team for a verified assessment within 24 hours.
          </p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-brand-red p-4 rounded-2xl flex items-start space-x-3 text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-10 space-y-8">
          {/* Section 1: Student Information */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
              <span className="w-6 h-6 rounded-full bg-brand-navy text-white text-xs font-bold flex items-center justify-center">
                1
              </span>
              <h2 className="text-base font-black text-brand-navy">Student Contact Details</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name <span className="text-brand-red">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aayush Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  WhatsApp / Phone <span className="text-brand-red">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9801234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address <span className="text-brand-red">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. aayush@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Target Study Destination
                </label>
                <select
                  value={targetCountry}
                  onChange={(e) => setTargetCountry(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy"
                >
                  {TARGET_COUNTRIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Target Level / Intake
                </label>
                <input
                  type="text"
                  placeholder="e.g. Bachelor's / Master's / Fall 2026"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Upload Documents */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
              <span className="w-6 h-6 rounded-full bg-brand-navy text-white text-xs font-bold flex items-center justify-center">
                2
              </span>
              <h2 className="text-base font-black text-brand-navy">Attach Academic & Identity Documents</h2>
            </div>

            {/* Dropzone & Type selection */}
            <div className="bg-slate-50 border-2 border-dashed border-slate-200 hover:border-brand-navy/40 transition rounded-2xl p-6 sm:p-8 text-center space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                <span className="text-xs font-bold text-slate-600 whitespace-nowrap">Document Category:</span>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="text-xs font-semibold px-3 py-2 rounded-lg border border-slate-300 bg-white w-full sm:w-auto"
                >
                  {DOCUMENT_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <div className="w-12 h-12 bg-white text-brand-navy rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center mx-auto">
                  <UploadCloud className="w-6 h-6 text-brand-red" />
                </div>
                <div className="text-sm font-bold text-slate-800">
                  Click to select or drag and drop your files
                </div>
                <p className="text-xs text-slate-400">
                  PDF, JPG, PNG, DOCX up to 25MB each (Transcripts, Passport scan, IELTS/PTE scorecard)
                </p>
              </div>

              <label className="inline-flex items-center space-x-2 bg-brand-navy hover:bg-brand-navy-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer shadow-sm transition">
                <Plus className="w-4 h-4" />
                <span>Choose Files from Device</span>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </label>
            </div>

            {/* Staged files list */}
            {files.length > 0 && (
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-slate-700 block">
                  Files Ready for Submission ({files.length}):
                </span>
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden bg-white">
                  {files.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center space-x-3 overflow-hidden">
                        <FileText className="w-5 h-5 text-brand-red flex-shrink-0" />
                        <div className="truncate">
                          <div className="font-bold text-slate-800 truncate">{item.file.name}</div>
                          <div className="text-[11px] text-slate-400">
                            {(item.file.size / 1024 / 1024).toFixed(2)} MB
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-end">
                        <select
                          value={item.type}
                          onChange={(e) => updateFileType(item.id, e.target.value)}
                          className="text-[11px] font-semibold px-2 py-1.5 rounded-lg border border-slate-200 bg-slate-50"
                        >
                          {DOCUMENT_TYPES.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>

                        <button
                          type="button"
                          onClick={() => removeFile(item.id)}
                          className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition"
                          title="Remove file"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Section 3: Notes */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">
              Additional Notes or Questions for Counselor (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="e.g. I completed +2 with 3.4 GPA, currently planning for UK September intake. Do I need IELTS or MOI waiver?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Strictly confidential. Encrypted storage under MOEST compliance.</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-brand-red hover:bg-brand-red-600 disabled:opacity-50 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-brand-red/30 transition transform hover:-translate-y-0.5 text-sm"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting Documents...</span>
                </>
              ) : (
                <>
                  <span>Submit Application Documents</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
