import type { Metadata } from "next";
import GiftArt from "@/components/art/GiftArt";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { LinkButton } from "@/components/ui/Button";
import WhatsAppButton from "@/components/whatsapp/WhatsAppButton";
import { aboutValues } from "@/lib/data/content";
import { photoUrl } from "@/lib/photos";
import { buildMetadata } from "@/lib/seo";
import { createCorporateWhatsAppMessage } from "@/lib/whatsapp";

export const metadata: Metadata = buildMetadata({
  title: "About Gifthut | Gifting Is More Than Giving",
  description: "Gifthut is a corporate gifting company built on thoughtfulness, brand-true design and reliable delivery. Meet the people behind the boxes.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <section className="container-page grid items-center gap-12 pb-16 pt-6 md:pb-24 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Breadcrumbs items={[{ name: "About Us", path: "/about" }]} />
          <p className="t-eyebrow mb-5 mt-8">Our story</p>
          <h1 className="t-h1">Gifting Is Part of Your Brand.</h1>
          <p className="t-lead mt-6 max-w-xl">Gifthut began with a simple belief: a corporate gift should feel like it was chosen by a person, not procured by a department.</p>
        </div>
        <div className="lg:col-span-5"><div className="relative aspect-[5/4] overflow-hidden rounded-md lg:aspect-[4/5]"><GiftArt art={{ tone: "rose", box: "ivory", items: ["flowers", "card", "candle"], photo: photoUrl("ribbon") }} variant="wrapped" alt="A Gifthut box with a handwritten tag" /></div></div>
      </section>

      <section className="border-y border-border py-16 md:py-24">
        <div className="container-page grid gap-8 lg:grid-cols-12">
          <p className="font-display text-[1.9rem] font-medium italic leading-snug md:text-4xl lg:col-span-5">Made for the people who matter to your business.</p>
          <div className="space-y-5 text-lg leading-relaxed text-muted lg:col-span-7">
            <p>Most companies know the feeling: you want to thank clients and teams properly, but the options are generic hampers with a logo slapped on. We built Gifthut to change that.</p>
            <p>Every order starts with a conversation about your audience and your brand: who they are, what the moment means, how you want them to feel. Then we design, brand, pack and deliver, so what arrives feels personal, and unmistakably yours.</p>
            <p>That&apos;s why we work on WhatsApp. You&apos;re talking to people, not filling in a cart.</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="values" className="section-y">
        <div className="container-page">
          <h2 id="values" className="t-h2">What we believe.</h2>
          <dl className="mt-12 grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {aboutValues.map((v) => (
              <div key={v.title} className="bg-background p-7"><dt className="t-h3">{v.title}</dt><dd className="t-caption mt-2 text-[0.95rem]">{v.text}</dd></div>
            ))}
          </dl>
        </div>
      </section>

      <section className="pb-20 text-center md:pb-28">
        <div className="container-page">
          <h2 className="t-h2">Let&apos;s plan your next gifting.</h2>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <LinkButton href="/gifts" size="lg">Explore Hampers</LinkButton>
            <WhatsAppButton message={createCorporateWhatsAppMessage()} label="Get a Corporate Quote" variant="outline" size="lg" source="about" />
          </div>
        </div>
      </section>
    </>
  );
}
