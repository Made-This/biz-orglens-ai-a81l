import { AdminHeader } from "@/components/admin";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <AdminHeader
        title="Settings"
        description="Site configuration and branding"
      />

      <Card className="mx-auto max-w-2xl">
        <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <MessageSquare className="h-6 w-6 text-primary" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">
              Edit your site by chatting with your AI co-founder
            </h3>
            <p className="mx-auto max-w-md text-sm text-muted-foreground">
              Your branding, copy, and site configuration are managed directly
              in the source code. Chat with your AI co-founder to make changes.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
