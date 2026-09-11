import DashboardShell from "@/components/admin/DashboardShell";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <DashboardShell user={session?.user || null}>
      {children}
    </DashboardShell>
  );
}

