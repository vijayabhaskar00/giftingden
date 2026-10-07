import type { Metadata } from "next";
import GiftArt from "@/components/art/GiftArt";
import CustomGiftForm from "@/components/forms/CustomGiftForm";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { photoUrl } from "@/lib/photos";
import Reveal from "@/components/ui/Reveal";
import { customSteps } from "@/lib/data/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Custom Corporate Hampers | Your Brand on Every Box",
  description: "Design a branded corporate hamper: choose the products, add your logo and message, approve a mock-up, and we pack and deliver at scale across India.",
  path: "/custom-gifts",
});

export default function CustomGiftsPage() {
  return (
    <>
      <section className="bg-champagne/45">
        <div className="container-page grid items-center gap-10 py-10 md:py-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Breadcrumbs items={[{ name: "Custom Branding", path: "/custom-gifts" }]} />
            <p className="t-eyebrow mb-5 mt-8">Custom branding</p>
            <h1 className="t-h1">Your Brand on Every Box.</h1>
            <p className="t-lead mt-6 max-w-xl">Design a hamper around your brand and your people. Choose the products, add your logo, colours and a message in your own words, approve a mock-up, and we pack and deliver at scale.</p>
          </div>
          <div className="lg:col-span-5"><div className="relative mx-auto aspect-[5/4] max-w-lg overflow-hidden rounded-md lg:aspect-[4/5]"><GiftArt art={{ tone: "champagne", box: "ivory", items: ["card", "chocolates", "candle", "flowers"], photo: photoUrl("custom") }} variant="flatlay" alt="A custom hamper laid out with a personalised card" /></div></div>
        </div>
      </section>

      <section aria-labelledby="steps" className="section-y">
        <div className="container-page">
          <h2 id="steps" className="t-h2 max-w-xl">Six steps from brief to branded hampers.</h2>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {customSteps.map((s, i) => (
              <li key={s.title} className="bg-background p-7"><span className="font-display text-4xl italic text-accent-ink">{String(i + 1).padStart(2, "0")}</span><h3 className="t-h3 mt-3">{s.title}</h3><p className="t-caption mt-2 text-[0.95rem]">{s.text}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section id="create" aria-labelledby="create-h" className="section-y scroll-mt-20 bg-beige/60 pt-16">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="t-eyebrow mb-4">Custom brief</p>
            <h2 id="create-h" className="t-h2">Start your brief.</h2>
            <p className="t-lead mt-4">Fill in what you know. We'll take it from here on WhatsApp, with ideas, a quote and a mock-up before anything is made.</p>
          </Reveal>
          <div className="lg:col-span-7"><CustomGiftForm /></div>
        </div>
      </section>
    </>
  );
}
