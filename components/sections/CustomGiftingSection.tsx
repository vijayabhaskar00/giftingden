import { LinkButton } from "@/components/ui/Button";
import GiftArt from "@/components/art/GiftArt";
import Reveal from "@/components/ui/Reveal";
import WhatsAppButton from "@/components/whatsapp/WhatsAppButton";
import { customSteps } from "@/lib/data/content";
import { photoUrl } from "@/lib/photos";
import { createCustomGiftWhatsAppMessage } from "@/lib/whatsapp";

export default function CustomGiftingSection() {
  return (
    <section aria-labelledby="custom-title" className="section-y bg-champagne/45">
      <div className="container-page grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="order-2 lg:order-1 lg:col-span-6">
          <p className="t-eyebrow mb-5">Custom branding</p>
          <h2 id="custom-title" className="t-h1">Your Brand on Every Box.</h2>
          <p className="t-lead mt-6 max-w-lg">Logo on the sleeve, your message on the card, packaging in your colours. We design it, show you a mock-up, then pack and deliver at scale.</p>
          <ol className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {customSteps.map((s, i) => (
              <li key={s.title} className="flex gap-3.5">
                <span aria-hidden className="mt-0.5 font-display text-2xl italic text-accent-ink">{String(i + 1).padStart(2, "0")}</span>
                <span className="block font-semibold">{s.title}</span>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <WhatsAppButton message={createCustomGiftWhatsAppMessage()} label="Start a Custom Brief" size="lg" source="home_custom" extraEvent="custom_gift_enquiry" />
            <LinkButton href="/custom-gifts" variant="outline" size="lg">How it works</LinkButton>
          </div>
        </Reveal>
        <Reveal delay={100} className="order-1 lg:order-2 lg:col-span-6">
          <div className="relative mx-auto grid max-w-xl grid-cols-6 gap-3">
            <div className="relative col-span-4 aspect-[4/5] overflow-hidden rounded-md"><GiftArt art={{ tone: "ivory", box: "champagne", items: ["card", "notebook", "mug"], photo: photoUrl("custom") }} variant="flatlay" alt="A custom corporate hamper laid out with a branded message card" /></div>
            <div className="col-span-2 flex flex-col gap-3">
              <div className="relative aspect-square overflow-hidden rounded-md"><GiftArt art={{ tone: "charcoal", items: ["notebook"], photo: photoUrl("employee-close") }} variant="detail" alt="Branded notebook and mug on a desk" /></div>
              <div className="relative flex-1 overflow-hidden rounded-md"><GiftArt art={{ tone: "charcoal", items: ["tin"], photo: photoUrl("corporate-flat") }} variant="detail" alt="Executive hamper with leather notebook and sipper" /></div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
