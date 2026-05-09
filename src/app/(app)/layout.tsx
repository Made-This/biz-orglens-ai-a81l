"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useConvexAuth } from "convex/react";
import { AppSidebar } from "@/components/app/app-sidebar";
import { Toaster } from "@/components/ui/toaster";
import { DemoBanner } from "@/components/DemoBanner";

function AppGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();
  const [demoMode, setDemoMode] = useState<boolean | null>(null);

  // Read the demo flag once on the client.
  useEffect(() => {
    try {
      setDemoMode(
        window.localStorage.getItem("orglens_demo_mode") === "true"
      );
    } catch {
      setDemoMode(false);
    }
  }, []);

  // Redirect unauthenticated, non-demo users to /sign-in.
  useEffect(() => {
    if (isLoading || demoMode === null) return;
    if (!isAuthenticated && !demoMode) {
      router.replace("/sign-in");
    }
  }, [isLoading, isAuthenticated, demoMode, router]);

  // Holding state while we figure out auth + localStorage.
  if (isLoading || demoMode === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0A0A0B] text-zinc-500">
        <span className="text-xs uppercase tracking-widest">Loading…</span>
      </div>
    );
  }

  // Not authenticated and not demo — show nothing while redirect kicks in.
  if (!isAuthenticated && !demoMode) {
    return null;
  }

  return (
    <>
      {demoMode && <DemoBanner />}
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

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppGuard>{children}</AppGuard>;
}
