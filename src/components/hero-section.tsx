import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  className?: string;
}

export function HeroSection({
  title = "Build something amazing",
  subtitle = "Everything you need to launch, grow, and scale your business.",
  ctaText = "Get Started",
  ctaLink = "/sign-up",
  secondaryCtaText = "Learn More",
  secondaryCtaLink = "/pricing",
  className,
}: HeroSectionProps) {
  return (
    <section
      className={cn(
        "relative flex min-h-[70vh] w-full items-center justify-center overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/20" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          {subtitle}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="text-base">
            <Link href={ctaLink}>{ctaText}</Link>
          </Button>
          {secondaryCtaText && secondaryCtaLink && (
            <Button asChild variant="outline" size="lg" className="text-base">
              <Link href={secondaryCtaLink}>{secondaryCtaText}</Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
