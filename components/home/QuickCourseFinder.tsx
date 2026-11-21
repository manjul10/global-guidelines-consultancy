"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Globe, GraduationCap, BookOpen, ArrowRight, Sparkles } from "lucide-react";

export default function QuickCourseFinder() {
  const router = useRouter();
  const [country, setCountry] = useState("all");
  const [level, setLevel] = useState("all");
  const [field, setField] = useState("all");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (country !== "all") params.set("country", country);
    if (level !== "all") params.set("level", level);
    if (field !== "all") params.set("field", field);

    router.push(`/study-abroad?${params.toString()}`);
  };

  const quickFilter = (c: string, f?: string) => {
    const params = new URLSearchParams();
    if (c) params.set("country", c);
    if (f) params.set("field", f);
    router.push(`/study-abroad?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200/90 p-6 sm:p-8 -mt-8 sm:-mt-12 relative z-30 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-brand-red text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Smart Course & University Matcher</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-brand-navy mt-1">
            Find Your Ideal University & Degree Pathway
          </h2>
        </div>

        <div className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>500+ Global Partner Universities</span>
        </div>
      </div>

      <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
        {/* Destination Country */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 flex items-center space-x-1.5">
            <Globe className="w-3.5 h-3.5 text-brand-red" />
            <span>Study Destination</span>
          </label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-brand-red/30 transition"
          >
            <option value="all">🌍 All Destinations</option>
            <option value="USA">🇺🇸 United States (USA)</option>
            <option value="UK">🇬🇧 United Kingdom (UK)</option>
            <option value="Australia">🇦🇺 Australia</option>
            <option value="Canada">🇨🇦 Canada</option>
            <option value="Europe">🇪🇺 Europe / Schengen</option>
          </select>
        </div>

        {/* Degree Level */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 flex items-center space-x-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-brand-red" />
            <span>Degree Level</span>
          </label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-brand-red/30 transition"
          >
            <option value="all">🎓 All Study Levels</option>
            <option value="Bachelor's">Bachelor's Degree (Undergrad)</option>
            <option value="Master's">Master's / Postgrad Degree</option>
            <option value="Diploma">Diploma / Advanced Diploma</option>
            <option value="Doctorate">PhD / Doctorate</option>
          </select>
        </div>

        {/* Field of Study */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 flex items-center space-x-1.5">
            <BookOpen className="w-3.5 h-3.5 text-brand-red" />
            <span>Field of Interest</span>
          </label>
          <select
            value={field}
            onChange={(e) => setField(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-brand-red/30 transition"
          >
            <option value="all">📚 All Fields of Study</option>
            <option value="IT & Computing">IT, Computer Science & AI</option>
            <option value="Business & Management">Business, Finance & MBA</option>
            <option value="Engineering">Engineering & Robotics</option>
            <option value="Health & Nursing">Health Sciences & Nursing</option>
            <option value="Hospitality">Hospitality & Tourism</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full bg-brand-red hover:bg-brand-red-600 text-white font-bold py-3 px-4 rounded-xl shadow-md shadow-brand-red/30 transition transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center space-x-2 text-xs sm:text-sm"
          >
            <Search className="w-4 h-4" />
            <span>Search Programs</span>
          </button>
        </div>
      </form>

      {/* Quick Search Chips */}
      <div className="flex flex-wrap items-center gap-2 pt-4 mt-4 border-t border-slate-100 text-xs">
        <span className="text-slate-400 font-medium">Quick Filters:</span>
        <button
          onClick={() => quickFilter("USA", "IT & Computing")}
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1 rounded-lg font-semibold transition"
        >
          🇺🇸 STEM Courses in USA
        </button>
        <button
          onClick={() => quickFilter("UK")}
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1 rounded-lg font-semibold transition"
        >
          🇬🇧 2-Yr Post-Study Work UK
        </button>
        <button
          onClick={() => quickFilter("Australia", "Health & Nursing")}
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1 rounded-lg font-semibold transition"
        >
          🇦🇺 Nursing & Health Australia
        </button>
        <button
          onClick={() => quickFilter("Canada")}
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1 rounded-lg font-semibold transition"
        >
          🇨🇦 Co-op Programs Canada
        </button>
      </div>
    </div>
  );
}
