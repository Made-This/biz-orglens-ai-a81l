"use client";

import { useState, type FormEvent } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

export default function SettingsPage() {
  const user = useQuery(api.users.getCurrent);
  const workspaces = useQuery(api.workspaces.listForUser);
  const createWorkspace = useMutation(api.workspaces.create);
  const updateWorkspace = useMutation(api.workspaces.update);
  const { toast } = useToast();

  const [isSaving, setIsSaving] = useState(false);
  const [workspaceName, setWorkspaceName] = useState("");
  const [workspaceSlug, setWorkspaceSlug] = useState("");
  const [editName, setEditName] = useState("");

  const isLoading = user === undefined || workspaces === undefined;
  const workspace = workspaces?.[0];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Manage your workspace settings
          </p>
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  async function handleCreateWorkspace(e: FormEvent) {
    e.preventDefault();
    if (!workspaceName.trim()) return;

    setIsSaving(true);
    try {
      const slug =
        workspaceSlug.trim() ||
        workspaceName
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");

      await createWorkspace({ name: workspaceName.trim(), slug });
      toast({
        title: "Workspace created",
        description: "Your workspace is ready to use.",
      });
      setWorkspaceName("");
      setWorkspaceSlug("");
    } catch (error: unknown) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to create workspace",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  }

  async function handleUpdateWorkspace(e: FormEvent) {
    e.preventDefault();
    if (!workspace || !editName.trim()) return;

    setIsSaving(true);
    try {
      await updateWorkspace({
        workspaceId: workspace._id,
        name: editName.trim(),
      });
      toast({
        title: "Settings saved",
        description: "Your workspace settings have been updated.",
      });
    } catch (error: unknown) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to update workspace",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  }

  // If no workspace exists, show create form
  if (!workspace) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Create your first workspace to get started
          </p>
        </div>

        <Card className="mx-auto max-w-lg">
          <CardHeader>
            <CardTitle>Create Workspace</CardTitle>
            <CardDescription>
              Set up your team workspace to start collaborating.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateWorkspace} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="workspaceName">Workspace Name</Label>
                <Input
                  id="workspaceName"
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  placeholder="My Company"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workspaceSlug">URL Slug (optional)</Label>
                <Input
                  id="workspaceSlug"
                  value={workspaceSlug}
                  onChange={(e) => setWorkspaceSlug(e.target.value)}
                  placeholder="my-company"
                />
                <p className="text-xs text-muted-foreground">
                  Auto-generated from name if left blank.
                </p>
              </div>
              <Button type="submit" disabled={isSaving}>
                {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
                Create Workspace
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Workspace exists — show settings
  if (!editName && workspace.name) {
    // Initialize edit form once
    setTimeout(() => setEditName(workspace.name), 0);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your workspace settings
        </p>
      </div>

      <Card className="mx-auto max-w-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Workspace</CardTitle>
            <Badge variant="secondary" className="capitalize">
              {workspace.plan}
            </Badge>
          </div>
          <CardDescription>
            Slug: <code className="text-xs">{workspace.slug}</code>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdateWorkspace} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="editName">Workspace Name</Label>
              <Input
                id="editName"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="My Company"
                required
              />
            </div>
            <Button type="submit" disabled={isSaving}>
              {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
