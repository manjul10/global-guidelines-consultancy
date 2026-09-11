"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Trophy,
  FolderDown,
  MessageSquareQuote,
  Users,
  Inbox,
  Image as ImageIcon,
  ExternalLink,
  LogOut,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Articles & Insights", href: "/dashboard/articles", icon: FileText },
  { label: "Services", href: "/dashboard/services", icon: Briefcase },
  { label: "Case Studies", href: "/dashboard/case-studies", icon: Trophy },
  { label: "Resources", href: "/dashboard/resources", icon: FolderDown },
  { label: "Testimonials", href: "/dashboard/testimonials", icon: MessageSquareQuote },
  { label: "Team Members", href: "/dashboard/team", icon: Users },
  { label: "Inquiries & Leads", href: "/dashboard/inquiries", icon: Inbox },
  { label: "Media Library", href: "/dashboard/media", icon: ImageIcon },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 text-slate-200 min-h-screen flex flex-col border-r border-slate-800">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800 flex items-center space-x-3">
        <div className="w-10 h-10 rounded-lg overflow-hidden bg-white p-0.5 flex-shrink-0">
          <Image
            src="/logo.png"
            alt="Global Guidelines Logo"
            width={40}
            height={40}
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <h2 className="font-bold text-sm text-white tracking-wide leading-tight">
            GLOBAL GUIDELINES
          </h2>
          <span className="text-[10px] text-brand-red font-semibold uppercase tracking-wider block">
            CMS STUDIO
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                isActive
                  ? "bg-brand-red text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-100 hover:bg-slate-800"
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Utilities */}
      <div className="p-3 border-t border-slate-800 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center space-x-2 px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <ExternalLink className="w-4 h-4 text-emerald-400" />
          <span>View Live Portal</span>
        </Link>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-xs text-rose-400 hover:bg-rose-500/10 transition"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
