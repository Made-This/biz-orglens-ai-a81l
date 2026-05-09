"use client";

import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Circle,
  Users,
  Settings,
  CreditCard,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

interface ChecklistItem {
  id: string;
  label: string;
  description: string;
  href: string;
  completed: boolean;
}

export default function AppDashboardPage() {
  const user = useQuery(api.users.getCurrent);
  const workspaces = useQuery(api.workspaces.listForUser);

  const isLoading = user === undefined || workspaces === undefined;

  if (isLoading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  const workspace = workspaces?.[0];
  const hasWorkspace = !!workspace;
  const hasTeamMembers = workspace && workspace.memberCount > 1;

  const checklist: ChecklistItem[] = [
    {
      id: "create-account",
      label: "Create your account",
      description: "Sign up and verify your email",
      href: "/app",
      completed: !!user,
    },
    {
      id: "create-workspace",
      label: "Create a workspace",
      description: "Set up your team workspace",
      href: "/app/settings",
      completed: hasWorkspace,
    },
    {
      id: "invite-team",
      label: "Invite your team",
      description: "Add team members to collaborate",
      href: "/app/settings/team",
      completed: !!hasTeamMembers,
    },
    {
      id: "choose-plan",
      label: "Choose a plan",
      description: "Upgrade to unlock all features",
      href: "/app/settings/billing",
      completed: workspace?.plan !== "free",
    },
  ];

  const completedCount = checklist.filter((item) => item.completed).length;
  const progressPercent = Math.round(
    (completedCount / checklist.length) * 100
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Welcome{user?.name ? `, ${user.name}` : ""}!
        </h1>
        <p className="text-sm text-muted-foreground">
          Here&apos;s what&apos;s happening with your workspace.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-md bg-primary/10 p-2.5">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Team Members
                </p>
                <p className="text-2xl font-bold">
                  {workspace?.memberCount ?? 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-md bg-primary/10 p-2.5">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Current Plan
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold capitalize">
                    {workspace?.plan ?? "Free"}
                  </p>
                  {workspace?.subscriptionStatus === "trialing" && (
                    <Badge variant="secondary">Trial</Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-md bg-primary/10 p-2.5">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Setup Progress
                </p>
                <p className="text-2xl font-bold">{progressPercent}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Getting Started Checklist */}
      {progressPercent < 100 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              Getting Started
              <Badge variant="secondary">
                {completedCount}/{checklist.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Progress bar */}
            <div className="mb-6 h-2 rounded-full bg-muted">
              <div
                className="h-2 rounded-full bg-primary transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="space-y-4">
              {checklist.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg border border-border p-4"
                >
                  <div className="flex items-start gap-3">
                    {item.completed ? (
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    ) : (
                      <Circle className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
                    )}
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          item.completed
                            ? "text-muted-foreground line-through"
                            : "text-foreground"
                        }`}
                      >
                        {item.label}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  {!item.completed && (
                    <Button asChild variant="ghost" size="sm">
                      <Link href={item.href}>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Button asChild variant="outline" className="h-auto justify-start p-4">
              <Link href="/app/settings">
                <Settings className="mr-3 h-5 w-5 text-muted-foreground" />
                <div className="text-left">
                  <p className="font-medium">Workspace Settings</p>
                  <p className="text-xs text-muted-foreground">
                    Configure your workspace
                  </p>
                </div>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto justify-start p-4">
              <Link href="/app/settings/team">
                <Users className="mr-3 h-5 w-5 text-muted-foreground" />
                <div className="text-left">
                  <p className="font-medium">Manage Team</p>
                  <p className="text-xs text-muted-foreground">
                    Invite and manage members
                  </p>
                </div>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto justify-start p-4">
              <Link href="/app/settings/billing">
                <CreditCard className="mr-3 h-5 w-5 text-muted-foreground" />
                <div className="text-left">
                  <p className="font-medium">Billing</p>
                  <p className="text-xs text-muted-foreground">
                    Manage your subscription
                  </p>
                </div>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
