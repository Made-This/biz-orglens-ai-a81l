"use client";

import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import {
  Building2,
  Users,
  Crown,
  Activity,
  ExternalLink,
} from "lucide-react";
import { AdminHeader, StatsCard } from "@/components/admin";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export default function AdminDashboardPage() {
  const stats = useQuery(api.workspaces.getStats);

  const isLoading = stats === undefined;

  if (isLoading) {
    return (
      <div className="space-y-8">
        <AdminHeader title="Dashboard" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <AdminHeader
        title="Dashboard"
        description="Platform overview and key metrics"
        action={
          <Button asChild variant="outline" size="sm">
            <Link href="/" target="_blank">
              <ExternalLink className="h-4 w-4" />
              View Site
            </Link>
          </Button>
        }
      />

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Workspaces"
          value={(stats?.totalWorkspaces ?? 0).toString()}
          icon={Building2}
        />
        <StatsCard
          title="Total Users"
          value={(stats?.totalUsers ?? 0).toString()}
          icon={Users}
        />
        <StatsCard
          title="Pro Workspaces"
          value={(stats?.proWorkspaces ?? 0).toString()}
          icon={Crown}
          description="Paid subscriptions"
        />
        <StatsCard
          title="Active Workspaces"
          value={(stats?.activeWorkspaces ?? 0).toString()}
          icon={Activity}
          description="Active or trialing"
        />
      </div>
    </div>
  );
}
