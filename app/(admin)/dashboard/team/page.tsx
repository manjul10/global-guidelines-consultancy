import { getAllTeamMembers } from "@/lib/modules/team/service";

export default async function AdminTeamPage() {
  const team = await getAllTeamMembers();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-brand-navy">Team & Counselors</h1>
        <p className="text-xs text-slate-500">
          Manage profiles and bios displayed on the public /team page.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((member) => (
          <div
            key={member.id}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-brand-navy text-white font-bold flex items-center justify-center text-base">
                {member.name[0]}
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900">{member.name}</h2>
                <span className="text-xs font-semibold text-brand-red block">{member.role}</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
              {member.bio}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
