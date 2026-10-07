import { LinkButton } from "@/components/ui/Button";
import WhatsAppButton from "@/components/whatsapp/WhatsAppButton";
import { createCorporateWhatsAppMessage } from "@/lib/whatsapp";
import HeroVisual from "./HeroVisual";

const Word = ({ children, delay, italic }: { children: string; delay: number; italic?: boolean }) => (
  <span className="word"><span style={{ animationDelay: `${delay}ms` }} className={italic ? "italic text-brown" : ""}>{children}</span></span>
);

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="container-page grid items-center gap-14 pb-20 pt-8 md:pb-24 lg:grid-cols-12 lg:gap-10 lg:pb-28 lg:pt-10">
        <div className="lg:col-span-6 xl:col-span-6">
          <p className="t-eyebrow animate-rise mb-6" style={{ animationDelay: "100ms" }}>Gifthut · Corporate gifting, India</p>
          <h1 id="hero-title" className="t-display">
            <Word delay={150}>Corporate</Word> <Word delay={230}>Gifts</Word><br />
            <Word delay={310}>That</Word> <Word delay={390}>Say</Word> <Word delay={470} italic>More.</Word>
          </h1>
          <p className="t-lead animate-rise mt-7 max-w-lg" style={{ animationDelay: "650ms" }}>
            Premium, branded hampers for employee onboarding, client gifting, festivals and events. Designed around your brand, packed with care and delivered across India.
          </p>
          <div className="animate-rise mt-9 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "800ms" }}>
            <WhatsAppButton message={createCorporateWhatsAppMessage()} label="Get a Corporate Quote" size="lg" source="hero" extraEvent="corporate_enquiry" />
            <LinkButton href="/gifts" variant="outline" size="lg">Explore Hampers</LinkButton>
          </div>
          <ul className="animate-rise t-caption mt-10 flex flex-wrap gap-x-7 gap-y-2" style={{ animationDelay: "950ms" }}>
            {["Bulk orders from 25", "Logo and custom packaging", "Delivered across India"].map((t) => (
              <li key={t} className="flex items-center gap-2"><span aria-hidden className="h-1 w-1 rounded-full bg-accent" />{t}</li>
            ))}
          </ul>
        </div>
        <div className="animate-rise lg:col-span-6 lg:pl-6" style={{ animationDelay: "300ms" }}>
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
