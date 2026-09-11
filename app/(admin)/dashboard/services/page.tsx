import { getAllServices } from "@/lib/modules/services/service";
import ServicesManager from "@/components/admin/ServicesManager";

export default async function AdminServicesPage() {
  const services = await getAllServices();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <ServicesManager initialServices={services} />
    </div>
  );
}

