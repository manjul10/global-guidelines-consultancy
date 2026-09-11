import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";

export default async function AdminHeader({ title }: { title: string }) {
  const session = await getServerSession(authOptions);

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between">
      <div>
        <h1 className="text-lg font-bold text-slate-900">{title}</h1>
      </div>

      <div className="flex items-center space-x-4">
        <div className="text-right">
          <div className="text-xs font-semibold text-slate-800">
            {session?.user?.name || "Consultant Admin"}
          </div>
          <div className="text-[10px] text-slate-500 font-medium">
            {session?.user?.email || "admin@globalguidelines.com"}
          </div>
        </div>
        <div className="w-9 h-9 rounded-full bg-brand-navy text-white flex items-center justify-center font-bold text-xs shadow-sm">
          {session?.user?.name ? session.user.name[0].toUpperCase() : "A"}
        </div>
      </div>
    </header>
  );
}
