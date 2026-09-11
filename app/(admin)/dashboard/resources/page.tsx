import { getAllResources } from "@/lib/modules/resources/service";
import ResourcesManager from "@/components/admin/ResourcesManager";

export default async function AdminResourcesPage() {
  const resources = await getAllResources();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <ResourcesManager initialResources={resources} />
    </div>
  );
}

