"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";
import { categories, occasions, recipients, styles } from "@/lib/data/taxonomy";
import type { Filters, SortKey } from "@/lib/catalogue";

export const SORTS: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
];

interface Props {
  filters: Filters;
  sort: SortKey;
  qText: string;
  resultCount: number;
  onQuery: (q: string) => void;
  onChange: (patch: Partial<Filters>) => void;
  onSort: (s: SortKey) => void;
  onClear: () => void;
}

const selectCls = "h-11 w-full appearance-none rounded-sm border border-border bg-surface px-3.5 pr-9 text-sm font-medium outline-none transition-colors hover:border-foreground/50 focus:border-foreground";

function Select({ id, label, value, options, onChange }: { id: string; label: string; value?: string; options: { value: string; label: string }[]; onChange: (v: string) => void }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[0.68rem] font-bold uppercase tracking-[0.14em] text-muted">{label}</label>
      <div className="relative">
        <select id={id} value={value ?? ""} onChange={(e) => onChange(e.target.value)} className={selectCls}>
          <option value="">All</option>
          {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <ChevronDown aria-hidden className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2" />
      </div>
    </div>
  );
}

function Toggle({ id, label, checked, onChange }: { id: string; label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label htmlFor={id} className={`flex h-11 cursor-pointer items-center gap-2.5 rounded-sm border px-3.5 text-sm font-medium transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 ${checked ? "border-foreground bg-foreground text-background" : "border-border bg-surface hover:border-foreground/50"}`}>
      <input id={id} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="sr-only" />
      {label}
    </label>
  );
}

function FilterFields({ filters, onChange, idp }: { filters: Filters; onChange: Props["onChange"]; idp: string }) {
  const opts = <T extends { slug: string; name: string }>(l: T[]) => l.map((x) => ({ value: x.slug, label: x.name }));
  return (
    <>
      <Select id={`${idp}-cat`} label="Category" value={filters.category} options={opts(categories)} onChange={(v) => onChange({ category: v || undefined })} />
      <Select id={`${idp}-occ`} label="Occasion" value={filters.occasion} options={opts(occasions)} onChange={(v) => onChange({ occasion: v || undefined })} />
      <Select id={`${idp}-rec`} label="Recipient" value={filters.recipient} options={opts(recipients)} onChange={(v) => onChange({ recipient: v || undefined })} />
      <Select id={`${idp}-style`} label="Style" value={filters.style} options={opts(styles)} onChange={(v) => onChange({ style: v || undefined })} />
    </>
  );
}

export default function FilterBar({ filters, sort, qText, resultCount, onQuery, onChange, onSort, onClear }: Props) {
  const [sheet, setSheet] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const activeCount = (["category", "occasion", "recipient", "style"] as const).filter((k) => filters[k]).length + Number(!!filters.customisable) + Number(!!filters.bestseller);

  useEffect(() => {
    if (!sheet) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSheet(false);
    document.addEventListener("keydown", onKey);
    sheetRef.current?.querySelector<HTMLElement>("select,button")?.focus();
    return () => { document.body.style.overflow = prev; document.removeEventListener("keydown", onKey); };
  }, [sheet]);

  return (
    <div className="border-y border-border py-4 md:py-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:gap-4">
        <div className="relative flex-1">
          <label htmlFor="gift-search" className="sr-only">Search gifts</label>
          <Search aria-hidden className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input id="gift-search" type="search" value={qText} onChange={(e) => onQuery(e.target.value)} maxLength={80} placeholder="What are you gifting for?"
            className="h-11 w-full rounded-sm border border-border bg-surface pl-10 pr-3 text-sm outline-none transition-colors placeholder:text-muted/80 hover:border-foreground/50 focus:border-foreground" />
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={() => setSheet(true)} className="flex h-11 flex-1 items-center justify-center gap-2 rounded-sm border border-foreground/80 px-4 text-sm font-semibold lg:hidden">
            <SlidersHorizontal aria-hidden className="h-4 w-4" /> Filters{activeCount > 0 && <span className="grid h-5 min-w-5 place-items-center rounded-full bg-foreground px-1 text-[0.68rem] text-background">{activeCount}</span>}
          </button>
          <div className="w-44 shrink-0 md:w-52">
            <label htmlFor="sort" className="sr-only">Sort by</label>
            <div className="relative">
              <select id="sort" value={sort} onChange={(e) => onSort(e.target.value as SortKey)} className={selectCls}>
                {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
              <ChevronDown aria-hidden className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2" />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop filters */}
      <div className="mt-4 hidden grid-cols-4 gap-3 lg:grid">
        <FilterFields filters={filters} onChange={onChange} idp="d" />
      </div>
      <div className="mt-3 hidden flex-wrap items-center gap-3 lg:flex">
        <Toggle id="d-custom" label="Customisable" checked={!!filters.customisable} onChange={(v) => onChange({ customisable: v || undefined })} />
        <Toggle id="d-best" label="Bestseller" checked={!!filters.bestseller} onChange={(v) => onChange({ bestseller: v || undefined })} />
        {(activeCount > 0 || qText) && <button type="button" onClick={onClear} className="ml-auto text-sm font-semibold underline underline-offset-4 hover:text-brown">Clear all</button>}
      </div>

      {/* Mobile bottom sheet */}
      {sheet && (
        <div className="fixed inset-0 z-[80] lg:hidden" role="dialog" aria-modal="true" aria-label="Filter gifts">
          <div className="animate-fade absolute inset-0 bg-foreground/50" onClick={() => setSheet(false)} aria-hidden />
          <div ref={sheetRef} className="animate-sheet absolute inset-x-0 bottom-0 flex max-h-[88dvh] flex-col rounded-t-xl bg-background">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <h2 className="font-display text-2xl font-semibold">Filters</h2>
              <button type="button" onClick={() => setSheet(false)} aria-label="Close filters" className="grid h-10 w-10 place-items-center rounded-full hover:bg-beige"><X className="h-5 w-5" /></button>
            </div>
            <div className="grid gap-4 overflow-y-auto overscroll-contain px-5 py-5 sm:grid-cols-2">
              <FilterFields filters={filters} onChange={onChange} idp="m" />
              <div className="flex flex-wrap gap-3 sm:col-span-2">
                <Toggle id="m-custom" label="Customisable" checked={!!filters.customisable} onChange={(v) => onChange({ customisable: v || undefined })} />
                <Toggle id="m-best" label="Bestseller" checked={!!filters.bestseller} onChange={(v) => onChange({ bestseller: v || undefined })} />
              </div>
            </div>
            <div className="safe-bottom flex gap-3 border-t border-border px-5 pt-4">
              <button type="button" onClick={onClear} className="t-button h-12 flex-1 rounded-sm border border-foreground/80">Clear</button>
              <button type="button" onClick={() => setSheet(false)} className="t-button h-12 flex-[2] rounded-sm bg-primary text-primary-foreground">Show {resultCount} gift{resultCount === 1 ? "" : "s"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
