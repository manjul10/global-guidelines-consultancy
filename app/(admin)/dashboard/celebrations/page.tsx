import { getAllCelebrationMoments } from "@/lib/modules/celebrations/service";
import CelebrationManager from "@/components/admin/CelebrationManager";

export default async function AdminCelebrationsPage() {
  const items = await getAllCelebrationMoments();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <CelebrationManager initialItems={items} />
    </div>
  );
}
