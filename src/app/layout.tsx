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
  title: "SaaS App",
  description: "The smarter way to grow your business",
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
