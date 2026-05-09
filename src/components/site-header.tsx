"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useConvexAuth } from "convex/react";

interface SiteHeaderProps {
  productName?: string;
  logoUrl?: string;
  className?: string;
}

const navLinks = [
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export function SiteHeader({
  productName = "SaaS App",
  logoUrl,
  className,
}: SiteHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useConvexAuth();

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo / Product Name */}
        <Link href="/" className="flex items-center gap-2">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={productName}
              className="h-8 w-auto"
            />
          ) : (
            <span className="text-xl font-bold text-foreground">
              {productName}
            </span>
          )}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          {isAuthenticated ? (
            <Button size="sm" asChild>
              <Link href="/app">Dashboard</Link>
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/sign-up">Get Started</Link>
              </Button>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground md:hidden"
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
        <div className="border-t border-border md:hidden">
          <nav className="mx-auto max-w-7xl space-y-1 px-4 py-3 sm:px-6 lg:px-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <Link
                href="/app"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-md px-3 py-2 text-base font-medium text-primary transition-colors hover:bg-accent"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-md px-3 py-2 text-base font-medium text-primary transition-colors hover:bg-accent"
                >
                  Get Started
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
