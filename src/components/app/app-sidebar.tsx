"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthActions } from "@convex-dev/auth/react";
import {
  LayoutGrid,
  Network,
  Target,
  ShieldAlert,
  ArrowLeft,
  Menu,
  X,
  LogOut,
  FileText,
  Briefcase,
  ClipboardList,
  Activity,
} from "lucide-react";
import { useConvexAuth } from "convex/react";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  icon: typeof LayoutGrid;
  lens?: string;
  badge?: string;
}

const navItems: NavItem[] = [
  { href: "/app", label: "Overview", icon: LayoutGrid },
  { href: "/app/org-map", label: "Org Map", icon: Network, lens: "Lens 1" },
  { href: "/app/role-fit", label: "Role Fit", icon: Target, lens: "Lens 2" },
  {
    href: "/app/risk",
    label: "Risk Intelligence",
    icon: ShieldAlert,
    lens: "Lens 4",
    badge: "3",
  },
  {
    href: "/app/report",
    label: "Full Report",
    icon: FileText,
    lens: "Premium",
  },
];

const workspaceNavItems: NavItem[] = [
  { href: "/app/workspace", label: "My Workspace", icon: Briefcase },
  { href: "/app/intake", label: "Intake Form", icon: ClipboardList },
  { href: "/app/status", label: "Report Status", icon: Activity },
];

export function AppSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { signOut } = useAuthActions();
  const { isAuthenticated } = useConvexAuth();

  function isActive(href: string) {
    if (href === "/app") {
      return pathname === "/app";
    }
    return pathname === href || pathname.startsWith(href + "/");
  }

  const sidebarContent = (
    <div className="flex h-full flex-col border-r border-[#1E1E24] bg-[#0A0A0B]">
      {/* Logo */}
      <div className="px-5 py-6">
        <Link href="/app" className="flex items-center gap-2">
          <span className="text-base font-bold tracking-tight text-white">
            OrgLens<span className="text-indigo-400">.</span>AI
          </span>
        </Link>
        <p className="mt-1 text-[10px] font-medium uppercase tracking-widest text-zinc-500">
          Decision Intelligence
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-2">
        <p className="mb-2 px-3 pt-2 text-[10px] font-medium uppercase tracking-widest text-zinc-600">
          Analysis
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-indigo-500/10 text-indigo-300 ring-1 ring-inset ring-indigo-500/30"
                  : "text-zinc-400 hover:bg-[#16161A] hover:text-white"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-full border border-rose-500/40 bg-rose-500/15 px-1.5 text-[10px] font-semibold text-rose-300">
                  {item.badge}
                </span>
              )}
              {item.lens && !item.badge && (
                <span className="text-[9px] font-medium uppercase tracking-widest text-zinc-600 group-hover:text-zinc-400">
                  {item.lens}
                </span>
              )}
            </Link>
          );
        })}

        {isAuthenticated && (
          <>
            <p className="mb-2 mt-6 px-3 pt-2 text-[10px] font-medium uppercase tracking-widest text-zinc-600">
              Your workspace
            </p>
            {workspaceNavItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-indigo-500/10 text-indigo-300 ring-1 ring-inset ring-indigo-500/30"
                      : "text-zinc-400 hover:bg-[#16161A] hover:text-white"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="flex-1">{item.label}</span>
                </Link>
              );
            })}
          </>
        )}
      </nav>

      {/* Bottom actions */}
      <div className="space-y-1 border-t border-[#1E1E24] px-3 py-4">
        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-2 rounded-md px-3 py-2 text-xs text-zinc-500 transition-colors hover:bg-[#16161A] hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to site
        </Link>
        <button
          onClick={() => void signOut()}
          className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-xs text-zinc-500 transition-colors hover:bg-[#16161A] hover:text-white"
        >
          <LogOut className="h-3.5 w-3.5" />
          Sign out
        </button>
        <p className="px-3 pt-3 text-[10px] uppercase tracking-widest text-zinc-600">
          Built with MadeThis
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="fixed left-4 top-4 z-50 inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#1E1E24] bg-[#0A0A0B] text-zinc-300 md:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar — mobile (slide-over) */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transition-transform md:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {sidebarContent}
      </aside>

      {/* Sidebar — desktop (static) */}
      <aside className="hidden w-[260px] shrink-0 md:block">
        {sidebarContent}
      </aside>
    </>
  );
}
