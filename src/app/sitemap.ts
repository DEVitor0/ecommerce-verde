import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { posts } from "@/data/posts";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/produtos`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/blog`, changeFrequency: "monthly", priority: 0.6 },
    ...products.map((p) => ({
      url: `${base}/produto/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...posts.map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: p.date, priority: 0.5 })),
  ];
}
