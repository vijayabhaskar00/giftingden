import { Star } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { reviews } from "@/lib/data/content";
import type { Review } from "@/lib/types";

export function ReviewCard({ review, featured }: { review: Review; featured?: boolean }) {
  return (
    <figure className={`flex h-full flex-col rounded-md border border-border bg-surface p-6 md:p-8 ${featured ? "md:p-10" : ""}`}>
      <div role="img" aria-label={`${review.rating} out of 5 stars`} className="flex gap-0.5 text-accent">
        {Array.from({ length: review.rating }, (_, i) => <Star key={i} aria-hidden className="h-4 w-4 fill-current" />)}
      </div>
      <blockquote className={`mt-5 flex-1 font-display font-medium leading-snug ${featured ? "text-[1.9rem] md:text-[2.2rem]" : "text-[1.45rem]"}`}>
        “{review.quote}”
      </blockquote>
      <figcaption className="mt-6 text-sm">
        <span className="font-bold">{review.name}</span>
        <span className="text-muted"> · {review.city} · {review.occasion}</span>
      </figcaption>
    </figure>
  );
}

export default function TestimonialSection() {
  const [first, ...rest] = reviews;
  return (
    <section aria-labelledby="reviews-title" className="section-y bg-beige/60">
      <div className="container-page">
        <Reveal><SectionHeader eyebrow="Client feedback" title={<span id="reviews-title">Trusted by Teams Who Gift With Heart.</span>} align="center" /></Reveal>
        <div className="mt-12 grid gap-5 md:mt-16 lg:grid-cols-3">
          <Reveal className="lg:row-span-2"><ReviewCard review={first} featured /></Reveal>
          {rest.slice(0, 4).map((r, i) => <Reveal key={r.id} delay={i * 80}><ReviewCard review={r} /></Reveal>)}
        </div>
      </div>
    </section>
  );
}
