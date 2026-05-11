"use client";

import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/app/app-sidebar";
import { Toaster } from "@/components/ui/toaster";
import { LoggedInDemoBanner } from "@/components/LoggedInDemoBanner";

/**
 * Public app layout.
 *
 * The /app route group is intentionally PUBLIC — anyone can visit the demo
 * portal (`/app`, `/app/report`, `/app/org-map`, `/app/role-fit`,
 * `/app/risk`) without signing in.
 *
 * Auth-gated routes (`/app/workspace`, `/app/intake`, `/app/status`,
 * `/app/settings/*`) self-guard on the client; they redirect to /sign-in
 * when called without an authenticated session.
 */
export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() ?? "";

  // Demo banner only on truly public demo routes — not on workspace pages.
  const isDemoRoute =
    pathname === "/app" ||
    pathname.startsWith("/app/report") ||
    pathname.startsWith("/app/org-map") ||
    pathname.startsWith("/app/role-fit") ||
    pathname.startsWith("/app/risk");

  return (
    <>
      {isDemoRoute && <LoggedInDemoBanner />}
      <div className="dark flex min-h-screen bg-[#0A0A0B] text-zinc-100">
        <AppSidebar />
        <main className="flex-1 overflow-y-auto px-6 pb-12 pt-16 md:px-10 md:pt-10">
          {children}
        </main>
        <Toaster />
      </div>
    </>
  );
}
