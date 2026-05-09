import { cn } from "@/lib/utils";
import Link from "next/link";

interface SiteFooterProps {
  productName?: string;
  supportEmail?: string;
  footerText?: string;
  className?: string;
}

export function SiteFooter({
  productName = "SaaS App",
  supportEmail,
  footerText,
  className,
}: SiteFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "border-t border-border bg-background",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <p className="text-lg font-semibold text-foreground">
              {productName}
            </p>
            {footerText && (
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                {footerText}
              </p>
            )}
          </div>

          {/* Product */}
          <div>
            <p className="text-sm font-semibold text-foreground">Product</p>
            <nav className="mt-3 space-y-2">
              <Link
                href="/pricing"
                className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Pricing
              </Link>
              <Link
                href="/blog"
                className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Blog
              </Link>
              <Link
                href="/about"
                className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                About
              </Link>
            </nav>
          </div>

          {/* Support */}
          <div>
            <p className="text-sm font-semibold text-foreground">Support</p>
            <nav className="mt-3 space-y-2">
              {supportEmail && (
                <a
                  href={`mailto:${supportEmail}`}
                  className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {supportEmail}
                </a>
              )}
              <Link
                href="/sign-in"
                className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Sign In
              </Link>
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-border pt-8 text-center sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} {productName}. All rights reserved.
          </p>
          <a
            href="https://madethis.com"
            target="_blank"
            rel="noreferrer"
            className="text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
          >
            Built with MadeThis
          </a>
        </div>
      </div>
    </footer>
  );
}
