"use server";

import { getAllProducts } from "@/lib/catalogue";
import { finderQuestions, ruleBasedRecommender } from "@/lib/gift-finder";
import type { FinderAnswers, Recommendation } from "@/lib/types";

/**
 * Server action behind the Gift Finder. Inputs are validated against the allowed options,
 * so arbitrary strings never reach the recommender. To go AI-powered, replace
 * `ruleBasedRecommender` here (e.g. an LLM call with the catalogue as context);
 * the client does not change.
 */
export async function recommendGifts(raw: FinderAnswers): Promise<Recommendation[]> {
  const answers: FinderAnswers = {};
  for (const q of finderQuestions) {
    const v = raw?.[q.id];
    if (typeof v === "string" && q.options.some((o) => o.value === v)) answers[q.id] = v;
  }
  return ruleBasedRecommender(answers, getAllProducts());
}
