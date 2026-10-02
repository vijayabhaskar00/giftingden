"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Search, X } from "lucide-react";
import Media from "@/components/ui/Media";
import WhatsAppButton from "@/components/whatsapp/WhatsAppButton";
import { searchProducts } from "@/lib/catalogue";
import { categories, occasions } from "@/lib/data/taxonomy";
import { priceLabel } from "@/lib/format";
import { getSuggestions, popularSearches } from "@/lib/search-suggest";
import { trackEvent } from "@/lib/analytics";
import type { SearchDoc } from "./types";

export default function SearchOverlay({ docs, onClose }: { docs: SearchDoc[]; onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Focus, scroll lock, restore focus on close.
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();
    return () => { document.body.style.overflow = overflow; previous?.focus?.(); };
  }, []);

  // Esc to close + simple focus trap.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key !== "Tab" || !panelRef.current) return;
      const f = panelRef.current.querySelectorAll<HTMLElement>("a[href],button,input");
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const q = query.trim();
  const results = useMemo(() => (q ? searchProducts(docs, q) : []), [docs, q]);
  const suggestions = useMemo(() => getSuggestions(q), [q]);

  // Record searches once the shopper pauses (no raw personal text beyond the query).
  useEffect(() => {
    if (q.length < 3) return;
    const t = setTimeout(() => trackEvent("search", { query: q.slice(0, 60), results: results.length }), 800);
    return () => clearTimeout(t);
  }, [q, results.length]);

  const submit = (value: string) => {
    const v = value.trim();
    if (!v) return;
    onClose();
    router.push(`/gifts?q=${encodeURIComponent(v)}`);
  };

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Search gifts">
      <div className="animate-fade absolute inset-0 bg-foreground/45" onClick={onClose} aria-hidden />
      <div ref={panelRef} className="animate-rise absolute inset-x-0 top-0 flex max-h-[100dvh] flex-col bg-background shadow-2xl md:mx-auto md:mt-[8vh] md:max-h-[80vh] md:max-w-2xl md:rounded-lg">
        <form role="search" onSubmit={(e) => { e.preventDefault(); submit(query); }} className="flex items-center gap-3 border-b border-border px-4 md:px-6">
          <Search aria-hidden className="h-5 w-5 shrink-0 text-muted" />
          <label htmlFor="site-search" className="sr-only">Search gifts</label>
          <input
            ref={inputRef} id="site-search" type="search" value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder="What are you gifting for?" autoComplete="off" enterKeyHint="search" maxLength={80}
            className="h-16 min-w-0 flex-1 bg-transparent text-lg outline-none placeholder:text-muted/80 [&::-webkit-search-cancel-button]:hidden"
          />
          <button type="button" onClick={onClose} aria-label="Close search" className="grid h-10 w-10 shrink-0 place-items-center rounded-full hover:bg-beige">
            <X className="h-5 w-5" />
          </button>
        </form>

        <div className="overflow-y-auto overscroll-contain px-4 pb-8 pt-5 md:px-6" aria-live="polite">
          {!q && (
            <>
              <p className="t-eyebrow mb-3">Popular searches</p>
              <ul className="flex flex-wrap gap-2">
                {popularSearches.map((s) => (
                  <li key={s}>
                    <button type="button" onClick={() => submit(s.replace("Under ₹", ""))} className="rounded-full border border-border px-4 py-2 text-sm transition-colors hover:border-foreground hover:bg-beige">{s}</button>
                  </li>
                ))}
              </ul>
              <p className="t-eyebrow mb-3 mt-8">Browse by occasion</p>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-3">
                {occasions.slice(0, 9).map((o) => (
                  <li key={o.slug}><Link href={`/occasions/${o.slug}`} onClick={onClose} className="flex items-center gap-2 py-2 text-sm hover:text-brown"><span aria-hidden>{o.emoji}</span>{o.name}</Link></li>
                ))}
              </ul>
              <p className="t-eyebrow mb-3 mt-6">Gift packages</p>
              <ul className="flex flex-wrap gap-x-5 gap-y-1">
                {categories.slice(0, 6).map((c) => (
                  <li key={c.slug}><Link href={`/gifts?category=${c.slug}`} onClick={onClose} className="py-1.5 text-sm text-muted hover:text-foreground">{c.name}</Link></li>
                ))}
              </ul>
            </>
          )}

          {q && suggestions.length > 0 && (
            <>
              <p className="t-eyebrow mb-2">Suggestions</p>
              <ul className="mb-6">
                {suggestions.map((s) => (
                  <li key={s.href}>
                    <Link href={s.href} onClick={onClose} className="group flex items-center justify-between rounded-sm px-2 py-2.5 hover:bg-beige">
                      <span className="text-[0.95rem]">{s.label}</span>
                      <span className="flex items-center gap-2 text-xs text-muted">{s.kind}<ArrowRight aria-hidden className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}

          {q && results.length > 0 && (
            <>
              <p className="t-eyebrow mb-2">Gifts</p>
              <ul>
                {results.slice(0, 5).map((p) => (
                  <li key={p.id}>
                    <Link href={`/gift/${p.slug}`} onClick={onClose} className="flex items-center gap-4 rounded-sm px-2 py-2 hover:bg-beige">
                      <span className="relative h-16 w-14 shrink-0 overflow-hidden rounded-sm bg-beige"><Media art={p.art} alt="" sizes="56px" image={p.image ? { src: p.image, alt: p.alt, art: p.art, variant: "box" } : undefined} /></span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-display text-lg font-semibold leading-tight">{p.name}</span>
                        <span className="block truncate text-xs text-muted">{p.shortDescription}</span>
                      </span>
                      <span className="shrink-0 text-sm font-semibold">{priceLabel(p)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <button type="button" onClick={() => submit(query)} className="mt-4 flex w-full items-center justify-center gap-2 rounded-sm border border-foreground/80 py-3 text-xs font-bold uppercase tracking-[0.12em] hover:bg-foreground hover:text-background">
                See all {results.length} result{results.length === 1 ? "" : "s"} <ArrowRight aria-hidden className="h-4 w-4" />
              </button>
            </>
          )}

          {q && results.length === 0 && suggestions.length === 0 && (
            <div className="py-6 text-center">
              <p className="t-h3">Hmm… we couldn&apos;t find that gift.</p>
              <p className="t-caption mt-2 text-base">Tell us what you&apos;re looking for and we&apos;ll find it.</p>
              <div className="mt-6 flex justify-center">
                <WhatsAppButton message={`Hi Gifthut! I searched for "${q.slice(0, 80)}" but couldn't find the right gift. Could you help?`} label="Talk to a Gifting Expert" source="search_empty" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
