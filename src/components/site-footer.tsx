import { cn } from "@/lib/utils";
import Link from "next/link";

interface SiteFooterProps {
  productName?: string;
  supportEmail?: string;
  footerText?: string;
  className?: string;
}

export function SiteFooter({
  productName = "OrgLens AI",
  supportEmail,
  footerText = "Organizational intelligence for founders.",
  className,
}: SiteFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "border-t border-[#1E1E24] bg-[#0A0A0B] text-zinc-400",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <p className="text-lg font-bold tracking-tight text-white">
              OrgLens<span className="text-indigo-400">.</span>AI
            </p>
            <p className="mt-2 text-sm text-zinc-500">{footerText}</p>
          </div>

          {/* Center links */}
          <div className="flex flex-col gap-2 md:items-center">
            <Link
              href="/#features"
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              Pricing
            </Link>
            <Link
              href="/sign-in"
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              Sign Up
            </Link>
            {supportEmail && (
              <a
                href={`mailto:${supportEmail}`}
                className="text-sm text-zinc-400 transition-colors hover:text-white"
              >
                {supportEmail}
              </a>
            )}
          </div>

          {/* Right tagline */}
          <div className="md:text-right">
            <p className="text-sm text-zinc-500">
              Built for founders who make hard decisions.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-[#1E1E24] pt-6 sm:flex-row">
          <p className="text-xs text-zinc-600">
            © {currentYear} {productName}. All rights reserved.
          </p>
          <p className="text-xs text-zinc-600">
            Competency science, made accessible.
          </p>
        </div>

        {/* Built with MadeThis */}
        <div className="text-center py-3 pb-2 opacity-50 text-xs">
          <a
            href="https://madethis.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-current no-underline inline-flex items-center gap-1 hover:opacity-75 transition-opacity"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            Built with MadeThis
          </a>
        </div>
      </div>
    </footer>
  );
}
