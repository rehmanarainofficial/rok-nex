import Image from "next/image";

import { formatWholesalePrice } from "@/utilities/formatters";
import type { ProductSummary } from "@/types/product";

type ProductCardProps = {
  product: ProductSummary;
  priority?: boolean;
};

const stockLabels: Record<ProductSummary["stockStatus"], string> = {
  "in-stock": "In stock",
  "low-stock": "Low stock",
  "out-of-stock": "Out of stock",
};

const stockClasses: Record<ProductSummary["stockStatus"], string> = {
  "in-stock": "bg-emerald-500/12 text-emerald-600 dark:text-emerald-300",
  "low-stock": "bg-amber-500/14 text-amber-700 dark:text-amber-300",
  "out-of-stock": "bg-[var(--color-surface-raised)] text-[var(--color-muted)]",
};

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const price = product.priceDisplay
    ? product.priceDisplay
    : formatWholesalePrice(product.salePrice ?? product.regularPrice);

  return (
    <article className="group overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-card)] transition duration-300 hover:-translate-y-1 hover:border-[var(--color-border-strong)] hover:shadow-[var(--shadow-card-hover)]">
      <div className="relative aspect-[1.12/1] overflow-hidden bg-[var(--color-surface-raised)]">
        <Image
          alt={product.name}
          className="object-cover transition duration-500 group-hover:scale-105"
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
          src={product.thumbnail}
        />
        {product.badge ? (
          <span className="absolute left-4 top-4 rounded-[var(--radius-pill)] bg-[var(--color-accent)] px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-white shadow-[var(--shadow-red)]">
            {product.badge}
          </span>
        ) : null}
      </div>
      <div className="space-y-5 p-5">
        <div className="flex items-center justify-between gap-3 text-xs font-bold uppercase tracking-[0.16em]">
          <span className="text-[var(--color-accent)]">{product.category}</span>
          <span className={stockClasses[product.stockStatus]}>
            <span className="rounded-[var(--radius-pill)] px-2 py-1">
              {stockLabels[product.stockStatus]}
            </span>
          </span>
        </div>
        <div>
          <h3 className="font-display text-2xl font-bold leading-tight text-[var(--color-text)]">
            {product.name}
          </h3>
          <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
            {product.shortDescription}
          </p>
        </div>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-muted)]">
              Wholesale
            </p>
            <p className="mt-1 font-display text-2xl font-bold text-[var(--color-text)]">
              {price}
            </p>
          </div>
          <p className="text-right text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]">
            Qty {product.stockQuantity}
          </p>
        </div>
        <details className="group/details border-t border-[var(--color-border)] pt-4">
          <summary className="cursor-pointer list-none text-sm font-bold text-[var(--color-text)] transition hover:text-[var(--color-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]">
            View Details
          </summary>
          <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
            Division:{" "}
            {product.brandDivision === "rox-fitness" ? "Rox Fitness" : "Nex Games"}.
            Contact Rox & Nex for current wholesale tiers, carton quantities, and
            updated availability.
          </p>
        </details>
      </div>
    </article>
  );
}
