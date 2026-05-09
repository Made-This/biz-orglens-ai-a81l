"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { AdminHeader } from "@/components/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { useParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function EditBlogPostPage() {
  const params = useParams();
  const postId = params.id as string;
  const post = useQuery(api.blogPosts.getById, { id: postId as any });
  const updatePost = useMutation(api.blogPosts.update);
  const { toast } = useToast();
  const router = useRouter();

  const [isSaving, setIsSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (post && !initialized) {
      setTitle(post.title);
      setSlug(post.slug);
      setExcerpt(post.excerpt ?? "");
      setContent(post.content);
      setStatus(post.status);
      setInitialized(true);
    }
  }, [post, initialized]);

  if (post === undefined) {
    return (
      <div className="space-y-6">
        <AdminHeader title="Edit Post" />
        <Skeleton className="mx-auto h-96 max-w-2xl" />
      </div>
    );
  }

  if (post === null) {
    return (
      <div className="space-y-6">
        <AdminHeader title="Post Not Found" />
        <p className="text-muted-foreground">
          This blog post could not be found.
        </p>
        <Button asChild>
          <a href="/admin/blog">Back to Blog</a>
        </Button>
      </div>
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setIsSaving(true);
    try {
      await updatePost({
        id: postId as any,
        title: title.trim(),
        slug: slug.trim(),
        content: content.trim(),
        excerpt: excerpt.trim() || undefined,
        status,
      });

      toast({
        title: "Post updated",
        description: "Your changes have been saved.",
      });

      router.push("/admin/blog");
    } catch (error: unknown) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to update post",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <AdminHeader title="Edit Post" />

      <Card className="mx-auto max-w-2xl">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">URL Slug</Label>
              <Input
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Input
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content (Markdown)</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={12}
                required
              />
            </div>

            <div className="flex items-center gap-4 pt-4">
              <Button
                type="submit"
                disabled={isSaving}
                onClick={() => setStatus("published")}
              >
                {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
                {post.status === "published" ? "Update" : "Publish"}
              </Button>
              <Button
                type="submit"
                variant="outline"
                disabled={isSaving}
                onClick={() => setStatus("draft")}
              >
                Save as Draft
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
