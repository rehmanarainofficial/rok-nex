import type { Metadata } from "next";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { DivisionHero } from "@/components/product/division-hero";
import { PublicCatalog } from "@/components/product/public-catalog";
import { EmptyState } from "@/components/ui/empty-state";
import { getCategories } from "@/services/categories";
import {
  getPublicCatalog,
  parsePage,
  parseProductSort,
  parseStockStatus,
} from "@/services/catalog";

export const metadata: Metadata = {
  title: "Rox Fitness",
  description:
    "Browse Rox Fitness wholesale products for strength, movement, performance, and everyday training.",
};

export const dynamic = "force-dynamic";

type RoxFitnessPageProps = {
  searchParams: Promise<{
    category?: string;
    page?: string;
    q?: string;
    sort?: string;
    stock?: string;
  }>;
};

export default async function RoxFitnessPage({ searchParams }: RoxFitnessPageProps) {
  const params = await searchParams;
  const current = {
    category: params.category || undefined,
    division: "rox-fitness" as const,
    q: params.q?.trim() || undefined,
    sort: parseProductSort(params.sort),
    stock: parseStockStatus(params.stock),
  };
  let content: Awaited<ReturnType<typeof getPublicCatalog>> | null = null;
  let categories: Awaited<ReturnType<typeof getCategories>> = [];
  let error: string | null = null;

  try {
    [content, categories] = await Promise.all([
      getPublicCatalog({
        ...current,
        page: parsePage(params.page),
        perPage: 12,
      }),
      getCategories({ active: true }),
    ]);
  } catch (caught) {
    error = caught instanceof Error ? caught.message : "Unable to load Rox Fitness catalog.";
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader categories={categories} />
      <main className="flex-1 overflow-hidden">
        <DivisionHero
          description="Equipment built for strength, movement, performance, and everyday training."
          division="rox-fitness"
          eyebrow="Performance wholesale division"
          title="ROX FITNESS"
          tone="rox"
        />
        {error || !content ? (
          <section className="py-[var(--section-spacing)]">
            <div className="mx-auto w-full max-w-[var(--container-max)] px-5">
              <EmptyState
                description={error ?? "The Rox Fitness catalog is unavailable right now."}
                title="Catalog data unavailable"
              />
            </div>
          </section>
        ) : (
          <PublicCatalog
            basePath="/rox-fitness"
            categories={content.categories}
            current={current}
            featuredProducts={content.featuredProducts}
            heading={{
              description:
                "Highlighted fitness products selected for wholesale buyers reviewing performance-led ranges.",
              eyebrow: "Featured Fitness Products",
              title: "Strength-focused products with live availability.",
            }}
            page={content.page}
            products={content.products}
            promo={{
              ctaHref: "/products?division=rox-fitness",
              ctaLabel: "Explore Rox Products",
              description:
                "Use Rox Fitness for strength assortments, gym essentials, training accessories, and fast-moving fitness products.",
              title: "Build a sharper fitness wholesale range.",
            }}
            showSort
            total={content.total}
            totalPages={content.totalPages}
          />
        )}
      </main>
      <SiteFooter categories={categories} />
    </div>
  );
}
