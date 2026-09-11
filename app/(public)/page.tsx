import Link from "next/link";
import Image from "next/image";
import { getFeaturedServices } from "@/lib/modules/services/service";
import { getPublishedCaseStudies } from "@/lib/modules/case-studies/service";
import { getFeaturedTestimonials } from "@/lib/modules/testimonials/service";
import { getPublishedArticles } from "@/lib/modules/articles/service";
import {
  GraduationCap,
  FileCheck,
  BookOpen,
  Plane,
  ArrowRight,
  CheckCircle2,
  Trophy,
  ShieldCheck,
  Star,
  Users,
  Calendar,
  Instagram,
  Facebook,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

const iconMap: Record<string, typeof GraduationCap> = {
  GraduationCap,
  FileCheck,
  BookOpen,
  Plane,
};

export default async function HomePage() {
  const [services, caseStudies, testimonials, articles] = await Promise.all([
    getFeaturedServices(),
    getPublishedCaseStudies(),
    getFeaturedTestimonials(),
    getPublishedArticles({ limit: 3 }),
  ]);

  return (
    <div className="space-y-20 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-navy-900 via-brand-navy-800 to-slate-900 text-white pt-16 pb-24 lg:pt-24 lg:pb-32">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-xs font-semibold text-emerald-300">
                <ShieldCheck className="w-4 h-4 text-brand-red" />
                <span>MOEST Approval No. 1459 • Reg. No. 168812/73/074</span>
              </div>


              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                Your Bridge to <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-brand-red to-orange-400">
                  Global Education
                </span>{" "}
                & Visa Success
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
                Official university admissions, airtight visa documentation, and rigorous embassy
                interview coaching for USA, UK, Canada, Australia, and Europe.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-brand-red hover:bg-brand-red-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-brand-red/30 hover:shadow-brand-red/50 transition transform hover:-translate-y-0.5"
                >
                  <span>Book Free Counseling</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/services"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl backdrop-blur-sm transition"
                >
                  <span>Explore Study Destinations</span>
                </Link>
              </div>

              {/* Key Trust Checkmarks */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-300 font-medium">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>98.4% Visa Success Rate</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Direct University Partnerships</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>1-on-1 Mock Interview Drills</span>
                </div>
              </div>
            </div>

            {/* Right Hero Card / Visual */}
            <div className="lg:col-span-5 relative">
              <div className="bg-white rounded-3xl p-8 shadow-2xl text-slate-900 border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-full -z-0" />

                <div className="relative z-10 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 relative">
                      <Image
                        src="/logo.png"
                        alt="Global Guidelines"
                        width={56}
                        height={56}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="bg-red-50 text-brand-red font-bold text-xs px-3 py-1 rounded-full border border-red-200">
                      Admissions Open 2026
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-brand-navy">
                      Global Study Intake 2026 / 2027
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Priority processing currently active for upcoming university intakes:
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">🇺🇸</span>
                        <div>
                          <div className="text-xs font-bold text-slate-900">USA Universities</div>
                          <div className="text-[11px] text-slate-500">Fall & Spring Intakes • F-1 Visa</div>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-brand-red">Fast Track</span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">🇦🇺</span>
                        <div>
                          <div className="text-xs font-bold text-slate-900">Australia Higher Ed</div>
                          <div className="text-[11px] text-slate-500">Subclass 500 • Genuine Student (GS)</div>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-emerald-600">Active</span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">🇬🇧</span>
                        <div>
                          <div className="text-xs font-bold text-slate-900">UK Universities</div>
                          <div className="text-[11px] text-slate-500">Jan / Sept Intakes • 2-Yr Post-Study Work</div>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-brand-navy">Open</span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">🇨🇦</span>
                        <div>
                          <div className="text-xs font-bold text-slate-900">Canada Colleges & Unis</div>
                          <div className="text-[11px] text-slate-500">PAL & Study Permit Guidance</div>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-brand-red">High Demand</span>
                    </div>
                  </div>

                  <Link
                    href="/contact"
                    className="w-full flex items-center justify-center space-x-2 bg-brand-navy hover:bg-brand-navy-900 text-white font-bold py-3.5 rounded-xl transition shadow text-xs"
                  >
                    <span>Check Your Eligibility Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-8 grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          <div className="text-center pt-4 md:pt-0">
            <div className="text-3xl sm:text-4xl font-black text-brand-red">98.4%</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-700 mt-1">Visa Success Rate</div>
            <div className="text-[11px] text-slate-400">Audited visa file preparation</div>
          </div>
          <div className="text-center pt-4 md:pt-0">
            <div className="text-3xl sm:text-4xl font-black text-brand-navy">3,500+</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-700 mt-1">Students Placed</div>
            <div className="text-[11px] text-slate-400">Enrolled worldwide</div>
          </div>
          <div className="text-center pt-4 md:pt-0">
            <div className="text-3xl sm:text-4xl font-black text-brand-red">$1.8M+</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-700 mt-1">Scholarships Won</div>
            <div className="text-[11px] text-slate-400">Merit & tuition discounts</div>
          </div>
          <div className="text-center pt-4 md:pt-0">
            <div className="text-3xl sm:text-4xl font-black text-brand-navy">500+</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-700 mt-1">Partner Institutions</div>
            <div className="text-[11px] text-slate-400">Direct admission pipeline</div>
          </div>
        </div>
      </section>

      {/* 3. DYNAMIC SERVICES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <span className="text-brand-red font-bold text-xs uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full">
            Our Core Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
            Tailored Consultancy & Visa Solutions
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            From initial university selection to your first flight abroad, our certified advisors
            support every stage of your international journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = iconMap[service.iconName || ""] || GraduationCap;
            const deliverables = JSON.parse(service.deliverables || "[]") as string[];

            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-brand-red/40 transition flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-brand-navy/5 text-brand-navy group-hover:bg-brand-red group-hover:text-white transition flex items-center justify-center shadow-sm">
                    <IconComponent className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-navy transition">
                    {service.title}
                  </h3>

                  <p className="text-xs text-brand-red font-semibold">
                    {service.tagline}
                  </p>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {service.description}
                  </p>

                  {deliverables.length > 0 && (
                    <div className="pt-2 border-t border-slate-100 space-y-2">
                      <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                        Included Guidance:
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-600">
                        {deliverables.slice(0, 3).map((item, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <span className="text-emerald-500 font-bold">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100">
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center space-x-1.5 text-xs font-bold text-brand-navy group-hover:text-brand-red transition"
                  >
                    <span>View Service Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. VISA SUCCESS STORIES (CASE STUDIES) */}
      <section className="bg-slate-100/70 py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <span className="text-brand-red font-bold text-xs uppercase tracking-widest">
                Proven Track Record
              </span>
              <h2 className="text-3xl font-black text-brand-navy tracking-tight mt-1">
                Recent Visa Grant Success Stories
              </h2>
              <p className="text-xs text-slate-600 mt-1 max-w-xl">
                Real students who conquered academic gaps, complex GTE compliance, and competitive
                scholarships with Global Guidelines.
              </p>
            </div>
            <Link
              href="/case-studies"
              className="inline-flex items-center space-x-1 text-xs font-bold text-brand-navy hover:text-brand-red transition"
            >
              <span>Explore All Case Studies</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {caseStudies.map((study) => {
              const results = JSON.parse(study.results || "[]") as {
                metric: string;
                label: string;
              }[];

              return (
                <div
                  key={study.id}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition flex flex-col"
                >
                  <div className="p-8 space-y-4 flex-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-brand-red bg-red-50 px-2.5 py-1 rounded-md">
                        {study.industry}
                      </span>
                      <span className="text-slate-500 font-medium">Student: {study.clientName}</span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 leading-snug">
                      {study.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {study.challenge}
                    </p>

                    {/* Result Metrics Badges */}
                    <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100">
                      {results.map((r, i) => (
                        <div key={i} className="bg-slate-50 p-2.5 rounded-xl text-center border border-slate-100">
                          <div className="text-sm font-black text-brand-navy">{r.metric}</div>
                          <div className="text-[10px] text-slate-500 font-medium leading-tight mt-0.5">
                            {r.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-50 px-8 py-3.5 border-t border-slate-100">
                    <Link
                      href={`/case-studies/${study.slug}`}
                      className="text-xs font-bold text-brand-navy hover:text-brand-red inline-flex items-center space-x-1.5 transition"
                    >
                      <span>Read Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-brand-red font-bold text-xs uppercase tracking-widest">
            Student Endorsements
          </span>
          <h2 className="text-3xl font-black text-brand-navy">What Our Students Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm relative flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex text-amber-400 space-x-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <blockquote className="text-sm text-slate-700 italic leading-relaxed">
                  "{t.quote}"
                </blockquote>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-brand-navy text-white font-bold flex items-center justify-center text-sm">
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

      {/* 6. LATEST INSIGHTS & VISA POLICY NEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <span className="text-brand-red font-bold text-xs uppercase tracking-widest">
              Knowledge Hub
            </span>
            <h2 className="text-3xl font-black text-brand-navy tracking-tight mt-1">
              Latest Visa Policy & Study Guides
            </h2>
          </div>
          <Link
            href="/insights"
            className="inline-flex items-center space-x-1 text-xs font-bold text-brand-navy hover:text-brand-red transition"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((art) => (
            <article
              key={art.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-lg transition flex flex-col"
            >
              {art.coverImageUrl && (
                <div className="h-48 relative overflow-hidden bg-slate-100">
                  <Image
                    src={art.coverImageUrl}
                    alt={art.title}
                    fill
                    className="object-cover hover:scale-105 transition duration-300"
                  />
                </div>
              )}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-[11px] text-slate-500">
                    <span className="bg-red-50 text-brand-red font-semibold px-2 py-0.5 rounded">
                      {art.category}
                    </span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(art.publishedAt)}</span>
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug hover:text-brand-navy transition">
                    <Link href={`/insights/${art.slug}`}>{art.title}</Link>
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <Link
                    href={`/insights/${art.slug}`}
                    className="text-xs font-bold text-brand-red hover:underline inline-flex items-center space-x-1"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 6. SOCIAL HIGHLIGHTS & VISA CELEBRATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-brand-red font-bold text-xs uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full">
                Real Community & Success
              </span>
              <span className="text-xs text-slate-500 font-semibold">• 1.6K+ Facebook community</span>
            </div>
            <h2 className="text-3xl font-black text-brand-navy tracking-tight mt-2">
              Life at Global Guidelines & Visa Celebrations
            </h2>
            <p className="text-xs text-slate-600 mt-1 max-w-xl">
              From visa grants and CAS approvals to classroom test prep and pre-departure briefings.
              Direct moments shared from our Putalisadak &amp; Birgunj centers.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <a
              href="https://www.instagram.com/globalguidelines/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 via-red-500 to-amber-500 text-white font-bold text-xs shadow hover:opacity-90 transition"
            >
              <Instagram className="w-4 h-4" />
              <span>Follow on Instagram</span>
            </a>
            <a
              href="https://www.facebook.com/globalguidelinesnepal"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow transition"
            >
              <Facebook className="w-4 h-4" />
              <span>Facebook Page</span>
            </a>
          </div>
        </div>

        {/* Gallery Grid of Scraped Photos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="group relative rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-slate-100 aspect-square hover:shadow-md transition">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/social/instagram-photo-4.jpg"
              alt="Visa grant celebration at Global Guidelines"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition p-4 flex flex-col justify-end text-white">
              <span className="text-[11px] font-bold">Visa Grant Moments</span>
              <span className="text-[10px] text-slate-300">@globalguidelines</span>
            </div>
          </div>

          <div className="group relative rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-slate-100 aspect-square hover:shadow-md transition">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/social/instagram-photo-6.jpg"
              alt="Student counseling at Putalisadak"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition p-4 flex flex-col justify-end text-white">
              <span className="text-[11px] font-bold">Counseling & Guidance</span>
              <span className="text-[10px] text-slate-300">Putalisadak Head Office</span>
            </div>
          </div>

          <div className="group relative rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-slate-100 aspect-square hover:shadow-md transition">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/social/instagram-photo-8.jpg"
              alt="Global Study destinations briefing"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition p-4 flex flex-col justify-end text-white">
              <span className="text-[11px] font-bold">Abroad Study Briefing</span>
              <span className="text-[10px] text-slate-300">UK, USA, Australia, Europe</span>
            </div>
          </div>

          <div className="group relative rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-slate-100 aspect-square hover:shadow-md transition">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/social/instagram-photo-10.jpg"
              alt="PTE & Language Class Sessions"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition p-4 flex flex-col justify-end text-white">
              <span className="text-[11px] font-bold">PTE & Test Prep Lab</span>
              <span className="text-[10px] text-slate-300">Computer Mock Lab</span>
            </div>
          </div>

          <div className="group relative rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-slate-100 aspect-square hover:shadow-md transition">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/social/instagram-photo-12.jpg"
              alt="Student visa stamp celebration"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition p-4 flex flex-col justify-end text-white">
              <span className="text-[11px] font-bold">CAS & Visa Success</span>
              <span className="text-[10px] text-slate-300">Verified Stamp</span>
            </div>
          </div>

          <div className="group relative rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-slate-100 aspect-square hover:shadow-md transition">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/social/instagram-photo-15.jpg"
              alt="Pre-departure preparation"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition p-4 flex flex-col justify-end text-white">
              <span className="text-[11px] font-bold">Orientation Session</span>
              <span className="text-[10px] text-slate-300">Pre-Departure Guidance</span>
            </div>
          </div>

          <div className="group relative rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-slate-100 aspect-square hover:shadow-md transition">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/social/facebook-photo-2.jpg"
              alt="Global Guidelines Putalisadak center"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition p-4 flex flex-col justify-end text-white">
              <span className="text-[11px] font-bold">Global Guidelines Team</span>
              <span className="text-[10px] text-slate-300">Level-3 Brihaspati Sadan</span>
            </div>
          </div>

          <div className="group relative rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-slate-100 aspect-square hover:shadow-md transition">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/social/facebook-photo-14.jpg"
              alt="Counselor consultation"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition p-4 flex flex-col justify-end text-white">
              <span className="text-[11px] font-bold">1-on-1 Counseling</span>
              <span className="text-[10px] text-slate-300">Advising & Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CONVERSION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="bg-gradient-to-r from-brand-navy-950 via-brand-navy-900 to-slate-900 text-white rounded-3xl p-10 sm:p-16 relative overflow-hidden shadow-2xl border border-white/10">
          <div className="relative z-10 max-w-2xl space-y-6">
            <span className="inline-block bg-brand-red text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Free Personalized Counseling
            </span>
            <h2 className="text-3xl sm:text-4xl font-black leading-tight">
              Ready to Start Your Study Abroad Journey?
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Meet our senior advisors for an in-depth evaluation of your transcripts, financial
              documentation, and visa eligibility. No charges for initial profile assessment.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center space-x-2 bg-brand-red hover:bg-brand-red-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition transform hover:-translate-y-0.5"
              >
                <span>Schedule Your Free Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
