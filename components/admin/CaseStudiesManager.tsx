"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { saveCaseStudyAction, deleteCaseStudyAction } from "@/app/actions/caseStudies";
import { slugify } from "@/lib/utils";
import { Plus, Edit2, Trash2, ExternalLink, Check, X, Loader2, AlertCircle, Award, Globe } from "lucide-react";

interface ResultMetric {
  metric: string;
  label: string;
}

interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  clientName: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string;
  coverImage: string | null;
  published: boolean;
}

export default function CaseStudiesManager({ initialCaseStudies }: { initialCaseStudies: CaseStudy[] }) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CaseStudy | null>(null);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [clientName, setClientName] = useState("");
  const [industry, setIndustry] = useState("UK Student Visa");
  const [challenge, setChallenge] = useState("");
  const [solution, setSolution] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [resultsText, setResultsText] = useState("");
  const [published, setPublished] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openNewModal = () => {
    setEditingItem(null);
    setTitle("");
    setSlug("");
    setClientName("");
    setIndustry("UK Student Visa");
    setChallenge("");
    setSolution("");
    setCoverImage("https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80");
    setResultsText("100% | Visa Granted\n14 Days | CAS Turnaround\n£4,000 | Scholarship Secured");
    setPublished(true);
    setError(null);
    setModalOpen(true);
  };

  const openEditModal = (item: CaseStudy) => {
    setEditingItem(item);
    setTitle(item.title);
    setSlug(item.slug);
    setClientName(item.clientName);
    setIndustry(item.industry);
    setChallenge(item.challenge);
    setSolution(item.solution);
    setCoverImage(item.coverImage || "");
    setPublished(item.published);

    try {
      const parsed = JSON.parse(item.results || "[]") as ResultMetric[];
      setResultsText(parsed.map((r) => `${r.metric} | ${r.label}`).join("\n"));
    } catch {
      setResultsText(item.results || "");
    }

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

    const formData = new FormData();
    if (editingItem) formData.append("id", editingItem.id);
    formData.append("title", title);
    formData.append("slug", slug || slugify(title));
    formData.append("clientName", clientName);
    formData.append("industry", industry);
    formData.append("challenge", challenge);
    formData.append("solution", solution);
    formData.append("coverImage", coverImage);
    formData.append("results", resultsText);
    formData.append("published", published ? "true" : "false");

    const res = await saveCaseStudyAction(formData);
    setLoading(false);

    if (res.success) {
      setModalOpen(false);
      router.refresh();
    } else {
      setError(res.error || "Failed to save visa story.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this visa success story?")) return;
    setLoading(true);
    const res = await deleteCaseStudyAction(id);
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
              <Award className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-black text-brand-navy">Visa Success Stories & Case Studies</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real student admissions, embassy grant letters, and scholarship milestones. Manage or publish new records dynamically.
          </p>
        </div>
        <button
          onClick={openNewModal}
          className="inline-flex items-center space-x-2 px-4 py-2.5 bg-brand-red hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow transition"
        >
          <Plus className="w-4 h-4" />
          <span>New Success Story</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {initialCaseStudies.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 text-slate-500 text-sm">
            No visa stories created yet. Click <span className="font-bold text-brand-red">&quot;New Success Story&quot;</span> to add your first!
          </div>
        ) : (
          initialCaseStudies.map((study) => {
            let results: ResultMetric[] = [];
            try {
              results = JSON.parse(study.results || "[]") as ResultMetric[];
            } catch {
              results = [];
            }

            return (
              <div
                key={study.id}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition relative flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-brand-red bg-red-50 text-[11px] px-2.5 py-0.5 rounded-md border border-red-100">
                          {study.industry}
                        </span>
                        {study.published ? (
                          <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200">
                            Live
                          </span>
                        ) : (
                          <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded">
                            Draft
                          </span>
                        )}
                      </div>
                      <h2 className="text-base font-black text-brand-navy pt-1">{study.title}</h2>
                      <p className="text-xs font-semibold text-slate-600">Student: {study.clientName}</p>
                    </div>

                    <div className="flex items-center space-x-1 shrink-0">
                      <button
                        onClick={() => openEditModal(study)}
                        title="Edit Story"
                        className="p-1.5 text-slate-400 hover:text-brand-navy hover:bg-slate-100 rounded-lg transition"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(study.id)}
                        title="Delete Story"
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="text-xs text-slate-600 space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div>
                      <span className="font-bold text-slate-700">Challenge: </span>
                      <span className="line-clamp-2">{study.challenge}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-700">Solution: </span>
                      <span className="line-clamp-2">{study.solution}</span>
                    </div>
                  </div>

                  {results.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 pt-1">
                      {results.map((r, i) => (
                        <div key={i} className="bg-slate-50 p-2 rounded-lg text-center border border-slate-200">
                          <div className="text-xs font-black text-brand-navy">{r.metric}</div>
                          <div className="text-[9px] text-slate-500 truncate">{r.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs mt-3">
                  <span className="text-slate-400 font-mono text-[11px]">/case-studies/{study.slug}</span>
                  <Link
                    href={`/case-studies/${study.slug}`}
                    target="_blank"
                    className="text-brand-navy hover:text-brand-red font-bold inline-flex items-center space-x-1"
                  >
                    <span>View Live</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal Dialog */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-6 shadow-2xl border border-slate-100 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-lg font-black text-brand-navy">
                {editingItem ? "Edit Visa Success Story" : "Add New Visa Success Story"}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Student Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jaykishan Kumar Yadav"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-navy"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Study Track / Visa Destination *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. UK Student Visa (CAS Approved)"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-navy"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Story Headline / Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Navigating University Admission & Fast-Track UK Visa Approval"
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
                  <label className="block font-bold text-slate-700 mb-1">Cover Image URL</label>
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/..."
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-navy"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Student Challenge / Profile Context *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe student's initial qualifications, academic background, gap years, or documentation challenges..."
                  value={challenge}
                  onChange={(e) => setChallenge(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-navy"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Consultancy Solution & Guidance *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe Global Guidelines' customized approach, university selection, SOP review, financial audit, or mock interview preparation..."
                  value={solution}
                  onChange={(e) => setSolution(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-navy"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Key Metric Badges (Format: <span className="font-mono text-brand-red">Metric | Label</span> per line)
                </label>
                <textarea
                  rows={3}
                  placeholder={"100% | Visa Granted\n£4,000 | Scholarship\n14 Days | CAS Turnaround"}
                  value={resultsText}
                  onChange={(e) => setResultsText(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl font-mono text-xs focus:outline-none focus:ring-2 focus:ring-brand-navy"
                />
                <p className="text-[10px] text-slate-400 mt-1">
                  Enter each highlight separated by a pipe &apos;|&apos;. Example: <code className="bg-slate-100 px-1 py-0.5 rounded">Visa Granted | 100% Success</code>
                </p>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="publishedToggle"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="w-4 h-4 text-brand-navy rounded border-slate-300 focus:ring-brand-navy"
                />
                <label htmlFor="publishedToggle" className="font-bold text-slate-700 cursor-pointer">
                  Publish to Live Website immediately
                </label>
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
                  <span>{editingItem ? "Update Story" : "Create Story"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
