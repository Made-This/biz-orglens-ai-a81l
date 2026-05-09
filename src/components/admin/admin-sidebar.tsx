"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Users,
  FileText,
  Settings,
  ArrowLeft,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface AdminSidebarProps {
  productName: string;
}

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/workspaces", label: "Workspaces", icon: Building2 },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar({ productName }: AdminSidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  function isActive(href: string) {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  }

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Product name */}
      <div className="px-4 py-5">
        <h2 className="truncate text-lg font-semibold">{productName}</h2>
        <p className="text-xs text-muted-foreground">Admin Dashboard</p>
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
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <Separator />

      {/* Back to site */}
      <div className="px-3 py-4">
        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Site
        </Link>
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
          "fixed inset-y-0 left-0 z-40 w-64 border-r bg-card transition-transform md:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {sidebarContent}
      </aside>

      {/* Sidebar — desktop (static) */}
      <aside className="hidden w-64 shrink-0 border-r bg-card md:block">
        {sidebarContent}
      </aside>
    </>
  );
}
