import type { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { OccasionCard } from "@/components/ui/CollectionCard";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { occasionArt, occasions, priceBands, recipients, styles } from "@/lib/data/taxonomy";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata: Metadata = buildMetadata({
  title: "Corporate Gifting by Occasion | Onboarding, Festive, Client & Events",
  description: "Corporate gifting for every business moment: employee onboarding and appreciation, client gifting, Diwali and festive hampers, New Year, milestones and events.",
  path: "/occasions",
});

const chip = "rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-foreground hover:bg-beige";

export default function OccasionsPage() {
  return (
    <div className="container-page pb-20 pt-6 md:pb-28">
      <Breadcrumbs items={[{ name: "Occasions", path: "/occasions" }]} />
      <SectionHeader as="h1" className="mt-6 md:mt-8" eyebrow="Occasions" title="Every business moment, beautifully marked." subtitle="Start with the occasion and we'll show you hampers made for it." />
      <ul className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-6">
        {occasions.map((o, i) => (
          <li key={o.slug} className={i === 0 ? "col-span-2 md:col-span-1" : ""}>
            <Reveal delay={(i % 4) * 60}>
              <OccasionCard name={`${o.emoji} ${o.name}`} description={o.description} href={`/occasions/${o.slug}`} art={occasionArt[o.slug]} variant={i % 2 ? "flatlay" : "box"} aspect={i === 0 ? "aspect-[16/10] md:aspect-[4/5]" : "aspect-[4/5]"} />
            </Reveal>
          </li>
        ))}
      </ul>

      <section aria-labelledby="collections" className="mt-24 md:mt-32">
        <h2 id="collections" className="t-h2">Browse by budget, audience and style</h2>
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          <div><h3 className="t-eyebrow mb-4">By budget per gift</h3><ul className="flex flex-wrap gap-2">{priceBands.map((b) => <li key={b.slug}><Link className={chip} href={`/gifts?price=${b.slug}`}>{b.name}</Link></li>)}</ul></div>
          <div><h3 className="t-eyebrow mb-4">By audience</h3><ul className="flex flex-wrap gap-2">{recipients.map((r) => <li key={r.slug}><Link className={chip} href={`/gifts?recipient=${r.slug}`}>{r.name}</Link></li>)}</ul></div>
          <div><h3 className="t-eyebrow mb-4">By style</h3><ul className="flex flex-wrap gap-2">{styles.map((s) => <li key={s.slug}><Link className={chip} href={`/gifts?style=${s.slug}`}>{s.name}</Link></li>)}</ul></div>
        </div>
      </section>
    </div>
  );
}
