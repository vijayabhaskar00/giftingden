import type { Metadata } from "next";
import Link from "next/link";
import ProductGrid from "@/components/product/ProductGrid";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { LinkButton } from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import WhatsAppButton from "@/components/whatsapp/WhatsAppButton";
import { getByCategory } from "@/lib/catalogue";
import { categories } from "@/lib/data/taxonomy";
import { buildMetadata } from "@/lib/seo";
import { createCustomGiftWhatsAppMessage } from "@/lib/whatsapp";

export const metadata: Metadata = buildMetadata({
  title: "Gift Packages | Birthday, Corporate, Wedding & Luxury Hampers",
  description: "Beautifully assembled gift boxes and hampers: birthday boxes, self-care, couple hampers, corporate, luxury, festive, bridesmaid and wedding gifts.",
  path: "/gift-packages",
});

export default function GiftPackagesPage() {
  const groups = categories.map((c) => ({ c, items: getByCategory(c.slug) })).filter((g) => g.items.length);
  return (
    <div className="container-page pb-20 pt-6 md:pb-28">
      <Breadcrumbs items={[{ name: "Gift Packages", path: "/gift-packages" }]} />
      <SectionHeader as="h1" className="mt-6 md:mt-8" eyebrow="Gift packages" title="Curated With Thought." subtitle="Beautifully assembled gift experiences for moments that matter. Every box is hand-packed and can be personalised." />

      <nav aria-label="Jump to a category" className="no-scrollbar sticky top-16 z-30 -mx-5 mt-8 flex gap-2 overflow-x-auto border-b border-border bg-background/95 px-5 py-3 backdrop-blur md:top-20 md:mx-0 md:px-0">
        {groups.map(({ c }) => (
          <a key={c.slug} href={`#${c.slug}`} className="shrink-0 rounded-full border border-border px-3.5 py-1.5 text-xs font-semibold transition-colors hover:border-foreground hover:bg-beige">{c.name}</a>
        ))}
      </nav>

      <div className="mt-12 space-y-20 md:mt-16 md:space-y-28">
        {groups.map(({ c, items }) => (
          <section key={c.slug} id={c.slug} aria-labelledby={`${c.slug}-h`} className="scroll-mt-40">
            <Reveal>
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-12">
                <div>
                  <h2 id={`${c.slug}-h`} className="t-h2">{c.name}</h2>
                  <p className="t-lead mt-2">{c.description}</p>
                </div>
                <Link href={`/gifts?category=${c.slug}`} className="t-button underline decoration-accent decoration-2 underline-offset-8 hover:decoration-foreground">View all {c.name}</Link>
              </div>
            </Reveal>
            <ProductGrid products={items} columns={3} editorial={items.length >= 3} priorityCount={0} />
          </section>
        ))}
      </div>

      <section aria-labelledby="own" className="mt-24 rounded-md bg-champagne/50 px-6 py-14 text-center md:mt-32 md:py-20">
        <p className="t-eyebrow mb-4">Custom hampers</p>
        <h2 id="own" className="t-h2">Don&apos;t see exactly what you need?</h2>
        <p className="t-lead mx-auto mt-4 max-w-lg">Tell us who it&apos;s for and your budget. We&apos;ll design a hamper around them.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <WhatsAppButton message={createCustomGiftWhatsAppMessage()} label="Create My Gift" size="lg" source="packages_footer" extraEvent="custom_gift_enquiry" />
          <LinkButton href="/gift-finder" variant="outline" size="lg">Try the Gift Finder</LinkButton>
        </div>
      </section>
    </div>
  );
}
