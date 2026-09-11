import { getAllMediaAssets } from "@/lib/modules/media/service";
import MediaUploader from "@/components/admin/MediaUploader";

export default async function AdminMediaPage() {
  const assets = await getAllMediaAssets();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-brand-navy">Media & Document Library</h1>
        <p className="text-xs text-slate-500">
          Upload and manage images, brochures, university flyers, and downloadable student guides.
        </p>
      </div>

      <MediaUploader initialAssets={assets} />
    </div>
  );
}
