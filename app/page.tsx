import { ArrowRight, Database, Mail, PackageCheck, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

import { DivisionShowcase } from "@/components/home/division-showcase";
import { HeroSection } from "@/components/home/hero-section";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { CategoryCard } from "@/components/product/category-card";
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
  const images = settings.defaultSeoImage ? [absoluteUrl(settings.defaultSeoImage)] : undefined;

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
  } catch (caught) {
    catalogError =
      caught instanceof Error ? caught.message : "Unable to load catalog data.";
  }

  const roxProducts = products
    .filter((product) => product.brandDivision === "rox-fitness")
    .slice(0, 2);
  const nexProducts = products
    .filter((product) => product.brandDivision === "nex-games")
    .slice(0, 2);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader categories={categories} />
      <main className="flex-1 overflow-hidden">
        <HeroSection />

      <section className="py-[var(--section-spacing)]" id="divisions">
        <Container className="space-y-10">
          <SectionHeading
            description="Category cards are now powered by MongoDB category data, so admin changes flow into the public website."
            eyebrow="Featured Categories"
            title="Wholesale categories built for fast buyer scanning."
          />
          {catalogError ? (
            <EmptyState
              description={catalogError}
              title="Category data unavailable"
            />
          ) : categories.length ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {categories.map((category, index) => (
                <CategoryCard category={category} index={index} key={category.slug} />
              ))}
            </div>
          ) : (
            <EmptyState
              description="Create active categories from the admin panel to populate this homepage section."
              title="No categories yet"
            />
          )}
        </Container>
      </section>

      <DivisionShowcase
        ctaLabel="Explore Rox Fitness"
        description="Rox Fitness is the performance division for fitness equipment, strength training products, and training accessories built for repeat wholesale demand."
        eyebrow="ROX FITNESS"
        id="rox-fitness"
        products={roxProducts}
        title="Fitness supply with a stronger retail presence."
      />

      <DivisionShowcase
        ctaLabel="Explore Nex Games"
        description="Nex Games gives buyers a visually distinct games range across board games, indoor games, and recreational sports products."
        eyebrow="NEX GAMES"
        id="nex-games"
        products={nexProducts}
        title="Game-led products for homes, clubs, and retail shelves."
        variant="inverted"
      />

      <section
        className="border-y border-[var(--color-border)] bg-[var(--color-surface)] py-[var(--section-spacing)]"
        id="products"
      >
        <Container className="space-y-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              description="Featured products are pulled from MongoDB, giving wholesale buyers current images, pricing, category, stock, badges, and product details."
              eyebrow="Featured Products"
              title="Distinctive cards for catalog-first selling."
            />
            <div className="inline-flex w-fit items-center gap-2 rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-muted)]">
              <PackageCheck aria-hidden="true" className="text-[var(--color-accent)]" size={16} />
              No checkout flow
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
        <Container className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <SectionHeading
            description="Customers browse the catalog, compare stock and specifications, then contact the company for pricing tiers, cartons, availability, and supply requirements."
            eyebrow="Wholesale supply"
            title="Built for business inquiries, not online checkout."
          />
          <Card className="relative overflow-hidden p-7">
            <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_70%_30%,var(--color-red-glow),transparent_58%)]" />
            <div className="relative grid gap-5 sm:grid-cols-3">
              {[
                ["Browse", "Review category ranges and featured products."],
                ["Compare", "Check pricing, stock status, specs, and badges."],
                ["Contact", "Share wholesale requirements through direct channels."],
              ].map(([title, description]) => (
                <div
                  className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
                  key={title}
                >
                  <p className="font-display text-2xl font-bold text-[var(--color-text)]">
                    {title}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </Container>
      </section>

      <section className="border-y border-[var(--color-border)] bg-[var(--color-surface)] py-[var(--section-spacing)]" id="about">
        <Container className="space-y-10">
          <SectionHeading
            description="Concise brand values keep the site buyer-focused while the database layer handles scale behind the scenes."
            eyebrow="Brand value"
            title="The essentials wholesale customers care about."
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
                  Wholesale customers
                </p>
                <h2 className="mt-5 font-display text-[length:var(--text-section)] font-black leading-none text-[var(--color-text)]">
                  Explore the range. Send your requirements.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--color-muted)] sm:text-lg">
                  Rox & Nex is ready for product-led wholesale conversations
                  across fitness, board games, indoor games, and sports games.
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
