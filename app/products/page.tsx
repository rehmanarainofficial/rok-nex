import type { Metadata } from "next";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { DivisionHero } from "@/components/product/division-hero";
import { PublicCatalog } from "@/components/product/public-catalog";
import { EmptyState } from "@/components/ui/empty-state";
import { PRODUCT_DIVISION_IDS } from "@/constants/product-divisions";
import { getCategories } from "@/services/categories";
import {
  getPublicCatalog,
  parsePage,
  parseProductSort,
  parseStockStatus,
} from "@/services/catalog";
import type { BrandDivision } from "@/types/product";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse the complete Rox & Nex wholesale showcase catalog across Rox Fitness and Nex Games.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "Rox & Nex Products",
    description:
      "Browse the complete Rox & Nex wholesale showcase catalog across Rox Fitness and Nex Games.",
    url: "/products",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rox & Nex Products",
    description: "Search and filter wholesale Rox Fitness and Nex Games products.",
  },
};

export const dynamic = "force-dynamic";

type ProductsPageProps = {
  searchParams: Promise<{
    category?: string;
    division?: string;
    page?: string;
    q?: string;
    sort?: string;
    stock?: string;
  }>;
};

function parseDivision(value: string | undefined) {
  return PRODUCT_DIVISION_IDS.includes(value as BrandDivision)
    ? (value as BrandDivision)
    : undefined;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const division = parseDivision(params.division);
  const current = {
    category: params.category || undefined,
    division,
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
        perPage: 16,
      }),
      getCategories({ active: true }),
    ]);
  } catch (caught) {
    error = caught instanceof Error ? caught.message : "Unable to load product catalog.";
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader categories={categories} />
      <main className="flex-1 overflow-hidden">
        <DivisionHero
          description="Browse both Rox Fitness and Nex Games in one fast wholesale catalog with search, division, category, availability, and simple sorting."
          eyebrow="Complete wholesale showcase"
          title="PRODUCTS"
          tone="all"
        />
        {error || !content ? (
          <section className="py-[var(--section-spacing)]">
            <div className="mx-auto w-full max-w-[var(--container-max)] px-5">
              <EmptyState
                description={error ?? "The product catalog is unavailable right now."}
                title="Catalog data unavailable"
              />
            </div>
          </section>
        ) : (
          <PublicCatalog
            basePath="/products"
            categories={content.categories}
            current={current}
            featuredProducts={content.featuredProducts}
            heading={{
              description:
                "Featured products from both Rox Fitness and Nex Games for high-priority wholesale browsing.",
              eyebrow: "Featured Products",
              title: "Highlighted catalog picks across both divisions.",
            }}
            page={content.page}
            products={content.products}
            promo={{
              ctaHref: "/#contact",
              ctaLabel: "Contact Company",
              description:
                "Use the catalog to shortlist products, then contact Rox & Nex with required quantities, delivery needs, and wholesale questions.",
              title: "A catalog built for wholesale conversations.",
            }}
            showDivisionFilter
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
