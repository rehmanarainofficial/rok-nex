import { ArrowRight, Boxes, CheckCircle2, Hash, Tags } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";

import { InquiryForm } from "@/components/contact/inquiry-form";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductGrid } from "@/components/product/product-grid";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getCategories } from "@/services/categories";
import { getProductBySlug, getRelatedProducts } from "@/services/products";
import type { Product, StockStatus } from "@/types/product";
import { formatWholesalePrice } from "@/utilities/formatters";
import {
  absoluteUrl,
  divisionLabels,
  getCategoryPath,
  getDivisionPath,
  serializeJsonLd,
} from "@/utilities/seo";

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
};

const getProduct = cache(async (slug: string) => getProductBySlug(slug));

const stockLabels: Record<StockStatus, string> = {
  "in-stock": "In stock",
  "low-stock": "Low stock",
  "out-of-stock": "Out of stock",
};

function getProductPrice(product: Product) {
  return product.priceDisplay ?? formatWholesalePrice(product.salePrice ?? product.regularPrice);
}

function toAbsoluteUrl(path: string) {
  return absoluteUrl(path);
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const product = await getProduct(slug);

    if (!product) {
      return {
        title: "Product Not Found",
      };
    }

    return {
      title: product.seoTitle ?? product.name,
      description: product.seoDescription ?? product.shortDescription,
      alternates: {
        canonical: `/products/${product.slug}`,
      },
      openGraph: {
        title: product.seoTitle ?? product.name,
        description: product.seoDescription ?? product.shortDescription,
        url: `/products/${product.slug}`,
        images: product.thumbnail ? [toAbsoluteUrl(product.thumbnail)] : undefined,
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: product.seoTitle ?? product.name,
        description: product.seoDescription ?? product.shortDescription,
        images: product.thumbnail ? [toAbsoluteUrl(product.thumbnail)] : undefined,
      },
    };
  } catch {
    return {
      title: "Product",
    };
  }
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const [categories, relatedProducts] = await Promise.all([
    getCategories({ active: true }),
    getRelatedProducts(product),
  ]);
  const category = categories.find(
    (item) =>
      item.brandDivision === product.brandDivision &&
      (item.name === product.category || item.slug === product.category),
  );
  const categoryHref = category
    ? getCategoryPath(category.slug)
    : `${getDivisionPath(product.brandDivision)}?category=${encodeURIComponent(product.category)}`;
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: divisionLabels[product.brandDivision], href: getDivisionPath(product.brandDivision) },
    { name: category?.name ?? product.category, href: categoryHref },
    { name: product.name, href: `/products/${product.slug}` },
  ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.seoDescription ?? product.shortDescription,
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: divisionLabels[product.brandDivision],
    },
    category: product.category,
    image: [product.thumbnail, ...product.images.map((image) => image.url)]
      .filter(Boolean)
      .map(toAbsoluteUrl),
    offers: {
      "@type": "Offer",
      price: product.salePrice ?? product.regularPrice,
      priceCurrency: "USD",
      availability:
        product.stockStatus === "out-of-stock"
          ? "https://schema.org/OutOfStock"
          : "https://schema.org/InStock",
      url: toAbsoluteUrl(`/products/${product.slug}`),
    },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: toAbsoluteUrl(item.href),
    })),
  };

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader categories={categories} />
      <main className="flex-1 overflow-hidden">
        <script
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
          id="product-jsonld"
          type="application/ld+json"
        />
        <script
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
          id="product-breadcrumb-jsonld"
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
              <Link href={getDivisionPath(product.brandDivision)}>
                {divisionLabels[product.brandDivision]}
              </Link>
              <span>/</span>
              <Link href={categoryHref}>{category?.name ?? product.category}</Link>
              <span>/</span>
              <span className="text-[var(--color-text)]">{product.name}</span>
            </nav>
          </Container>
        </section>

        <section className="py-[var(--section-spacing)]">
          <Container className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <ProductGallery
              images={product.images}
              productName={product.name}
              thumbnail={product.thumbnail}
            />
            <div className="space-y-7">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-accent)]">
                  {divisionLabels[product.brandDivision]}
                </p>
                <h1 className="mt-4 font-display text-[length:var(--text-section)] font-black leading-none text-[var(--color-text)]">
                  {product.name}
                </h1>
                <p className="mt-5 text-lg leading-8 text-[var(--color-muted)]">
                  {product.shortDescription}
                </p>
              </div>

              <Card className="grid gap-5 p-5 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                    Price
                  </p>
                  <p className="mt-2 font-display text-4xl font-bold text-[var(--color-text)]">
                    {getProductPrice(product)}
                  </p>
                  {product.salePrice ? (
                    <p className="mt-1 text-sm font-semibold text-[var(--color-muted)]">
                      Regular {formatWholesalePrice(product.regularPrice)}
                    </p>
                  ) : null}
                </div>
                <div className="grid gap-3 text-sm font-semibold text-[var(--color-muted)]">
                  <p className="inline-flex items-center gap-2">
                    <CheckCircle2 className="text-[var(--color-accent)]" size={17} />
                    {stockLabels[product.stockStatus]}
                  </p>
                  <p className="inline-flex items-center gap-2">
                    <Boxes className="text-[var(--color-accent)]" size={17} />
                    Stock quantity: {product.stockQuantity}
                  </p>
                  {product.sku ? (
                    <p className="inline-flex items-center gap-2">
                      <Hash className="text-[var(--color-accent)]" size={17} />
                      SKU: {product.sku}
                    </p>
                  ) : null}
                </div>
              </Card>

              <div className="flex flex-wrap gap-3">
                <Link
                  className="inline-flex h-12 items-center justify-center rounded-[var(--radius-pill)] bg-[var(--color-accent)] px-6 text-sm font-bold text-white shadow-[var(--shadow-red)]"
                  href="#inquiry"
                >
                  Contact for Wholesale
                </Link>
                <Link
                  className="inline-flex h-12 items-center justify-center rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-[var(--color-surface)] px-6 text-sm font-bold text-[var(--color-text)]"
                  href="#related-products"
                >
                  View Related Products
                </Link>
              </div>
            </div>
          </Container>
        </section>

        <section className="border-y border-[var(--color-border)] bg-[var(--color-surface)] py-[var(--section-spacing)]">
          <Container className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <SectionHeading
              description={product.description}
              eyebrow="Product Details"
              title="Built for wholesale evaluation."
            />
            <div className="grid gap-5">
              {product.specifications.length ? (
                <Card className="overflow-hidden">
                  <div className="divide-y divide-[var(--color-border)]">
                    {product.specifications.map((specification) => (
                      <div
                        className="grid gap-2 p-4 sm:grid-cols-[0.45fr_1fr]"
                        key={`${specification.label}-${specification.value}`}
                      >
                        <p className="font-bold text-[var(--color-text)]">
                          {specification.label}
                        </p>
                        <p className="text-[var(--color-muted)]">{specification.value}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              ) : null}
              {product.tags.length ? (
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex h-9 items-center gap-2 rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-muted)]">
                    <Tags aria-hidden="true" size={14} />
                    Tags
                  </span>
                  {product.tags.map((tag) => (
                    <Link
                      className="inline-flex h-9 items-center rounded-[var(--radius-pill)] bg-[var(--color-card)] px-3 text-sm font-bold text-[var(--color-text)]"
                      href={`/search?q=${encodeURIComponent(tag)}`}
                      key={tag}
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          </Container>
        </section>

        <section className="py-[var(--section-spacing)]" id="inquiry">
          <Container className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <SectionHeading
              description="Tell Rox & Nex what quantity, category, or product range you need. This inquiry can later be routed to WhatsApp, phone, or a richer contact workflow."
              eyebrow="Wholesale Inquiry"
              title="Send a product-focused inquiry."
            />
            <Card className="p-5 sm:p-7">
              <InquiryForm
                productInterest={product.name}
                productSlug={product.slug}
                source="product-page"
              />
            </Card>
          </Container>
        </section>

        <section
          className="border-t border-[var(--color-border)] bg-[var(--color-surface)] py-[var(--section-spacing)]"
          id="related-products"
        >
          <Container className="space-y-10">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading
                description="Related products use the same division, category, and tag signals for fast buyer discovery."
                eyebrow="Related Products"
                title="More products to compare."
              />
              <Link
                className="inline-flex h-12 w-fit items-center justify-center gap-2 rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-[var(--color-card)] px-6 text-sm font-bold text-[var(--color-text)]"
                href={categoryHref}
              >
                View Category
                <ArrowRight aria-hidden="true" size={17} />
              </Link>
            </div>
            <ProductGrid
              emptyDescription="Related products will appear after more active products share this division, category, or tags."
              emptyTitle="No related products yet"
              products={relatedProducts}
            />
          </Container>
        </section>
      </main>
      <SiteFooter categories={categories} />
    </div>
  );
}
