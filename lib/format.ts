import type { Product } from "./types";

const inr = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

export const formatINR = (amount: number) => `₹${inr.format(amount)}`;

/** The number used for sorting, filtering and budget matching. */
export const productPriceValue = (p: Pick<Product, "price" | "startingPrice">): number => p.price ?? p.startingPrice ?? 0;

export function priceLabel(p: Pick<Product, "price" | "startingPrice">): string {
  if (p.price != null) return formatINR(p.price);
  if (p.startingPrice != null) return `${formatINR(p.startingPrice)} onwards`;
  return "Price on request";
}

export const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
