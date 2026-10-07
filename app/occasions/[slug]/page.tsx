import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import GiftArt from "@/components/art/GiftArt";
import ProductGrid from "@/components/product/ProductGrid";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { LinkButton } from "@/components/ui/Button";
import WhatsAppButton from "@/components/whatsapp/WhatsAppButton";
import { getByOccasion } from "@/lib/catalogue";
import { getOccasion, occasionArt, occasions } from "@/lib/data/taxonomy";
import { buildMetadata } from "@/lib/seo";
import { sanitizeText } from "@/lib/whatsapp";

type Params = { slug: string };

export const generateStaticParams = () => occasions.map((o) => ({ slug: o.slug }));

const headlines: Record<string, string> = {
  onboarding: "Make day one feel expected.",
  appreciation: "Recognition people actually remember.",
  "client-gifting": "Strengthen relationships with a considered gift.",
  festive: "Diwali gifting, delivered before the festival.",
  "new-year": "Close the year with gratitude.",
  milestones: "Mark every anniversary, promotion and win.",
  events: "Delegate gifts people carry home.",
  "thank-you": "Thank partners and vendors properly.",
};

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const o = getOccasion((await params).slug);
  if (!o) return {};
  return buildMetadata({ title: `${o.name} | Corporate Gifting & Branded Hampers`, description: `${o.description} Branded ${o.name.toLowerCase()} hampers with bulk pricing, delivered across India. Get a quote on WhatsApp.`, path: `/occasions/${o.slug}` });
}

export default async function OccasionPage({ params }: { params: Promise<Params> }) {
  const o = getOccasion((await params).slug);
  if (!o) notFound();
  const products = getByOccasion(o.slug);

  return (
    <>
      <section className="relative overflow-hidden bg-beige/60">
        <div className="container-page grid items-center gap-10 py-10 md:py-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Breadcrumbs items={[{ name: "Occasions", path: "/occasions" }, { name: o.name, path: `/occasions/${o.slug}` }]} />
            <p className="t-eyebrow mb-5 mt-8">{o.emoji} {o.name}</p>
            <h1 className="t-h1">{headlines[o.slug] ?? o.description}</h1>
            <p className="t-lead mt-6 max-w-lg">{o.description} Every hamper below can carry your logo and a custom message, with bulk pricing from 25.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton href="#gifts" size="lg">See {products.length} hampers</LinkButton>
              <WhatsAppButton message={`Hi Gifthut! I'm looking for corporate gifts for ${sanitizeText(o.name, 40).toLowerCase()}.
Quantity: 
Could you share options and bulk pricing?`} label="Get a Quote" variant="outline" size="lg" source={`occasion_${o.slug}`} occasion={o.slug} />
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative mx-auto aspect-[5/4] max-w-lg overflow-hidden rounded-md lg:aspect-[4/5]">
              <GiftArt art={occasionArt[o.slug]} variant="box" alt={`${o.name} gift box`} />
            </div>
          </div>
        </div>
      </section>

      <section id="gifts" aria-label={`${o.name} gifts`} className="container-page scroll-mt-24 py-16 md:py-24">
        <ProductGrid products={products} priorityCount={4} />
      </section>

      <section aria-label="Explore other occasions" className="container-page pb-20 md:pb-28">
        <h2 className="t-h3 mb-5">More occasions</h2>
        <ul className="flex flex-wrap gap-2">
          {occasions.filter((x) => x.slug !== o.slug).map((x) => (
            <li key={x.slug}><Link href={`/occasions/${x.slug}`} className="rounded-full border border-border px-4 py-2 text-sm font-medium hover:border-foreground hover:bg-beige">{x.emoji} {x.name}</Link></li>
          ))}
        </ul>
      </section>
    </>
  );
}
