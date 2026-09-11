import { getAllTestimonials } from "@/lib/modules/testimonials/service";
import TestimonialsManager from "@/components/admin/TestimonialsManager";

export default async function AdminTestimonialsPage() {
  const testimonials = await getAllTestimonials();

  return (
    <div className="max-w-7xl mx-auto">
      <TestimonialsManager initialTestimonials={testimonials} />
    </div>
  );
}
