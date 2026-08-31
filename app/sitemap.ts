import type { MetadataRoute } from "next";

import { getSitemapCategories } from "@/services/categories";
import { getSitemapProducts } from "@/services/products";
import { absoluteUrl } from "@/utilities/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), priority: 1 },
    { url: absoluteUrl("/rox-fitness"), priority: 0.9 },
    { url: absoluteUrl("/nex-games"), priority: 0.9 },
    { url: absoluteUrl("/products"), priority: 0.9 },
    { url: absoluteUrl("/about"), priority: 0.6 },
    { url: absoluteUrl("/contact"), priority: 0.6 },
  ];

  try {
    const [products, categories] = await Promise.all([
      getSitemapProducts(),
      getSitemapCategories(),
    ]);

    return [
      ...staticRoutes,
      ...categories.map((category) => ({
        url: absoluteUrl(`/categories/${category.slug}`),
        lastModified: category.updatedAt,
        priority: 0.75,
      })),
      ...products.map((product) => ({
        url: absoluteUrl(`/products/${product.slug}`),
        lastModified: product.updatedAt,
        priority: 0.8,
      })),
    ];
  } catch {
    return staticRoutes;
  }
}
