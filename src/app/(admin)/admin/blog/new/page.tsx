"use client";

import { useState, type FormEvent } from "react";
import { useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { AdminHeader } from "@/components/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function NewBlogPostPage() {
  const createPost = useMutation(api.blogPosts.create);
  const { toast } = useToast();
  const router = useRouter();

  const [isSaving, setIsSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setIsSaving(true);
    try {
      const postSlug =
        slug.trim() ||
        title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");

      await createPost({
        title: title.trim(),
        slug: postSlug,
        content: content.trim(),
        excerpt: excerpt.trim() || undefined,
        status,
      });

      toast({
        title: "Post created",
        description:
          status === "published"
            ? "Your post has been published."
            : "Your draft has been saved.",
      });

      router.push("/admin/blog");
    } catch (error: unknown) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to create post",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <AdminHeader title="New Blog Post" />

      <Card className="mx-auto max-w-2xl">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="My Awesome Post"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">URL Slug (optional)</Label>
              <Input
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="my-awesome-post"
              />
              <p className="text-xs text-muted-foreground">
                Auto-generated from title if left blank.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt (optional)</Label>
              <Input
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="A brief summary of the post..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content (Markdown)</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your post content here..."
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
                Publish
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
