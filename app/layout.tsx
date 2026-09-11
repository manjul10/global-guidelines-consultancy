import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Global Guidelines | Consultancy and Visa Services",
    template: "%s | Global Guidelines Consultancy",
  },
  description:
    "Expert education consultancy and visa services for USA, UK, Canada, Australia, and Europe. University admissions, visa documentation, embassy interview preparation, and test prep.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
