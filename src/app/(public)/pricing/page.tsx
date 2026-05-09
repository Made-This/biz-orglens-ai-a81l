"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Check, X as XIcon } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    description: "For individuals getting started",
    features: [
      { name: "1 workspace", included: true },
      { name: "Up to 3 team members", included: true },
      { name: "Basic analytics", included: true },
      { name: "Community support", included: true },
      { name: "Custom branding", included: false },
      { name: "Priority support", included: false },
      { name: "SSO & SAML", included: false },
      { name: "SLA guarantee", included: false },
    ],
    cta: "Get Started",
    ctaVariant: "outline" as const,
    popular: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "For growing teams",
    features: [
      { name: "Unlimited workspaces", included: true },
      { name: "Up to 20 team members", included: true },
      { name: "Advanced analytics", included: true },
      { name: "Priority support", included: true },
      { name: "Custom branding", included: true },
      { name: "API access", included: true },
      { name: "SSO & SAML", included: false },
      { name: "SLA guarantee", included: false },
    ],
    cta: "Start Free Trial",
    ctaVariant: "default" as const,
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "/month",
    description: "For large organizations",
    features: [
      { name: "Everything in Pro", included: true },
      { name: "Unlimited team members", included: true },
      { name: "Advanced analytics", included: true },
      { name: "Dedicated support", included: true },
      { name: "Custom branding", included: true },
      { name: "API access", included: true },
      { name: "SSO & SAML", included: true },
      { name: "SLA guarantee", included: true },
    ],
    cta: "Contact Sales",
    ctaVariant: "outline" as const,
    popular: false,
  },
];

const faqs = [
  {
    question: "Can I try before I buy?",
    answer:
      "Absolutely! Every plan comes with a 14-day free trial. No credit card required to start.",
  },
  {
    question: "What happens when my trial ends?",
    answer:
      "Your workspace will be downgraded to the Free plan. All your data will be preserved, but some features will be limited.",
  },
  {
    question: "Can I change plans at any time?",
    answer:
      "Yes! Upgrade or downgrade anytime. Plan changes take effect immediately. We prorate all billing adjustments.",
  },
  {
    question: "Do you offer annual billing?",
    answer:
      "Yes, we offer annual billing with a 20% discount. Contact sales for enterprise annual pricing.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express) through our secure payment processor.",
  },
];

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Pricing
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Choose the plan that fits your needs. Start free, upgrade when
          you&apos;re ready.
        </p>
      </div>

      {/* Plan Cards */}
      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={
              plan.popular ? "relative border-primary shadow-lg" : "relative"
            }
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge>Most Popular</Badge>
              </div>
            )}
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold">{plan.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {plan.description}
              </p>
              <p className="mt-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </p>

              <ul className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature.name}
                    className="flex items-start gap-2 text-sm"
                  >
                    {feature.included ? (
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    ) : (
                      <XIcon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/40" />
                    )}
                    <span
                      className={
                        feature.included ? "" : "text-muted-foreground/60"
                      }
                    >
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                variant={plan.ctaVariant}
                className="mt-8 w-full"
              >
                <Link href="/sign-up">{plan.cta}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* FAQ */}
      <div className="mx-auto mt-24 max-w-3xl">
        <h2 className="text-center text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Pricing FAQ
        </h2>
        <div className="mt-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
