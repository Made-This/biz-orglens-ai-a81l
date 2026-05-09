"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthActions } from "@convex-dev/auth/react";
import {
  LayoutGrid,
  Network,
  Target,
  Settings,
  Building2,
  ArrowLeft,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const navItems = [
  { href: "/app", label: "Scenarios", icon: LayoutGrid },
  { href: "/app/org-map", label: "Org Map", icon: Network },
  { href: "/app/role-fit", label: "Role Fit", icon: Target },
];

const secondaryNav = [
  { href: "/app/settings", label: "Settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { signOut } = useAuthActions();

  function isActive(href: string) {
    if (href === "/app") {
      return pathname === "/app";
    }
    return pathname === href || pathname.startsWith(href + "/");
  }

  const sidebarContent = (
    <div className="flex h-full flex-col bg-[#F9FAFB]">
      {/* App name */}
      <div className="px-5 py-5">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#4F46E5] text-white">
            <Building2 className="h-4 w-4" />
          </div>
          <h2 className="truncate text-base font-semibold text-[#111827]">
            OrgLens AI
          </h2>
        </div>
        <p className="mt-1 text-xs text-gray-500">Decision Intelligence</p>
      </div>

      <Separator />

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-[#4F46E5] text-white"
                  : "text-gray-600 hover:bg-white hover:text-[#111827]"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <Separator />

      {/* Secondary nav */}
      <div className="space-y-1 px-3 py-3">
        {secondaryNav.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-white text-[#111827] shadow-sm"
                  : "text-gray-600 hover:bg-white hover:text-[#111827]"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </div>

      <Separator />

      {/* Bottom actions */}
      <div className="space-y-1 px-3 py-4">
        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-2 rounded-md px-3 py-2 text-xs text-gray-500 transition-colors hover:bg-white hover:text-[#111827]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Site
        </Link>
        <button
          onClick={() => void signOut()}
          className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-xs text-gray-500 transition-colors hover:bg-white hover:text-[#111827]"
        >
          <LogOut className="h-3.5 w-3.5" />
          Sign Out
        </button>
        <p className="px-3 pt-3 text-[10px] uppercase tracking-wider text-gray-400">
          Built with MadeThis
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-4 z-50 md:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar — mobile (slide-over) */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 border-r border-[#E5E7EB] transition-transform md:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {sidebarContent}
      </aside>

      {/* Sidebar — desktop (static) */}
      <aside className="hidden w-[280px] shrink-0 border-r border-[#E5E7EB] md:block">
        {sidebarContent}
      </aside>
    </>
  );
}
