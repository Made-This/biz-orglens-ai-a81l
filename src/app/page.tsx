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
    title: "Psychometric Report Parsing",
    description: "Automatically parse HUCAMA psychometric reports and extract structured competency signals in seconds.",
    icon: "Zap",
  },
  {
    title: "Great 8 Competency Model",
    description: "Score every team member against the industry-standard Great 8 competency framework with AI precision.",
    icon: "Users",
  },
  {
    title: "Competency Org Heatmap",
    description: "Visualize organizational strengths and gaps across your entire team with an interactive competency heatmap.",
    icon: "BarChart3",
  },
  {
    title: "Role-Fit Scoring Engine",
    description: "Match candidates and current team members to roles using a calibrated, data-driven fit score.",
    icon: "Shield",
  },
  {
    title: "Scenario Generator",
    description: "Simulate org restructures, hiring decisions, and team configurations before you commit.",
    icon: "Globe",
  },
  {
    title: "Founder Memo Export",
    description: "Export McKinsey-style organizational intelligence memos ready to share with your board or investors.",
    icon: "Headphones",
  },
];

const faqItems = [
  {
    question: "What is a HUCAMA psychometric report?",
    answer:
      "HUCAMA is a leading psychometric assessment provider. OrgLens AI parses their PDF reports and maps results to the Great 8 competency framework automatically, saving hours of manual analysis.",
  },
  {
    question: "What does the $49 plan include?",
    answer:
      "The $49 plan unlocks full access to the role-fit scoring engine, competency org heatmap, scenario generator, and unlimited founder memo exports. Everything you need to make confident talent decisions.",
  },
  {
    question: "How accurate is the AI competency scoring?",
    answer:
      "Our models are trained on the validated Great 8 framework and cross-referenced against HUCAMA's psychometric methodology. Each score includes a confidence indicator and is fully auditable.",
  },
  {
    question: "Can I use OrgLens AI for hiring decisions?",
    answer:
      "Yes. The role-fit scoring engine is designed to support structured hiring, internal mobility, and team design decisions. We recommend using scores as one input alongside human judgment.",
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <HeroSection
          ctaText="Start Analyzing"
          ctaLink="/sign-up"
          secondaryCtaText="See Pricing"
          secondaryCtaLink="/pricing"
        />

        {/* Features Grid */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Organizational intelligence, built for founders
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Turn psychometric data into strategic clarity. OrgLens AI gives you the same talent analytics that top consulting firms charge six figures for.
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
                Start free and unlock full organizational intelligence when you&apos;re ready.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Free */}
              <Card className="relative">
                <CardContent className="p-8">
                  <h3 className="text-lg font-semibold">Free</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Explore the platform
                  </p>
                  <p className="mt-6">
                    <span className="text-4xl font-bold">$0</span>
                    <span className="text-muted-foreground">/month</span>
                  </p>
                  <ul className="mt-8 space-y-3">
                    {["1 org profile", "Up to 5 team members", "Basic competency overview", "Community support"].map((f) => (
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
                    Full intelligence for growing teams
                  </p>
                  <p className="mt-6">
                    <span className="text-4xl font-bold">$49</span>
                    <span className="text-muted-foreground">/month</span>
                  </p>
                  <ul className="mt-8 space-y-3">
                    {[
                      "Unlimited org profiles",
                      "Full Great 8 competency scoring",
                      "Competency org heatmap",
                      "Role-fit scoring engine",
                      "Scenario generator",
                      "Founder memo export",
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
                    For larger organizations
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
              Everything you need to know about OrgLens AI.
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
              Know your organization. Build with confidence.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Join founders and SME leaders using OrgLens AI to make smarter talent and structure decisions — backed by data, not instinct.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="text-base">
                <Link href="/sign-up">
                  Start Analyzing
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
