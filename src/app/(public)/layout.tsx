import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dark flex min-h-screen flex-col bg-[#0A0A0B] text-zinc-100">
      <SiteHeader productName="OrgLens AI" />
      <main className="flex-1">{children}</main>
      <SiteFooter
        productName="OrgLens AI"
        footerText="Organizational intelligence for startups and SMEs with 10–150 employees."
      />
    </div>
  );
}
