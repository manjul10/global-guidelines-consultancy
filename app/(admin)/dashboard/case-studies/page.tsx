import { getAllCaseStudies } from "@/lib/modules/case-studies/service";
import CaseStudiesManager from "@/components/admin/CaseStudiesManager";

export default async function AdminCaseStudiesPage() {
  const caseStudies = await getAllCaseStudies();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <CaseStudiesManager initialCaseStudies={caseStudies} />
    </div>
  );
}

