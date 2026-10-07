import type { Product } from "./types";

/** Internal only (used by the Gift Finder budget ranking). Prices are never displayed on the site. */
export const productPriceValue = (p: Pick<Product, "price" | "startingPrice">): number => p.price ?? p.startingPrice ?? 0;

export const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
