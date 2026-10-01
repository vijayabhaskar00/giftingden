import type { Metadata } from "next";
import GiftArt from "@/components/art/GiftArt";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { LinkButton } from "@/components/ui/Button";
import WhatsAppButton from "@/components/whatsapp/WhatsAppButton";
import { aboutValues } from "@/lib/data/content";
import { photoUrl } from "@/lib/photos";
import { buildMetadata } from "@/lib/seo";
import { createGeneralWhatsAppMessage } from "@/lib/whatsapp";

export const metadata: Metadata = buildMetadata({
  title: "About Giftingden | Gifting Is More Than Giving",
  description: "Giftingden is a premium Indian gifting brand built on thoughtfulness, personalisation and beautiful presentation. Meet the people behind the boxes.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <section className="container-page grid items-center gap-12 pb-16 pt-6 md:pb-24 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Breadcrumbs items={[{ name: "About Us", path: "/about" }]} />
          <p className="t-eyebrow mb-5 mt-8">Our story</p>
          <h1 className="t-h1">Gifting Is More Than Giving.</h1>
          <p className="t-lead mt-6 max-w-xl">Giftingden began with a simple belief: the best gifts aren&apos;t just opened. They&apos;re felt.</p>
        </div>
        <div className="lg:col-span-5"><div className="relative aspect-[5/4] overflow-hidden rounded-md lg:aspect-[4/5]"><GiftArt art={{ tone: "rose", box: "ivory", items: ["flowers", "card", "candle"], photo: photoUrl("ribbon") }} variant="wrapped" alt="A Giftingden box with a handwritten tag" /></div></div>
      </section>

      <section className="border-y border-border py-16 md:py-24">
        <div className="container-page grid gap-8 lg:grid-cols-12">
          <p className="font-display text-[1.9rem] font-medium italic leading-snug md:text-4xl lg:col-span-5">Made for the people who matter.</p>
          <div className="space-y-5 text-lg leading-relaxed text-muted lg:col-span-7">
            <p>Most of us know the feeling: you want to give something that says more than a message, but the shelves are full of the same generic hampers. We built Giftingden to change that.</p>
            <p>Every gift starts with a conversation about the person receiving it: what they love, what the moment means, how you want them to feel. Then we choose, wrap and write with care, so what arrives feels personal, not shop-bought.</p>
            <p>That&apos;s why we do it on WhatsApp. You&apos;re talking to people, not filling in a cart.</p>
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
          <h2 className="t-h2">Let&apos;s find something they&apos;ll remember.</h2>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <LinkButton href="/gifts" size="lg">Explore Gifts</LinkButton>
            <WhatsAppButton message={createGeneralWhatsAppMessage()} label="Chat on WhatsApp" variant="outline" size="lg" source="about" />
          </div>
        </div>
      </section>
    </>
  );
}
