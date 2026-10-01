"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import JsonLd from "@/components/ui/JsonLd";
import { faqLd } from "@/lib/seo";
import type { Faq } from "@/lib/types";

export default function FAQAccordion({ faqs, schema = true }: { faqs: Faq[]; schema?: boolean }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-border border-y border-border">
      {schema && <JsonLd data={faqLd(faqs)} />}
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.question}>
            <h3>
              <button
                type="button" id={`faq-q-${i}`} aria-expanded={isOpen} aria-controls={`faq-a-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left font-display text-[1.35rem] font-medium leading-snug md:py-6 md:text-2xl"
              >
                {f.question}
                <Plus aria-hidden className={`h-5 w-5 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} />
              </button>
            </h3>
            <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
              <div className="overflow-hidden"><p className="t-body max-w-2xl pb-6 text-muted">{f.answer}</p></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
