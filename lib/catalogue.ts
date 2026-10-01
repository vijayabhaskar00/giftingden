import { allProducts } from "./data/products";
import { getPriceBand, priceBands } from "./data/taxonomy";
import { productPriceValue } from "./format";
import type { Product } from "./types";

/** The minimum a product needs to be searchable. Lets the client search a slim index. */
export type Searchable = Pick<Product, "id" | "name" | "slug" | "shortDescription" | "category" | "occasion" | "recipient" | "style" | "tags" | "contents" | "idealFor" | "sku" | "price" | "startingPrice">;

/* ---------- Data access (swap for CMS / Shopify later) ---------- */

export const getAllProducts = (): Product[] => allProducts.filter((p) => p.active);
export const getProductBySlug = (slug: string) => getAllProducts().find((p) => p.slug === slug);
export const getFeatured = (limit = 4) => getAllProducts().filter((p) => p.featured).slice(0, limit);
export const getBestsellers = () => getAllProducts().filter((p) => p.bestseller);
export const getByCategory = (slug: string) => getAllProducts().filter((p) => p.category === slug);
export const getByOccasion = (slug: string) => getAllProducts().filter((p) => p.occasion.includes(slug as never));

export function getRelated(product: Product, limit = 4): Product[] {
  return getAllProducts()
    .filter((p) => p.id !== product.id)
    .map((p) => ({
      p,
      score:
        (p.category === product.category ? 3 : 0) +
        p.occasion.filter((o) => product.occasion.includes(o)).length +
        p.recipient.filter((r) => product.recipient.includes(r)).length * 0.5,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.p);
}

/* ---------- Filtering & sorting (pure, runs on server or client) ---------- */

export type SortKey = "featured" | "price-asc" | "price-desc" | "newest";

export interface Filters {
  q?: string;
  category?: string;
  occasion?: string;
  recipient?: string;
  price?: string;
  style?: string;
  customisable?: boolean;
  bestseller?: boolean;
}

export function inPriceBand(p: Product, bandSlug: string): boolean {
  const band = getPriceBand(bandSlug);
  if (!band) return true;
  const v = productPriceValue(p);
  return v >= band.min && v <= band.max;
}

export function filterProducts(list: Product[], f: Filters): Product[] {
  const q = f.q?.trim();
  const searched = q ? searchProducts(list, q) : list;
  return searched.filter(
    (p) =>
      (!f.category || p.category === f.category) &&
      (!f.occasion || p.occasion.includes(f.occasion as never)) &&
      (!f.recipient || p.recipient.includes(f.recipient as never)) &&
      (!f.style || p.style.includes(f.style as never)) &&
      (!f.price || inPriceBand(p, f.price)) &&
      (!f.customisable || p.customisable) &&
      (!f.bestseller || p.bestseller),
  );
}

export function sortProducts(list: Product[], sort: SortKey): Product[] {
  const arr = [...list];
  switch (sort) {
    case "price-asc": return arr.sort((a, b) => productPriceValue(a) - productPriceValue(b));
    case "price-desc": return arr.sort((a, b) => productPriceValue(b) - productPriceValue(a));
    case "newest": return arr.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    default:
      return arr.sort((a, b) => Number(b.featured) - Number(a.featured) || Number(b.bestseller) - Number(a.bestseller));
  }
}

/* ---------- Search ---------- */

/** Natural-language synonyms mapped to taxonomy slugs. */
const SYNONYMS: Record<string, { recipient?: string; occasion?: string; style?: string; category?: string }> = {
  mom: { recipient: "parents" }, mother: { recipient: "parents" }, mum: { recipient: "parents" },
  dad: { recipient: "parents" }, father: { recipient: "parents" }, parents: { recipient: "parents" },
  girlfriend: { recipient: "her" }, wife: { recipient: "her" }, sister: { recipient: "her" }, her: { recipient: "her" },
  boyfriend: { recipient: "him" }, husband: { recipient: "him" }, brother: { recipient: "him" }, him: { recipient: "him" },
  couple: { recipient: "couples" }, couples: { recipient: "couples" },
  friend: { recipient: "friends" }, friends: { recipient: "friends" },
  boss: { recipient: "colleagues" }, colleague: { recipient: "colleagues" }, colleagues: { recipient: "colleagues" },
  client: { recipient: "clients" }, clients: { recipient: "clients" }, employee: { recipient: "employees" },
  bday: { occasion: "birthday" }, valentine: { occasion: "valentines" }, diwali: { occasion: "festive" },
  shaadi: { occasion: "wedding" }, bridal: { occasion: "wedding" }, housewarming: { occasion: "new-beginnings" },
  selfcare: { style: "self-care" }, "self-care": { style: "self-care" }, spa: { style: "self-care" },
  chocolate: { style: "food-treats" }, chocolates: { style: "food-treats" }, food: { style: "food-treats" },
};

/** Extracts a budget ceiling from queries like "₹2000", "under 1,500", "2k". */
export function parseBudget(q: string): number | null {
  const m = q.toLowerCase().replace(/,/g, "").match(/(?:₹|rs\.?|inr|under|below|upto|up to)?\s*(\d+(?:\.\d+)?)\s*(k)?\b/);
  if (!m) return null;
  const n = parseFloat(m[1]) * (m[2] ? 1000 : 1);
  return n >= 100 ? n : null;
}

const normalise = (s: string) => s.toLowerCase().replace(/[^a-z0-9₹\s-]/g, " ");


function haystackOf(p: Searchable): string {
  return normalise(
    [p.name, p.shortDescription, p.category.replace(/-/g, " "), p.occasion.join(" "),
     p.recipient.join(" "), p.style.join(" "), p.tags.join(" "), p.contents.join(" "), p.idealFor.join(" "), p.sku].join(" "),
  );
}

export function searchProducts<T extends Searchable>(list: T[], query: string): T[] {
  const q = normalise(query).trim();
  if (!q) return list;

  const budget = parseBudget(query);
  const STOP = new Set(["under", "below", "upto", "up", "to", "gift", "gifts", "for", "the", "a", "rs", "inr", "my", "me"]);
  const tokens = q.split(/\s+/).filter((t) => t.length > 1 && !STOP.has(t) && !/^₹?\d+(\.\d+)?k?$/.test(t));

  const scored = list
    .map((p) => {
      const hay = haystackOf(p);
      let score = 0;
      for (const t of tokens) {
        const syn = SYNONYMS[t];
        // Synonyms ("mom", "dad") match whole words only, so "mom" never hits "Moments".
        const hit = syn ? new RegExp(`\\b${t}\\b`).test(hay) : hay.includes(t);
        if (hit) score += syn ? 2 : p.name.toLowerCase().includes(t) ? 7 : 2;
        if (syn?.recipient && p.recipient.includes(syn.recipient as never)) score += 3;
        if (syn?.occasion && p.occasion.includes(syn.occasion as never)) score += 3;
        if (syn?.style && p.style.includes(syn.style as never)) score += 3;
      }
      return { p, score };
    })
    .filter((x) => (tokens.length ? x.score > 0 : true));

  let results = scored;
  if (budget) results = results.filter((x) => productPriceValue(x.p) <= budget);

  return results
    .sort((a, b) =>
      budget && !tokens.length
        ? productPriceValue(b.p) - productPriceValue(a.p) // closest to budget first
        : b.score - a.score)
    .map((x) => x.p);
}

export { priceBands };
