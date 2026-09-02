"use client";

import Link from "next/link";

import type { Category } from "@/types/product";
import { cn } from "@/utilities/cn";

type CategoryNavigationProps = {
  activeCategory?: string;
  basePath: string;
  categories: Pick<Category, "name" | "slug">[];
  params?: Record<string, string | undefined>;
};

function buildHref(
  basePath: string,
  params: Record<string, string | undefined>,
  category?: string,
) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value && key !== "category" && key !== "page") {
      searchParams.set(key, value);
    }
  });

  if (category) {
    searchParams.set("category", category);
  }

  const query = searchParams.toString();

  return query ? `${basePath}?${query}` : basePath;
}

export function CategoryNavigation({
  activeCategory,
  basePath,
  categories,
  params = {},
}: CategoryNavigationProps) {
  if (!categories.length) {
    return null;
  }

  function scrollToProducts() {
    window.setTimeout(() => {
      document.getElementById("product-results")?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
    }, 120);
  }

  return (
    <nav aria-label="Category navigation" className="flex gap-2 overflow-x-auto pb-2">
      <Link
        className={cn(
          "inline-flex h-10 shrink-0 items-center rounded-[var(--radius-pill)] border px-4 text-sm font-bold transition",
          !activeCategory
            ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-white"
            : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted)] hover:text-[var(--color-text)]",
        )}
        href={buildHref(basePath, params)}
        onClick={scrollToProducts}
        scroll={false}
      >
        All
      </Link>
      {categories.map((category) => (
        <Link
          className={cn(
            "inline-flex h-10 shrink-0 items-center rounded-[var(--radius-pill)] border px-4 text-sm font-bold transition",
            activeCategory === category.slug
              ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-white"
              : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted)] hover:text-[var(--color-text)]",
          )}
          href={buildHref(basePath, params, category.slug)}
          key={category.slug}
          onClick={scrollToProducts}
          scroll={false}
        >
          {category.name}
        </Link>
      ))}
    </nav>
  );
}
