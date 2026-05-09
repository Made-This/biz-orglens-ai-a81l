"use client";

import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { AdminHeader } from "@/components/admin";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/empty-state";
import { Users } from "lucide-react";

export default function UsersPage() {
  const users = useQuery(api.users.listAll);

  if (users === undefined) {
    return (
      <div className="space-y-6">
        <AdminHeader title="Users" />
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
        title="Users"
        description={`${users.length} registered users`}
      />

      {users.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No users yet"
          description="Users will appear here when they sign up."
        />
      ) : (
        <div className="space-y-3">
          {users.map((user) => (
            <Card key={user._id}>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name ?? "User"}
                      className="h-8 w-8 rounded-full"
                    />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-medium">
                      {(user.name ?? user.email ?? "U").charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="font-medium">
                      {user.name ?? "Unnamed User"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {user.email ?? "No email"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {user.role && (
                    <Badge variant="secondary" className="capitalize">
                      {user.role}
                    </Badge>
                  )}
                  <span className="text-xs text-muted-foreground">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : ""}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
