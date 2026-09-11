"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/Sidebar";
import { Menu, X } from "lucide-react";

interface DashboardShellProps {
  user: {
    name?: string | null;
    email?: string | null;
  } | null;
  children: React.ReactNode;
}

export default function DashboardShell({ user, children }: DashboardShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50 relative">
      {/* Desktop Fixed Sidebar (lg screens and above) */}
      <div className="hidden lg:block lg:w-64 lg:shrink-0">
        <div className="fixed inset-y-0 left-0 w-64 z-30">
          <AdminSidebar />
        </div>
      </div>

      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Mobile Slide-over Drawer (< lg screens) */}
      <div
        className={`fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-slate-900 z-50 transform transition-transform duration-300 ease-in-out lg:hidden shadow-2xl flex flex-col ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="absolute top-3.5 right-3.5 z-10">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            aria-label="Close sidebar menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="h-full flex flex-col">
          <AdminSidebar onNavigate={() => setMobileMenuOpen(false)} />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 w-full">
        {/* Top Responsive Header */}
        <header className="sticky top-0 z-20 h-16 bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 flex items-center justify-between shadow-xs">
          <div className="flex items-center space-x-3 min-w-0">
            {/* Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition focus:outline-none focus:ring-2 focus:ring-brand-navy"
              aria-label="Open sidebar menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight truncate">
              Global Guidelines CMS Studio
            </h1>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-bold text-slate-900 truncate max-w-[160px]">
                {user?.name || "Consultant Admin"}
              </div>
              <div className="text-[10px] text-slate-500 font-medium truncate max-w-[160px]">
                {user?.email || "admin@globalguidelines.com"}
              </div>
            </div>
            <div className="w-9 h-9 rounded-xl bg-brand-navy text-white flex items-center justify-center font-bold text-xs shadow">
              {user?.name ? user.name[0].toUpperCase() : "A"}
            </div>
          </div>
        </header>

        {/* Responsive Content Container */}
        <main className="flex-1 p-3.5 sm:p-6 lg:p-8 overflow-y-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
