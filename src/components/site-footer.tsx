import { cn } from "@/lib/utils";
import Link from "next/link";

interface SiteFooterProps {
  productName?: string;
  supportEmail?: string;
  footerText?: string;
  className?: string;
}

const FOUNDER_SNAPSHOT_CHECKOUT_URL =
  "https://grandiose-goshawk-617.convex.site/checkout/orglens-ai/md7aftkyt1kn4qx4mgpeg4w2ts86cse5";

const LEGAL_LINKS: Array<{ label: string; href: string }> = [
  { label: "Terms of Service", href: "/legal/terms" },
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Responsible AI", href: "/legal/responsible-ai" },
  { label: "Security", href: "/legal/security" },
  { label: "Refunds", href: "/legal/refunds" },
  { label: "Contact", href: "/contact" },
];

export function SiteFooter({
  productName = "OrgLens AI",
  supportEmail = "team@orglens-ai.madethis.app",
  className,
}: SiteFooterProps) {
  return (
    <footer
      className={cn(
        "border-t border-[#1E1E24] bg-[#0A0A0B] text-zinc-400",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Column 1 — Product */}
          <div>
            <p className="text-lg font-bold tracking-tight text-white">
              OrgLens<span className="text-indigo-400">.</span>AI
            </p>
            <p className="mt-2 max-w-xs text-sm text-zinc-500">
              Organizational intelligence for startups and SMEs with 10–150
              employees.
            </p>
            <p className="mt-3 max-w-xs text-xs leading-relaxed text-zinc-600">
              OrgLens AI helps growing teams turn team structure, role-fit
              signals, competency patterns, and leadership coverage into
              founder- and operator-ready organizational intelligence reports.
            </p>

            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
              Product
            </p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  href="/app/report"
                  className="text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  Demo Report
                </Link>
              </li>
              <li>
                <a
                  href={FOUNDER_SNAPSHOT_CHECKOUT_URL}
                  className="text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  Founder Snapshot
                </a>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  Full OrgLens Report
                </Link>
              </li>
              <li>
                <Link
                  href="/get-analysis"
                  className="text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  Founder Advisory Review
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 — Company */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
              Company
            </p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  href="/use-cases"
                  className="text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  Use Cases
                </Link>
              </li>
              <li>
                <Link
                  href="/insights"
                  className="text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  Insights
                </Link>
              </li>
              <li>
                <Link
                  href="/newsletter"
                  className="text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  Newsletter
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/responsible-ai"
                  className="text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  Responsible AI
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 — Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
              Contact
            </p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={`mailto:${supportEmail}`}
                  className="text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  {supportEmail}
                </a>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  Contact form
                </Link>
              </li>
              <li>
                <Link
                  href="/get-analysis"
                  className="text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  Get My Analysis
                </Link>
              </li>
            </ul>
            <p className="mt-6 text-xs text-zinc-600">© 2025 {productName}</p>
          </div>
        </div>

        {/* Legal links row */}
        <div className="mt-12 border-t border-[#1E1E24] pt-6">
          <nav
            aria-label="Legal"
            className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs text-zinc-500 sm:justify-start"
          >
            {LEGAL_LINKS.map((link, idx) => (
              <span key={link.href} className="inline-flex items-center gap-3">
                <Link
                  href={link.href}
                  className="transition-colors hover:text-indigo-300"
                >
                  {link.label}
                </Link>
                {idx < LEGAL_LINKS.length - 1 && (
                  <span className="text-zinc-700" aria-hidden="true">
                    ·
                  </span>
                )}
              </span>
            ))}
          </nav>

          {/* Legal disclaimer */}
          <p className="mt-5 max-w-4xl text-[11px] leading-relaxed text-zinc-600 sm:text-xs">
            OrgLens AI provides organizational intelligence reports for
            decision support. It does not make employment decisions and should
            not be used as the sole basis for hiring, firing, promotion,
            compensation, or other employment actions. Human judgment and
            applicable legal compliance remain the customer&rsquo;s
            responsibility.
          </p>
        </div>

        {/* Bottom row */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-[#1E1E24] pt-6 sm:flex-row">
          <p className="text-xs text-zinc-600">
            Decision-support tools for founders. No AI system makes employment
            decisions.
          </p>
          <Link
            href="/legal/responsible-ai"
            className="text-xs text-zinc-500 transition-colors hover:text-zinc-300"
          >
            See our Responsible AI commitment →
          </Link>
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
