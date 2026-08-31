import "server-only";

import { getCategories } from "@/services/categories";
import { getProductCatalog, getProducts } from "@/services/products";
import type { BrandDivision, ProductSort, StockStatus } from "@/types/product";

export type PublicCatalogQuery = {
  category?: string;
  division?: BrandDivision;
  page?: number;
  perPage?: number;
  q?: string;
  sort?: ProductSort;
  stock?: StockStatus;
};

export function parsePage(value: string | undefined) {
  const page = Number(value);

  return Number.isInteger(page) && page > 0 ? page : 1;
}

export function parseProductSort(value: string | undefined): ProductSort {
  const allowed: ProductSort[] = ["featured", "newest", "price-asc", "price-desc", "name"];

  return allowed.includes(value as ProductSort) ? (value as ProductSort) : "featured";
}

export function parseStockStatus(value: string | undefined) {
  const allowed: StockStatus[] = ["in-stock", "low-stock", "out-of-stock"];

  return allowed.includes(value as StockStatus) ? (value as StockStatus) : undefined;
}

export async function getPublicCatalog(query: PublicCatalogQuery) {
  const categories = await getCategories({
    active: true,
    brandDivision: query.division,
  });
  const selectedCategory = query.category
    ? categories.find((category) => category.slug === query.category)
    : undefined;
  const categoryValues = selectedCategory
    ? [selectedCategory.name, selectedCategory.slug]
    : query.category
      ? [query.category]
      : undefined;

  const [catalog, featuredProducts] = await Promise.all([
    getProductCatalog({
      active: true,
      brandDivision: query.division,
      categoryValues,
      page: query.page,
      perPage: query.perPage,
      search: query.q,
      sort: query.sort,
      stockStatus: query.stock,
    }),
    getProducts({
      active: true,
      brandDivision: query.division,
      featured: true,
      limit: 4,
    }),
  ]);

  return {
    categories,
    featuredProducts,
    selectedCategory,
    ...catalog,
  };
}

