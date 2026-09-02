import type { Metadata } from "next";
import type { ReactNode } from "react";

import { FloatingSocials } from "@/components/layout/floating-socials";
import { ThemeScript } from "@/components/theme/theme-script";
import { bodyFont, displayFont } from "@/lib/fonts";
import { siteConfig } from "@/lib/site";
import { absoluteUrl, serializeJsonLd } from "@/utilities/seo";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: "/",
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: absoluteUrl("/"),
  brand: [
    {
      "@type": "Brand",
      name: "Rox Fitness",
    },
    {
      "@type": "Brand",
      name: "Nex Games",
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${displayFont.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-full bg-[var(--color-background)] text-[var(--color-text)]">
        <script
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(organizationJsonLd) }}
          id="organization-jsonld"
          type="application/ld+json"
        />
        {children}
        <FloatingSocials />
      </body>
    </html>
  );
}
