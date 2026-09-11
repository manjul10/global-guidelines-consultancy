import Link from "next/link";
import { getAllTeamMembers } from "@/lib/modules/team/service";
import { ArrowRight, Award, ShieldCheck, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Meet Our Team | Global Guidelines Consultancy",
  description:
    "Meet the experienced education advisors, visa documentation specialists, and test prep mentors at Global Guidelines.",
};

export default async function TeamPage() {
  const team = await getAllTeamMembers();

  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-brand-red font-bold text-xs uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full">
            Our Leadership & Advisors
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
            Experienced Mentors Guiding Your Journey
          </h1>
          <p className="text-xs text-slate-600 leading-relaxed">
            Our counselors possess direct experience with international university admissions,
            GTE/GS compliance frameworks, and embassy interview coaching.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition text-center space-y-4"
            >
              <div className="w-20 h-20 rounded-full bg-brand-navy text-white font-black text-2xl flex items-center justify-center mx-auto shadow-md">
                {member.name[0]}
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-900">{member.name}</h2>
                <p className="text-xs font-semibold text-brand-red mt-0.5">{member.role}</p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                {member.bio}
              </p>
            </div>
          ))}
        </div>

        {/* Credentials & Trust Factors */}
        <div className="bg-white rounded-3xl p-10 sm:p-14 border border-slate-200 shadow-sm space-y-8">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-2xl font-black text-brand-navy">
              Why Students Trust Global Guidelines
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              We uphold strict ethical counseling standards, transparent fee structures, and personalized
              admissions pathways for every applicant.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <Award className="w-8 h-8 text-brand-red" />
              <h3 className="text-sm font-bold text-slate-900">Certified Counselors</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our advisors hold formal QEAC (Qualified Education Agent Counselor) and USATC training credentials.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <ShieldCheck className="w-8 h-8 text-emerald-600" />
              <h3 className="text-sm font-bold text-slate-900">Zero False Promises</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We believe in genuine evaluations. If a student's profile has gaps or limitations, we address them directly with solutions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <CheckCircle2 className="w-8 h-8 text-brand-navy" />
              <h3 className="text-sm font-bold text-slate-900">Direct University Network</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct partnerships with hundreds of institutions guarantee faster offer letter turnarounds and scholarship priorities.
              </p>
            </div>
          </div>

          <div className="pt-4 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 bg-brand-red hover:bg-brand-red-600 text-white font-bold text-xs px-8 py-3.5 rounded-xl shadow transition"
            >
              <span>Meet a Counselor in Person</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
