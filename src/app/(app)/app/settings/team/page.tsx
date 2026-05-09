"use client";

import { useState, type FormEvent } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, UserPlus, Trash2, Mail } from "lucide-react";
import type { Id } from "@convex/_generated/dataModel";

export default function TeamPage() {
  const user = useQuery(api.users.getCurrent);
  const workspaces = useQuery(api.workspaces.listForUser);
  const workspace = workspaces?.[0];

  const members = useQuery(
    api.workspaceMembers.listByWorkspace,
    workspace ? { workspaceId: workspace._id } : "skip"
  );
  const invitations = useQuery(
    api.invitations.listByWorkspace,
    workspace ? { workspaceId: workspace._id } : "skip"
  );

  const createInvitation = useMutation(api.invitations.create);
  const revokeInvitation = useMutation(api.invitations.revoke);
  const updateRole = useMutation(api.workspaceMembers.updateRole);
  const removeMember = useMutation(api.workspaceMembers.remove);
  const { toast } = useToast();

  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<"admin" | "member">("member");
  const [isSending, setIsSending] = useState(false);

  const isLoading =
    user === undefined ||
    workspaces === undefined ||
    members === undefined ||
    invitations === undefined;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Team</h1>
          <p className="text-sm text-muted-foreground">
            Manage your team members
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
          <h1 className="text-2xl font-bold tracking-tight">Team</h1>
          <p className="text-sm text-muted-foreground">
            Create a workspace first to manage team members.
          </p>
        </div>
        <Button asChild>
          <a href="/app/settings">Create Workspace</a>
        </Button>
      </div>
    );
  }

  // Determine current user's role
  const currentMembership = members?.find(
    (m) => user && m.userId === user._id
  );
  const canManage =
    currentMembership?.role === "owner" || currentMembership?.role === "admin";

  async function handleInvite(e: FormEvent) {
    e.preventDefault();
    if (!inviteEmail.trim() || !workspace) return;

    setIsSending(true);
    try {
      await createInvitation({
        workspaceId: workspace._id,
        email: inviteEmail.trim(),
        role: inviteRole,
      });
      toast({
        title: "Invitation sent",
        description: `Invited ${inviteEmail} as ${inviteRole}`,
      });
      setInviteEmail("");
    } catch (error: unknown) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to send invitation",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  }

  async function handleRoleChange(
    memberId: Id<"workspaceMembers">,
    newRole: "admin" | "member"
  ) {
    try {
      await updateRole({ memberId, role: newRole });
      toast({ title: "Role updated" });
    } catch (error: unknown) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to update role",
        variant: "destructive",
      });
    }
  }

  async function handleRemoveMember(memberId: Id<"workspaceMembers">) {
    try {
      await removeMember({ memberId });
      toast({ title: "Member removed" });
    } catch (error: unknown) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to remove member",
        variant: "destructive",
      });
    }
  }

  async function handleRevokeInvitation(invitationId: Id<"invitations">) {
    try {
      await revokeInvitation({ invitationId });
      toast({ title: "Invitation revoked" });
    } catch (error: unknown) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to revoke invitation",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Team</h1>
        <p className="text-sm text-muted-foreground">
          Manage members of <strong>{workspace.name}</strong>
        </p>
      </div>

      {/* Invite Form */}
      {canManage && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <UserPlus className="h-5 w-5" />
              Invite Team Member
            </CardTitle>
            <CardDescription>
              Send an invitation by email. They will receive a link to join.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleInvite}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <div className="flex-1 space-y-1">
                <Label htmlFor="inviteEmail" className="sr-only">
                  Email
                </Label>
                <Input
                  id="inviteEmail"
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="colleague@company.com"
                  required
                />
              </div>
              <Select
                value={inviteRole}
                onValueChange={(v) => setInviteRole(v as "admin" | "member")}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
              <Button type="submit" disabled={isSending}>
                {isSending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Mail className="h-4 w-4" />
                )}
                Invite
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Members List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Members ({members?.length ?? 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {members?.map((member) => (
              <div
                key={member._id}
                className="flex items-center justify-between rounded-lg border border-border p-3"
              >
                <div className="flex items-center gap-3">
                  {member.userImageUrl ? (
                    <img
                      src={member.userImageUrl}
                      alt={member.userName}
                      className="h-8 w-8 rounded-full"
                    />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-medium">
                      {member.userName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium">{member.userName}</p>
                    <p className="text-xs text-muted-foreground">
                      {member.userEmail}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {member.role === "owner" ? (
                    <Badge>Owner</Badge>
                  ) : canManage ? (
                    <>
                      <Select
                        value={member.role}
                        onValueChange={(v) =>
                          handleRoleChange(
                            member._id,
                            v as "admin" | "member"
                          )
                        }
                      >
                        <SelectTrigger className="h-8 w-24 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="member">Member</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                        onClick={() => handleRemoveMember(member._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <Badge variant="secondary" className="capitalize">
                      {member.role}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pending Invitations */}
      {invitations && invitations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Pending Invitations ({invitations.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {invitations.map((inv) => (
                <div
                  key={inv._id}
                  className="flex items-center justify-between rounded-lg border border-border p-3"
                >
                  <div>
                    <p className="text-sm font-medium">{inv.email}</p>
                    <p className="text-xs text-muted-foreground capitalize">
                      Invited as {inv.role} &middot; Expires{" "}
                      {new Date(inv.expiresAt).toLocaleDateString()}
                    </p>
                  </div>
                  {canManage && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive"
                      onClick={() => handleRevokeInvitation(inv._id)}
                    >
                      Revoke
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
