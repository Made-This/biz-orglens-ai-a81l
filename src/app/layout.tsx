import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import { Providers } from "@/lib/convex";
import { Toaster } from "@/components/ui/toaster";
import { PostHogProvider } from "@/lib/posthog";
import "./globals.css";

const GSC_TOKEN = process.env.NEXT_PUBLIC_GSC_VERIFICATION_TOKEN;

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const OG_IMAGE_URL =
  "https://grandiose-goshawk-617.convex.cloud/api/storage/9cfc9d9b-c341-4f81-9bd8-bc31d6c256c2";
const SITE_URL = "https://orglens-ai.madethis.app";
const OG_TITLE = "OrgLens AI — Organizational Intelligence for Growing Teams";
const OG_DESCRIPTION =
  "OrgLens AI helps startups and SMEs with 10–150 employees turn team structure, role-fit signals, and leadership coverage into a clear organizational intelligence report.";

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
        <head>
          {GSC_TOKEN && (
            <meta name="google-site-verification" content={GSC_TOKEN} />
          )}
        </head>
        <body className={`${inter.variable} font-sans antialiased`}>
          <PostHogProvider>
            <Providers>
              {children}
              <Toaster />
            </Providers>
          </PostHogProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
