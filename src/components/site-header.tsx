"use client";

import { useState } from "react";
import Link from "next/link";
import { useConvexAuth } from "convex/react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

interface SiteHeaderProps {
  productName?: string;
  logoUrl?: string;
  className?: string;
}

// Primary nav for the commercial OrgLens AI site.
// "Get My Analysis" is rendered separately as a filled CTA button.
// "My Workspace" only renders for authenticated users.
// "Demo Report" always links to the public demo at /demo.
const baseNavLinks = [
  { label: "Home", href: "/" },
  { label: "Demo Report", href: "/demo" },
  { label: "Use Cases", href: "/use-cases" },
  { label: "Pricing", href: "/pricing" },
  { label: "Insights", href: "/insights" },
  { label: "Newsletter", href: "/newsletter" },
  { label: "Responsible AI", href: "/responsible-ai" },
];

export function SiteHeader({
  productName,
  logoUrl,
  className,
}: SiteHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useConvexAuth();

  const navLinks = baseNavLinks;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-[#1E1E24] bg-[#0A0A0B]/80 backdrop-blur-xl",
        className
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          {logoUrl ? (
            <img src={logoUrl} alt={productName ?? "OrgLens AI"} className="h-8 w-auto" />
          ) : (
            <span className="text-lg font-bold tracking-tight text-white">
              OrgLens<span className="text-indigo-400">.</span>AI
            </span>
          )}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          {isAuthenticated && (
            <Link
              href="/app/workspace"
              className="text-sm font-medium text-indigo-300 transition-colors hover:text-white"
            >
              My Workspace
            </Link>
          )}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/get-analysis"
            className="rounded-full bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-[0_0_30px_-5px_rgba(99,102,241,0.6)] transition-all hover:bg-indigo-400"
          >
            Get My Analysis
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="inline-flex items-center justify-center rounded-md p-2 text-zinc-400 hover:bg-[#16161A] hover:text-white lg:hidden"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-[#1E1E24] lg:hidden">
          <nav className="mx-auto max-w-7xl space-y-1 px-4 py-3 sm:px-6 lg:px-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-md px-3 py-2 text-base font-medium text-zinc-400 transition-colors hover:bg-[#16161A] hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated && (
              <Link
                href="/app/workspace"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-md px-3 py-2 text-base font-medium text-indigo-300 transition-colors hover:bg-[#16161A] hover:text-white"
              >
                My Workspace
              </Link>
            )}
            <Link
              href="/get-analysis"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 block rounded-md bg-indigo-500 px-3 py-2 text-base font-semibold text-white transition-colors hover:bg-indigo-400"
            >
              Get My Analysis
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
