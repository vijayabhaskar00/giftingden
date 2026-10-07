import { categories, occasions, recipients, styles } from "./data/taxonomy";

export interface Suggestion { label: string; href: string; kind: "Occasion" | "Category" | "For" | "Style"  }

/** Alias → taxonomy match, for natural phrases like "ceo" or "vendor". */
const RECIPIENT_ALIASES: Record<string, string> = {
  customer: "clients", client: "clients", employee: "employees", staff: "employees", team: "teams",
  ceo: "leadership", vip: "leadership", boss: "leadership", executive: "leadership",
  vendor: "partners", partner: "partners", delegate: "delegates", speaker: "delegates",
};

export const popularSearches = ["Diwali hampers", "Onboarding kit", "Client gifts", "Executive", "Branded", "Conference", "Thank you"];

export function getSuggestions(query: string): Suggestion[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const out: Suggestion[] = [];
  const has = (...s: string[]) => s.some((x) => x.toLowerCase().includes(q) || q.includes(x.toLowerCase()));

  occasions.forEach((o) => { if (has(o.name, o.slug)) out.push({ label: o.name, href: `/occasions/${o.slug}`, kind: "Occasion" }); });
  categories.forEach((c) => { if (has(c.name)) out.push({ label: c.name, href: `/gifts?category=${c.slug}`, kind: "Category" }); });

  const alias = Object.entries(RECIPIENT_ALIASES).find(([k]) => q.includes(k))?.[1];
  if (q.includes("diwali")) out.push({ label: "Festive Gifting", href: "/occasions/festive", kind: "Occasion" });
  recipients.forEach((r) => { if (r.slug === alias || has(r.name)) out.push({ label: r.name, href: `/gifts?recipient=${r.slug}`, kind: "For" }); });
  styles.forEach((s) => { if (has(s.name, s.slug.replace("-", " "))) out.push({ label: s.name, href: `/gifts?style=${s.slug}`, kind: "Style" }); });

  const seen = new Set<string>();
  return out.filter((s) => (seen.has(s.href) ? false : (seen.add(s.href), true))).slice(0, 6);
}
