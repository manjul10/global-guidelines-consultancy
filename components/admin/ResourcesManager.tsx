"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { saveResourceAction, deleteResourceAction } from "@/app/actions/resources";
import { slugify } from "@/lib/utils";
import { Plus, Edit2, Trash2, ExternalLink, Check, X, Loader2, AlertCircle, FileDown, Lock, Download } from "lucide-react";

interface Resource {
  id: string;
  title: string;
  slug: string;
  description: string;
  fileUrl: string;
  fileType: string;
  fileSizeBytes: number;
  downloadCount: number;
  isGated: boolean;
}

export default function ResourcesManager({ initialResources }: { initialResources: Resource[] }) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Resource | null>(null);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [fileType, setFileType] = useState("PDF");
  const [sizeMb, setSizeMb] = useState("2.5");
  const [isGated, setIsGated] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openNewModal = () => {
    setEditingItem(null);
    setTitle("");
    setSlug("");
    setDescription("");
    setFileUrl("/downloads/global-guidelines-visa-checklist.pdf");
    setFileType("PDF");
    setSizeMb("2.4");
    setIsGated(false);
    setError(null);
    setModalOpen(true);
  };

  const openEditModal = (item: Resource) => {
    setEditingItem(item);
    setTitle(item.title);
    setSlug(item.slug);
    setDescription(item.description);
    setFileUrl(item.fileUrl);
    setFileType(item.fileType);
    setSizeMb((item.fileSizeBytes / (1024 * 1024)).toFixed(1));
    setIsGated(item.isGated);
    setError(null);
    setModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingItem) {
      setSlug(slugify(val));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const bytes = Math.round((parseFloat(sizeMb) || 1) * 1024 * 1024);

    const formData = new FormData();
    if (editingItem) formData.append("id", editingItem.id);
    formData.append("title", title);
    formData.append("slug", slug || slugify(title));
    formData.append("description", description);
    formData.append("fileUrl", fileUrl);
    formData.append("fileType", fileType);
    formData.append("fileSizeBytes", bytes.toString());
    formData.append("isGated", isGated ? "true" : "false");

    const res = await saveResourceAction(formData);
    setLoading(false);

    if (res.success) {
      setModalOpen(false);
      router.refresh();
    } else {
      setError(res.error || "Failed to save resource.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this resource?")) return;
    setLoading(true);
    const res = await deleteResourceAction(id);
    setLoading(false);
    if (res.success) {
      router.refresh();
    } else {
      alert(res.error || "Failed to delete");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 bg-red-50 text-brand-red rounded-lg">
              <FileDown className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-black text-brand-navy">Downloadable Student Resources</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Application checklists, country visa guides, IELTS preparation syllabi, and downloadable toolkits.
          </p>
        </div>
        <button
          onClick={openNewModal}
          className="inline-flex items-center space-x-2 px-4 py-2.5 bg-brand-red hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add Resource</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {initialResources.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 text-slate-500 text-sm">
            No downloadable resources found. Click <span className="font-bold text-brand-red">&quot;Add Resource&quot;</span> to upload guides!
          </div>
        ) : (
          initialResources.map((res) => (
            <div
              key={res.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition relative flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start space-x-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-red-50 text-brand-red flex items-center justify-center flex-shrink-0 border border-red-100">
                      <FileDown className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-700 text-[10px] uppercase bg-slate-100 px-2 py-0.5 rounded">
                          {res.fileType}
                        </span>
                        {res.isGated ? (
                          <span className="bg-amber-50 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-200 flex items-center space-x-1">
                            <Lock className="w-2.5 h-2.5" />
                            <span>Lead-Gated</span>
                          </span>
                        ) : (
                          <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200">
                            Instant Download
                          </span>
                        )}
                      </div>
                      <h2 className="text-base font-bold text-slate-900 mt-1 truncate">{res.title}</h2>
                      <div className="text-[11px] text-slate-400 mt-0.5 flex items-center space-x-2">
                        <span>{(res.fileSizeBytes / (1024 * 1024)).toFixed(1)} MB</span>
                        <span>•</span>
                        <span className="flex items-center space-x-1">
                          <Download className="w-3 h-3" />
                          <span>{res.downloadCount} downloads</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 shrink-0">
                    <button
                      onClick={() => openEditModal(res)}
                      title="Edit Resource"
                      className="p-1.5 text-slate-400 hover:text-brand-navy hover:bg-slate-100 rounded-lg transition"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(res.id)}
                      title="Delete Resource"
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {res.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs mt-3">
                <span className="text-slate-400 font-mono text-[11px]">/resources/{res.slug}</span>
                <Link
                  href="/resources"
                  target="_blank"
                  className="text-brand-navy hover:text-brand-red font-bold inline-flex items-center space-x-1"
                >
                  <span>View in Resource Hub</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-5 sm:p-6 space-y-5 shadow-2xl border border-slate-100 my-auto max-h-[90vh] overflow-y-auto">

            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-lg font-black text-brand-navy">
                {editingItem ? "Edit Resource Document" : "Add New Resource Document"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Resource Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Complete UK Student Visa Documentation Checklist 2026"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-navy"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">URL Slug</label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full px-3 py-2 font-mono border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-navy"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">File Format / Type *</label>
                  <select
                    value={fileType}
                    onChange={(e) => setFileType(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy"
                  >
                    <option value="PDF">PDF Document</option>
                    <option value="Checklist">Checklist</option>
                    <option value="Toolkit">Comprehensive Toolkit</option>
                    <option value="Guide">Step-by-step Guide</option>
                    <option value="Excel">Excel / Spreadsheet</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Download URL / Path *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. /downloads/uk-visa-checklist-2026.pdf or https://..."
                  value={fileUrl}
                  onChange={(e) => setFileUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-navy"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Estimated File Size (MB)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    required
                    value={sizeMb}
                    onChange={(e) => setSizeMb(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-navy"
                  />
                </div>

                <div className="flex items-center pt-6 space-x-2">
                  <input
                    type="checkbox"
                    id="isGatedToggle"
                    checked={isGated}
                    onChange={(e) => setIsGated(e.target.checked)}
                    className="w-4 h-4 text-brand-navy rounded border-slate-300 focus:ring-brand-navy"
                  />
                  <label htmlFor="isGatedToggle" className="font-bold text-slate-700 cursor-pointer">
                    Require Student Email (Lead Capture)
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Resource Description *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Explain what the guide covers, who benefits from it, and key steps outlined..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-navy"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-bold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center space-x-2 px-5 py-2 bg-brand-navy hover:bg-slate-800 text-white rounded-xl font-bold transition disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                  <span>{editingItem ? "Update Resource" : "Create Resource"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
