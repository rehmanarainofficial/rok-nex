import Image from "next/image";
import Link from "next/link";

import type { BrandDivision, ProductSummary, StockStatus } from "@/types/product";
import { formatWholesalePrice } from "@/utilities/formatters";

type SearchResultCardProps = {
  product: ProductSummary;
};

const divisionLabels: Record<BrandDivision, string> = {
  "rox-fitness": "Rox Fitness",
  "nex-games": "Nex Games",
};

const stockLabels: Record<StockStatus, string> = {
  "in-stock": "In stock",
  "low-stock": "Low stock",
  "out-of-stock": "Out of stock",
};

export function SearchResultCard({ product }: SearchResultCardProps) {
  const price =
    product.priceDisplay ?? formatWholesalePrice(product.salePrice ?? product.regularPrice);

  return (
    <Link
      className="group grid gap-4 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-3 shadow-[var(--shadow-soft)] transition duration-300 hover:-translate-y-0.5 hover:border-[var(--color-border-strong)] hover:bg-[var(--color-card-solid)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--color-accent)] sm:grid-cols-[7.5rem_1fr_auto]"
      href={`/products/${product.slug}`}
    >
      <span className="relative aspect-[1.15/1] overflow-hidden rounded-[var(--radius-sm)] bg-[var(--color-surface-raised)]">
        <Image
          alt={product.name}
          className="object-cover transition duration-500 group-hover:scale-105"
          fill
          sizes="(max-width: 640px) calc(100vw - 40px), 120px"
          src={product.thumbnail}
        />
      </span>
      <span className="min-w-0 space-y-2">
        <span className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.14em]">
          <span className="text-[var(--color-accent)]">
            {divisionLabels[product.brandDivision]}
          </span>
          <span className="text-[var(--color-muted)]">{product.category}</span>
        </span>
        <span className="block font-display text-2xl font-bold leading-tight text-[var(--color-text)]">
          {product.name}
        </span>
        <span className="line-clamp-2 block text-sm leading-6 text-[var(--color-muted)]">
          {product.shortDescription}
        </span>
      </span>
      <span className="flex items-end justify-between gap-4 sm:block sm:text-right">
        <span className="block font-display text-2xl font-bold text-[var(--color-text)]">
          {price}
        </span>
        <span className="mt-2 block text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-muted)]">
          {stockLabels[product.stockStatus]}
        </span>
      </span>
    </Link>
  );
}
