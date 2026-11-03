import type { MetadataRoute } from "next";
import { products, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/shop", "/business-gifting", "/contact", "/shipping", "/refunds", "/terms", "/privacy"].map((p) => ({
    url: `${site.url}${p || "/"}`,
    lastModified: new Date(),
  }));
  const items = products.map((p) => ({
    url: `${site.url}/product/${p.slug}`,
    lastModified: new Date(),
  }));
  return [...pages, ...items];
}
