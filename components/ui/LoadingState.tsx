/** Skeletons sized to match real cards, so nothing jumps when content arrives. */
export function ProductCardSkeleton() {
  return (
    <div aria-hidden>
      <div className="skeleton aspect-[4/5] w-full rounded-md" />
      <div className="skeleton mt-4 h-3 w-16 rounded-sm" />
      <div className="skeleton mt-3 h-5 w-3/4 rounded-sm" />
      <div className="skeleton mt-2 h-3.5 w-full rounded-sm" />
      <div className="skeleton mt-4 h-4 w-1/3 rounded-sm" />
    </div>
  );
}

export default function LoadingState({ count = 8, label = "Loading gifts" }: { count?: number; label?: string }) {
  return (
    <div role="status" aria-label={label} className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
      {Array.from({ length: count }, (_, i) => <ProductCardSkeleton key={i} />)}
      <span className="sr-only">{label}…</span>
    </div>
  );
}
