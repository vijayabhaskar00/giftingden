import { getAllProducts } from "./catalogue";
import { formatINR, productPriceValue } from "./format";
import type { FinderAnswers, Product, Recommendation } from "./types";

/* ---------- Questions (data-driven so copy / options are editable) ---------- */

export interface FinderQuestion {
  id: keyof FinderAnswers;
  title: string;
  options: { label: string; value: string }[];
}

const opt = (labels: string[]) => labels.map((l) => ({ label: l, value: l }));

export const finderQuestions: FinderQuestion[] = [
  { id: "recipient", title: "Who are you gifting?", options: opt(["Clients", "Employees", "Team", "Leadership & VIPs", "Partners & Vendors", "Event delegates"]) },
  { id: "occasion", title: "What's the occasion?", options: opt(["Onboarding", "Appreciation", "Client gifting", "Festive", "New Year", "Milestone", "Event", "Thank you"]) },
  { id: "budget", title: "Budget per gift?", options: opt(["Under ₹1,000", "₹1,000–₹2,000", "₹2,000–₹3,500", "₹3,500–₹6,000", "₹6,000+"]) },
  { id: "quantity", title: "How many gifts?", options: opt(["Under 25", "25–50", "50–100", "100–250", "250+"]) },
];

/* ---------- Mapping answers to catalogue taxonomy ---------- */

const RECIPIENT_MAP: Record<string, string[]> = {
  Clients: ["clients"], Employees: ["employees"], Team: ["teams", "employees"], "Leadership & VIPs": ["leadership"],
  "Partners & Vendors": ["partners", "clients"], "Event delegates": ["delegates"],
};
const OCCASION_MAP: Record<string, string[]> = {
  Onboarding: ["onboarding"], Appreciation: ["appreciation"], "Client gifting": ["client-gifting"], Festive: ["festive"],
  "New Year": ["new-year"], Milestone: ["milestones"], Event: ["events"], "Thank you": ["thank-you"],
};
const BUDGET_RANGES: Record<string, [number, number]> = {
  "Under ₹1,000": [0, 999], "₹1,000–₹2,000": [1000, 2000], "₹2,000–₹3,500": [2001, 3500],
  "₹3,500–₹6,000": [3501, 6000], "₹6,000+": [6001, Infinity],
};

/* ---------- Recommender ---------- */

/**
 * Recommender contract. Today: rule-based scoring below.
 * Tomorrow: implement the same signature against an LLM / vector search and
 * pass it to <GiftFinder recommender={...} />.
 */
export type Recommender = (answers: FinderAnswers, catalogue: Product[]) => Promise<Recommendation[]> | Recommendation[];

export const ruleBasedRecommender: Recommender = (answers, catalogue) => {
  const rec = RECIPIENT_MAP[answers.recipient ?? ""] ?? [];
  const occ = OCCASION_MAP[answers.occasion ?? ""] ?? [];
  const range = BUDGET_RANGES[answers.budget ?? ""];

  const ranked = catalogue
    .map((product): Recommendation => {
      let score = 0;
      const reasons: string[] = [];
      if (occ.some((o) => product.occasion.includes(o as never))) { score += 4; reasons.push(`Made for ${answers.occasion?.toLowerCase()} gifting`); }
      if (rec.some((r) => product.recipient.includes(r as never))) { score += 3; reasons.push(`Popular for ${answers.recipient?.toLowerCase()}`); }
      if (range) {
        const v = productPriceValue(product);
        if (v >= range[0] && v <= range[1]) { score += 4; reasons.push(`Within your budget (${formatINR(v)} onwards)`); }
        else if (v < range[0] && v >= range[0] * 0.6) score += 1;
        else if (v > range[1] && v <= range[1] * 1.25) score += 1;
        else score -= 3;
      }
      if (product.customisable) { score += 0.5; if (!reasons.length || reasons.length < 3) reasons.push("Logo and message branding available"); }
      if (product.bestseller) score += 0.5;
      return { product, score, reasons };
    })
    .sort((a, b) => b.score - a.score);

  // Strong matches first; pad with the next-best so the shopper is never left empty-handed.
  const strong = ranked.filter((r) => r.score > 2);
  return (strong.length >= 3 ? strong : [...strong, ...ranked.filter((r) => r.score <= 2)]).slice(0, 3);
};

export const getFinderCatalogue = () => getAllProducts();
