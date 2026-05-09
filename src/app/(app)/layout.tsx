"use client";

import { AppSidebar } from "@/components/app/app-sidebar";
import { Toaster } from "@/components/ui/toaster";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-white text-[#111827]">
      <AppSidebar />
      <main className="flex-1 overflow-y-auto px-6 pb-12 pt-16 md:px-10 md:pt-10">
        {children}
      </main>
      <Toaster />
    </div>
  );
}
