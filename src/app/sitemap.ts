import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getProducts } from "@/lib/store";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();
  const newest = products.reduce((m, p) => (p.updatedAt && p.updatedAt > m ? p.updatedAt : m), "");
  const pages: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, changeFrequency: "weekly", priority: 1, ...(newest ? { lastModified: newest } : {}) },
    { url: `${site.url}/shop`, changeFrequency: "weekly", priority: 0.9, ...(newest ? { lastModified: newest } : {}) },
    { url: `${site.url}/business-gifting`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/contact`, changeFrequency: "yearly", priority: 0.5 },
    ...["shipping", "refunds", "terms", "privacy"].map((p) => ({
      url: `${site.url}/${p}`,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    })),
  ];
  const items: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${site.url}/product/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
    images: [p.image.startsWith("http") ? p.image : `${site.url}${p.image}`],
    ...(p.updatedAt ? { lastModified: p.updatedAt } : {}),
  }));
  return [...pages, ...items];
}
