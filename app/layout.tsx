import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { FloatingSocials } from "@/components/layout/floating-socials";
import { ThemeScript } from "@/components/theme/theme-script";
import { bodyFont, displayFont } from "@/lib/fonts";
import { siteConfig } from "@/lib/site";
import { absoluteUrl, serializeJsonLd } from "@/utilities/seo";

import "./globals.css";

const defaultSeoImage = "/opengraph-image";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  category: "sports products",
  creator: siteConfig.name,
  publisher: siteConfig.name,
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Rox & Nex",
    "Rox Fitness",
    "Nex Games",
    "sports products",
    "fitness equipment",
    "board games",
    "indoor games",
    "sports games",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: defaultSeoImage,
        width: 1200,
        height: 630,
        alt: "Rox & Nex sports products",
      },
    ],
    locale: "en_US",
    url: "/",
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [defaultSeoImage],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0c0b0b" },
    { media: "(prefers-color-scheme: light)", color: "#f7f5f2" },
  ],
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: absoluteUrl("/"),
  logo: absoluteUrl("/icon.png"),
  email: siteConfig.email,
  telephone: siteConfig.phone,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    telephone: siteConfig.phone,
    email: siteConfig.email,
    areaServed: "PK",
    availableLanguage: ["en", "ur"],
  },
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
