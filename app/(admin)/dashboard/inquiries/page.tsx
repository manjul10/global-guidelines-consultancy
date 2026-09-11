import { getAllInquiries } from "@/lib/modules/inquiries/service";
import InquiriesManager from "@/components/admin/InquiriesManager";

export default async function AdminInquiriesPage() {
  const inquiries = await getAllInquiries();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-brand-navy">Counseling Inquiries & Leads</h1>
        <p className="text-xs text-slate-500">
          Track, qualify, and respond to incoming prospective students and study abroad applicants.
        </p>
      </div>

      <InquiriesManager initialInquiries={inquiries} />
    </div>
  );
}
