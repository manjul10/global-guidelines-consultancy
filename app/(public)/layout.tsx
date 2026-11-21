import PublicHeader from "@/components/public/Header";
import PublicFooter from "@/components/public/Footer";
import FloatingCallTab from "@/components/public/FloatingCallTab";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen relative">
      <PublicHeader />
      <main className="flex-1">{children}</main>
      <FloatingCallTab />
      <PublicFooter />
    </div>
  );
}
