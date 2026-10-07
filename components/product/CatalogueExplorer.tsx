"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { X } from "lucide-react";
import EmptyState from "@/components/ui/EmptyState";
import { filterProducts, sortProducts, type Filters, type SortKey } from "@/lib/catalogue";
import { getCategory, getOccasion, getRecipient, getStyle } from "@/lib/data/taxonomy";
import { trackEvent } from "@/lib/analytics";
import type { Product } from "@/lib/types";
import FilterBar from "./FilterBar";
import ProductGrid from "./ProductGrid";

const SORT_KEYS: SortKey[] = ["featured", "newest"];
const FILTER_KEYS = ["category", "occasion", "recipient", "style"] as const;

function parse(sp: URLSearchParams): { filters: Filters; sort: SortKey } {
  const s = sp.get("sort") as SortKey | null;
  return {
    sort: s && SORT_KEYS.includes(s) ? s : "featured",
    filters: {
      q: sp.get("q")?.slice(0, 80) || undefined,
      category: sp.get("category") || undefined, occasion: sp.get("occasion") || undefined,
      recipient: sp.get("recipient") || undefined, style: sp.get("style") || undefined,
      customisable: sp.get("customisable") === "1" || undefined, bestseller: sp.get("bestseller") === "1" || undefined,
    },
  };
}

/** Instant, URL-synced filtering over the in-memory catalogue. Shareable links, back button friendly. */
export default function CatalogueExplorer({ products }: { products: Product[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [, startTransition] = useTransition();
  const { filters, sort } = useMemo(() => parse(new URLSearchParams(params.toString())), [params]);
  const [qText, setQText] = useState(filters.q ?? "");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Keep the input in step when the URL changes elsewhere (e.g. header search).
  useEffect(() => { setQText(filters.q ?? ""); }, [filters.q]);

  const push = (next: Filters, nextSort: SortKey) => {
    const sp = new URLSearchParams();
    if (next.q) sp.set("q", next.q);
    FILTER_KEYS.forEach((k) => next[k] && sp.set(k, next[k]!));
    if (next.customisable) sp.set("customisable", "1");
    if (next.bestseller) sp.set("bestseller", "1");
    if (nextSort !== "featured") sp.set("sort", nextSort);
    const qs = sp.toString();
    startTransition(() => router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false }));
  };

  const onChange = (patch: Partial<Filters>) => {
    const next = { ...filters, ...patch };
    const [key, value] = Object.entries(patch)[0] ?? [];
    if (value) trackEvent("filter_change", { filter: key, value: String(value) });
    push(next, sort);
  };
  const onQuery = (q: string) => {
    setQText(q);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => push({ ...filters, q: q.trim() || undefined }, sort), 250);
  };

  const results = useMemo(() => sortProducts(filterProducts(products, filters), sort), [products, filters, sort]);

  const chips: { key: keyof Filters; label: string }[] = [
    filters.category && { key: "category", label: getCategory(filters.category)?.name ?? filters.category },
    filters.occasion && { key: "occasion", label: getOccasion(filters.occasion)?.name ?? filters.occasion },
    filters.recipient && { key: "recipient", label: getRecipient(filters.recipient)?.name ?? filters.recipient },
    filters.style && { key: "style", label: getStyle(filters.style)?.name ?? filters.style },
    filters.customisable && { key: "customisable", label: "Customisable" },
    filters.bestseller && { key: "bestseller", label: "Bestseller" },
  ].filter(Boolean) as { key: keyof Filters; label: string }[];

  return (
    <div>
      <FilterBar
        filters={filters} sort={sort} qText={qText} resultCount={results.length}
        onQuery={onQuery} onChange={onChange} onSort={(s) => push(filters, s)}
        onClear={() => { setQText(""); push({}, "featured"); }}
      />
      <div className="mt-5 flex flex-wrap items-center gap-2" aria-live="polite">
        <p className="t-caption mr-2" role="status">{results.length} gift{results.length === 1 ? "" : "s"}{filters.q ? ` for “${filters.q}”` : ""}</p>
        {chips.map((c) => (
          <button key={c.key} type="button" onClick={() => onChange({ [c.key]: undefined })} className="flex items-center gap-1.5 rounded-full bg-beige px-3 py-1.5 text-xs font-semibold hover:bg-champagne" aria-label={`Remove filter ${c.label}`}>
            {c.label}<X aria-hidden className="h-3 w-3" />
          </button>
        ))}
      </div>
      <div className="mt-8 md:mt-10">
        {results.length ? <ProductGrid products={results} priorityCount={4} /> : <EmptyState query={filters.q} />}
      </div>
    </div>
  );
}
