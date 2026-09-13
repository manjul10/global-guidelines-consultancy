"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  saveCelebrationMomentAction,
  deleteCelebrationMomentAction,
} from "@/app/actions/celebrations";
import {
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Loader2,
  AlertCircle,
  Camera,
  UploadCloud,
  Image as ImageIcon,
  Sparkles,
} from "lucide-react";

interface CelebrationMoment {
  id: string;
  title: string;
  subtitle: string | null;
  imageUrl: string;
  category: string | null;
  displayOrder: number;
  active: boolean;
}

export default function CelebrationManager({
  initialItems,
}: {
  initialItems: CelebrationMoment[];
}) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CelebrationMoment | null>(null);

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("Visa Grant");
  const [displayOrder, setDisplayOrder] = useState("0");
  const [active, setActive] = useState(true);

  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setError(null);

    try {
      const data = new FormData();
      data.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to upload image");
      }

      setImageUrl(json.url);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Image upload failed";
      setError(msg);
    } finally {
      setUploadingImage(false);
    }
  };

  const openNewModal = () => {
    setEditingItem(null);
    setTitle("");
    setSubtitle("@globalguidelines");
    setImageUrl("");
    setCategory("Visa Grant");
    setDisplayOrder((initialItems.length + 1).toString());
    setActive(true);
    setError(null);
    setModalOpen(true);
  };

  const openEditModal = (item: CelebrationMoment) => {
    setEditingItem(item);
    setTitle(item.title);
    setSubtitle(item.subtitle || "");
    setImageUrl(item.imageUrl);
    setCategory(item.category || "Visa Grant");
    setDisplayOrder(item.displayOrder.toString());
    setActive(item.active);
    setError(null);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!imageUrl) {
      setError("Please upload an image or provide an image URL.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    if (editingItem) {
      formData.append("id", editingItem.id);
    }
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("imageUrl", imageUrl);
    formData.append("category", category);
    formData.append("displayOrder", displayOrder);
    formData.append("active", active ? "true" : "false");

    const res = await saveCelebrationMomentAction(formData);
    setLoading(false);

    if (res.success) {
      setModalOpen(false);
      router.refresh();
    } else {
      setError(res.error || "Failed to save celebration photo.");
    }
  };

  const handleDelete = async (id: string, itemTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${itemTitle}"?`)) return;

    const res = await deleteCelebrationMomentAction(id);
    if (res.success) {
      router.refresh();
    } else {
      alert(res.error || "Failed to delete item");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center">
            <Camera className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-brand-navy">
              Life at Global Guidelines & Visa Celebrations
            </h2>
            <p className="text-xs text-slate-500">
              Upload and manage the photos displayed in the live homepage social celebration gallery.
            </p>
          </div>
        </div>

        <button
          onClick={openNewModal}
          className="inline-flex items-center space-x-2 bg-brand-red hover:bg-brand-red-600 text-white font-bold text-xs px-5 py-3 rounded-xl shadow transition"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Celebration Photo</span>
        </button>
      </div>

      {/* Grid of Moments */}
      {initialItems.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-xs text-slate-400">
          No celebration photos found. Click "Upload Celebration Photo" to add one.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {initialItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col group"
            >
              {/* Image Preview */}
              <div className="relative aspect-square bg-slate-100 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute top-2 left-2 flex items-center gap-1.5">
                  <span className="text-[10px] font-bold bg-slate-900/80 text-white px-2 py-0.5 rounded backdrop-blur-sm">
                    Order: {item.displayOrder}
                  </span>
                  {item.category && (
                    <span className="text-[10px] font-semibold bg-brand-red text-white px-2 py-0.5 rounded shadow-sm">
                      {item.category}
                    </span>
                  )}
                </div>
                {!item.active && (
                  <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center">
                    <span className="bg-red-500 text-white text-[11px] font-bold px-3 py-1 rounded-full">
                      Hidden from Live Site
                    </span>
                  </div>
                )}
              </div>

              {/* Card Meta */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">{item.title}</h4>
                  {item.subtitle && (
                    <p className="text-[11px] text-slate-500 mt-0.5">{item.subtitle}</p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div className="flex items-center space-x-1.5">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        item.active ? "bg-emerald-500" : "bg-slate-300"
                      }`}
                    />
                    <span className="text-[11px] font-medium text-slate-600">
                      {item.active ? "Live" : "Draft"}
                    </span>
                  </div>

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => openEditModal(item)}
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-brand-navy hover:bg-slate-50 transition"
                      title="Edit Item"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id, item.title)}
                      className="p-1.5 rounded-lg border border-red-200 text-brand-red hover:bg-red-50 transition"
                      title="Delete Item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 p-6 sm:p-8 space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <h3 className="text-base font-bold text-brand-navy">
                {editingItem ? "Edit Celebration Photo" : "Upload New Celebration Photo"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-2 text-xs text-brand-red font-medium">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Direct Image Upload Area */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Photo Asset (Upload from device or enter URL)
                </label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <label className="flex-1 cursor-pointer border-2 border-dashed border-slate-200 hover:border-brand-red rounded-xl p-4 text-center transition bg-slate-50/50 hover:bg-red-50/20 flex flex-col items-center justify-center group">
                      <UploadCloud className="w-6 h-6 text-slate-400 group-hover:text-brand-red mb-1 transition" />
                      <span className="text-xs font-semibold text-slate-700 group-hover:text-brand-red">
                        {uploadingImage ? "Uploading..." : "Click to browse & upload image"}
                      </span>
                      <span className="text-[10px] text-slate-400 mt-0.5">
                        PNG, JPG, WebP up to 10MB
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        disabled={uploadingImage}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div>
                    <input
                      type="text"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="Or paste /social/photo.jpg or image URL"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 font-medium"
                      required
                    />
                  </div>

                  {/* Image Preview */}
                  {imageUrl && (
                    <div className="relative w-28 h-28 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-inner">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Caption Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Visa Grant Moments"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Subtitle / Location
                  </label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="@globalguidelines or Putalisadak"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Visa Grant / Counseling / Prep"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 font-medium"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="momentActive"
                  checked={active}
                  onChange={(e) => setActive(e.target.checked)}
                  className="rounded border-slate-300 text-brand-red focus:ring-brand-red w-4 h-4"
                />
                <label htmlFor="momentActive" className="text-xs font-semibold text-slate-700">
                  Visible on Live Website Gallery
                </label>
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || uploadingImage}
                  className="inline-flex items-center space-x-1.5 bg-brand-red hover:bg-brand-red-600 text-white text-xs font-bold px-6 py-2 rounded-xl shadow transition"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Save Photo</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
