import { LinkButton } from "@/components/ui/Button";
import GiftArt from "@/components/art/GiftArt";
import { photoUrl } from "@/lib/photos";
import Reveal from "@/components/ui/Reveal";
import WhatsAppButton from "@/components/whatsapp/WhatsAppButton";
import { customSteps } from "@/lib/data/content";
import { createCustomGiftWhatsAppMessage } from "@/lib/whatsapp";

export default function CustomGiftingSection() {
  return (
    <section aria-labelledby="custom-title" className="section-y bg-champagne/45">
      <div className="container-page grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="order-2 lg:order-1 lg:col-span-6">
          <p className="t-eyebrow mb-5">Custom gifting</p>
          <h2 id="custom-title" className="t-h1">Make It Uniquely Theirs.</h2>
          <p className="t-lead mt-6 max-w-lg">Build a gift box around them. Choose the occasion, the budget, the products and the packaging, and add a note in your own words.</p>
          <ol className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {customSteps.map((s, i) => (
              <li key={s.title} className="flex gap-3.5">
                <span aria-hidden className="mt-0.5 font-display text-2xl italic text-accent-ink">{String(i + 1).padStart(2, "0")}</span>
                <span><span className="block font-semibold">{s.title}</span></span>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <WhatsAppButton message={createCustomGiftWhatsAppMessage()} label="Create My Gift" size="lg" source="home_custom" extraEvent="custom_gift_enquiry" />
            <LinkButton href="/custom-gifts" variant="outline" size="lg">How it works</LinkButton>
          </div>
        </Reveal>
        <Reveal delay={100} className="order-1 lg:order-2 lg:col-span-6">
          <div className="relative mx-auto grid max-w-xl grid-cols-6 gap-3">
            <div className="relative col-span-4 aspect-[4/5] overflow-hidden rounded-md"><GiftArt art={{ tone: "ivory", box: "champagne", items: ["card", "chocolates", "candle", "flowers"], photo: photoUrl("custom") }} variant="flatlay" alt="Flat lay of a custom hamper with a personalised card" /></div>
            <div className="col-span-2 flex flex-col gap-3">
              <div className="relative aspect-square overflow-hidden rounded-md"><GiftArt art={{ tone: "rose", items: ["card"], photo: photoUrl("couple-close") }} variant="detail" alt="Personalised message card" /></div>
              <div className="relative flex-1 overflow-hidden rounded-md"><GiftArt art={{ tone: "sage", items: ["soap"], photo: photoUrl("selfcare-close") }} variant="detail" alt="Handmade soap in custom packaging" /></div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
