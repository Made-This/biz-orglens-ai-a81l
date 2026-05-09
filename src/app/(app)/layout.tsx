"use client";

import { AppSidebar } from "@/components/app/app-sidebar";
import { Toaster } from "@/components/ui/toaster";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dark flex min-h-screen bg-[#0A0A0B] text-zinc-100">
      <AppSidebar />
      <main className="flex-1 overflow-y-auto px-6 pb-12 pt-16 md:px-10 md:pt-10">
        {children}
      </main>
      <Toaster />
    </div>
  );
}
