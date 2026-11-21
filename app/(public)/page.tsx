import Link from "next/link";
import dynamic from "next/dynamic";
import { getFeaturedTestimonials } from "@/lib/modules/testimonials/service";
import { getPublishedCaseStudies } from "@/lib/modules/case-studies/service";
import QuickCourseFinder from "@/components/home/QuickCourseFinder";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Star,
  UploadCloud,
  Award,
  Laptop,
  Clock,
  Globe2,
} from "lucide-react";

const HeroTakeoffExperience = dynamic(
  () => import("@/components/3d/HeroTakeoffExperience"),
  { ssr: false }
);

export default async function HomePage() {
  const [testimonials, caseStudies] = await Promise.all([
    getFeaturedTestimonials(),
    getPublishedCaseStudies(),
  ]);

  const fallbackTestimonials = [
    {
      id: "t-1",
      clientName: "Aayush Sharma",
      clientRole: "M.S. in Computer Science",
      companyName: "Arizona State University, USA",
      quote: "The mock visa drills at Global Guidelines made all the difference. My F-1 visa was approved on the first attempt with a $12,000 annual scholarship!",
      rating: 5,
    },
    {
      id: "t-2",
      clientName: "Pooja Shrestha",
      clientRole: "Master of Nursing",
      companyName: "Deakin University, Australia",
      quote: "Handled my Genuine Student (GS) statement flawlessly. Transparent documentation and zero hidden consultancy fees.",
      rating: 5,
    },
    {
      id: "t-3",
      clientName: "Rohan Karki",
      clientRole: "B.Sc. in Data Analytics",
      companyName: "University of Hertfordshire, UK",
      quote: "Received my CAS letter within 10 days of application submission. Highly recommend their IELTS prep computer lab as well.",
      rating: 5,
    },
  ];

  const displayTestimonials = testimonials && testimonials.length > 0 ? testimonials : fallbackTestimonials;

  return (
    <div className="space-y-16 pb-20 font-sans">
      {/* 1. CINEMATIC 3D AIRPLANE TAKEOFF & REALISTIC ORBITING EARTH */}
      <HeroTakeoffExperience />

      {/* 2. ALFA BETA-STYLE INTERACTIVE COURSE & UNIVERSITY MATCHER */}
      <section className="px-4 sm:px-6 lg:px-8">
        <QuickCourseFinder />
      </section>

      {/* 3. CORE ACCREDITATION & TRUST CREDENTIALS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/90 p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
          <div className="text-center pt-3 lg:pt-0">
            <div className="inline-flex items-center space-x-1 bg-emerald-50 text-emerald-700 border border-emerald-200/70 px-2 py-0.5 rounded-full text-[11px] font-bold mb-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>MOEST #1459</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#0F2C59]">Govt Approved</div>
            <div className="text-xs text-slate-500 font-medium mt-0.5">Ministry of Education Verified</div>
          </div>

          <div className="text-center pt-3 lg:pt-0">
            <div className="text-[11px] font-bold text-brand-red tracking-wider uppercase mb-1.5">VERIFIED RECORD</div>
            <div className="text-2xl sm:text-3xl font-black text-[#0F2C59]">98.4%</div>
            <div className="text-xs text-slate-500 font-medium mt-0.5">Visa Clearance Rate</div>
          </div>

          <div className="text-center pt-3 lg:pt-0">
            <div className="text-[11px] font-bold text-[#0F2C59] tracking-wider uppercase mb-1.5">GLOBAL ALUMNI</div>
            <div className="text-2xl sm:text-3xl font-black text-[#0F2C59]">3,500+</div>
            <div className="text-xs text-slate-500 font-medium mt-0.5">Students Enrolled Overseas</div>
          </div>

          <div className="text-center pt-3 lg:pt-0">
            <div className="text-[11px] font-bold text-slate-600 tracking-wider uppercase mb-1.5">DIRECT PIPELINE</div>
            <div className="text-2xl sm:text-3xl font-black text-[#0F2C59]">500+</div>
            <div className="text-xs text-slate-500 font-medium mt-0.5">Partner Institutions</div>
          </div>
        </div>
      </section>

      {/* 4. POPULAR STUDY ABROAD DESTINATIONS (MINIMAL, HIGH-VALUE GRID) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F2C59] tracking-tight">
              Popular Study Abroad Destinations
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
              Official admissions processing, visa documentation, and post-study work pathways for top global destinations.
            </p>
          </div>
          <Link
            href="/study-abroad"
            className="text-xs font-bold text-brand-red hover:underline inline-flex items-center space-x-1 self-start sm:self-auto"
          >
            <span>Compare All 5 Destinations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* USA */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-xl transition group flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-3xl">🇺🇸</span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/80">
                  97.8% Visa Rate
                </span>
              </div>
              <div>
                <h3 className="text-lg font-black text-[#0F2C59] group-hover:text-brand-red transition">
                  United States (USA)
                </h3>
                <p className="text-xs text-slate-500 mt-1">F-1 Visa • STEM 3-Year OPT • Merit Scholarships</p>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
                  <span>1-on-1 Mock Embassy Interview Drills</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
                  <span>Tuition Waivers & Graduate Assistantships</span>
                </li>
              </ul>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100">
              <Link
                href="/study-abroad?country=USA"
                className="text-xs font-bold text-[#0F2C59] group-hover:text-brand-red inline-flex items-center space-x-1 transition"
              >
                <span>View USA Universities</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* UK */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-xl transition group flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-3xl">🇬🇧</span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/80">
                  98.6% Visa Rate
                </span>
              </div>
              <div>
                <h3 className="text-lg font-black text-[#0F2C59] group-hover:text-brand-red transition">
                  United Kingdom (UK)
                </h3>
                <p className="text-xs text-slate-500 mt-1">1-Year Masters • 2-Year Graduate PSW • Fast CAS</p>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
                  <span>Fast-Track Offer Letters (within 48 hrs)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
                  <span>Jan, May & Sept Main Intakes</span>
                </li>
              </ul>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100">
              <Link
                href="/study-abroad?country=UK"
                className="text-xs font-bold text-[#0F2C59] group-hover:text-brand-red inline-flex items-center space-x-1 transition"
              >
                <span>View UK Universities</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Australia */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-xl transition group flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-3xl">🇦🇺</span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/80">
                  96.9% Visa Rate
                </span>
              </div>
              <div>
                <h3 className="text-lg font-black text-[#0F2C59] group-hover:text-brand-red transition">
                  Australia
                </h3>
                <p className="text-xs text-slate-500 mt-1">Subclass 500 • Genuine Student (GS) Guidance</p>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
                  <span>Level 1 University Direct Admissions</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
                  <span>Up to 48 hrs Fortnightly Work Rights</span>
                </li>
              </ul>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100">
              <Link
                href="/study-abroad?country=Australia"
                className="text-xs font-bold text-[#0F2C59] group-hover:text-brand-red inline-flex items-center space-x-1 transition"
              >
                <span>View Australia Universities</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Canada */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-xl transition group flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-3xl">🇨🇦</span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/80">
                  95.4% Visa Rate
                </span>
              </div>
              <div>
                <h3 className="text-lg font-black text-[#0F2C59] group-hover:text-brand-red transition">
                  Canada
                </h3>
                <p className="text-xs text-slate-500 mt-1">PAL Verified • Post-Graduation Work Permit (PGWP)</p>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
                  <span>SDS Fast-Track Study Permit Filing</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
                  <span>Public Universities & College Diplomas</span>
                </li>
              </ul>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100">
              <Link
                href="/study-abroad?country=Canada"
                className="text-xs font-bold text-[#0F2C59] group-hover:text-brand-red inline-flex items-center space-x-1 transition"
              >
                <span>View Canada Programs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Europe */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-xl transition group flex flex-col justify-between sm:col-span-2 lg:col-span-2">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-3xl">🇪🇺</span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/80">
                  98.1% Visa Rate
                </span>
              </div>
              <div>
                <h3 className="text-lg font-black text-[#0F2C59] group-hover:text-brand-red transition">
                  Europe & Schengen Zone (Germany, France, Finland)
                </h3>
                <p className="text-xs text-slate-500 mt-1">Zero / Low Tuition Public Universities • Travel Across 29 Schengen Nations</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
                  <span>English-Taught Bachelors & Masters</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
                  <span>Blocked Account & VFS Guidance</span>
                </div>
              </div>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100">
              <Link
                href="/study-abroad?country=Europe"
                className="text-xs font-bold text-[#0F2C59] group-hover:text-brand-red inline-flex items-center space-x-1 transition"
              >
                <span>Explore Europe & Schengen Universities</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. THE 6-STAGE VISA ROADMAP */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F2C59]">
            Your 6-Stage Journey from Nepal to Abroad
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            A transparent, methodical approach eliminating paperwork errors and visa rejections.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { step: "01", title: "Free Counseling", desc: "Profile assessment & eligibility check" },
            { step: "02", title: "Course Match", desc: "Select 3 top-fit universities" },
            { step: "03", title: "Test Prep", desc: "IELTS / PTE classes & mock tests" },
            { step: "04", title: "Offer Letter", desc: "Application lodgement & scholarships" },
            { step: "05", title: "Visa Filing", desc: "Financial audit & mock embassy drills" },
            { step: "06", title: "Fly Abroad", desc: "Pre-departure briefing & ticketing" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs hover:shadow-md transition text-center space-y-2"
            >
              <span className="inline-block text-xs font-black text-brand-red bg-red-50 px-2.5 py-0.5 rounded-md">
                {item.step}
              </span>
              <h4 className="text-xs font-bold text-slate-900 leading-tight">{item.title}</h4>
              <p className="text-[11px] text-slate-500 leading-snug">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. TEST PREPARATION HIGHLIGHT (IELTS & PTE IN PUTALISADAK) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-50 via-white to-slate-50/80 rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-[11px] font-bold text-brand-red tracking-widest uppercase block">
              Official Test Preparation Center
            </span>
            <h3 className="text-2xl sm:text-3xl font-black leading-tight text-[#0F2C59]">
              Score High on IELTS & PTE with Certified Trainers
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
              Equipped with a modern computer mock test lab in Putalisadak matching official Pearson & IDP exam environments. Get personalized feedback from instructors with 10+ years of experience.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-xs">
                <Laptop className="w-4 h-4 text-[#0F2C59] mb-1.5" />
                <div className="text-xs font-bold text-slate-900">Mock Test Lab</div>
                <div className="text-[10px] text-slate-500 font-medium">Weekly scored simulations</div>
              </div>
              <div className="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-xs">
                <Clock className="w-4 h-4 text-brand-red mb-1.5" />
                <div className="text-xs font-bold text-slate-900">Flexible Shifts</div>
                <div className="text-[10px] text-slate-500 font-medium">Morning, Day & Evening</div>
              </div>
              <div className="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-xs col-span-2 sm:col-span-1">
                <Award className="w-4 h-4 text-[#0F2C59] mb-1.5" />
                <div className="text-xs font-bold text-slate-900">Free Materials</div>
                <div className="text-[10px] text-slate-500 font-medium">Cambridge & Pearson sets</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#0F2C59] text-white rounded-2xl p-6 sm:p-7 shadow-lg border border-brand-navy-700 space-y-4">
            <div className="border-b border-white/10 pb-3">
              <span className="text-[10px] font-bold text-brand-red uppercase tracking-wider block">Putalisadak Campus</span>
              <h4 className="text-base font-bold text-white mt-0.5">
                Register for Free Mock Test
              </h4>
            </div>
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-white/10">
                <span className="text-slate-300">IELTS Academic Target:</span>
                <span className="font-bold text-amber-300">Band 6.5 - 7.5+</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/10">
                <span className="text-slate-300">PTE Academic Target:</span>
                <span className="font-bold text-emerald-300">Score 58 - 68+</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/10">
                <span className="text-slate-300">Classroom Location:</span>
                <span className="font-bold text-white">Putalisadak, Kathmandu</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/contact"
                className="w-full bg-brand-red hover:bg-brand-red-600 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-md transition transform hover:-translate-y-0.5"
              >
                <span>Book Free Assessment Class</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. REAL STUDENT VISA GRANTS (TESTIMONIALS) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F2C59]">
            Student Visa Grants & Endorsements
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Real outcomes from students who trusted Global Guidelines for their academic journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayTestimonials.slice(0, 3).map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex text-amber-400 space-x-1">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <blockquote className="text-xs text-slate-700 italic leading-relaxed">
                  "{t.quote}"
                </blockquote>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-[#0F2C59] text-white font-black flex items-center justify-center text-xs">
                  {t.clientName[0]}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">{t.clientName}</div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    {t.clientRole} • {t.companyName}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. ADMISSIONS & COUNSELING CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0F2C59] rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden border border-brand-navy-700/60">
          <div className="relative z-10 max-w-2xl space-y-4">
            <h2 className="text-2xl sm:text-4xl font-black leading-tight text-white">
              Ready to Begin Your Global Education Journey?
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Connect with our certified education counselors in Putalisadak, Kathmandu. We guide you through university selection, scholarship assessment, and airtight visa filing with 98.4% success.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center space-x-2 bg-brand-red hover:bg-brand-red-600 text-white font-bold px-6 py-3 rounded-xl text-xs sm:text-sm shadow-lg transition transform hover:-translate-y-0.5"
              >
                <span>Book Free Counseling</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/study-abroad"
                className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-xl text-xs sm:text-sm border border-white/20 transition"
              >
                <span>Explore Destination Countries</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
