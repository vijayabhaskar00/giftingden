import { OccasionCard } from "@/components/ui/CollectionCard";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { homeOccasionTiles } from "@/lib/data/taxonomy";
import { LinkButton } from "@/components/ui/Button";

/** Swipeable rail on mobile/tablet, 5-up grid on desktop. */
export default function OccasionRail() {
  return (
    <section aria-labelledby="occasions-title" className="section-y">
      <div className="container-page">
        <Reveal>
          <SectionHeader
            eyebrow="Shop by occasion"
            title={<span id="occasions-title">Find something they&apos;ll remember.</span>}
            subtitle="Start with the moment. We'll help with the rest."
            action={<LinkButton href="/occasions" variant="link" size="sm">All occasions</LinkButton>}
          />
        </Reveal>
      </div>
      <ul className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-pl-5 px-5 pb-2 md:scroll-pl-10 md:gap-4 md:px-10 lg:container-page lg:mt-14 lg:grid lg:snap-none lg:grid-cols-5 lg:gap-5 lg:overflow-visible lg:pb-0">
        {homeOccasionTiles.map((t, i) => (
          <li key={t.name} className="w-[68vw] max-w-[19rem] shrink-0 snap-start sm:w-[42vw] lg:w-auto lg:max-w-none">
            <Reveal delay={(i % 5) * 60}><OccasionCard name={t.name} description={t.description} href={t.href} art={t.art} variant={i % 3 === 1 ? "flatlay" : "box"} /></Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
