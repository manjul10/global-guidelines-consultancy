"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveTestimonialAction, deleteTestimonialAction } from "@/app/actions/testimonials";
import { Plus, Edit2, Trash2, Star, Check, X, Loader2, AlertCircle } from "lucide-react";

interface Testimonial {
  id: string;
  clientName: string;
  clientRole: string;
  companyName: string;
  avatarUrl: string | null;
  quote: string;
  rating: number;
  featured: boolean;
}

export default function TestimonialsManager({
  initialTestimonials,
}: {
  initialTestimonials: Testimonial[];
}) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);

  const [clientName, setClientName] = useState("");
  const [clientRole, setClientRole] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [quote, setQuote] = useState("");
  const [rating, setRating] = useState(5);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [featured, setFeatured] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openNewModal = () => {
    setEditingItem(null);
    setClientName("");
    setClientRole("Student (Master's Program)");
    setCompanyName("University of Hertfordshire, UK");
    setQuote("");
    setRating(5);
    setAvatarUrl("");
    setFeatured(true);
    setError(null);
    setModalOpen(true);
  };

  const openEditModal = (item: Testimonial) => {
    setEditingItem(item);
    setClientName(item.clientName);
    setClientRole(item.clientRole);
    setCompanyName(item.companyName);
    setQuote(item.quote);
    setRating(item.rating);
    setAvatarUrl(item.avatarUrl || "");
    setFeatured(item.featured);
    setError(null);
    setModalOpen(true);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    if (editingItem?.id) formData.append("id", editingItem.id);
    formData.append("clientName", clientName);
    formData.append("clientRole", clientRole);
    formData.append("companyName", companyName);
    formData.append("quote", quote);
    formData.append("rating", rating.toString());
    formData.append("avatarUrl", avatarUrl);
    formData.append("featured", featured ? "true" : "false");

    const res = await saveTestimonialAction(formData);
    setLoading(false);

    if (res.success) {
      setModalOpen(false);
      router.refresh();
    } else {
      setError(res.error || "Failed to save testimonial");
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Are you sure you want to delete this student testimonial?")) {
      return;
    }
    await deleteTestimonialAction(id);
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-brand-navy">
            Student Testimonials & Reviews
          </h1>
          <p className="text-xs text-slate-500">
            Add, edit, or remove student reviews and toggle which ones appear on the homepage.
          </p>
        </div>

        <button
          onClick={openNewModal}
          className="inline-flex items-center space-x-1.5 bg-brand-red hover:bg-brand-red-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Testimonial</span>
        </button>
      </div>

      {/* Grid of Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {initialTestimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex text-amber-400 space-x-0.5">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <div className="flex items-center space-x-2">
                  {t.featured ? (
                    <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200">
                      ★ Featured on Home
                    </span>
                  ) : (
                    <span className="bg-slate-100 text-slate-500 text-[10px] font-medium px-2 py-0.5 rounded">
                      Hidden
                    </span>
                  )}
                  <button
                    onClick={() => openEditModal(t)}
                    className="p-1 rounded text-slate-500 hover:text-brand-navy hover:bg-slate-100 transition"
                    title="Edit"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <blockquote className="text-xs text-slate-700 italic leading-relaxed">
                "{t.quote}"
              </blockquote>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-brand-navy text-white font-bold flex items-center justify-center text-xs flex-shrink-0">
                {t.clientName[0]}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900 truncate">{t.clientName}</div>
                <div className="text-[10px] text-slate-500 truncate">
                  {t.clientRole} • {t.companyName}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Dialog */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-brand-navy">
                {editingItem ? "Edit Testimonial" : "Add Student Testimonial"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {error && (
              <div className="flex items-center space-x-2 bg-red-50 text-brand-red p-3 rounded-lg text-xs font-medium border border-red-200">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Student Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Jaykishan Kumar Yadav"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-navy focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Degree / Program
                  </label>
                  <input
                    type="text"
                    value={clientRole}
                    onChange={(e) => setClientRole(e.target.value)}
                    placeholder="e.g. MSc Data Science"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-navy focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    University & Country
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. University of North Texas, USA"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-navy focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Student Review / Quote *
                </label>
                <textarea
                  rows={3}
                  required
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder="Share the student's authentic experience with Global Guidelines..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-navy focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Rating (Stars)
                  </label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(parseInt(e.target.value, 10))}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-navy focus:outline-none bg-white font-bold"
                  >
                    <option value={5}>★★★★★ (5 Stars)</option>
                    <option value={4}>★★★★☆ (4 Stars)</option>
                    <option value={3}>★★★☆☆ (3 Stars)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Avatar Image URL (optional)
                  </label>
                  <input
                    type="url"
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-navy focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center space-x-2 font-bold text-slate-700 cursor-pointer bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="rounded text-brand-red focus:ring-brand-navy"
                  />
                  <span>Feature on Public Homepage</span>
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end space-x-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center space-x-1.5 bg-brand-red hover:bg-brand-red-600 disabled:opacity-60 text-white font-bold px-5 py-2 rounded-lg shadow-sm"
                >
                  {loading ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Check className="w-3.5 h-3.5" />
                  )}
                  <span>{editingItem ? "Update Review" : "Save Review"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
