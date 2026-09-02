import type { MetadataRoute } from "next";

import { getSitemapCategories } from "@/services/categories";
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
    const categories = await getSitemapCategories();

    return [
      ...staticRoutes,
      ...categories.map((category) => ({
        url: absoluteUrl(`/categories/${category.slug}`),
        lastModified: category.updatedAt,
        priority: 0.75,
      })),
    ];
  } catch {
    return staticRoutes;
  }
}
