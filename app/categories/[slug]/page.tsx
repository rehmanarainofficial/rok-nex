import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { ProductGrid } from "@/components/product/product-grid";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getCategoryBySlug } from "@/services/categories";
import { getPublicCategories } from "@/services/public-navigation";
import { getProductSummaries } from "@/services/products";
import {
  absoluteUrl,
  divisionLabels,
  getCategoryPath,
  getDivisionPath,
  serializeJsonLd,
} from "@/utilities/seo";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

const getCategory = cache(async (slug: string) => getCategoryBySlug(slug));

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const category = await getCategory(slug);

    if (!category) {
      return {
        title: "Category Not Found",
      };
    }

    const title = `${category.name} Wholesale Products`;
    const description = category.description;

    return {
      title,
      description,
      alternates: {
        canonical: getCategoryPath(category.slug),
      },
      openGraph: {
        title,
        description,
        url: getCategoryPath(category.slug),
        images: category.image ? [absoluteUrl(category.image)] : undefined,
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: category.image ? [absoluteUrl(category.image)] : undefined,
      },
    };
  } catch {
    return {
      title: "Category",
    };
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) {
    notFound();
  }

  const [categories, products] = await Promise.all([
    getPublicCategories(),
    getProductSummaries({
      active: true,
      categoryValues: [category.name, category.slug],
      limit: 24,
      sort: "featured",
    }),
  ]);
  const divisionPath = getDivisionPath(category.brandDivision);
  const filteredDivisionPath = `${divisionPath}?category=${category.slug}`;
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { name: "Home", href: "/" },
      { name: divisionLabels[category.brandDivision], href: divisionPath },
      { name: category.name, href: getCategoryPath(category.slug) },
    ].map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.name} Wholesale Products`,
    description: category.description,
    url: absoluteUrl(getCategoryPath(category.slug)),
  };

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader categories={categories} />
      <main className="flex-1 overflow-hidden">
        <script
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
          id="category-breadcrumb-jsonld"
          type="application/ld+json"
        />
        <script
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(collectionJsonLd) }}
          id="category-jsonld"
          type="application/ld+json"
        />
        <section className="border-b border-[var(--color-border)] py-8">
          <Container>
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-2 text-sm font-semibold text-[var(--color-muted)]"
            >
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href={divisionPath}>{divisionLabels[category.brandDivision]}</Link>
              <span>/</span>
              <span className="text-[var(--color-text)]">{category.name}</span>
            </nav>
          </Container>
        </section>

        <section className="py-[var(--section-spacing)]">
          <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <ScrollReveal>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.26em] text-[var(--color-accent)]">
                  {divisionLabels[category.brandDivision]}
                </p>
                <h1 className="mt-5 font-display text-[length:var(--text-section)] font-black leading-none text-[var(--color-text)]">
                  {category.name}
                </h1>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--color-muted)]">
                  {category.description}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-[var(--color-accent)] px-6 text-sm font-bold text-white shadow-[var(--shadow-red)] transition hover:bg-[var(--color-accent-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                    href="#category-products"
                  >
                    Browse Products
                    <ArrowRight aria-hidden="true" size={17} />
                  </Link>
                  <Link
                    className="inline-flex h-12 items-center justify-center rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-[var(--color-surface)] px-6 text-sm font-bold text-[var(--color-text)] transition hover:bg-[var(--color-surface-raised)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                    href={filteredDivisionPath}
                  >
                    View Division Filter
                  </Link>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={130}>
              <Card className="overflow-hidden p-3">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-sm)] bg-[var(--color-surface-raised)]">
                  <Image
                    alt={`${category.name} product category`}
                    className="object-cover"
                    fill
                    priority
                    sizes="(max-width: 1024px) calc(100vw - 40px), 38rem"
                    src={category.image}
                  />
                </div>
              </Card>
            </ScrollReveal>
          </Container>
        </section>

        <section
          className="border-t border-[var(--color-border)] bg-[var(--color-surface)] py-[var(--section-spacing)]"
          id="category-products"
        >
          <Container className="space-y-10">
            <ScrollReveal>
              <SectionHeading
                description={`${products.length} active product${products.length === 1 ? "" : "s"} are currently connected to this category.`}
                eyebrow="Category Products"
                title="Wholesale products in this category."
              />
            </ScrollReveal>
            <ProductGrid
              emptyDescription="Products will appear here once active products are assigned to this category in admin."
              emptyTitle="No products in this category yet"
              products={products}
            />
          </Container>
        </section>
      </main>
      <SiteFooter categories={categories} />
    </div>
  );
}
