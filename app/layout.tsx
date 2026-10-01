import type { Metadata, Viewport } from "next";

import { ThemeProvider } from "@/components/ThemeProvider";
import { site } from "@/lib/site";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.shortName}'s Portfolio`,
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
  applicationName: `${site.shortName}'s Portfolio`,
  authors: [{ name: site.name, url: site.github }],
  creator: site.name,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: `${site.shortName}'s Portfolio`,
    title: `${site.shortName}'s Portfolio`,
    description: site.description,
  },
  twitter: {
    card: "summary",
    title: `${site.shortName}'s Portfolio`,
    description: site.description,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f4f6" },
    { media: "(prefers-color-scheme: dark)", color: "#1f2937" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // next-themes mutates `class` on <html> before hydration, so React must not
    // try to reconcile that attribute.
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
