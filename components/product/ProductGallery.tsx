"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import Media from "@/components/ui/Media";
import type { ProductImage } from "@/lib/types";

const LABELS = ["Packaged", "What's inside", "Close-up", "Gift wrapped"];

function Lightbox({ images, index, onIndex, onClose }: { images: ProductImage[]; index: number; onIndex: (i: number) => void; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const go = useCallback((d: number) => onIndex((index + d + images.length) % images.length), [index, images.length, onIndex]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => { document.body.style.overflow = prev; };
  }, []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  return (
    <div role="dialog" aria-modal="true" aria-label="Enlarged product image" className="animate-fade fixed inset-0 z-[90] flex items-center justify-center bg-foreground/92 p-3 md:p-8" onClick={onClose}>
      <button ref={closeRef} type="button" onClick={onClose} aria-label="Close enlarged image" className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full bg-background text-foreground md:right-6 md:top-6"><X className="h-5 w-5" /></button>
      <div className="relative aspect-[4/5] h-full max-h-[88dvh] max-w-full overflow-hidden rounded-md" onClick={(e) => e.stopPropagation()}>
        <Media image={images[index]} sizes="90vw" />
      </div>
      {images.length > 1 && (
        <>
          <button type="button" onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Previous image" className="absolute left-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-background text-foreground md:left-6"><ChevronLeft className="h-5 w-5" /></button>
          <button type="button" onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Next image" className="absolute right-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-background text-foreground md:right-6"><ChevronRight className="h-5 w-5" /></button>
        </>
      )}
    </div>
  );
}

export default function ProductGallery({ images, name }: { images: ProductImage[]; name: string }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [box, setBox] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const rail = useRef<HTMLUListElement>(null);

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setOrigin(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`);
  };

  const onScroll = () => {
    const el = rail.current;
    if (!el) return;
    setActive(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <div className="lg:grid lg:grid-cols-[5.5rem_1fr] lg:gap-4">
      {/* Desktop thumbnails */}
      <ul className="hidden flex-col gap-3 lg:flex" aria-label={`${name} images`}>
        {images.map((img, i) => (
          <li key={i}>
            <button type="button" onClick={() => setActive(i)} aria-label={`Show image ${i + 1}: ${LABELS[i] ?? img.alt}`} aria-current={i === active}
              className={`relative block aspect-[4/5] w-full overflow-hidden rounded-sm border-2 transition-all ${i === active ? "border-foreground" : "border-transparent opacity-70 hover:opacity-100"}`}>
              <Media image={img} sizes="88px" />
            </button>
          </li>
        ))}
      </ul>

      {/* Desktop main image */}
      <div className="relative hidden lg:block">
        <button type="button" onClick={() => setBox(true)} aria-label="Enlarge image"
          onMouseEnter={() => setZoom(true)} onMouseLeave={() => setZoom(false)} onMouseMove={onMove}
          className="relative block aspect-[4/5] w-full cursor-zoom-in overflow-hidden rounded-md bg-beige">
          <div className="absolute inset-0 transition-transform duration-300 ease-out" style={{ transform: zoom ? "scale(1.7)" : "scale(1)", transformOrigin: origin }}>
            <Media image={images[active]} sizes="(min-width:1024px) 50vw, 100vw" priority />
          </div>
        </button>
        <span aria-hidden className="pointer-events-none absolute bottom-4 right-4 flex items-center gap-1.5 rounded-sm bg-background/90 px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.12em]"><ZoomIn className="h-3.5 w-3.5" />Hover to zoom</span>
      </div>

      {/* Mobile swipe gallery */}
      <div className="relative lg:hidden">
        <ul ref={rail} onScroll={onScroll} className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto" aria-label={`${name} images, swipe to browse`}>
          {images.map((img, i) => (
            <li key={i} className="relative aspect-[4/5] w-full shrink-0 snap-center overflow-hidden bg-beige sm:rounded-md">
              <Media image={img} sizes="100vw" priority={i === 0} />
            </li>
          ))}
        </ul>
        <button type="button" onClick={() => setBox(true)} aria-label="Enlarge image" className="absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-full bg-background/90"><ZoomIn className="h-[1.1rem] w-[1.1rem]" /></button>
        <div className="mt-3 flex justify-center gap-1.5" aria-hidden>
          {images.map((_, i) => <span key={i} className={`h-1.5 rounded-full transition-all ${i === active ? "w-5 bg-foreground" : "w-1.5 bg-border"}`} />)}
        </div>
      </div>

      {box && <Lightbox images={images} index={active} onIndex={setActive} onClose={() => setBox(false)} />}
    </div>
  );
}
