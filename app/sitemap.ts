import type { MetadataRoute } from "next";
import { getAllProducts } from "@/lib/catalogue";
import { occasions } from "@/lib/data/taxonomy";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["/", "/gifts", "/gift-packages", "/occasions", "/corporate-gifting", "/custom-gifts", "/gift-finder", "/about", "/contact", "/faq", "/privacy", "/terms"];
  return [
    ...staticPaths.map((p) => ({ url: absoluteUrl(p), changeFrequency: "weekly" as const, priority: p === "/" ? 1 : 0.8 })),
    ...occasions.map((o) => ({ url: absoluteUrl(`/occasions/${o.slug}`), changeFrequency: "weekly" as const, priority: 0.7 })),
    ...getAllProducts().map((p) => ({ url: absoluteUrl(`/gift/${p.slug}`), lastModified: p.updatedAt, changeFrequency: "monthly" as const, priority: 0.9 })),
  ];
}
