import { Search as SearchIcon } from "lucide-react";
import type { Metadata } from "next";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { SearchResultCard } from "@/components/search/search-result-card";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getPublicCategories } from "@/services/public-navigation";
import { getProductSummaries } from "@/services/products";
import type { ProductSummary } from "@/types/product";

type SearchPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getParam(
  searchParams: Record<string, string | string[] | undefined>,
  key: string,
) {
  const value = searchParams[key];

  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const params = await searchParams;
  const query = getParam(params, "q").trim();
  const title = query ? `Search Products: ${query}` : "Search Products";
  const description = query
    ? `Search Rox & Nex wholesale catalog results for ${query}.`
    : "Search Rox & Nex wholesale fitness, sports, and games products.";
  const canonical = query ? `/search?q=${encodeURIComponent(query)}` : "/search";

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = getParam(params, "q").trim();
  const categories = await getPublicCategories();
  let products: ProductSummary[] = [];
  let isUnavailable = false;

  if (query.length >= 2) {
    try {
      products = await getProductSummaries({
        active: true,
        limit: 24,
        search: query,
        sort: "featured",
      });
    } catch {
      isUnavailable = true;
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader categories={categories} />
      <main className="flex-1 overflow-hidden">
        <section className="relative border-b border-[var(--color-border)] py-[var(--section-spacing)]">
          <Container className="grid gap-8 lg:grid-cols-[0.82fr_1fr] lg:items-end">
            <ScrollReveal>
              <SectionHeading
                description="Search by product name, SKU, category, or tags. Results stay focused on active wholesale catalog items."
                eyebrow="Global Search"
                title="Find catalog products fast."
              />
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <Card className="p-4 sm:p-5">
                <form action="/search" className="grid gap-3 sm:grid-cols-[1fr_auto]">
                  <label className="sr-only" htmlFor="search-query">
                    Search products
                  </label>
                  <div className="relative">
                    <SearchIcon
                      aria-hidden="true"
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]"
                      size={18}
                    />
                    <input
                      className="pl-10"
                      defaultValue={query}
                      id="search-query"
                      name="q"
                      placeholder="Dumbbell, chess, football, SKU..."
                      type="search"
                    />
                  </div>
                  <button
                    className="inline-flex h-11 items-center justify-center rounded-[var(--radius-pill)] bg-[var(--color-accent)] px-6 text-sm font-bold text-white shadow-[var(--shadow-red)] transition hover:bg-[var(--color-accent-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                    type="submit"
                  >
                    Search
                  </button>
                </form>
              </Card>
            </ScrollReveal>
          </Container>
        </section>

        <section className="py-[var(--section-spacing)]">
          <Container className="space-y-8">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                Results
              </p>
              <h1 className="font-display text-4xl font-black text-[var(--color-text)] sm:text-5xl">
                {query ? `Search: ${query}` : "Start a product search"}
              </h1>
            </div>

            {query.length > 0 && query.length < 2 ? (
              <Card className="p-8 text-center">
                <p className="font-display text-3xl font-bold text-[var(--color-text)]">
                  Type at least 2 characters.
                </p>
                <p className="mt-3 text-[var(--color-muted)]">
                  Shorter searches are held back to keep the catalog fast.
                </p>
              </Card>
            ) : null}

            {isUnavailable ? (
              <Card className="p-8 text-center">
                <p className="font-display text-3xl font-bold text-[var(--color-text)]">
                  Search is temporarily unavailable.
                </p>
                <p className="mt-3 text-[var(--color-muted)]">
                  The product database is not reachable right now.
                </p>
              </Card>
            ) : null}

            {!isUnavailable && query.length >= 2 && products.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="font-display text-3xl font-bold text-[var(--color-text)]">
                  No products found.
                </p>
                <p className="mt-3 text-[var(--color-muted)]">
                  Try another product name, SKU, category, or tag.
                </p>
              </Card>
            ) : null}

            {products.length > 0 ? (
              <div className="grid gap-4">
                {products.map((product, index) => (
                  <ScrollReveal delay={Math.min(index * 55, 220)} key={product.slug}>
                    <SearchResultCard product={product} />
                  </ScrollReveal>
                ))}
              </div>
            ) : null}
          </Container>
        </section>
      </main>
      <SiteFooter categories={categories} />
    </div>
  );
}
