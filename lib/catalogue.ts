import { allProducts } from "./data/products";
import type { Product } from "./types";

/** The minimum a product needs to be searchable. Lets the client search a slim index. */
export type Searchable = Pick<Product, "id" | "name" | "slug" | "shortDescription" | "category" | "occasion" | "recipient" | "style" | "tags" | "contents" | "idealFor" | "sku">;

/* ---------- Data access (swap for CMS / Shopify later) ---------- */

export const getAllProducts = (): Product[] => allProducts.filter((p) => p.active);
export const getProductBySlug = (slug: string) => getAllProducts().find((p) => p.slug === slug);
/** Featured hampers, with Diwali / festive gifts first while the season is on. */
export const getFeatured = (limit = 4) =>
  getAllProducts()
    .filter((p) => p.featured)
    .sort((a, b) => Number(b.category === "festive-hampers") - Number(a.category === "festive-hampers"))
    .slice(0, limit);
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

export type SortKey = "featured" | "newest";

export interface Filters {
  q?: string;
  category?: string;
  occasion?: string;
  recipient?: string;
  style?: string;
  customisable?: boolean;
  bestseller?: boolean;
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
      (!f.customisable || p.customisable) &&
      (!f.bestseller || p.bestseller),
  );
}

export function sortProducts(list: Product[], sort: SortKey): Product[] {
  const arr = [...list];
  switch (sort) {
    case "newest": return arr.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    default:
      return arr.sort(
        (a, b) =>
          Number(b.category === "festive-hampers") - Number(a.category === "festive-hampers") ||
          Number(b.featured) - Number(a.featured) ||
          Number(b.bestseller) - Number(a.bestseller),
      );
  }
}

/* ---------- Search ---------- */

/** Natural-language synonyms mapped to taxonomy slugs. */
const SYNONYMS: Record<string, { recipient?: string; occasion?: string; style?: string; category?: string }> = {
  client: { recipient: "clients" }, clients: { recipient: "clients" }, customer: { recipient: "clients" }, customers: { recipient: "clients" },
  employee: { recipient: "employees" }, employees: { recipient: "employees" }, staff: { recipient: "employees" }, hr: { recipient: "employees" },
  team: { recipient: "teams" }, teams: { recipient: "teams" },
  vip: { recipient: "leadership" }, ceo: { recipient: "leadership" }, boss: { recipient: "leadership" }, leadership: { recipient: "leadership" }, executive: { recipient: "leadership" },
  vendor: { recipient: "partners" }, vendors: { recipient: "partners" }, partner: { recipient: "partners" }, partners: { recipient: "partners" },
  delegate: { recipient: "delegates" }, delegates: { recipient: "delegates" }, attendee: { recipient: "delegates" }, speaker: { recipient: "delegates" },
  joiner: { occasion: "onboarding" }, joiners: { occasion: "onboarding" }, onboarding: { occasion: "onboarding" }, welcome: { occasion: "onboarding" },
  diwali: { occasion: "festive" }, festival: { occasion: "festive" }, festive: { occasion: "festive" },
  newyear: { occasion: "new-year" }, "year-end": { occasion: "new-year" }, yearend: { occasion: "new-year" },
  anniversary: { occasion: "milestones" }, promotion: { occasion: "milestones" }, milestone: { occasion: "milestones" },
  conference: { occasion: "events" }, event: { occasion: "events" }, offsite: { occasion: "events" }, launch: { occasion: "events" },
  branded: { style: "branded" }, branding: { style: "branded" }, logo: { style: "branded" },
  wellness: { style: "wellness" }, selfcare: { style: "wellness" }, "self-care": { style: "wellness" },
  luxury: { style: "premium" }, premium: { style: "premium" },
  chocolate: { style: "food-treats" }, chocolates: { style: "food-treats" }, food: { style: "food-treats" }, sweets: { style: "food-treats" },
  tech: { style: "tech" }, desk: { style: "tech" },
};

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

  return scored.sort((a, b) => b.score - a.score).map((x) => x.p);
}

