"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Globe2,
  GraduationCap,
  Award,
  BookOpen,
  FileText,
  ShieldCheck,
  Phone,
  UploadCloud,
  CheckCircle2,
} from "lucide-react";

export default function PublicHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const handleMouseEnter = (menu: string) => setActiveDropdown(menu);
  const handleMouseLeave = () => setActiveDropdown(null);

  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow-xs border-b border-slate-100 transition-all font-sans">
      {/* 1. TOP ANNOUNCEMENT & UTILITY STRIP (ALFA BETA STYLE) */}
      <div className="bg-[#f8f9fa] text-slate-600 text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          {/* Left: Announcement Ticker */}
          <Link
            href="/study-abroad?country=USA"
            className="flex items-center space-x-1.5 text-slate-800 hover:text-brand-navy font-medium transition group"
          >
            <span className="font-semibold text-slate-900">
              Learn Today, Lead Globally: Start Your Journey in the USA & Beyond
            </span>
            <span className="inline-block w-4 h-4 rounded-full bg-slate-900 text-white text-[10px] flex items-center justify-center font-bold group-hover:bg-brand-red transition">
              ➔
            </span>
          </Link>

          {/* Right: Quick Utility Links */}
          <div className="hidden md:flex items-center space-x-4 text-[11px] text-slate-600 font-medium">
            <Link href="/team" className="hover:text-brand-navy transition">
              Careers at Global Guidelines
            </Link>
            <span className="text-slate-300">|</span>
            <Link
              href="/login"
              className="text-slate-700 hover:text-brand-navy transition font-semibold"
            >
              Login As Student
            </Link>
            <span className="text-slate-300">|</span>
            <Link
              href="/login"
              className="text-slate-700 hover:text-brand-navy transition font-semibold"
            >
              Login As Partner
            </Link>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVBAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-3 group flex-shrink-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 relative flex-shrink-0">
              <Image
                src="/logo-emblem.png"
                alt="Global Guidelines Logo"
                width={44}
                height={44}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="block font-black text-lg sm:text-xl text-[#0F2C59] tracking-tight leading-none group-hover:text-brand-red transition">
                  GLOBAL GUIDELINES
                </span>
              </div>
              <span className="block text-[10px] font-bold text-[#E53935] tracking-widest uppercase mt-0.5">
                CONSULTANCY & VISA SERVICES
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items with Dropdowns */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {/* Services Dropdown */}
            <div
              className="relative py-4"
              onMouseEnter={() => handleMouseEnter("services")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`flex items-center space-x-1 px-3 py-2 text-sm font-semibold transition rounded-lg ${
                  pathname.startsWith("/services")
                    ? "text-[#0F2C59] font-bold"
                    : "text-slate-800 hover:text-[#0F2C59]"
                }`}
              >
                <span>Services</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60 transition group-hover:rotate-180" />
              </button>

              {activeDropdown === "services" && (
                <div className="absolute top-full left-0 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 py-3 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="px-4 py-2 border-b border-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Our End-to-End Solutions
                  </div>
                  <Link
                    href="/services"
                    className="flex items-start space-x-3 px-4 py-2.5 hover:bg-slate-50 transition"
                  >
                    <GraduationCap className="w-4 h-4 text-brand-red mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-slate-900">Career Counseling & Profiling</div>
                      <div className="text-[11px] text-slate-500">Academic assessment & university mapping</div>
                    </div>
                  </Link>
                  <Link
                    href="/services"
                    className="flex items-start space-x-3 px-4 py-2.5 hover:bg-slate-50 transition"
                  >
                    <FileText className="w-4 h-4 text-brand-red mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-slate-900">Visa Filing & Financial Audit</div>
                      <div className="text-[11px] text-slate-500">Airtight documentation with 98.4% success</div>
                    </div>
                  </Link>
                  <Link
                    href="/services"
                    className="flex items-start space-x-3 px-4 py-2.5 hover:bg-slate-50 transition"
                  >
                    <BookOpen className="w-4 h-4 text-brand-red mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-slate-900">IELTS & PTE Mock Lab</div>
                      <div className="text-[11px] text-slate-500">Computerized scoring lab in Putalisadak</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Study Abroad Dropdown */}
            <div
              className="relative py-4"
              onMouseEnter={() => handleMouseEnter("study-abroad")}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/study-abroad"
                className={`flex items-center space-x-1 px-3 py-2 text-sm font-semibold transition rounded-lg ${
                  pathname.startsWith("/study-abroad")
                    ? "text-brand-red font-bold"
                    : "text-slate-800 hover:text-[#0F2C59]"
                }`}
              >
                <span>Study Abroad</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </Link>

              {activeDropdown === "study-abroad" && (
                <div className="absolute top-full -left-12 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 py-3 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="px-4 py-2 border-b border-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                    <span>Popular Destinations</span>
                    <Globe2 className="w-3.5 h-3.5 text-brand-red" />
                  </div>
                  <div className="grid grid-cols-1 divide-y divide-slate-50">
                    {[
                      { name: "United States (USA)", flag: "🇺🇸", code: "F-1 STEM & Scholarships", country: "USA" },
                      { name: "United Kingdom (UK)", flag: "🇬🇧", code: "1-Yr Masters & 2-Yr PSW", country: "UK" },
                      { name: "Australia", flag: "🇦🇺", code: "Subclass 500 & GS Guidance", country: "Australia" },
                      { name: "Canada", flag: "🇨🇦", code: "PAL Verified & SDS Colleges", country: "Canada" },
                      { name: "Europe / Schengen", flag: "🇪🇺", code: "Germany, France & Finland", country: "Europe" },
                    ].map((d) => (
                      <Link
                        key={d.country}
                        href={`/study-abroad?country=${d.country}`}
                        className="flex items-center justify-between px-4 py-2.5 hover:bg-red-50/60 transition group"
                      >
                        <div className="flex items-center space-x-2.5">
                          <span className="text-xl">{d.flag}</span>
                          <div>
                            <div className="text-xs font-bold text-slate-900 group-hover:text-brand-red transition">
                              {d.name}
                            </div>
                            <div className="text-[10px] text-slate-500">{d.code}</div>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-red group-hover:translate-x-1 transition" />
                      </Link>
                    ))}
                  </div>
                  <div className="p-3 bg-slate-50/80 mt-2 mx-3 rounded-xl border border-slate-100">
                    <Link
                      href="/study-abroad"
                      className="text-center block text-xs font-bold text-brand-navy hover:text-brand-red transition"
                    >
                      Open Full Study Abroad Hub & Calculators →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Insights Dropdown */}
            <div
              className="relative py-4"
              onMouseEnter={() => handleMouseEnter("insights")}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/insights"
                className={`flex items-center space-x-1 px-3 py-2 text-sm font-semibold transition rounded-lg ${
                  pathname.startsWith("/insights")
                    ? "text-[#0F2C59] font-bold"
                    : "text-slate-800 hover:text-[#0F2C59]"
                }`}
              >
                <span>Insights</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </Link>

              {activeDropdown === "insights" && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 py-3 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <Link
                    href="/insights"
                    className="block px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-brand-red transition"
                  >
                    Latest Visa Policy Updates
                  </Link>
                  <Link
                    href="/insights"
                    className="block px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-brand-red transition"
                  >
                    SOP & Financial Guidance
                  </Link>
                  <Link
                    href="/case-studies"
                    className="block px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-brand-red transition"
                  >
                    Student Visa Success Stories
                  </Link>
                </div>
              )}
            </div>

            {/* Scholarships Dropdown */}
            <div
              className="relative py-4"
              onMouseEnter={() => handleMouseEnter("scholarships")}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/study-abroad#scholarships"
                className="flex items-center space-x-1 px-3 py-2 text-sm font-semibold text-slate-800 hover:text-[#0F2C59] transition rounded-lg"
              >
                <span>Scholarships</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </Link>

              {activeDropdown === "scholarships" && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 py-3 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="p-3 text-xs text-slate-600">
                    <span className="font-bold text-slate-900 block mb-1">Tuition Grants & Waivers:</span>
                    Over $1.8M in merit-based scholarships secured for Nepalese applicants.
                  </div>
                  <Link
                    href="/study-abroad"
                    className="block px-4 py-2 text-xs font-bold text-brand-red hover:bg-red-50/60 transition"
                  >
                    Explore Scholarship Programs →
                  </Link>
                </div>
              )}
            </div>

            {/* About Us Dropdown */}
            <div
              className="relative py-4"
              onMouseEnter={() => handleMouseEnter("about")}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/team"
                className={`flex items-center space-x-1 px-3 py-2 text-sm font-semibold transition rounded-lg ${
                  pathname.startsWith("/team")
                    ? "text-[#0F2C59] font-bold"
                    : "text-slate-800 hover:text-[#0F2C59]"
                }`}
              >
                <span>About Us</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </Link>

              {activeDropdown === "about" && (
                <div className="absolute top-full -left-10 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 py-3 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <Link
                    href="/team"
                    className="block px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-brand-red transition"
                  >
                    Who We Are & Mission
                  </Link>
                  <Link
                    href="/team"
                    className="block px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-brand-red transition"
                  >
                    Certified Counselors Team
                  </Link>
                  <Link
                    href="/contact"
                    className="block px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-brand-red transition"
                  >
                    Kathmandu & Birgunj Branches
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Far Right Action Button (ALFA BETA "GET STARTED" STYLE) */}
          <div className="flex items-center space-x-3">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center justify-center border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white px-5 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase transition duration-200"
            >
              GET STARTED
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-800 hover:bg-slate-100 transition"
              aria-label="Toggle Menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. MOBILE MENU DRAWER */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <div className="space-y-1">
            <Link
              href="/study-abroad"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-sm font-bold text-slate-900 hover:bg-slate-50 hover:text-brand-red transition"
            >
              Study Abroad Destinations
            </Link>
            <Link
              href="/services"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-sm font-bold text-slate-900 hover:bg-slate-50 hover:text-brand-red transition"
            >
              Consultancy & Visa Services
            </Link>
            <Link
              href="/insights"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-sm font-bold text-slate-900 hover:bg-slate-50 hover:text-brand-red transition"
            >
              Insights & Visa Policies
            </Link>
            <Link
              href="/team"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-sm font-bold text-slate-900 hover:bg-slate-50 hover:text-brand-red transition"
            >
              About Our Team
            </Link>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="w-full flex items-center justify-center bg-slate-900 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider"
            >
              GET STARTED
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
