import { siteConfig } from "@/lib/site";
import type { BrandDivision } from "@/types/product";

export const divisionLabels: Record<BrandDivision, string> = {
  "rox-fitness": "Rox Fitness",
  "nex-games": "Nex Games",
};

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;
}

export function absoluteUrl(path = "/") {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return new URL(path, getSiteUrl()).toString();
}

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function getDivisionPath(division: BrandDivision) {
  return division === "rox-fitness" ? "/rox-fitness" : "/nex-games";
}

export function getCategoryPath(slug: string) {
  return `/categories/${slug}`;
}
