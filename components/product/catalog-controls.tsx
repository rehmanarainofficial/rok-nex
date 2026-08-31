import { Search } from "lucide-react";

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
  const filteredCategories = current.division
    ? categories.filter((category) => category.brandDivision === current.division)
    : categories;

  return (
    <form
      className="grid gap-3 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-soft)] lg:grid-cols-[1.2fr_repeat(4,auto)]"
      role="search"
    >
      <label className="sr-only" htmlFor="catalog-search">
        Search products
      </label>
      <div className="relative">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]"
          size={17}
        />
        <input
          defaultValue={current.q}
          id="catalog-search"
          name="q"
          placeholder="Search products, SKU, category"
          type="search"
          className="pl-10"
        />
      </div>
      {showDivision ? (
        <select defaultValue={current.division ?? ""} name="division">
          <option value="">All divisions</option>
          <option value="rox-fitness">Rox Fitness</option>
          <option value="nex-games">Nex Games</option>
        </select>
      ) : null}
      <select defaultValue={current.category ?? ""} name="category">
        <option value="">All categories</option>
        {filteredCategories.map((category) => (
          <option key={category.slug} value={category.slug}>
            {category.name}
          </option>
        ))}
      </select>
      <select defaultValue={current.stock ?? ""} name="stock">
        <option value="">All availability</option>
        <option value="in-stock">In stock</option>
        <option value="low-stock">Low stock</option>
        <option value="out-of-stock">Out of stock</option>
      </select>
      {showSort ? (
        <select defaultValue={current.sort ?? "featured"} name="sort">
          <option value="featured">Featured</option>
          <option value="newest">Newest</option>
          <option value="price-asc">Price low to high</option>
          <option value="price-desc">Price high to low</option>
          <option value="name">Name</option>
        </select>
      ) : null}
      <button
        className="inline-flex h-11 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--color-accent)] px-5 text-sm font-bold text-white shadow-[var(--shadow-red)]"
        type="submit"
      >
        Apply
      </button>
    </form>
  );
}
