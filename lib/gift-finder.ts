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
  { id: "recipient", title: "Who are you gifting for?", options: opt(["Partner", "Friend", "Parent", "Sibling", "Colleague", "Client", "Employee", "Other"]) },
  { id: "occasion", title: "What's the occasion?", options: opt(["Birthday", "Anniversary", "Wedding", "Corporate", "Festival", "Thank You", "Just Because"]) },
  { id: "budget", title: "What's your budget?", options: opt(["Under ₹500", "₹500–₹1,000", "₹1,000–₹2,500", "₹2,500–₹5,000", "₹5,000+"]) },
  { id: "personality", title: "What's their personality?", options: opt(["Minimalist", "Luxury Lover", "Foodie", "Self-Care", "Tech Lover", "Travel Lover", "Sentimental"]) },
];

/* ---------- Mapping answers to catalogue taxonomy ---------- */

const RECIPIENT_MAP: Record<string, string[]> = {
  Partner: ["couples", "her", "him"], Friend: ["friends"], Parent: ["parents"], Sibling: ["friends", "her", "him"],
  Colleague: ["colleagues"], Client: ["clients"], Employee: ["employees", "colleagues"], Other: [],
};
const OCCASION_MAP: Record<string, string[]> = {
  Birthday: ["birthday"], Anniversary: ["anniversary", "valentines"], Wedding: ["wedding"], Corporate: ["corporate"],
  Festival: ["festive"], "Thank You": ["thank-you"], "Just Because": ["just-because"],
};
const PERSONALITY_MAP: Record<string, string> = {
  Minimalist: "minimalist", "Luxury Lover": "luxury-lover", Foodie: "foodie", "Self-Care": "self-care",
  "Tech Lover": "tech-lover", "Travel Lover": "travel-lover", Sentimental: "sentimental",
};
const BUDGET_RANGES: Record<string, [number, number]> = {
  "Under ₹500": [0, 499], "₹500–₹1,000": [500, 1000], "₹1,000–₹2,500": [1001, 2500],
  "₹2,500–₹5,000": [2501, 5000], "₹5,000+": [5001, Infinity],
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
  const pers = PERSONALITY_MAP[answers.personality ?? ""];

  const ranked = catalogue
    .map((product): Recommendation => {
      let score = 0;
      const reasons: string[] = [];
      if (occ.some((o) => product.occasion.includes(o as never))) { score += 4; reasons.push(`Made for ${answers.occasion?.toLowerCase()}s`); }
      if (rec.some((r) => product.recipient.includes(r as never))) { score += 3; reasons.push(`Loved by ${answers.recipient?.toLowerCase()}s`); }
      if (pers && product.personality.includes(pers as never)) { score += 3; reasons.push(`Suits a ${answers.personality?.toLowerCase()} personality`); }
      if (range) {
        const v = productPriceValue(product);
        if (v >= range[0] && v <= range[1]) { score += 4; reasons.push(`Within your budget (${formatINR(v)} onwards)`); }
        else if (v < range[0] * 1.0 && v >= range[0] * 0.6) score += 1;
        else if (v > range[1] && v <= range[1] * 1.25) score += 1;
        else score -= 3;
      }
      if (product.bestseller) score += 0.5;
      if (product.customisable) score += 0.25;
      return { product, score, reasons };
    })
    .sort((a, b) => b.score - a.score);

  // Strong matches first; pad with the next-best so the shopper is never left empty-handed.
  const strong = ranked.filter((r) => r.score > 2);
  return (strong.length >= 3 ? strong : [...strong, ...ranked.filter((r) => r.score <= 2)]).slice(0, 3);
};

export const getFinderCatalogue = () => getAllProducts();
