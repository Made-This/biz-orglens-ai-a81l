import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader productName="My SaaS" />
      <main className="flex-1">{children}</main>
      <SiteFooter
        productName="My SaaS"
        footerText="The smarter way to grow your business"
      />
    </div>
  );
}
