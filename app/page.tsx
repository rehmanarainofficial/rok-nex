import { ArrowRight, Database, Mail, PackageCheck, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { DivisionShowcase } from "@/components/home/division-showcase";
import { HeroSection } from "@/components/home/hero-section";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ProductCard } from "@/components/product/product-card";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { SectionHeading } from "@/components/ui/section-heading";
import { VALUE_POINTS } from "@/constants/homepage-content";
import { getCategories } from "@/services/categories";
import { getProductSummaries } from "@/services/products";
import { defaultSiteSettings, getPublicSiteSettings } from "@/services/site-settings";
import { absoluteUrl } from "@/utilities/seo";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getPublicSiteSettings();
  const title = settings.homepageSeoTitle || defaultSiteSettings.homepageSeoTitle;
  const description =
    settings.homepageSeoDescription || defaultSiteSettings.homepageSeoDescription;
  const images = settings.defaultSeoImage
    ? [absoluteUrl(settings.defaultSeoImage)]
    : ["/opengraph-image"];

  return {
    title,
    description,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title,
      description,
      url: "/",
      images,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  };
}

export const dynamic = "force-dynamic";

export default async function Home() {
  let categories: Awaited<ReturnType<typeof getCategories>> = [];
  let products: Awaited<ReturnType<typeof getProductSummaries>> = [];
  let catalogError: string | null = null;

  try {
    [categories, products] = await Promise.all([
      getCategories({ active: true }),
      getProductSummaries({ active: true, featured: true, limit: 8 }),
    ]);
  } catch {
    catalogError =
      "Catalog data is temporarily unavailable. Please try again shortly.";
  }

  const roxProducts = products
    .filter((product) => product.brandDivision === "rox-fitness")
    .slice(0, 2);
  const nexProducts = products
    .filter((product) => product.brandDivision === "nex-games")
    .slice(0, 2);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 overflow-hidden">
        <HeroSection />

        <DivisionShowcase
          ctaLabel="Explore Rox Fitness"
          description="Fitness equipment, strength training products, and training accessories for daily movement and performance."
          eyebrow="ROX FITNESS"
          id="rox-fitness"
          products={roxProducts}
          title="Fitness products for stronger training."
        />

        <DivisionShowcase
          ctaLabel="Explore Nex Games"
          description="Board games, indoor games, and recreational sports products presented in a clean product-first catalog."
          eyebrow="NEX GAMES"
          id="nex-games"
          products={nexProducts}
          title="Games and sports products made easy to browse."
          variant="inverted"
        />

        <section
          className="border-y border-[var(--color-border)] bg-[var(--color-surface)] py-[var(--section-spacing)]"
          id="products"
        >
          <Container className="space-y-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading
                description="Featured products come from MongoDB with current images, descriptions, and stock information."
                eyebrow="Featured Products"
                title="Simple product cards with the details that matter."
              />
              <div className="inline-flex w-fit items-center gap-2 rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-muted)]">
                <PackageCheck aria-hidden="true" className="text-[var(--color-accent)]" size={16} />
                Product catalog
              </div>
            </div>
            {catalogError ? (
              <EmptyState
                description={catalogError}
                title="Featured products unavailable"
              />
            ) : products.length ? (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {products.slice(0, 4).map((product, index) => (
                  <ProductCard key={product.slug} priority={index < 2} product={product} />
                ))}
              </div>
            ) : (
              <EmptyState
                description="Mark products as featured in the admin panel to populate the homepage showcase."
                title="No featured products yet"
              />
            )}
          </Container>
        </section>

        <section className="py-[var(--section-spacing)]">
          <Container>
            <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[linear-gradient(135deg,var(--color-card-solid),var(--color-surface))]">
              <div className="absolute inset-y-0 right-0 w-2/3 bg-[radial-gradient(circle_at_76%_32%,var(--color-red-glow),transparent_42%)]" />
              <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-stretch lg:p-10">
                <div className="flex min-h-72 flex-col justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-accent)]">
                      Product flow
                    </p>
                    <h2 className="mt-5 max-w-2xl font-display text-[length:var(--text-section)] font-normal leading-none text-[var(--color-text)]">
                      Pick a range. Check stock. Get in touch.
                    </h2>
                  </div>
                  <Link
                    className="mt-8 inline-flex h-12 w-fit items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-[var(--color-accent)] px-6 text-sm font-bold text-white shadow-[var(--shadow-red)] transition hover:-translate-y-0.5 hover:bg-[var(--color-accent-strong)]"
                    href="/products"
                  >
                    Browse Products
                    <ArrowRight aria-hidden="true" size={17} />
                  </Link>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="relative min-h-72 overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[#120f0f] p-6 text-white">
                    <span className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-accent)]">
                      Rox Fitness
                    </span>
                    <p className="absolute -bottom-5 left-5 font-display text-[7rem] font-normal leading-none text-white/10 sm:text-[9rem]">
                      ROX
                    </p>
                    <p className="relative mt-20 max-w-xs text-xl leading-7">
                      Fitness, strength, and movement products in one focused view.
                    </p>
                  </div>
                  <div className="relative min-h-72 overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-6">
                    <span className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-accent)]">
                      Nex Games
                    </span>
                    <p className="absolute -bottom-5 left-5 font-display text-[7rem] font-normal leading-none text-[var(--color-text)]/10 sm:text-[9rem]">
                      NEX
                    </p>
                    <p className="relative mt-20 max-w-xs text-xl leading-7 text-[var(--color-text)]">
                      Board games, indoor games, and sports products made easy to browse.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="border-y border-[var(--color-border)] bg-[var(--color-surface)] py-[var(--section-spacing)]" id="about">
        <Container className="space-y-10">
          <SectionHeading
            description="Concise brand values keep the site buyer-focused while the database layer handles scale behind the scenes."
            eyebrow="Brand value"
            title="The essentials product customers care about."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {VALUE_POINTS.map((point, index) => (
              <Card className="p-6" key={point.title}>
                {index % 2 === 0 ? (
                  <ShieldCheck className="text-[var(--color-accent)]" size={26} />
                ) : (
                  <Database className="text-[var(--color-accent)]" size={26} />
                )}
                <h3 className="mt-8 font-display text-2xl font-bold text-[var(--color-text)]">
                  {point.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
                  {point.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
        </section>

        <section
        className="relative isolate overflow-hidden py-[var(--section-spacing)]"
        id="contact"
      >
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,var(--color-red-glow),transparent_30%),linear-gradient(135deg,var(--color-background),var(--color-background-alt))]" />
        <Container>
          <Card className="relative overflow-hidden p-7 sm:p-10 lg:p-12">
            <div className="absolute -right-12 -top-12 size-56 rounded-full border-[3rem] border-[var(--color-accent)] opacity-15" />
            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-accent)]">
                  Product customers
                </p>
                <h2 className="mt-5 font-display text-[length:var(--text-section)] font-black leading-none text-[var(--color-text)]">
                  Explore the range. Send your requirements.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--color-muted)] sm:text-lg">
                  Rox & Nex makes it easy to browse fitness, board games,
                  indoor games, and sports products in one place.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <a
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-[var(--color-accent)] px-6 text-sm font-bold text-white shadow-[var(--shadow-red)] transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-accent-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                  href="#products"
                >
                  Explore Products
                  <ArrowRight aria-hidden="true" size={17} />
                </a>
                <a
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-[var(--color-surface)] px-6 text-sm font-bold text-[var(--color-text)] transition duration-200 hover:-translate-y-0.5 hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-raised)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                  href="#footer-contact"
                >
                  Contact Company
                  <Mail aria-hidden="true" size={17} />
                </a>
              </div>
            </div>
          </Card>
        </Container>
        </section>
      </main>
      <SiteFooter categories={categories} />
    </div>
  );
}
