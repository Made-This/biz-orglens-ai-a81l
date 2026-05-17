"use client";

import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import posthog from "posthog-js";
import { decorateCheckoutUrl } from "@/lib/posthog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Check, CreditCard, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "$0",
    features: ["1 workspace", "Up to 3 team members", "Basic analytics"],
  },
  {
    name: "Pro",
    price: "$29/mo",
    features: [
      "Unlimited workspaces",
      "Up to 20 team members",
      "Advanced analytics",
      "Priority support",
      "Custom branding",
    ],
  },
  {
    name: "Enterprise",
    price: "$99/mo",
    features: [
      "Everything in Pro",
      "Unlimited team members",
      "SSO & SAML",
      "Dedicated support",
      "SLA guarantee",
    ],
  },
];

export default function BillingPage() {
  const workspaces = useQuery(api.workspaces.listForUser);

  const isLoading = workspaces === undefined;
  const workspace = workspaces?.[0];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Billing</h1>
          <p className="text-sm text-muted-foreground">
            Manage your subscription
          </p>
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  if (!workspace) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Billing</h1>
          <p className="text-sm text-muted-foreground">
            Create a workspace first to manage billing.
          </p>
        </div>
        <Button asChild>
          <Link href="/app/settings">Create Workspace</Link>
        </Button>
      </div>
    );
  }

  const currentPlan = workspace.plan;
  const trialEnd = workspace.trialEndsAt
    ? new Date(workspace.trialEndsAt)
    : null;
  const isTrialing = workspace.subscriptionStatus === "trialing";
  const daysLeft =
    trialEnd && isTrialing
      ? Math.max(
          0,
          Math.ceil(
            (trialEnd.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
          )
        )
      : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Billing</h1>
        <p className="text-sm text-muted-foreground">
          Manage your subscription and billing
        </p>
      </div>

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Current Plan
              </CardTitle>
              <CardDescription className="mt-1">
                {workspace.name}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="capitalize">{currentPlan}</Badge>
              {isTrialing && (
                <Badge variant="secondary">{daysLeft} days left</Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isTrialing && (
            <p className="mb-4 text-sm text-muted-foreground">
              Your trial ends on{" "}
              <strong>{trialEnd?.toLocaleDateString()}</strong>. Upgrade to keep
              access to all features.
            </p>
          )}
          {workspace.checkoutUrl && (
            <Button asChild>
              <a
                href={decorateCheckoutUrl(workspace.checkoutUrl)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  posthog.capture("begin_checkout", {
                    current_plan: currentPlan,
                    $groups: { business: process.env.NEXT_PUBLIC_BUSINESS_ID },
                  })
                }
              >
                Upgrade Plan
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </Button>
          )}
          {!workspace.checkoutUrl && currentPlan === "free" && (
            <p className="text-sm text-muted-foreground">
              Contact your platform administrator to upgrade your plan.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Plan Comparison */}
      <div className="grid gap-4 sm:grid-cols-3">
        {plans.map((plan) => {
          const isCurrent =
            plan.name.toLowerCase() === currentPlan.toLowerCase();
          return (
            <Card
              key={plan.name}
              className={isCurrent ? "border-primary" : ""}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{plan.name}</h3>
                  {isCurrent && <Badge>Current</Badge>}
                </div>
                <p className="mt-1 text-2xl font-bold">{plan.price}</p>
                <ul className="mt-4 space-y-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
