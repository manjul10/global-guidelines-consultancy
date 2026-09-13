import { getHeroSetting, getAllIntakeTracks } from "@/lib/modules/intakes/service";
import IntakeManager from "@/components/admin/IntakeManager";

export default async function AdminIntakesPage() {
  const [setting, tracks] = await Promise.all([
    getHeroSetting(),
    getAllIntakeTracks(),
  ]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-brand-navy">Hero Intake & Fast-Track Manager</h1>
        <p className="text-xs text-slate-500 mt-1">
          Dynamically manage the right-side intake evaluation card on the homepage hero section.
        </p>
      </div>

      <IntakeManager initialSetting={setting} initialTracks={tracks} />
    </div>
  );
}
