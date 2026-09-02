"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState, useTransition } from "react";

import type { BrandDivision, Category, ProductSort, StockStatus } from "@/types/product";

type CatalogControlsProps = {
  categories: Pick<Category, "brandDivision" | "name" | "slug">[];
  current: {
    category?: string;
    division?: BrandDivision;
    q?: string;
    sort?: ProductSort;
    stock?: StockStatus;
  };
  showDivision?: boolean;
  showSort?: boolean;
};

export function CatalogControls({
  categories,
  current,
  showDivision = false,
  showSort = false,
}: CatalogControlsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const [query, setQuery] = useState(current.q ?? "");
  const [division, setDivision] = useState(current.division ?? "");
  const [category, setCategory] = useState(current.category ?? "");
  const [stock, setStock] = useState(current.stock ?? "");
  const [sort, setSort] = useState(current.sort ?? "featured");
  const filteredCategories = division
    ? categories.filter((item) => item.brandDivision === division)
    : categories;
  const searchParamString = searchParams.toString();

  const baseParams = useMemo(
    () => new URLSearchParams(searchParamString),
    [searchParamString],
  );

  const scrollToProducts = useCallback(() => {
    window.setTimeout(() => {
      document.getElementById("product-results")?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
    }, 80);
  }, []);

  const updateUrl = useCallback(
    (nextValues: {
      category?: string;
      division?: string;
      q?: string;
      sort?: string;
      stock?: string;
    }) => {
      const params = new URLSearchParams(baseParams);

      Object.entries(nextValues).forEach(([key, value]) => {
        const trimmed = value?.trim();

        if (trimmed && !(key === "sort" && trimmed === "featured")) {
          params.set(key, trimmed);
        } else {
          params.delete(key);
        }
      });

      params.delete("page");
      const target = params.toString() ? `${pathname}?${params}` : pathname;

      startTransition(() => {
        router.replace(target, { scroll: false });
        scrollToProducts();
      });
    },
    [baseParams, pathname, router, scrollToProducts, startTransition],
  );

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      if ((searchParams.get("q") ?? "") !== query.trim()) {
        updateUrl({ q: query });
      }
    }, 300);

    return () => window.clearTimeout(timeout);
  }, [query, searchParams, updateUrl]);

  return (
    <form
      className="grid gap-3 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-soft)] lg:grid-cols-[minmax(18rem,1.2fr)_repeat(4,minmax(10rem,auto))]"
      onSubmit={(event) => event.preventDefault()}
      role="search"
    >
      <label className="sr-only" htmlFor="catalog-search">
        Search products
      </label>
      <div className="relative min-w-0">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-[var(--color-accent)]"
          size={18}
        />
        <input
          className="h-12 rounded-[var(--radius-pill)] border-[var(--color-border-strong)] bg-[var(--color-card-solid)] pl-11 pr-4"
          id="catalog-search"
          name="q"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search products"
          style={{ paddingLeft: "2.85rem", paddingRight: "1rem" }}
          type="search"
          value={query}
        />
      </div>
      {showDivision ? (
        <select
          className="h-12 rounded-[var(--radius-pill)] bg-[var(--color-card-solid)]"
          name="division"
          onChange={(event) => {
            const value = event.target.value;

            setDivision(value);
            setCategory("");
            updateUrl({ division: value, category: "" });
          }}
          value={division}
        >
          <option value="">All divisions</option>
          <option value="rox-fitness">Rox Fitness</option>
          <option value="nex-games">Nex Games</option>
        </select>
      ) : null}
      <select
        className="h-12 rounded-[var(--radius-pill)] bg-[var(--color-card-solid)]"
        name="category"
        onChange={(event) => {
          setCategory(event.target.value);
          updateUrl({ category: event.target.value });
        }}
        value={category}
      >
        <option value="">All categories</option>
        {filteredCategories.map((category) => (
          <option key={category.slug} value={category.slug}>
            {category.name}
          </option>
        ))}
      </select>
      <select
        className="h-12 rounded-[var(--radius-pill)] bg-[var(--color-card-solid)]"
        name="stock"
        onChange={(event) => {
          setStock(event.target.value);
          updateUrl({ stock: event.target.value });
        }}
        value={stock}
      >
        <option value="">All availability</option>
        <option value="in-stock">In stock</option>
        <option value="low-stock">Low stock</option>
        <option value="out-of-stock">Out of stock</option>
      </select>
      {showSort ? (
        <select
          className="h-12 rounded-[var(--radius-pill)] bg-[var(--color-card-solid)]"
          name="sort"
          onChange={(event) => {
            setSort(event.target.value as ProductSort);
            updateUrl({ sort: event.target.value });
          }}
          value={sort}
        >
          <option value="featured">Featured</option>
          <option value="newest">Newest</option>
          <option value="name">Name</option>
        </select>
      ) : null}
    </form>
  );
}
