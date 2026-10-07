import type { ArtSpec, Product } from "@/lib/types";
import type { Searchable } from "@/lib/catalogue";

/** Slim, serialisable product record shipped to the client for instant search. */
export type SearchDoc = Searchable & { art: ArtSpec; alt: string; image?: string };

export const toSearchDoc = (p: Product): SearchDoc => ({
  id: p.id, name: p.name, slug: p.slug, shortDescription: p.shortDescription, category: p.category,
  occasion: p.occasion, recipient: p.recipient, style: p.style, tags: p.tags, contents: p.contents,
  idealFor: p.idealFor, sku: p.sku,
  art: p.images[0].art, alt: p.images[0].alt, image: p.images[0].src,
});
