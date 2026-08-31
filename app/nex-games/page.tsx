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
  title: "Nex Games",
  description:
    "Browse Nex Games wholesale board games, indoor games, sports games, and recreation products.",
  alternates: {
    canonical: "/nex-games",
  },
  openGraph: {
    title: "Nex Games",
    description:
      "Wholesale board games, indoor games, sports games, and recreation products.",
    url: "/nex-games",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nex Games",
    description: "Browse Nex Games wholesale board, indoor, and recreation products.",
  },
};

export const dynamic = "force-dynamic";

type NexGamesPageProps = {
  searchParams: Promise<{
    category?: string;
    page?: string;
    q?: string;
    sort?: string;
    stock?: string;
  }>;
};

export default async function NexGamesPage({ searchParams }: NexGamesPageProps) {
  const params = await searchParams;
  const current = {
    category: params.category || undefined,
    division: "nex-games" as const,
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
    error = caught instanceof Error ? caught.message : "Unable to load Nex Games catalog.";
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader categories={categories} />
      <main className="flex-1 overflow-hidden">
        <DivisionHero
          description="Board games, indoor games, recreational games, and sports games presented for quick wholesale discovery."
          division="nex-games"
          eyebrow="Premium games wholesale division"
          title="NEX GAMES"
          tone="nex"
        />
        {error || !content ? (
          <section className="py-[var(--section-spacing)]">
            <div className="mx-auto w-full max-w-[var(--container-max)] px-5">
              <EmptyState
                description={error ?? "The Nex Games catalog is unavailable right now."}
                title="Catalog data unavailable"
              />
            </div>
          </section>
        ) : (
          <PublicCatalog
            basePath="/nex-games"
            categories={content.categories}
            current={current}
            featuredProducts={content.featuredProducts}
            heading={{
              description:
                "Featured games and recreation products for buyers building tabletop, indoor, and play-focused assortments.",
              eyebrow: "Featured Games",
              title: "Modern play products with wholesale clarity.",
            }}
            page={content.page}
            products={content.products}
            promo={{
              ctaHref: "/products?division=nex-games",
              ctaLabel: "Explore Nex Products",
              description:
                "Nex Games keeps board games, indoor games, and recreation products easy to scan by category, stock, and buyer intent.",
              title: "Make game buying faster and more confident.",
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
