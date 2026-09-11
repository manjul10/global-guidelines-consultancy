"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { saveServiceAction, deleteServiceAction } from "@/app/actions/services";
import { slugify } from "@/lib/utils";
import { Plus, Edit2, Trash2, ExternalLink, Check, X, Loader2, AlertCircle, Briefcase } from "lucide-react";

interface Service {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  deliverables: string;
  iconName: string | null;
  featured: boolean;
}

export default function ServicesManager({ initialServices }: { initialServices: Service[] }) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Service | null>(null);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [deliverables, setDeliverables] = useState("");
  const [iconName, setIconName] = useState("GraduationCap");
  const [featured, setFeatured] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openNewModal = () => {
    setEditingItem(null);
    setTitle("");
    setSlug("");
    setTagline("");
    setDescription("");
    setDeliverables("");
    setIconName("GraduationCap");
    setFeatured(true);
    setError(null);
    setModalOpen(true);
  };

  const openEditModal = (item: Service) => {
    setEditingItem(item);
    setTitle(item.title);
    setSlug(item.slug);
    setTagline(item.tagline);
    setDescription(item.description);

    try {
      const parsed = JSON.parse(item.deliverables || "[]") as string[];
      setDeliverables(parsed.join("\n"));
    } catch {
      setDeliverables(item.deliverables || "");
    }

    setIconName(item.iconName || "GraduationCap");
    setFeatured(item.featured);
    setError(null);
    setModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingItem) {
      setSlug(slugify(val));
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    if (editingItem?.id) formData.append("id", editingItem.id);
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("tagline", tagline);
    formData.append("description", description);
    formData.append("deliverables", deliverables);
    formData.append("iconName", iconName);
    formData.append("featured", featured ? "true" : "false");

    const res = await saveServiceAction(formData);
    setLoading(false);

    if (res.success) {
      setModalOpen(false);
      router.refresh();
    } else {
      setError(res.error || "Failed to save service");
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Are you sure you want to delete this consulting service?")) {
      return;
    }
    await deleteServiceAction(id);
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 bg-red-50 text-brand-red rounded-lg">
              <Briefcase className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-black text-brand-navy">Consultancy Services</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Create, edit, or remove study destinations, visa offerings, and test prep tracks.
          </p>
        </div>

        <button
          onClick={openNewModal}
          className="inline-flex items-center space-x-1.5 bg-brand-red hover:bg-brand-red-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {initialServices.map((svc) => {
          let delivList: string[] = [];
          try {
            delivList = JSON.parse(svc.deliverables || "[]");
          } catch {
            delivList = [];
          }

          return (
            <div
              key={svc.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-base font-bold text-slate-900">{svc.title}</h2>
                    <span className="text-xs font-semibold text-brand-red">{svc.tagline}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {svc.featured ? (
                      <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200">
                        Featured
                      </span>
                    ) : (
                      <span className="bg-slate-100 text-slate-500 text-[10px] font-medium px-2 py-0.5 rounded">
                        Standard
                      </span>
                    )}
                    <button
                      onClick={() => openEditModal(svc)}
                      className="p-1 rounded text-slate-500 hover:text-brand-navy hover:bg-slate-100 transition"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(svc.id)}
                      className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {svc.description}
                </p>

                {delivList.length > 0 && (
                  <div className="pt-2 border-t border-slate-100 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Deliverables ({delivList.length}):
                    </span>
                    <ul className="text-xs text-slate-600 space-y-1">
                      {delivList.slice(0, 3).map((d, i) => (
                        <li key={i} className="flex items-center space-x-1.5">
                          <span className="text-emerald-500 font-bold">✓</span>
                          <span className="truncate">{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono text-[11px]">/services/{svc.slug}</span>
                <Link
                  href={`/services/${svc.slug}`}
                  target="_blank"
                  className="text-brand-navy hover:text-brand-red font-bold inline-flex items-center space-x-1"
                >
                  <span>View Public Page</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Dialog */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-7 space-y-5 shadow-2xl relative my-auto max-h-[90vh] overflow-y-auto">

            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-brand-navy">
                {editingItem ? "Edit Service" : "Add New Consulting Service"}
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
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. Study in UK & University Admissions"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-navy focus:outline-none font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(slugify(e.target.value))}
                  placeholder="study-in-uk"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs font-mono focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Tagline *
                </label>
                <input
                  type="text"
                  required
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="e.g. 2-Year Post-Study Work Visa Guidance & Top Russell Group Universities"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-navy focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Service Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detailed breakdown of how Global Guidelines assists students for this service..."
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-navy focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Deliverables & Highlights (one per line)
                </label>
                <textarea
                  rows={4}
                  value={deliverables}
                  onChange={(e) => setDeliverables(e.target.value)}
                  placeholder="Direct CAS letter processing&#10;Airtight maintenance fund check&#10;1-on-1 mock interview preparation"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-navy focus:outline-none font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Icon
                  </label>
                  <select
                    value={iconName}
                    onChange={(e) => setIconName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                  >
                    <option value="GraduationCap">GraduationCap (University)</option>
                    <option value="FileCheck">FileCheck (Visa / Documentation)</option>
                    <option value="BookOpen">BookOpen (Test Prep / IELTS)</option>
                    <option value="Plane">Plane (Travel / Visitor)</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <label className="flex items-center space-x-2 font-bold text-slate-700 cursor-pointer bg-slate-50 p-2.5 rounded-lg border border-slate-200 w-full">
                    <input
                      type="checkbox"
                      checked={featured}
                      onChange={(e) => setFeatured(e.target.checked)}
                      className="rounded text-brand-red focus:ring-brand-navy"
                    />
                    <span>Feature on Home</span>
                  </label>
                </div>
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
                  <span>{editingItem ? "Update Service" : "Save Service"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
