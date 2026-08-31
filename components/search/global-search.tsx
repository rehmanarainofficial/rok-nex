"use client";

import { Loader2, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";

import type { BrandDivision, ProductSummary } from "@/types/product";
import { formatWholesalePrice } from "@/utilities/formatters";
import { getCategoryPath } from "@/utilities/seo";

type SearchCategoryLink = {
  brandDivision: BrandDivision;
  name: string;
  slug: string;
};

type GlobalSearchProps = {
  categories?: SearchCategoryLink[];
  onNavigate?: () => void;
};

type SearchStatus = "idle" | "loading" | "success" | "error";

const divisionLabels: Record<BrandDivision, string> = {
  "rox-fitness": "Rox Fitness",
  "nex-games": "Nex Games",
};

function getPrice(product: ProductSummary) {
  return product.priceDisplay ?? formatWholesalePrice(product.salePrice ?? product.regularPrice);
}

export function GlobalSearch({ categories = [], onNavigate }: GlobalSearchProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<ProductSummary[]>([]);
  const [status, setStatus] = useState<SearchStatus>("idle");
  const trimmedQuery = query.trim();
  const resultHref = useMemo(
    () => `/search?q=${encodeURIComponent(trimmedQuery)}`,
    [trimmedQuery],
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (trimmedQuery.length < 2) {
      return;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      setStatus("loading");

      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(trimmedQuery)}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Search request failed.");
        }

        const payload = (await response.json()) as { products: ProductSummary[] };
        setProducts(payload.products);
        setStatus("success");
      } catch (error) {
        if ((error as Error).name === "AbortError") {
          return;
        }

        setProducts([]);
        setStatus("error");
      }
    }, 350);

    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [trimmedQuery]);

  function handleQueryChange(value: string) {
    setQuery(value);

    if (value.trim().length < 2) {
      setProducts([]);
      setStatus("idle");
    }
  }

  return (
    <div className="space-y-4">
      <form action="/search" className="space-y-3">
        <label
          className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-muted)]"
          htmlFor={inputId}
        >
          Search products
        </label>
        <div className="relative">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]"
            size={17}
          />
          <input
            className="pl-10"
            id={inputId}
            name="q"
            onChange={(event) => handleQueryChange(event.target.value)}
            placeholder="Search by product, SKU, category, tags..."
            ref={inputRef}
            type="search"
            value={query}
          />
        </div>
      </form>

      <div className="grid gap-2">
        {status === "idle" ? (
          <div className="grid gap-2">
            {categories.slice(0, 5).map((category) => (
              <Link
                className="rounded-[var(--radius-sm)] px-3 py-2 text-sm font-semibold text-[var(--color-muted)] transition hover:bg-[var(--color-surface-raised)] hover:text-[var(--color-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                href={getCategoryPath(category.slug)}
                key={`${category.brandDivision}-${category.slug}`}
                onClick={onNavigate}
              >
                {category.name}
              </Link>
            ))}
          </div>
        ) : null}

        {status === "loading" ? (
          <p className="inline-flex items-center gap-2 px-3 py-3 text-sm font-semibold text-[var(--color-muted)]">
            <Loader2 aria-hidden="true" className="animate-spin" size={16} />
            Searching catalog...
          </p>
        ) : null}

        {status === "error" ? (
          <p className="px-3 py-3 text-sm font-semibold text-[var(--color-muted)]">
            Search is unavailable while the product database is offline.
          </p>
        ) : null}

        {status === "success" && products.length === 0 ? (
          <p className="px-3 py-3 text-sm font-semibold text-[var(--color-muted)]">
            No products found for &quot;{trimmedQuery}&quot;.
          </p>
        ) : null}

        {products.slice(0, 5).map((product) => (
          <Link
            className="grid grid-cols-[3.5rem_1fr] gap-3 rounded-[var(--radius-sm)] p-2 transition hover:bg-[var(--color-surface-raised)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
            href={`/products/${product.slug}`}
            key={product.slug}
            onClick={onNavigate}
          >
            <span className="relative aspect-square overflow-hidden rounded-[var(--radius-sm)] bg-[var(--color-surface-raised)]">
              <Image
                alt={product.name}
                className="object-cover"
                fill
                sizes="56px"
                src={product.thumbnail}
              />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-bold text-[var(--color-text)]">
                {product.name}
              </span>
              <span className="mt-1 flex flex-wrap gap-2 text-xs font-semibold text-[var(--color-muted)]">
                <span>{divisionLabels[product.brandDivision]}</span>
                <span>{product.category}</span>
                <span>{getPrice(product)}</span>
              </span>
            </span>
          </Link>
        ))}
      </div>

      {trimmedQuery.length >= 2 ? (
        <Link
          className="inline-flex h-10 items-center justify-center rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 text-sm font-bold text-[var(--color-text)] transition hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-raised)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
          href={resultHref}
          onClick={onNavigate}
        >
          View all results
        </Link>
      ) : null}
    </div>
  );
}
