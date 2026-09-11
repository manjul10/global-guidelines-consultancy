"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone, Mail, Clock, Menu, X, ArrowRight } from "lucide-react";

const links = [
  { label: "Services & Visas", href: "/services" },
  { label: "Success Stories", href: "/case-studies" },
  { label: "Insights & News", href: "/insights" },
  { label: "Resources", href: "/resources" },
  { label: "Our Team", href: "/team" },
  { label: "Contact", href: "/contact" },
];


export default function PublicHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow-sm transition-all">
      {/* Top utility bar */}
      <div className="bg-brand-navy-900 text-slate-300 text-xs py-2 px-4 border-b border-brand-navy-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1.5">
              <Phone className="w-3.5 h-3.5 text-brand-red" />
              <span>+977 1 4525327 / 970-2709933</span>
            </div>

            <div className="hidden sm:flex items-center space-x-1.5">
              <Mail className="w-3.5 h-3.5 text-brand-red" />
              <span>info@globalguidelines.com</span>
            </div>
            <div className="hidden md:flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-brand-red" />
              <span>Sun - Fri: 9:00 AM - 5:00 PM</span>
            </div>
          </div>
          <div className="flex items-center space-x-3 text-[11px]">
            <a
              href="https://www.facebook.com/globalguidelinesnepal"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-white transition"
            >
              FB
            </a>
            <span className="text-slate-600">•</span>
            <a
              href="https://www.instagram.com/globalguidelines/"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-white transition"
            >
              IG
            </a>
            <span className="text-slate-600">•</span>
            <Link
              href="/login"
              className="text-slate-400 hover:text-white transition px-2 py-0.5 rounded bg-brand-navy-800/80 hover:bg-brand-navy-700 font-medium"
            >
              CMS Portal
            </Link>
          </div>
        </div>
      </div>


      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 relative flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Global Guidelines Logo"
                width={48}
                height={48}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div>
              <span className="block font-black text-lg text-brand-navy tracking-tight leading-none group-hover:text-brand-navy-700 transition">
                GLOBAL GUIDELINES
              </span>
              <span className="block text-[11px] font-bold text-brand-red tracking-wider uppercase mt-0.5">
                CONSULTANCY & VISA SERVICES
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1">
            {links.map((link) => {
              const isActive =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-md text-sm font-semibold transition ${
                    isActive
                      ? "text-brand-red bg-red-50/60"
                      : "text-slate-700 hover:text-brand-navy hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Primary CTA */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 bg-brand-red hover:bg-brand-red-600 text-white text-sm font-bold px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition transform active:scale-95"
            >
              <span>Free Counseling</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile menu toggle button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-md text-slate-700 hover:text-brand-navy hover:bg-slate-100"
              aria-label="Toggle Navigation"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 rounded-md text-base font-semibold text-slate-800 hover:bg-slate-50 hover:text-brand-red"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-100">
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="w-full flex items-center justify-center space-x-2 bg-brand-red text-white py-3 rounded-lg font-bold shadow"
            >
              <span>Book Free Counseling</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
