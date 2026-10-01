import { LinkButton } from "@/components/ui/Button";
import GiftArt from "@/components/art/GiftArt";
import Reveal from "@/components/ui/Reveal";

export default function CorporateBanner() {
  return (
    <section aria-labelledby="corp-title" className="on-dark my-6 bg-foreground text-background md:my-10">
      <div className="container-page grid items-center gap-10 py-16 md:py-24 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <p className="t-eyebrow !text-champagne mb-5">Corporate gifting</p>
          <h2 id="corp-title" className="t-h1">Make Your Brand Part of the Celebration.</h2>
          <p className="mt-6 max-w-lg text-lg text-background/75">Onboarding kits, client hampers and festive gifting, with custom branding, packaging and bulk pricing.</p>
          <div className="mt-9"><LinkButton href="/corporate-gifting" variant="light" size="lg">Explore Corporate Gifting</LinkButton></div>
        </Reveal>
        <Reveal delay={100} className="lg:col-span-5">
          <div className="relative aspect-[5/4] overflow-hidden rounded-md"><GiftArt art={{ tone: "charcoal", box: "champagne", items: ["notebook", "mug", "tin", "card"] }} variant="box" alt="Corporate hampers with notebooks, mugs and gourmet tins" /></div>
        </Reveal>
      </div>
    </section>
  );
}
