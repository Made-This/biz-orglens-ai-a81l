import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  const productName = "My SaaS";

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        About {productName}
      </h1>

      <div className="space-y-4 text-muted-foreground">
        <p>
          {productName} is a modern platform designed to help teams build,
          launch, and scale their businesses. We believe in simplicity,
          transparency, and putting our users first.
        </p>
        <p>
          Our mission is to remove the friction from building software products
          and let you focus on what matters most: serving your customers and
          growing your business.
        </p>
      </div>

      {/* CTA */}
      <div className="mt-16 rounded-lg border border-border bg-muted/30 p-8 text-center">
        <h2 className="text-xl font-semibold text-foreground">
          Ready to get started?
        </h2>
        <p className="mt-2 text-muted-foreground">
          Join teams already using {productName} to build better products.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Button asChild>
            <Link href="/sign-up">Get Started Free</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/pricing">See Pricing</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
