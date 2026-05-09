"use client";

import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { AdminHeader } from "@/components/admin";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/empty-state";
import { Building2 } from "lucide-react";

export default function WorkspacesPage() {
  const workspaces = useQuery(api.workspaces.listAll);

  if (workspaces === undefined) {
    return (
      <div className="space-y-6">
        <AdminHeader title="Workspaces" />
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-16" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Workspaces"
        description={`${workspaces.length} total workspaces`}
      />

      {workspaces.length === 0 ? (
        <EmptyState
          icon={Building2}
          title="No workspaces yet"
          description="Workspaces will appear here when users create them."
        />
      ) : (
        <div className="space-y-3">
          {workspaces.map((ws) => (
            <Card key={ws._id}>
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <p className="font-medium">{ws.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Slug: {ws.slug} &middot; {ws.memberCount} member
                    {ws.memberCount !== 1 ? "s" : ""}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="capitalize">
                    {ws.plan}
                  </Badge>
                  {ws.subscriptionStatus && (
                    <Badge
                      variant={
                        ws.subscriptionStatus === "active"
                          ? "default"
                          : "outline"
                      }
                      className="capitalize"
                    >
                      {ws.subscriptionStatus}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
