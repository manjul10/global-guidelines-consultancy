"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { changeInquiryStatusAction } from "@/app/actions/inquiryStatus";
import { formatDate } from "@/lib/utils";
import { Mail, Phone, Clock, CheckCircle2, ChevronRight, MessageSquare, Loader2, ArrowLeft } from "lucide-react";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  serviceOfInterest: string | null;
  message: string;
  status: string;
  createdAt: Date | string;
}

export default function InquiriesManager({ initialInquiries }: { initialInquiries: Inquiry[] }) {
  const router = useRouter();
  const [filter, setFilter] = useState("ALL");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(
    initialInquiries[0] || null
  );
  const [mobileView, setMobileView] = useState<"list" | "detail">("list");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const filtered = initialInquiries.filter((inq) => {
    if (filter === "ALL") return true;
    return inq.status === filter;
  });

  async function handleStatusChange(id: string, newStatus: string) {
    setUpdatingId(id);
    const res = await changeInquiryStatusAction(id, newStatus);
    setUpdatingId(null);

    if (res.success && res.inquiry) {
      if (selectedInquiry?.id === id) {
        setSelectedInquiry({ ...selectedInquiry, status: newStatus });
      }
      router.refresh();
    }
  }

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className={`flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3 ${
        mobileView === "detail" ? "hidden lg:flex" : "flex"
      }`}>
        {["ALL", "NEW", "CONTACTED", "QUALIFIED", "ARCHIVED"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              filter === tab
                ? "bg-brand-navy text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {tab === "ALL" ? "All Inquiries" : tab}
          </button>
        ))}
      </div>

      {/* Two-Column: List + Detail Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: List */}
        <div className={`lg:col-span-6 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100 ${
          mobileView === "detail" ? "hidden lg:block" : "block"
        }`}>
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              No inquiries found in this category.
            </div>
          ) : (
            filtered.map((inq) => {
              const isSelected = selectedInquiry?.id === inq.id;
              return (
                <div
                  key={inq.id}
                  onClick={() => {
                    setSelectedInquiry(inq);
                    setMobileView("detail");
                  }}
                  className={`p-4 cursor-pointer transition flex items-center justify-between ${
                    isSelected ? "bg-slate-50 border-l-4 border-brand-red" : "hover:bg-slate-50/50"
                  }`}
                >
                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-slate-900">{inq.name}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          inq.status === "NEW"
                            ? "bg-emerald-100 text-emerald-800"
                            : inq.status === "CONTACTED"
                            ? "bg-blue-100 text-blue-800"
                            : inq.status === "QUALIFIED"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {inq.status}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">
                      {inq.serviceOfInterest ? `Target: ${inq.serviceOfInterest} • ` : ""}
                      {inq.email}
                    </div>
                    <p className="text-[11px] text-slate-600 line-clamp-1 italic">
                      "{inq.message}"
                    </p>
                  </div>

                  <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0 ml-2" />
                </div>
              );
            })
          )}
        </div>

        {/* Right: Detailed View */}
        <div className={`lg:col-span-6 ${mobileView === "list" ? "hidden lg:block" : "block"}`}>
          {selectedInquiry ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-8 shadow-sm space-y-6 lg:sticky lg:top-24">
              {/* Mobile Back to List Button */}
              <div className="lg:hidden">
                <button
                  type="button"
                  onClick={() => setMobileView("list")}
                  className="inline-flex items-center space-x-2 text-xs font-bold text-brand-navy hover:text-brand-red bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl transition"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Inquiries List</span>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-lg font-black text-slate-900">{selectedInquiry.name}</h2>
                  <div className="text-[11px] text-slate-400">
                    Received on {formatDate(selectedInquiry.createdAt)}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-slate-500">Status:</span>
                  <select
                    value={selectedInquiry.status}
                    disabled={updatingId === selectedInquiry.id}
                    onChange={(e) => handleStatusChange(selectedInquiry.id, e.target.value)}
                    className="text-xs font-bold px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy"
                  >
                    <option value="NEW">NEW</option>
                    <option value="CONTACTED">CONTACTED</option>
                    <option value="QUALIFIED">QUALIFIED</option>
                    <option value="ARCHIVED">ARCHIVED</option>
                  </select>
                </div>
              </div>

              {/* Contact details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Email Address</span>
                  <a
                    href={`mailto:${selectedInquiry.email}`}
                    className="font-bold text-brand-navy hover:underline flex items-center space-x-1"
                  >
                    <Mail className="w-3.5 h-3.5 text-brand-red" />
                    <span>{selectedInquiry.email}</span>
                  </a>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Phone / WhatsApp</span>
                  {selectedInquiry.phone ? (
                    <a
                      href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      className="font-bold text-emerald-700 hover:underline flex items-center space-x-1"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{selectedInquiry.phone}</span>
                    </a>
                  ) : (
                    <span className="text-slate-400 font-medium">Not provided</span>
                  )}
                </div>
              </div>

              {selectedInquiry.serviceOfInterest && (
                <div className="bg-red-50/60 p-3 rounded-xl border border-red-100 text-xs">
                  <span className="font-bold text-brand-red">Target Destination: </span>
                  <span className="font-semibold text-slate-800">{selectedInquiry.serviceOfInterest}</span>
                </div>
              )}

              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Student's Academic Background & Message:
                </span>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed whitespace-pre-wrap font-sans">
                  {selectedInquiry.message}
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <a
                  href={`mailto:${selectedInquiry.email}?subject=Global Guidelines Counseling Follow-up`}
                  className="inline-flex items-center space-x-2 bg-brand-navy hover:bg-brand-navy-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition"
                >
                  <Mail className="w-4 h-4" />
                  <span>Reply via Email</span>
                </a>

                {selectedInquiry.phone && (
                  <a
                    href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Message on WhatsApp</span>
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-xs text-slate-400">
              Select an inquiry to view details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
