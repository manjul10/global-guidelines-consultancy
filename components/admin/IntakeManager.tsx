"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  saveHeroSettingAction,
  saveIntakeTrackAction,
  deleteIntakeTrackAction,
} from "@/app/actions/intakes";
import {
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Loader2,
  AlertCircle,
  Compass,
  Sparkles,
  Sliders,
  ExternalLink,
} from "lucide-react";

interface HeroSetting {
  id: string;
  badgeText: string;
  heading: string;
  subheading: string;
  ctaText: string;
  ctaLink: string;
}

interface IntakeTrack {
  id: string;
  country: string;
  flag: string;
  intake: string;
  statusTag: string;
  statusColor: string;
  displayOrder: number;
  active: boolean;
}

export default function IntakeManager({
  initialSetting,
  initialTracks,
}: {
  initialSetting: HeroSetting;
  initialTracks: IntakeTrack[];
}) {
  const router = useRouter();

  // Hero Card Settings State
  const [badgeText, setBadgeText] = useState(initialSetting.badgeText);
  const [heading, setHeading] = useState(initialSetting.heading);
  const [subheading, setSubheading] = useState(initialSetting.subheading);
  const [ctaText, setCtaText] = useState(initialSetting.ctaText);
  const [ctaLink, setCtaLink] = useState(initialSetting.ctaLink);
  const [savingSetting, setSavingSetting] = useState(false);
  const [settingSuccess, setSettingSuccess] = useState(false);
  const [settingError, setSettingError] = useState<string | null>(null);

  // Track Modal & Form State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTrack, setEditingTrack] = useState<IntakeTrack | null>(null);
  const [country, setCountry] = useState("");
  const [flag, setFlag] = useState("🇺🇸");
  const [intake, setIntake] = useState("");
  const [statusTag, setStatusTag] = useState("Fast Track");
  const [statusColor, setStatusColor] = useState("brand-red");
  const [displayOrder, setDisplayOrder] = useState("0");
  const [active, setActive] = useState(true);
  const [savingTrack, setSavingTrack] = useState(false);
  const [trackError, setTrackError] = useState<string | null>(null);

  // Handle saving hero general setting
  const handleSaveSetting = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSetting(true);
    setSettingSuccess(false);
    setSettingError(null);

    const formData = new FormData();
    formData.append("badgeText", badgeText);
    formData.append("heading", heading);
    formData.append("subheading", subheading);
    formData.append("ctaText", ctaText);
    formData.append("ctaLink", ctaLink);

    const res = await saveHeroSettingAction(formData);
    setSavingSetting(false);
    if (res.success) {
      setSettingSuccess(true);
      setTimeout(() => setSettingSuccess(false), 3000);
      router.refresh();
    } else {
      setSettingError(res.error || "Failed to update settings.");
    }
  };

  // Open modal for new track
  const openNewModal = () => {
    setEditingTrack(null);
    setCountry("");
    setFlag("🇺🇸");
    setIntake("");
    setStatusTag("Fast Track");
    setStatusColor("brand-red");
    setDisplayOrder((initialTracks.length + 1).toString());
    setActive(true);
    setTrackError(null);
    setModalOpen(true);
  };

  // Open modal for editing track
  const openEditModal = (track: IntakeTrack) => {
    setEditingTrack(track);
    setCountry(track.country);
    setFlag(track.flag);
    setIntake(track.intake);
    setStatusTag(track.statusTag);
    setStatusColor(track.statusColor);
    setDisplayOrder(track.displayOrder.toString());
    setActive(track.active);
    setTrackError(null);
    setModalOpen(true);
  };

  // Handle saving track (create or edit)
  const handleSaveTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingTrack(true);
    setTrackError(null);

    const formData = new FormData();
    if (editingTrack) {
      formData.append("id", editingTrack.id);
    }
    formData.append("country", country);
    formData.append("flag", flag);
    formData.append("intake", intake);
    formData.append("statusTag", statusTag);
    formData.append("statusColor", statusColor);
    formData.append("displayOrder", displayOrder);
    formData.append("active", active ? "true" : "false");

    const res = await saveIntakeTrackAction(formData);
    setSavingTrack(false);

    if (res.success) {
      setModalOpen(false);
      router.refresh();
    } else {
      setTrackError(res.error || "Failed to save track.");
    }
  };

  // Handle deleting track
  const handleDeleteTrack = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    const res = await deleteIntakeTrackAction(id);
    if (res.success) {
      router.refresh();
    } else {
      alert(res.error || "Failed to delete track");
    }
  };

  // Status color helper for badges
  const getBadgeClass = (color: string) => {
    switch (color) {
      case "brand-red":
        return "text-brand-red bg-red-50 border-red-200";
      case "emerald":
        return "text-emerald-700 bg-emerald-50 border-emerald-200";
      case "brand-navy":
        return "text-brand-navy bg-blue-50 border-blue-200";
      case "gold":
        return "text-amber-700 bg-amber-50 border-amber-200";
      default:
        return "text-slate-700 bg-slate-100 border-slate-200";
    }
  };

  return (
    <div className="space-y-10">
      {/* 1. HERO GENERAL SETTINGS CARD */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8">
        <div className="flex items-center space-x-3 pb-6 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-brand-navy/10 text-brand-navy flex items-center justify-center">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-brand-navy">Hero Card Content Settings</h2>
            <p className="text-xs text-slate-500">
              Customize the titles, badges, and CTA button of the right-side intake card on the homepage.
            </p>
          </div>
        </div>

        {settingError && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-2 text-xs text-brand-red font-medium">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{settingError}</span>
          </div>
        )}

        {settingSuccess && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center space-x-2 text-xs text-emerald-800 font-medium">
            <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Hero card settings updated successfully! Live website updated.</span>
          </div>
        )}

        <form onSubmit={handleSaveSetting} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Top Badge Label
              </label>
              <input
                type="text"
                value={badgeText}
                onChange={(e) => setBadgeText(e.target.value)}
                placeholder="Admissions Open 2026"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Main Card Heading
              </label>
              <input
                type="text"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
                placeholder="Global Study Intake 2026 / 2027"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 font-medium"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Subheading / Description
            </label>
            <input
              type="text"
              value={subheading}
              onChange={(e) => setSubheading(e.target.value)}
              placeholder="Priority processing currently active for upcoming university intakes:"
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 font-medium"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                CTA Button Text
              </label>
              <input
                type="text"
                value={ctaText}
                onChange={(e) => setCtaText(e.target.value)}
                placeholder="Check Your Eligibility Now"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                CTA Button Link
              </label>
              <input
                type="text"
                value={ctaLink}
                onChange={(e) => setCtaLink(e.target.value)}
                placeholder="/contact"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 font-medium"
                required
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={savingSetting}
              className="inline-flex items-center space-x-2 bg-brand-navy hover:bg-brand-navy-700 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow transition"
            >
              {savingSetting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Save Card Settings</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* 2. INTAKE TRACKS LIST */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-slate-100 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-brand-navy">Intake Tracks List</h2>
              <p className="text-xs text-slate-500">
                These items appear directly inside the intake card on the live homepage hero.
              </p>
            </div>
          </div>

          <button
            onClick={openNewModal}
            className="inline-flex items-center space-x-1.5 bg-brand-red hover:bg-brand-red-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add Intake Track</span>
          </button>
        </div>

        {/* Tracks List */}
        <div className="mt-6 divide-y divide-slate-100">
          {initialTracks.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400">
              No intake tracks found. Click "Add Intake Track" to create one.
            </div>
          ) : (
            initialTracks.map((item) => (
              <div
                key={item.id}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/50 rounded-xl px-2 transition"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl flex-shrink-0">{item.flag}</span>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-slate-900">{item.country}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getBadgeClass(
                          item.statusColor
                        )}`}
                      >
                        {item.statusTag}
                      </span>
                      {!item.active && (
                        <span className="text-[10px] font-semibold bg-slate-100 text-slate-500 px-2 py-0.5 rounded">
                          Inactive
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">{item.intake}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 self-end sm:self-center">
                  <span className="text-[10px] text-slate-400 font-mono">Order: {item.displayOrder}</span>
                  <button
                    onClick={() => openEditModal(item)}
                    className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-brand-navy hover:bg-slate-100 transition"
                    title="Edit Track"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteTrack(item.id, item.country)}
                    className="p-1.5 rounded-lg border border-red-200 text-brand-red hover:bg-red-50 transition"
                    title="Delete Track"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* TRACK MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 p-6 sm:p-8 space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <h3 className="text-base font-bold text-brand-navy">
                {editingTrack ? "Edit Intake Track" : "Add New Intake Track"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {trackError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-2 text-xs text-brand-red font-medium">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{trackError}</span>
              </div>
            )}

            <form onSubmit={handleSaveTrack} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-1">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Flag Emoji
                  </label>
                  <input
                    type="text"
                    value={flag}
                    onChange={(e) => setFlag(e.target.value)}
                    placeholder="🇺🇸"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 font-medium"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Country / Title
                  </label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="USA Universities"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 font-medium"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Intake / Visa Detail
                </label>
                <input
                  type="text"
                  value={intake}
                  onChange={(e) => setIntake(e.target.value)}
                  placeholder="Fall & Spring Intakes • F-1 Visa"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 font-medium"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Status Tag
                  </label>
                  <input
                    type="text"
                    value={statusTag}
                    onChange={(e) => setStatusTag(e.target.value)}
                    placeholder="Fast Track"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tag Color Style
                  </label>
                  <select
                    value={statusColor}
                    onChange={(e) => setStatusColor(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 font-medium bg-white"
                  >
                    <option value="brand-red">Red (Urgent / Fast Track)</option>
                    <option value="emerald">Green (Active / Open)</option>
                    <option value="brand-navy">Navy (Institutional)</option>
                    <option value="gold">Gold (High Demand)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
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

                <div className="flex items-center space-x-2 pt-6">
                  <input
                    type="checkbox"
                    id="trackActive"
                    checked={active}
                    onChange={(e) => setActive(e.target.checked)}
                    className="rounded border-slate-300 text-brand-red focus:ring-brand-red w-4 h-4"
                  />
                  <label htmlFor="trackActive" className="text-xs font-semibold text-slate-700">
                    Visible on Live Site
                  </label>
                </div>
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
                  disabled={savingTrack}
                  className="inline-flex items-center space-x-1.5 bg-brand-red hover:bg-brand-red-600 text-white text-xs font-bold px-6 py-2 rounded-xl shadow transition"
                >
                  {savingTrack ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Save Track</span>
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
