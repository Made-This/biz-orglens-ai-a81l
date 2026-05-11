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

const OG_IMAGE_URL =
  "https://grandiose-goshawk-617.convex.cloud/api/storage/9cfc9d9b-c341-4f81-9bd8-bc31d6c256c2";
const SITE_URL = "https://orglens-ai.madethis.app";
const OG_TITLE = "OrgLens AI — Organizational Intelligence for Founders";
const OG_DESCRIPTION =
  "Map competencies, rank role fit, and make restructuring decisions in 5 minutes. AI-powered organizational intelligence for founders.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: OG_TITLE,
  description: OG_DESCRIPTION,
  openGraph: {
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    url: SITE_URL,
    type: "website",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "OrgLens AI — Organizational Intelligence dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    images: [OG_IMAGE_URL],
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
