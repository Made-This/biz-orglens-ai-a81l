import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeroSection } from "@/components/hero-section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Zap,
  Users,
  BarChart3,
  Shield,
  Globe,
  Headphones,
  Check,
  ArrowRight,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap,
  Users,
  BarChart3,
  Shield,
  Globe,
  Headphones,
};

const features = [
  {
    title: "Lightning Fast Setup",
    description: "Get started in minutes with our intuitive onboarding process.",
    icon: "Zap",
  },
  {
    title: "Team Collaboration",
    description: "Invite your team and work together in real-time.",
    icon: "Users",
  },
  {
    title: "Powerful Analytics",
    description: "Track your growth with real-time dashboards and reports.",
    icon: "BarChart3",
  },
  {
    title: "Enterprise Security",
    description: "Bank-grade encryption and SOC 2 compliant infrastructure.",
    icon: "Shield",
  },
  {
    title: "Global Scale",
    description: "Deploy worldwide with automatic scaling and edge delivery.",
    icon: "Globe",
  },
  {
    title: "24/7 Support",
    description: "Expert support whenever you need it, across all time zones.",
    icon: "Headphones",
  },
];

const faqItems = [
  {
    question: "How does the free trial work?",
    answer:
      "Start with a 14-day free trial on any plan. No credit card required. You get full access to all features during the trial period.",
  },
  {
    question: "Can I change plans later?",
    answer:
      "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we prorate any billing adjustments.",
  },
  {
    question: "Is there a setup fee?",
    answer:
      "No, there are no setup fees. You only pay the monthly or annual subscription price for your chosen plan.",
  },
  {
    question: "How do I invite my team?",
    answer:
      "Once you create a workspace, go to Settings > Team to invite members by email. They will receive an invitation link to join.",
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <HeroSection
          ctaText="Get Started Free"
          ctaLink="/sign-up"
          secondaryCtaText="See Pricing"
          secondaryCtaLink="/pricing"
        />

        {/* Features Grid */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Everything you need to succeed
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Powerful features designed to help you build, launch, and grow
              your business.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => {
              const Icon = iconMap[feature.icon ?? ""] ?? Zap;
              return (
                <Card key={i} className="border-0 shadow-none bg-muted/30">
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Pricing Preview */}
        <section className="border-t border-border bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Simple, transparent pricing
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Start free and scale as you grow. No hidden fees.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Free */}
              <Card className="relative">
                <CardContent className="p-8">
                  <h3 className="text-lg font-semibold">Free</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    For individuals getting started
                  </p>
                  <p className="mt-6">
                    <span className="text-4xl font-bold">$0</span>
                    <span className="text-muted-foreground">/month</span>
                  </p>
                  <ul className="mt-8 space-y-3">
                    {["1 workspace", "Up to 3 team members", "Basic analytics", "Community support"].map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant="outline" className="mt-8 w-full">
                    <Link href="/sign-up">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Pro */}
              <Card className="relative border-primary shadow-lg">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    Most Popular
                  </span>
                </div>
                <CardContent className="p-8">
                  <h3 className="text-lg font-semibold">Pro</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    For growing teams
                  </p>
                  <p className="mt-6">
                    <span className="text-4xl font-bold">$29</span>
                    <span className="text-muted-foreground">/month</span>
                  </p>
                  <ul className="mt-8 space-y-3">
                    {[
                      "Unlimited workspaces",
                      "Up to 20 team members",
                      "Advanced analytics",
                      "Priority support",
                      "Custom branding",
                    ].map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="mt-8 w-full">
                    <Link href="/sign-up">Start Free Trial</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Enterprise */}
              <Card className="relative">
                <CardContent className="p-8">
                  <h3 className="text-lg font-semibold">Enterprise</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    For large organizations
                  </p>
                  <p className="mt-6">
                    <span className="text-4xl font-bold">$99</span>
                    <span className="text-muted-foreground">/month</span>
                  </p>
                  <ul className="mt-8 space-y-3">
                    {[
                      "Everything in Pro",
                      "Unlimited team members",
                      "SSO & SAML",
                      "Dedicated support",
                      "SLA guarantee",
                      "Custom integrations",
                    ].map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant="outline" className="mt-8 w-full">
                    <Link href="/sign-up">Contact Sales</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Everything you need to know about our platform.
            </p>
          </div>
          <div className="mt-12">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border bg-primary/5">
          <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Join thousands of teams already using our platform. Start your
              free trial today.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="text-base">
                <Link href="/sign-up">
                  Start Free Trial
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
