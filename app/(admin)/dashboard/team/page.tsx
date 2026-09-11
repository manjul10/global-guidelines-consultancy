import { getAllTeamMembers } from "@/lib/modules/team/service";
import TeamManager from "@/components/admin/TeamManager";

export default async function AdminTeamPage() {
  const team = await getAllTeamMembers();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <TeamManager initialTeam={team} />
    </div>
  );
}

