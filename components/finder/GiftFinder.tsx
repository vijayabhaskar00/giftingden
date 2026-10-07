"use client";

import { useRef, useState, useTransition } from "react";
import { ArrowLeft, Check, RotateCcw } from "lucide-react";
import WhatsAppButton from "@/components/whatsapp/WhatsAppButton";
import { getAllProducts } from "@/lib/catalogue";
import { finderQuestions, ruleBasedRecommender, type Recommender } from "@/lib/gift-finder";
import { trackEvent } from "@/lib/analytics";
import { createGiftFinderWhatsAppMessage } from "@/lib/whatsapp";
import type { FinderAnswers, Recommendation } from "@/lib/types";
import GiftFinderQuestion from "./GiftFinderQuestion";
import GiftRecommendation from "./GiftRecommendation";

/** `recommender` is pluggable: pass an async (e.g. AI-backed) implementation to replace the rule-based default. */
export default function GiftFinder({ headingId = "finder-title", recommender = ruleBasedRecommender }: { headingId?: string; recommender?: Recommender }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<FinderAnswers>({});
  const [results, setResults] = useState<Recommendation[] | null>(null);
  const [error, setError] = useState(false);
  const [pending, startTransition] = useTransition();
  const started = useRef(false);
  const panel = useRef<HTMLDivElement>(null);

  const total = finderQuestions.length;
  const q = finderQuestions[step];

  function finish(final: FinderAnswers) {
    setError(false);
    startTransition(async () => {
      try {
        const recs = await recommender(final, getAllProducts());
        setResults(recs);
        trackEvent("gift_finder_complete", { ...final, results: recs.length });
        panel.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      } catch { setError(true); }
    });
  }

  function choose(value: string) {
    if (!started.current) { started.current = true; trackEvent("gift_finder_start"); }
    const next = { ...answers, [q.id]: value };
    setAnswers(next);
    if (step < total - 1) setTimeout(() => setStep((s) => s + 1), 180);
    else finish(next);
  }

  function reset() { setStep(0); setAnswers({}); setResults(null); setError(false); }

  return (
    <div ref={panel} className="scroll-mt-24 rounded-lg border border-border bg-surface p-5 shadow-[0_1px_0_rgb(42_37_34/0.04)] md:p-10">
      {!results ? (
        <>
          <div className="flex items-center justify-between gap-4">
            <button type="button" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0 || pending}
              className="flex items-center gap-1.5 text-sm font-semibold text-muted transition-colors hover:text-foreground disabled:invisible">
              <ArrowLeft aria-hidden className="h-4 w-4" /> Back
            </button>
            <p className="t-caption" aria-live="polite">Question {step + 1} of {total}</p>
          </div>
          <div className="mt-3 flex gap-1.5" role="progressbar" aria-valuemin={1} aria-valuemax={total} aria-valuenow={step + 1} aria-label="Gift finder progress">
            {finderQuestions.map((_, i) => <span key={i} className={`h-0.5 flex-1 rounded-full transition-colors duration-500 ${i <= step ? "bg-foreground" : "bg-border"}`} />)}
          </div>

          <GiftFinderQuestion key={q.id} question={q} selected={answers[q.id]} onSelect={choose} disabled={pending} headingId={headingId} />

          {pending && <p role="status" className="t-caption mt-6 text-center">Finding something special…</p>}
          {error && (
            <p role="alert" className="mt-6 text-center text-sm text-brown">
              Something went wrong. <button type="button" onClick={() => finish(answers)} className="font-semibold underline">Try again</button>
            </p>
          )}
        </>
      ) : (
        <div>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="t-eyebrow mb-3">Your shortlist</p>
              <h3 id={headingId} className="t-h2">Your hamper shortlist.</h3>
            </div>
            <button type="button" onClick={reset} className="flex items-center gap-2 self-start text-sm font-semibold text-muted underline-offset-4 hover:text-foreground hover:underline md:self-auto">
              <RotateCcw aria-hidden className="h-4 w-4" /> Start over
            </button>
          </div>
          <ul className="mt-5 flex flex-wrap gap-2">
            {finderQuestions.map((fq) => answers[fq.id] && (
              <li key={fq.id} className="flex items-center gap-1.5 rounded-full bg-beige px-3.5 py-1.5 text-xs font-semibold"><Check aria-hidden className="h-3 w-3 text-accent-ink" />{answers[fq.id]}</li>
            ))}
          </ul>
          <ul className="mt-8 grid gap-8 md:grid-cols-3 md:gap-6">
            {results.map((r) => <li key={r.product.id}><GiftRecommendation rec={r} /></li>)}
          </ul>
          <div className="mt-10 flex flex-col items-center gap-3 border-t border-border pt-8 text-center">
            <p className="t-caption text-base">Not quite right? Our corporate team can suggest more, within your budget and quantity.</p>
            <WhatsAppButton message={createGiftFinderWhatsAppMessage(answers, results.map((r) => r.product))} label="Talk to Our Corporate Team" size="lg" source="gift_finder_results" />
          </div>
        </div>
      )}
    </div>
  );
}
