import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import { Providers } from "@/lib/convex";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "OrgLens AI — Organizational Decision Intelligence for Founders",
  description:
    "AI-powered competency intelligence. Compare restructuring scenarios, rank role-fit, and understand organizational capability — in minutes.",
  openGraph: {
    title: "OrgLens AI — Organizational Decision Intelligence for Founders",
    description:
      "AI-powered competency intelligence. Compare restructuring scenarios, rank role-fit, and understand organizational capability — in minutes.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OrgLens AI — Organizational Decision Intelligence for Founders",
    description:
      "AI-powered competency intelligence. Compare restructuring scenarios, rank role-fit, and understand organizational capability — in minutes.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en">
        <body className={`${inter.variable} font-sans antialiased`}>
          <Providers>
            {children}
            <Toaster />
          </Providers>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
