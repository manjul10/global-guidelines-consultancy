import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, CheckCircle } from "lucide-react";

export default function PublicFooter() {
  return (
    <footer className="bg-brand-navy-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand & Overview */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 bg-white/5 p-3 rounded-xl border border-white/10 w-fit">
              <div className="w-10 h-10 relative">
                <Image
                  src="/logo.png"
                  alt="Global Guidelines Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-extrabold text-sm text-white tracking-wide block">
                  GLOBAL GUIDELINES
                </span>
                <span className="text-[10px] text-brand-red font-bold uppercase tracking-wider block">
                  CONSULTANCY & VISA SERVICES
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your premier partner for international education, certified test preparation,
              university admissions, and visa guidance. Empowering aspiring students to achieve
              world-class global qualifications.
            </p>
            <div className="space-y-1 text-xs text-emerald-400">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 flex-shrink-0" />
                <span className="font-semibold">MOEST Approval No. 1459</span>
              </div>
              <div className="text-[11px] text-slate-400 pl-6">
                Reg. No. 168812/73/074 (Government of Nepal)
              </div>
            </div>

          </div>

          {/* Column 2: Popular Study Destinations */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Study Destinations
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/services" className="hover:text-white transition flex items-center space-x-1.5">
                  <span className="text-brand-red">▸</span>
                  <span>Study in USA (F-1 Student Visa)</span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition flex items-center space-x-1.5">
                  <span className="text-brand-red">▸</span>
                  <span>Study in Australia (Subclass 500)</span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition flex items-center space-x-1.5">
                  <span className="text-brand-red">▸</span>
                  <span>Study in United Kingdom (Tier 4 / Student Route)</span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition flex items-center space-x-1.5">
                  <span className="text-brand-red">▸</span>
                  <span>Study in Canada (Study Permit & SDS)</span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition flex items-center space-x-1.5">
                  <span className="text-brand-red">▸</span>
                  <span>Study in Europe (Germany, France, Finland)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/services" className="hover:text-white transition">
                  Our Consultancy Services
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="hover:text-white transition">
                  Visa Grant Success Stories
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-white transition">
                  Latest Visa Policy & News
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-white transition">
                  Checklists & Guides
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-white transition">
                  Meet Our Counselors
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Book Free Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Head Office & Branches */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Our Offices & Contact
            </h3>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Kathmandu Head Office:</strong>
                  <span>Level-3, Brihaspati Sadan, Putalisadak (near Laxmi Plaza), Kathmandu, Nepal</span>
                </div>
              </div>
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Birgunj Branch:</strong>
                  <span>Global Guidelines Consultancy - Birgunj, Parsa, Nepal</span>
                </div>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-brand-red flex-shrink-0" />
                <span>+977 1 4525327 / 4423890 / 970-2709933</span>
              </div>

              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-brand-red flex-shrink-0" />
                <span>info@globalguidelines.com</span>
              </div>

              {/* Social Channels */}
              <div className="pt-2 flex items-center space-x-3">
                <a
                  href="https://www.facebook.com/globalguidelinesnepal"
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-blue-600 text-white font-bold text-[11px] transition"
                >
                  Facebook
                </a>
                <a
                  href="https://www.instagram.com/globalguidelines/"
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-gradient-to-r hover:from-pink-500 hover:to-amber-500 text-white font-bold text-[11px] transition"
                >
                  Instagram
                </a>
                <a
                  href="https://www.tiktok.com/@globalguidelinesnepal"
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-slate-700 text-white font-bold text-[11px] transition"
                >
                  TikTok
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Global Guidelines Consultancy and Visa Services Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <Link href="/privacy" className="hover:text-slate-400">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-400">Terms of Service</Link>
            <Link href="/login" className="text-brand-red hover:underline font-medium">Staff Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

