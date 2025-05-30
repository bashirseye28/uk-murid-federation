"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import LogoutButton from "@/components/Auth/LogoutButton";
import useAuthCheck from "@/hooks/useAuthCheck";

const navLinks = [
  { name: "Dashboard", href: "/admin" },
  { name: "Donations", href: "/admin/donations" },
  { name: "Gallery", href: "/admin/gallery" },
  { name: "Settings", href: "/admin/settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  useAuthCheck(); // 🔐 Only allow access if authenticated
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-50 overflow-hidden">
      {/* Top bar on mobile */}
      <header className="fixed md:hidden top-0 left-0 right-0 z-50 bg-white border-b shadow-sm flex items-center justify-between px-4 py-3">
        <h1 className="text-lg font-bold text-mourid-green">UK Murid Admin</h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle Menu"
          className="text-mourid-green"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Overlay when sidebar is open on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed z-50 top-[56px] md:top-0 left-0 w-64 bg-white border-r shadow-md transform transition-transform duration-300 ease-in-out
        h-[calc(100vh-56px)] md:h-screen md:translate-x-0 md:static flex flex-col justify-between
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="flex flex-col gap-2 p-6">
          <h2 className="text-lg font-bold text-mourid-green hidden md:block mb-2">UK Murid Admin</h2>
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className="text-sm font-medium text-slate-700 hover:bg-mourid-green hover:text-white px-4 py-2 rounded transition"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="p-6 border-t">
          <LogoutButton />
        </div>
      </aside>

      {/* Main content area */}
      <main className="flex-1 overflow-y-auto pt-[56px] md:pt-0 p-4 md:p-10">
        {children}
      </main>
    </div>
  );
}