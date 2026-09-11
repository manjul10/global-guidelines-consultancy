"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Upload, FileDown, Copy, Check, Loader2, AlertCircle } from "lucide-react";

interface MediaAsset {
  id: string;
  filename: string;
  url: string;
  mimeType: string;
  sizeBytes: number;
  createdAt: Date | string;
}

export default function MediaUploader({ initialAssets }: { initialAssets: MediaAsset[] }) {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to upload");
      }

      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Upload error");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Upload Zone */}
      <div className="bg-white p-8 rounded-2xl border-2 border-dashed border-slate-300 hover:border-brand-red/60 transition text-center space-y-4">
        <div className="w-12 h-12 bg-red-50 text-brand-red rounded-full flex items-center justify-center mx-auto">
          {uploading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Upload className="w-6 h-6" />}
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-900">Upload Media or Documents</h3>
          <p className="text-xs text-slate-500 mt-1">
            PNG, JPG, WEBP (up to 5MB) or PDF whitepapers & checklists (up to 25MB)
          </p>
        </div>

        {error && (
          <div className="inline-flex items-center space-x-1.5 text-xs text-brand-red bg-red-50 px-3 py-1 rounded-lg border border-red-200">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}

        <div>
          <label className="inline-flex items-center space-x-2 bg-brand-navy hover:bg-brand-navy-900 text-white text-xs font-bold px-5 py-2.5 rounded-xl cursor-pointer shadow-sm transition">
            <span>Select File to Upload</span>
            <input
              type="file"
              onChange={handleFileChange}
              disabled={uploading}
              accept="image/*,.pdf"
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Assets Grid */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-slate-900">Uploaded Library ({initialAssets.length})</h2>

        {initialAssets.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 text-xs text-slate-400">
            No media files uploaded yet. Upload your first image or PDF above.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {initialAssets.map((asset) => {
              const isImage = asset.mimeType.startsWith("image/");
              const isCopied = copiedUrl === asset.url;

              return (
                <div
                  key={asset.id}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between group"
                >
                  <div className="h-32 bg-slate-100 relative overflow-hidden flex items-center justify-center">
                    {isImage ? (
                      <Image
                        src={asset.url}
                        alt={asset.filename}
                        fill
                        className="object-cover group-hover:scale-105 transition duration-300"
                      />
                    ) : (
                      <div className="text-center p-2 text-slate-500">
                        <FileDown className="w-10 h-10 text-brand-red mx-auto mb-1" />
                        <span className="text-[10px] font-bold uppercase block">PDF File</span>
                      </div>
                    )}
                  </div>

                  <div className="p-3 space-y-2">
                    <div className="text-xs font-bold text-slate-800 truncate" title={asset.filename}>
                      {asset.filename}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {(asset.sizeBytes / (1024 * 1024)).toFixed(2)} MB
                    </div>

                    <button
                      onClick={() => copyToClipboard(asset.url)}
                      className={`w-full flex items-center justify-center space-x-1.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                        isCopied
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                      }`}
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isCopied ? "Copied!" : "Copy URL"}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
