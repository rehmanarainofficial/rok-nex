import type { BrandDivision, ProductSummary } from "@/types/product";

export type FeaturedCategory = {
  slug: string;
  name: string;
  description: string;
  image: string;
  brandDivision: BrandDivision;
  accent: "red" | "light" | "dark";
  productCountLabel: string;
};

export type ValuePoint = {
  title: string;
  description: string;
};

export type ShowcaseProduct = ProductSummary & {
  visualTone: "red" | "dark" | "light";
};
