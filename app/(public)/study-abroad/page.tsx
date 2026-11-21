"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Filter,
  GraduationCap,
  Calculator,
  Compass,
  ArrowRight,
  CheckCircle2,
  Globe2,
  Calendar,
  DollarSign,
  Award,
  Layers,
  ChevronRight,
  ShieldCheck,
  UploadCloud,
  Clock,
  Sparkles,
  HelpCircle,
  FileCheck,
  Building2,
  ExternalLink,
} from "lucide-react";

// ==========================================
// 1. DATA MODELS & SEED DATA
// ==========================================

interface Program {
  id: string;
  university: string;
  location: string;
  country: string;
  flag: string;
  degreeLevel: "Bachelor's" | "Master's" | "Diploma" | "Doctorate";
  courseName: string;
  majorCategory: "IT & Computing" | "Business & Management" | "Engineering" | "Health & Nursing" | "Hospitality";
  annualTuitionUSD: number;
  currencyLabel: string;
  durationYears: string;
  minIELTS: number;
  minPTE: number;
  intakes: string[];
  scholarshipAvailable: boolean;
}

const SAMPLE_PROGRAMS: Program[] = [
  // 🇺🇸 USA
  {
    id: "p-1",
    university: "Arizona State University",
    location: "Phoenix, Arizona",
    country: "USA",
    flag: "🇺🇸",
    degreeLevel: "Master's",
    courseName: "M.S. in Computer Science & AI (STEM)",
    majorCategory: "IT & Computing",
    annualTuitionUSD: 24500,
    currencyLabel: "$24,500 / yr",
    durationYears: "2 Years",
    minIELTS: 6.5,
    minPTE: 58,
    intakes: ["Fall (Aug)", "Spring (Jan)"],
    scholarshipAvailable: true,
  },
  {
    id: "p-2",
    university: "University of South Florida",
    location: "Tampa, Florida",
    country: "USA",
    flag: "🇺🇸",
    degreeLevel: "Bachelor's",
    courseName: "B.S. in Cybersecurity & Information Systems",
    majorCategory: "IT & Computing",
    annualTuitionUSD: 17800,
    currencyLabel: "$17,800 / yr",
    durationYears: "4 Years",
    minIELTS: 6.0,
    minPTE: 53,
    intakes: ["Fall (Aug)", "Spring (Jan)"],
    scholarshipAvailable: true,
  },
  {
    id: "p-3",
    university: "University of North Texas",
    location: "Denton, Texas",
    country: "USA",
    flag: "🇺🇸",
    degreeLevel: "Master's",
    courseName: "Full-Time MBA (STEM Track)",
    majorCategory: "Business & Management",
    annualTuitionUSD: 19200,
    currencyLabel: "$19,200 / yr",
    durationYears: "2 Years",
    minIELTS: 6.5,
    minPTE: 60,
    intakes: ["Fall", "Spring"],
    scholarshipAvailable: true,
  },

  // 🇬🇧 UK
  {
    id: "p-4",
    university: "University of Greenwich",
    location: "London, England",
    country: "UK",
    flag: "🇬🇧",
    degreeLevel: "Master's",
    courseName: "M.Sc. in Data Science & Big Data",
    majorCategory: "IT & Computing",
    annualTuitionUSD: 18500,
    currencyLabel: "£16,000 / yr",
    durationYears: "1 Year Fast-Track",
    minIELTS: 6.5,
    minPTE: 58,
    intakes: ["Jan", "Sept"],
    scholarshipAvailable: true,
  },
  {
    id: "p-5",
    university: "University of Hertfordshire",
    location: "Hatfield (Greater London)",
    country: "UK",
    flag: "🇬🇧",
    degreeLevel: "Bachelor's",
    courseName: "B.Sc. (Hons) in Artificial Intelligence & Robotics",
    majorCategory: "Engineering",
    annualTuitionUSD: 17200,
    currencyLabel: "£14,750 / yr",
    durationYears: "3 Years",
    minIELTS: 6.0,
    minPTE: 54,
    intakes: ["Sept", "Jan"],
    scholarshipAvailable: true,
  },
  {
    id: "p-6",
    university: "Coventry University",
    location: "Coventry & London",
    country: "UK",
    flag: "🇬🇧",
    degreeLevel: "Master's",
    courseName: "M.Sc. Global Business Management",
    majorCategory: "Business & Management",
    annualTuitionUSD: 19500,
    currencyLabel: "£17,200 / yr",
    durationYears: "1 Year",
    minIELTS: 6.5,
    minPTE: 59,
    intakes: ["Jan", "May", "Sept"],
    scholarshipAvailable: true,
  },

  // 🇦🇺 Australia
  {
    id: "p-7",
    university: "Macquarie University",
    location: "Sydney, NSW",
    country: "Australia",
    flag: "🇦🇺",
    degreeLevel: "Master's",
    courseName: "Master of Information Technology (Cyber)",
    majorCategory: "IT & Computing",
    annualTuitionUSD: 25800,
    currencyLabel: "AUD 38,000 / yr",
    durationYears: "2 Years",
    minIELTS: 6.5,
    minPTE: 58,
    intakes: ["Feb", "July"],
    scholarshipAvailable: true,
  },
  {
    id: "p-8",
    university: "Deakin University",
    location: "Melbourne & Geelong, VIC",
    country: "Australia",
    flag: "🇦🇺",
    degreeLevel: "Bachelor's",
    courseName: "Bachelor of Nursing & Health Science",
    majorCategory: "Health & Nursing",
    annualTuitionUSD: 23500,
    currencyLabel: "AUD 35,500 / yr",
    durationYears: "3 Years",
    minIELTS: 7.0,
    minPTE: 65,
    intakes: ["March", "July"],
    scholarshipAvailable: false,
  },
  {
    id: "p-9",
    university: "Western Sydney University",
    location: "Sydney, NSW",
    country: "Australia",
    flag: "🇦🇺",
    degreeLevel: "Bachelor's",
    courseName: "Bachelor of Business (Professional Accounting)",
    majorCategory: "Business & Management",
    annualTuitionUSD: 21000,
    currencyLabel: "AUD 31,500 / yr",
    durationYears: "3 Years",
    minIELTS: 6.0,
    minPTE: 54,
    intakes: ["March", "July"],
    scholarshipAvailable: true,
  },

  // 🇨🇦 Canada
  {
    id: "p-10",
    university: "Humber College",
    location: "Toronto, Ontario",
    country: "Canada",
    flag: "🇨🇦",
    degreeLevel: "Diploma",
    courseName: "Post-Graduate Certificate in Cloud Computing & DevOps",
    majorCategory: "IT & Computing",
    annualTuitionUSD: 15200,
    currencyLabel: "CAD 18,500 / yr",
    durationYears: "2 Years",
    minIELTS: 6.5,
    minPTE: 60,
    intakes: ["Sept", "Jan", "May"],
    scholarshipAvailable: true,
  },
  {
    id: "p-11",
    university: "University of Windsor",
    location: "Windsor, Ontario",
    country: "Canada",
    flag: "🇨🇦",
    degreeLevel: "Master's",
    courseName: "Master of Applied Computing (MAC)",
    majorCategory: "IT & Computing",
    annualTuitionUSD: 22000,
    currencyLabel: "CAD 28,000 / yr",
    durationYears: "2 Years",
    minIELTS: 6.5,
    minPTE: 60,
    intakes: ["Sept", "Jan", "May"],
    scholarshipAvailable: false,
  },

  // 🇪🇺 Europe
  {
    id: "p-12",
    university: "IU International University of Applied Sciences",
    location: "Berlin / Bad Honnef, Germany",
    country: "Europe",
    flag: "🇩🇪",
    degreeLevel: "Bachelor's",
    courseName: "B.Sc. in Software Development (100% English)",
    majorCategory: "IT & Computing",
    annualTuitionUSD: 11000,
    currencyLabel: "€9,800 / yr",
    durationYears: "3 Years",
    minIELTS: 6.0,
    minPTE: 52,
    intakes: ["Rolling / Monthly"],
    scholarshipAvailable: true,
  },
  {
    id: "p-13",
    university: "Centria University of Applied Sciences",
    location: "Kokkola, Finland",
    country: "Europe",
    flag: "🇫🇮",
    degreeLevel: "Bachelor's",
    courseName: "Bachelor of Business Administration (ERP & CRM)",
    majorCategory: "Business & Management",
    annualTuitionUSD: 8500,
    currencyLabel: "€7,500 / yr",
    durationYears: "3.5 Years",
    minIELTS: 6.0,
    minPTE: 51,
    intakes: ["Autumn (Sept)"],
    scholarshipAvailable: true,
  },
];

const COUNTRIES = ["All Countries", "USA", "UK", "Australia", "Canada", "Europe"];
const DEGREE_LEVELS = ["All Levels", "Bachelor's", "Master's", "Diploma"];
const MAJORS = [
  "All Fields",
  "IT & Computing",
  "Business & Management",
  "Engineering",
  "Health & Nursing",
  "Hospitality",
];

export default function StudyAbroadPage() {
  const [activeTab, setActiveTab] = useState<"programs" | "calculators" | "comparison" | "roadmap">("programs");

  // Program filters
  const [selectedCountry, setSelectedCountry] = useState("All Countries");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [selectedMajor, setSelectedMajor] = useState("All Fields");
  const [searchQuery, setSearchQuery] = useState("");

  // Calculator State
  const [calcType, setCalcType] = useState<"ielts" | "financial" | "gpa">("ielts");

  // IELTS calculator state
  const [listening, setListening] = useState(6.5);
  const [reading, setReading] = useState(6.5);
  const [writing, setWriting] = useState(6.0);
  const [speaking, setSpeaking] = useState(6.5);

  // Financial calculator state
  const [finCountry, setFinCountry] = useState<"Australia" | "UK" | "USA" | "Canada">("Australia");
  const [tuitionPerYear, setTuitionPerYear] = useState(32000);

  // GPA state
  const [nepalGpa, setNepalGpa] = useState(3.4);

  // ----------------------------------------------------
  // COMPUTED VALUES
  // ----------------------------------------------------

  // Filtered Programs
  const filteredPrograms = useMemo(() => {
    return SAMPLE_PROGRAMS.filter((p) => {
      if (selectedCountry !== "All Countries" && p.country !== selectedCountry) return false;
      if (selectedLevel !== "All Levels" && p.degreeLevel !== selectedLevel) return false;
      if (selectedMajor !== "All Fields" && p.majorCategory !== selectedMajor) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.courseName.toLowerCase().includes(q);
        const matchesUni = p.university.toLowerCase().includes(q);
        const matchesLocation = p.location.toLowerCase().includes(q);
        if (!matchesName && !matchesUni && !matchesLocation) return false;
      }
      return true;
    });
  }, [selectedCountry, selectedLevel, selectedMajor, searchQuery]);

  // Official IELTS Rounding Rules: average rounded to nearest 0.5
  const overallIelts = useMemo(() => {
    const avg = (listening + reading + writing + speaking) / 4;
    const decimal = avg - Math.floor(avg);
    if (decimal < 0.25) return Math.floor(avg);
    if (decimal < 0.75) return Math.floor(avg) + 0.5;
    return Math.ceil(avg);
  }, [listening, reading, writing, speaking]);

  // Financial Estimation
  const livingCostEstimate = useMemo(() => {
    switch (finCountry) {
      case "Australia":
        // Subclass 500 requirement: AUD 29,710 / yr
        return { currency: "AUD", living: 29710, nprRate: 88, travel: 2500 };
      case "UK":
        // UKVI maintenance requirement: ~£12,006 / yr
        return { currency: "GBP", living: 12006, nprRate: 172, travel: 1200 };
      case "USA":
        // US I-20 living estimate: ~$18,000 / yr
        return { currency: "USD", living: 18000, nprRate: 135, travel: 1800 };
      case "Canada":
        // IRCC living requirement: ~CAD 20,635 / yr
        return { currency: "CAD", living: 20635, nprRate: 98, travel: 2000 };
    }
  }, [finCountry]);

  const totalProofOfFunds = tuitionPerYear + livingCostEstimate.living + livingCostEstimate.travel;
  const totalNPR = Math.round(totalProofOfFunds * livingCostEstimate.nprRate);

  return (
    <div className="bg-white min-h-screen text-slate-900 pb-24">
      {/* ============================================================== */}
      {/* 1. BREADCRUMBS (ALFA BETA STYLE)                               */}
      {/* ============================================================== */}
      <div className="bg-white border-b border-slate-100 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center space-x-2 text-xs text-slate-500 font-medium">
          <Link href="/" className="hover:text-brand-navy transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">Study Abroad</span>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. HERO BANNER (MATCHING SCREENSHOT AESTHETIC)                 */}
      {/* ============================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-r from-slate-50/80 via-white to-blue-50/40 border-b border-slate-200/60 py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
        {/* Subtle decorative curved background lines */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <svg className="w-full h-full" viewBox="0 0 1200 400" fill="none" preserveAspectRatio="none">
            <path
              d="M0,200 C300,120 600,280 900,160 C1050,100 1150,180 1200,220 L1200,400 L0,400 Z"
              fill="url(#waveGrad)"
            />
            <defs>
              <linearGradient id="waveGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#f1f5f9" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#e0e7ff" stopOpacity="0.4" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Column: Bold Typography & Tagline */}
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center space-x-2 bg-blue-50 text-brand-navy px-3.5 py-1 rounded-full text-xs font-bold border border-blue-100">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-red" />
              <span>MOEST Approval No: 1459 Verified</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-slate-950 tracking-tight leading-none">
              Study Abroad
            </h1>

            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
              Connect directly with 500+ world-class universities across the United States, United Kingdom, Australia, Canada, and Europe. Experience verified documentation, generous scholarships, and airtight visa lodgement.
            </p>

            {/* Quick CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setActiveTab("programs")}
                className="bg-brand-navy hover:bg-brand-navy-900 text-white font-bold px-6 py-3 rounded-xl text-xs sm:text-sm shadow-md transition transform hover:-translate-y-0.5 flex items-center space-x-2"
              >
                <span>Find Universities</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                href="/contact"
                className="bg-brand-red hover:bg-brand-red-600 text-white font-bold px-5 py-3 rounded-xl text-xs sm:text-sm shadow-md transition flex items-center space-x-2"
              >
                <span>Book Free Counseling</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Signature Composite Graphic (Graduate Student + Monuments + Circle) */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[580px] aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-white">
              <Image
                src="/study-abroad-hero.jpg"
                alt="Study Abroad with Global Guidelines - Graduate Student and World Landmarks"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. INTRODUCTORY SECTION (EXACT ALFA BETA STRUCTURE)            */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="space-y-3 max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1d4ed8]">
            Study Abroad - Start your journey with Global Guidelines
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Embark on a transformative journey with Global Guidelines' Study Abroad services. As an officially verified (MOEST Approval No. 1459, Reg No: 168812/73/074) premier overseas education consultancy in Nepal, we guide you to global education excellence. Explore diverse opportunities with Global Guidelines study abroad and open doors to a world-class education. Join us for personalized 1-on-1 counseling, university selection, IELTS & PTE preparation, and end-to-end visa filing.
          </p>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. NAVIGATION TABS (University Finder, Tools, Comparison, Roadmap) */}
      {/* ============================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 relative z-30">
        <div className="bg-white rounded-2xl p-2 shadow-md border border-slate-200/90 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab("programs")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${
                activeTab === "programs"
                  ? "bg-brand-navy text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Building2 className="w-4 h-4 text-brand-red" />
              <span>University & Course Finder</span>
            </button>

            <button
              onClick={() => setActiveTab("calculators")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${
                activeTab === "calculators"
                  ? "bg-brand-navy text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Calculator className="w-4 h-4 text-amber-500" />
              <span>IELTS & Financial Calculators</span>
            </button>

            <button
              onClick={() => setActiveTab("comparison")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${
                activeTab === "comparison"
                  ? "bg-brand-navy text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Layers className="w-4 h-4 text-emerald-500" />
              <span>Country Comparison Guide</span>
            </button>

            <button
              onClick={() => setActiveTab("roadmap")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${
                activeTab === "roadmap"
                  ? "bg-brand-navy text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Compass className="w-4 h-4 text-blue-500" />
              <span>6-Step Visa Roadmap</span>
            </button>
          </div>

          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center space-x-2 bg-brand-navy hover:bg-brand-navy-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition"
          >
            <span>Book 1-on-1 Session</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. TAB CONTENT                                                 */}
      {/* ============================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {/* ========================================================== */}
        {/* TAB 1: UNIVERSITY & COURSE FINDER (Alfa Beta Style)         */}
        {/* ========================================================== */}
        {activeTab === "programs" && (
          <div className="space-y-8">
            {/* Search & Filter Bar */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-5">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    placeholder="Search university name, degree, or major (e.g. Data Science, MBA, Greenwich)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                  {/* Country Selector */}
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold bg-white text-slate-700"
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>

                  {/* Degree Level */}
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold bg-white text-slate-700"
                  >
                    {DEGREE_LEVELS.map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>

                  {/* Major Field */}
                  <select
                    value={selectedMajor}
                    onChange={(e) => setSelectedMajor(e.target.value)}
                    className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold bg-white text-slate-700"
                  >
                    {MAJORS.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Active Filter Tags */}
              <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                <div>
                  Showing <span className="font-bold text-brand-navy">{filteredPrograms.length}</span> verified programs
                </div>
                {(selectedCountry !== "All Countries" || selectedLevel !== "All Levels" || selectedMajor !== "All Fields" || searchQuery) && (
                  <button
                    onClick={() => {
                      setSelectedCountry("All Countries");
                      setSelectedLevel("All Levels");
                      setSelectedMajor("All Fields");
                      setSearchQuery("");
                    }}
                    className="text-brand-red font-bold hover:underline"
                  >
                    Reset All Filters
                  </button>
                )}
              </div>
            </div>

            {/* Program Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPrograms.map((program) => (
                <div
                  key={program.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-brand-navy/30 transition flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-4">
                    {/* Top flag + badges */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{program.flag}</span>
                        <span className="text-xs font-bold text-slate-500">{program.country}</span>
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-brand-navy border border-slate-200">
                        {program.degreeLevel}
                      </span>
                    </div>

                    {/* Course Title & University */}
                    <div>
                      <h3 className="text-base font-black text-brand-navy leading-snug">
                        {program.courseName}
                      </h3>
                      <div className="text-xs font-bold text-slate-700 mt-1 flex items-center space-x-1.5">
                        <Building2 className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
                        <span>{program.university}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{program.location}</div>
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <span className="text-[10px] text-slate-400 block uppercase font-sans">Annual Tuition</span>
                        <span className="font-bold text-brand-navy">{program.currencyLabel}</span>
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <span className="text-[10px] text-slate-400 block uppercase font-sans">Min Score</span>
                        <span className="font-bold text-brand-red">IELTS {program.minIELTS} / PTE {program.minPTE}</span>
                      </div>
                    </div>

                    {/* Intakes & Scholarships */}
                    <div className="space-y-1.5 text-xs text-slate-600">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>Intakes: {program.intakes.join(" • ")}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>Duration: {program.durationYears}</span>
                      </div>
                      {program.scholarshipAvailable && (
                        <div className="inline-flex items-center space-x-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                          <Award className="w-3 h-3 text-amber-600" />
                          <span>Merit Scholarship Applicable</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Link */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <Link
                      href="/contact"
                      className="w-full inline-flex items-center justify-center space-x-1.5 bg-brand-navy hover:bg-brand-navy-900 text-white font-bold py-2.5 px-3 rounded-xl text-xs shadow-xs transition"
                    >
                      <span>Inquire / Apply for Admission</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition"
                      title="Book Counseling"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* TAB 2: CALCULATORS & TOOLS (IELTS & Proof of Funds)        */}
        {/* ========================================================== */}
        {activeTab === "calculators" && (
          <div className="space-y-8 max-w-4xl mx-auto">
            {/* Tool Selector */}
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setCalcType("ielts")}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${
                  calcType === "ielts"
                    ? "bg-brand-red text-white shadow-md"
                    : "bg-white text-slate-700 border border-slate-200"
                }`}
              >
                <Award className="w-4 h-4" />
                <span>IELTS Overall Band Calculator</span>
              </button>

              <button
                onClick={() => setCalcType("financial")}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${
                  calcType === "financial"
                    ? "bg-brand-red text-white shadow-md"
                    : "bg-white text-slate-700 border border-slate-200"
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span>Proof of Funds & Cost Estimator</span>
              </button>

              <button
                onClick={() => setCalcType("gpa")}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${
                  calcType === "gpa"
                    ? "bg-brand-red text-white shadow-md"
                    : "bg-white text-slate-700 border border-slate-200"
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Nepal GPA Conversion</span>
              </button>
            </div>

            {/* A. IELTS CALCULATOR */}
            {calcType === "ielts" && (
              <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200 space-y-6">
                <div className="text-center space-y-2 max-w-xl mx-auto">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-red bg-red-50 px-3 py-1 rounded-full">
                    Official Rounding Standard
                  </span>
                  <h2 className="text-2xl font-black text-brand-navy">
                    IELTS Overall Band Calculator
                  </h2>
                  <p className="text-xs text-slate-500">
                    Input your four section test scores to calculate your official rounded overall band and assess eligible international university admissions.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                  {/* Listening */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                      <span>Listening Score</span>
                      <span className="text-brand-navy text-sm font-black">{listening.toFixed(1)}</span>
                    </div>
                    <input
                      type="range"
                      min="4.0"
                      max="9.0"
                      step="0.5"
                      value={listening}
                      onChange={(e) => setListening(parseFloat(e.target.value))}
                      className="w-full accent-brand-navy"
                    />
                  </div>

                  {/* Reading */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                      <span>Reading Score</span>
                      <span className="text-brand-navy text-sm font-black">{reading.toFixed(1)}</span>
                    </div>
                    <input
                      type="range"
                      min="4.0"
                      max="9.0"
                      step="0.5"
                      value={reading}
                      onChange={(e) => setReading(parseFloat(e.target.value))}
                      className="w-full accent-brand-navy"
                    />
                  </div>

                  {/* Writing */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                      <span>Writing Score</span>
                      <span className="text-brand-navy text-sm font-black">{writing.toFixed(1)}</span>
                    </div>
                    <input
                      type="range"
                      min="4.0"
                      max="9.0"
                      step="0.5"
                      value={writing}
                      onChange={(e) => setWriting(parseFloat(e.target.value))}
                      className="w-full accent-brand-navy"
                    />
                  </div>

                  {/* Speaking */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                      <span>Speaking Score</span>
                      <span className="text-brand-navy text-sm font-black">{speaking.toFixed(1)}</span>
                    </div>
                    <input
                      type="range"
                      min="4.0"
                      max="9.0"
                      step="0.5"
                      value={speaking}
                      onChange={(e) => setSpeaking(parseFloat(e.target.value))}
                      className="w-full accent-brand-navy"
                    />
                  </div>
                </div>

                {/* Score Output Banner */}
                <div className="bg-brand-navy text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
                  <div className="space-y-1 text-center sm:text-left">
                    <span className="text-xs uppercase font-bold tracking-wider text-amber-300">
                      Computed Overall IELTS Result:
                    </span>
                    <div className="text-4xl sm:text-5xl font-black text-white">
                      Band {overallIelts.toFixed(1)}
                    </div>
                    <div className="text-xs text-slate-300">
                      Raw Average: {((listening + reading + writing + speaking) / 4).toFixed(2)}
                    </div>
                  </div>

                  <div className="bg-white/10 p-4 rounded-xl border border-white/15 max-w-sm text-xs space-y-2">
                    <span className="font-bold text-amber-300 block">Admissions Assessment:</span>
                    {overallIelts >= 6.5 ? (
                      <p className="text-emerald-300 font-medium">
                        ✓ Excellent! Direct admission eligible for Master's & Bachelor's in UK, USA, Australia, and Canada with no pre-sessional English requirement.
                      </p>
                    ) : overallIelts >= 6.0 ? (
                      <p className="text-amber-200 font-medium">
                        ✓ Good! Direct admission eligible for most Bachelor's degrees and specific UK/Australia Master's programs.
                      </p>
                    ) : (
                      <p className="text-red-200 font-medium">
                        ⚠ Pre-sessional English or Foundation pathway required for direct degree entry. Join Global Guidelines PTE/IELTS Mock Lab to raise score to 6.5+.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* B. FINANCIAL CALCULATOR */}
            {calcType === "financial" && (
              <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200 space-y-6">
                <div className="text-center space-y-2 max-w-xl mx-auto">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    Embassy Proof of Funds Estimator
                  </span>
                  <h2 className="text-2xl font-black text-brand-navy">
                    Visa Bank Balance & Cost Calculator
                  </h2>
                  <p className="text-xs text-slate-500">
                    Calculates required 1st year tuition + mandatory government living maintenance + return airfare under official embassy visa guidelines.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Target Destination Country
                    </label>
                    <select
                      value={finCountry}
                      onChange={(e) => setFinCountry(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-bold bg-white"
                    >
                      <option value="Australia">Australia (Subclass 500 - AUD)</option>
                      <option value="UK">United Kingdom (Student Route - GBP)</option>
                      <option value="USA">United States (F-1 Visa I-20 - USD)</option>
                      <option value="Canada">Canada (Study Permit PAL - CAD)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Estimated 1st Year Tuition ({livingCostEstimate.currency})
                    </label>
                    <input
                      type="number"
                      step="1000"
                      value={tuitionPerYear}
                      onChange={(e) => setTuitionPerYear(parseInt(e.target.value) || 0)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-bold"
                    />
                  </div>
                </div>

                {/* Calculation Output Table */}
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
                  <div className="divide-y divide-slate-200 text-xs">
                    <div className="py-2.5 flex justify-between">
                      <span className="text-slate-600">1st Year University Tuition:</span>
                      <span className="font-bold text-brand-navy">
                        {livingCostEstimate.currency} {tuitionPerYear.toLocaleString()}
                      </span>
                    </div>
                    <div className="py-2.5 flex justify-between">
                      <span className="text-slate-600">Mandatory 1-Year Government Living Cost:</span>
                      <span className="font-bold text-brand-navy">
                        {livingCostEstimate.currency} {livingCostEstimate.living.toLocaleString()}
                      </span>
                    </div>
                    <div className="py-2.5 flex justify-between">
                      <span className="text-slate-600">Airfare & Contingency Allowance:</span>
                      <span className="font-bold text-brand-navy">
                        {livingCostEstimate.currency} {livingCostEstimate.travel.toLocaleString()}
                      </span>
                    </div>
                    <div className="py-3 flex justify-between text-sm font-bold bg-white p-3 rounded-xl mt-2 border border-slate-200">
                      <span className="text-brand-navy">Total Required Proof of Funds:</span>
                      <span className="text-brand-red font-black">
                        {livingCostEstimate.currency} {totalProofOfFunds.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-emerald-800 block">Approximate Nepalese Rupees (NPR) Equivalent:</span>
                      <span className="text-[11px] text-emerald-600">Based on standard indicative foreign exchange rate</span>
                    </div>
                    <div className="text-xl font-black text-emerald-700">
                      NPR ~{(totalNPR / 100000).toFixed(2)} Lakhs
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* C. GPA CONVERTER */}
            {calcType === "gpa" && (
              <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200 space-y-6">
                <div className="text-center space-y-2 max-w-xl mx-auto">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                    Grading Equivalence
                  </span>
                  <h2 className="text-2xl font-black text-brand-navy">
                    Nepal NEB / TU GPA to US & UK Equivalence
                  </h2>
                  <p className="text-xs text-slate-500">
                    Convert your 4.0 scale NEB (+2) or Tribhuvan University grading into international admissions brackets.
                  </p>
                </div>

                <div className="max-w-md mx-auto space-y-4 pt-4">
                  <div className="space-y-2">
                    <label className="flex justify-between text-xs font-bold text-slate-700">
                      <span>Enter Your Nepal GPA (0.0 - 4.0):</span>
                      <span className="text-brand-navy font-bold text-sm">{nepalGpa.toFixed(2)}</span>
                    </label>
                    <input
                      type="range"
                      min="2.0"
                      max="4.0"
                      step="0.05"
                      value={nepalGpa}
                      onChange={(e) => setNepalGpa(parseFloat(e.target.value))}
                      className="w-full accent-brand-navy"
                    />
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3 text-xs">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                      <span className="text-slate-500 font-medium">NEB Grade Category:</span>
                      <span className="font-bold text-brand-navy">
                        {nepalGpa >= 3.6 ? "A+ (Outstanding / 90%+)" : nepalGpa >= 3.2 ? "A (Excellent / 80%+)" : nepalGpa >= 2.8 ? "B+ (Very Good / 70%+)" : "B (Good / 60%+)"}
                      </span>
                    </div>

                    <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                      <span className="text-slate-500 font-medium">US Admissions Equivalent:</span>
                      <span className="font-bold text-brand-red">
                        {nepalGpa >= 3.5 ? "3.6 - 4.0 (Tier-1 Eligible)" : nepalGpa >= 3.0 ? "3.0 - 3.4 (Direct Entry)" : "2.5 - 2.9 (Pathway Entry)"}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 font-medium">UK Degree Classification:</span>
                      <span className="font-bold text-emerald-700">
                        {nepalGpa >= 3.4 ? "First Class Honours (1st)" : nepalGpa >= 2.9 ? "Upper Second (2:1)" : "Lower Second (2:2)"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================== */}
        {/* TAB 3: SIDE-BY-SIDE COUNTRY COMPARISON                     */}
        {/* ========================================================== */}
        {activeTab === "comparison" && (
          <div className="space-y-8">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-navy bg-slate-100 px-3 py-1 rounded-full">
                Decision Matrix
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-brand-navy">
                Side-by-Side Study Destination Comparison
              </h2>
              <p className="text-xs text-slate-500">
                Compare post-study work rights, part-time working hours, spouse visa rules, and average tuition across the top 5 student destinations.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#0F2C59] text-white divide-x divide-white/10">
                    <th className="p-4 font-bold">Country & Destination</th>
                    <th className="p-4 font-bold">Post-Study Work (PSW)</th>
                    <th className="p-4 font-bold">Part-Time Work Rights</th>
                    <th className="p-4 font-bold">Average Annual Tuition</th>
                    <th className="p-4 font-bold">Spouse / Dependent Visa</th>
                    <th className="p-4 font-bold">Embassy Visa Interview</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-sans">
                  <tr className="hover:bg-slate-50/60 divide-x divide-slate-100 transition">
                    <td className="p-4 font-bold text-brand-navy flex items-center space-x-2">
                      <span className="text-xl">🇺🇸</span>
                      <span>United States (USA)</span>
                    </td>
                    <td className="p-4 font-semibold text-emerald-700">
                      1 Year OPT (Up to 3 Years for STEM majors)
                    </td>
                    <td className="p-4">20 hrs/week on-campus during terms; 40 hrs in breaks</td>
                    <td className="p-4 font-bold text-slate-900">$18,000 – $32,000 / yr</td>
                    <td className="p-4">F-2 Visa (Cannot work legally in USA)</td>
                    <td className="p-4 font-bold text-amber-600">Mandatory 1-on-1 In-person Interview</td>
                  </tr>

                  <tr className="hover:bg-slate-50/60 divide-x divide-slate-100 transition">
                    <td className="p-4 font-bold text-brand-navy flex items-center space-x-2">
                      <span className="text-xl">🇬🇧</span>
                      <span>United Kingdom (UK)</span>
                    </td>
                    <td className="p-4 font-semibold text-emerald-700">
                      2 Years Graduate Route (3 Years for PhD)
                    </td>
                    <td className="p-4">20 hrs/week off-campus during term time</td>
                    <td className="p-4 font-bold text-slate-900">£13,000 – £20,000 / yr</td>
                    <td className="p-4">Allowed for Research & PhD students only</td>
                    <td className="p-4 font-bold text-emerald-600">Credibility interview (Random / Rare)</td>
                  </tr>

                  <tr className="hover:bg-slate-50/60 divide-x divide-slate-100 transition">
                    <td className="p-4 font-bold text-brand-navy flex items-center space-x-2">
                      <span className="text-xl">🇦🇺</span>
                      <span>Australia</span>
                    </td>
                    <td className="p-4 font-semibold text-emerald-700">
                      2 – 4 Years Post-Study Work (Subclass 485)
                    </td>
                    <td className="p-4 font-bold text-brand-navy">48 hrs/fortnight (Uncapped during holidays)</td>
                    <td className="p-4 font-bold text-slate-900">AUD 28,000 – 42,000 / yr</td>
                    <td className="p-4 font-bold text-emerald-600">Full work rights for Master's dependents</td>
                    <td className="p-4 font-bold text-blue-600">Genuine Student (GS) assessment</td>
                  </tr>

                  <tr className="hover:bg-slate-50/60 divide-x divide-slate-100 transition">
                    <td className="p-4 font-bold text-brand-navy flex items-center space-x-2">
                      <span className="text-xl">🇨🇦</span>
                      <span>Canada</span>
                    </td>
                    <td className="p-4 font-semibold text-emerald-700">
                      Up to 3-Year Open Post-Graduation Work Permit (PGWP)
                    </td>
                    <td className="p-4">24 hrs/week off-campus during terms</td>
                    <td className="p-4 font-bold text-slate-900">CAD 18,000 – 30,000 / yr</td>
                    <td className="p-4">Spouse Open Work Permit (Master's / Degree)</td>
                    <td className="p-4 font-bold text-slate-600">Paperless biometric submission</td>
                  </tr>

                  <tr className="hover:bg-slate-50/60 divide-x divide-slate-100 transition">
                    <td className="p-4 font-bold text-brand-navy flex items-center space-x-2">
                      <span className="text-xl">🇪🇺</span>
                      <span>Europe / Germany</span>
                    </td>
                    <td className="p-4 font-semibold text-emerald-700">
                      18 Months Job Search Visa across Schengen zone
                    </td>
                    <td className="p-4">120 full days / 240 half days per year</td>
                    <td className="p-4 font-bold text-emerald-700">€0 Tuition in German Public Universities</td>
                    <td className="p-4">Family reunification permitted</td>
                    <td className="p-4 font-bold text-amber-600">VFS / Embassy verification appointment</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* TAB 4: 6-STEP ADMISSION & VISA ROADMAP (Alfa Beta Style)    */}
        {/* ========================================================== */}
        {activeTab === "roadmap" && (
          <div className="space-y-8 max-w-5xl mx-auto">
            <div className="text-center space-y-2 max-w-xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-red bg-red-50 px-3 py-1 rounded-full">
                Step-by-Step Pathway
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-brand-navy">
                Your 6-Stage Journey from Nepal to Abroad
              </h2>
              <p className="text-xs text-slate-500">
                A structured, auditable roadmap ensuring zero document mistakes and maximum embassy visa clearance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              {/* Step 1 */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3 relative overflow-hidden">
                <span className="text-4xl font-black text-slate-100 absolute top-4 right-4 pointer-events-none">
                  01
                </span>
                <div className="w-10 h-10 rounded-xl bg-brand-navy/10 text-brand-navy flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <h3 className="text-base font-black text-brand-navy">Profile Evaluation & Counseling</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  1-on-1 counseling to evaluate your academic GPA, study gaps, budget, and long-term residency career goals.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3 relative overflow-hidden">
                <span className="text-4xl font-black text-slate-100 absolute top-4 right-4 pointer-events-none">
                  02
                </span>
                <div className="w-10 h-10 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <h3 className="text-base font-black text-brand-navy">Test Prep (IELTS / PTE / SAT)</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Rigorous mock lab testing, certified teacher coaching, and tips to guarantee overall band 6.5+ or 7.0+.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3 relative overflow-hidden">
                <span className="text-4xl font-black text-slate-100 absolute top-4 right-4 pointer-events-none">
                  03
                </span>
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <h3 className="text-base font-black text-brand-navy">University Shortlisting & Offer Letter</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Application submission to accredited partner universities. Securing official Offer Letters, CAS (UK), or I-20 (USA).
                </p>
              </div>

              {/* Step 4 */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3 relative overflow-hidden">
                <span className="text-4xl font-black text-slate-100 absolute top-4 right-4 pointer-events-none">
                  04
                </span>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-sm">
                  4
                </div>
                <h3 className="text-base font-black text-brand-navy">Financial & Bank Verification</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Assistance with bank balance certificates, education loan approval, tax clearances, and property valuations matching embassy rules.
                </p>
              </div>

              {/* Step 5 */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3 relative overflow-hidden">
                <span className="text-4xl font-black text-slate-100 absolute top-4 right-4 pointer-events-none">
                  05
                </span>
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold text-sm">
                  5
                </div>
                <h3 className="text-base font-black text-brand-navy">Visa Lodgment & 1-on-1 Mock Drills</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Airtight visa file compilation followed by intensive mock visa interview coaching for US, Australian, and German visa officers.
                </p>
              </div>

              {/* Step 6 */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3 relative overflow-hidden">
                <span className="text-4xl font-black text-slate-100 absolute top-4 right-4 pointer-events-none">
                  06
                </span>
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold text-sm">
                  6
                </div>
                <h3 className="text-base font-black text-brand-navy">Pre-Departure & Airport Briefing</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Foreign currency exchange (NPR to USD/AUD), student SIM card setup, airport transit guidance, and housing accommodations.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* 4. BOTTOM ACTION CTA                                           */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-gradient-to-r from-brand-navy-950 via-[#0F2C59] to-brand-navy-900 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl border border-white/10">
          <div className="space-y-3 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Ready to Begin Your Application?
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Get Your Free Profile Assessment & University Match
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Meet our expert counselors in Putalisadak, Kathmandu for personalized university selection, scholarship guidance, and step-by-step visa processing.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center space-x-2 bg-brand-red hover:bg-brand-red-600 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-brand-red/30 transition text-xs whitespace-nowrap"
            >
              <span>Book Free Counseling</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
