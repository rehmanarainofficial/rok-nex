import { ArrowRight, PackageCheck } from "lucide-react";
import Link from "next/link";

import { CatalogControls } from "@/components/product/catalog-controls";
import { CatalogPagination } from "@/components/product/catalog-pagination";
import { CategoryNavigation } from "@/components/product/category-navigation";
import { ProductGrid } from "@/components/product/product-grid";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type {
  BrandDivision,
  Category,
  ProductSort,
  ProductSummary,
  StockStatus,
} from "@/types/product";

type PublicCatalogProps = {
  basePath: string;
  categories: Pick<Category, "brandDivision" | "name" | "slug">[];
  current: {
    category?: string;
    division?: BrandDivision;
    q?: string;
    sort?: ProductSort;
    stock?: StockStatus;
  };
  featuredProducts: ProductSummary[];
  heading: {
    description: string;
    eyebrow: string;
    title: string;
  };
  page: number;
  products: ProductSummary[];
  promo: {
    ctaHref: string;
    ctaLabel: string;
    description: string;
    title: string;
  };
  showDivisionFilter?: boolean;
  showSort?: boolean;
  total: number;
  totalPages: number;
};

export function PublicCatalog({
  basePath,
  categories,
  current,
  featuredProducts,
  heading,
  page,
  products,
  promo,
  showDivisionFilter = false,
  showSort = false,
  total,
  totalPages,
}: PublicCatalogProps) {
  const params = {
    category: current.category,
    division: current.division,
    q: current.q,
    sort: current.sort,
    stock: current.stock,
  };

  return (
    <>
      <section className="py-12" id="catalog">
        <Container className="space-y-6">
          <CategoryNavigation
            activeCategory={current.category}
            basePath={basePath}
            categories={categories}
            params={params}
          />
          <CatalogControls
            categories={categories}
            current={current}
            showDivision={showDivisionFilter}
            showSort={showSort}
          />
        </Container>
      </section>

      <section className="border-y border-[var(--color-border)] bg-[var(--color-surface)] py-[var(--section-spacing)]">
        <Container className="space-y-10">
          <SectionHeading {...heading} />
          <ProductGrid
            emptyDescription="Featured products will appear here after products are marked as featured in admin."
            emptyTitle="No featured products yet"
            products={featuredProducts}
          />
        </Container>
      </section>

      <section className="py-[var(--section-spacing)]">
        <Container className="space-y-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              description={`${total} product${total === 1 ? "" : "s"} matched the current catalog view.`}
              eyebrow="Product Grid"
              title="Fast wholesale browsing with focused filters."
            />
            <div className="inline-flex w-fit items-center gap-2 rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-muted)]">
              <PackageCheck aria-hidden="true" className="text-[var(--color-accent)]" size={16} />
              Shareable filters
            </div>
          </div>
          <ProductGrid
            emptyDescription="No products match this catalog view yet. Adjust the filters or add active products from the admin panel."
            emptyTitle="No products found"
            products={products}
          />
          <CatalogPagination
            basePath={basePath}
            page={page}
            params={params}
            totalPages={totalPages}
          />
        </Container>
      </section>

      <section className="pb-[var(--section-spacing)]">
        <Container>
          <Card className="relative overflow-hidden p-7 sm:p-10">
            <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_70%_30%,var(--color-red-glow),transparent_58%)]" />
            <div className="relative flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-accent)]">
                  Wholesale ready
                </p>
                <h2 className="mt-5 font-display text-[length:var(--text-section)] font-black leading-none text-[var(--color-text)]">
                  {promo.title}
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--color-muted)]">
                  {promo.description}
                </p>
              </div>
              <Link
                className="inline-flex h-12 w-fit items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-[var(--color-accent)] px-6 text-sm font-bold text-white shadow-[var(--shadow-red)]"
                href={promo.ctaHref}
              >
                {promo.ctaLabel}
                <ArrowRight aria-hidden="true" size={17} />
              </Link>
            </div>
          </Card>
        </Container>
      </section>
    </>
  );
}
