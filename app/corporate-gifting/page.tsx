import type { Metadata } from "next";
import { Building2, Gift, Package, Palette, PenLine, Wallet } from "lucide-react";
import GiftArt from "@/components/art/GiftArt";
import CorporateForm from "@/components/forms/CorporateForm";
import ProductGrid from "@/components/product/ProductGrid";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { photoUrl } from "@/lib/photos";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import WhatsAppButton from "@/components/whatsapp/WhatsAppButton";
import { getByCategory } from "@/lib/catalogue";
import { corporateProcess, corporateServices, corporateUseCases } from "@/lib/data/content";
import { buildMetadata } from "@/lib/seo";
import { createCorporateWhatsAppMessage } from "@/lib/whatsapp";

export const metadata: Metadata = buildMetadata({
  title: "Corporate Gifting | Branded Hampers, Bulk & Employee Gifts",
  description: "Corporate gifting across India: employee onboarding kits, client hampers, festive gifts and event giveaways with custom branding, packaging and bulk pricing.",
  path: "/corporate-gifting",
});

const icons = [Package, Wallet, Palette, PenLine, Gift];

export default function CorporateGiftingPage() {
  const products = [...getByCategory("corporate-hampers"), ...getByCategory("new-employee-kits")].slice(0, 4);
  const msg = createCorporateWhatsAppMessage();

  return (
    <>
      <section className="on-dark bg-foreground text-background">
        <div className="container-page grid items-center gap-12 py-12 md:py-20 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Breadcrumbs items={[{ name: "Corporate Gifting", path: "/corporate-gifting" }]} className="[&_*]:!text-background/70 [&_[aria-current]]:!text-background" />
            <p className="t-eyebrow !text-champagne mb-5 mt-8">Corporate gifting</p>
            <h1 className="t-h1">Make Your Brand Part of the Celebration.</h1>
            <p className="mt-6 max-w-xl text-lg text-background/75">Considered hampers for teams, clients and events. Custom-branded, beautifully packed and delivered across India, from 25 to several hundred.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <WhatsAppButton message={msg} label="Talk to Our Corporate Gifting Team" size="lg" source="corporate_hero" extraEvent="corporate_enquiry" />
              <a href="#enquire" className="t-button inline-flex h-14 items-center justify-center rounded-sm border border-background/50 px-8 transition-colors hover:bg-background hover:text-foreground">Send a brief</a>
            </div>
          </div>
          <div className="lg:col-span-5"><div className="relative aspect-[5/4] overflow-hidden rounded-md lg:aspect-[4/5]"><GiftArt art={{ tone: "charcoal", box: "champagne", items: ["notebook", "mug", "tin", "card"], photo: photoUrl("corporate-stack") }} alt="A branded corporate gift hamper" /></div></div>
        </div>
      </section>

      <section aria-labelledby="uses" className="section-y">
        <div className="container-page">
          <Reveal><SectionHeader eyebrow="Where we help" title={<span id="uses">Gifting for every business moment.</span>} /></Reveal>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {corporateUseCases.map((u) => (
              <li key={u.title} className="bg-background p-6 transition-colors hover:bg-surface md:p-8">
                <Building2 aria-hidden className="h-5 w-5 text-accent-ink" />
                <h3 className="t-h3 mt-5">{u.title}</h3>
                <p className="t-caption mt-2 text-[0.92rem]">{u.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="services" className="section-y bg-beige/60">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4"><p className="t-eyebrow mb-4">What's included</p><h2 id="services" className="t-h2">Made to carry your brand.</h2></Reveal>
          <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:col-span-8">
            {corporateServices.map((s, i) => {
              const Icon = icons[i % icons.length];
              return (
                <li key={s.title} className="flex gap-4"><Icon aria-hidden className="mt-1 h-5 w-5 shrink-0 text-accent-ink" /><div><h3 className="font-display text-2xl font-semibold">{s.title}</h3><p className="t-caption mt-1 text-[0.95rem]">{s.text}</p></div></li>
              );
            })}
          </ul>
        </div>
      </section>

      {products.length > 0 && (
        <section aria-labelledby="corp-products" className="section-y">
          <div className="container-page">
            <Reveal><SectionHeader eyebrow="Popular with teams" title={<span id="corp-products">Start with a favourite.</span>} subtitle="Every hamper can be branded and scaled to your quantity." /></Reveal>
            <div className="mt-12"><ProductGrid products={products} /></div>
          </div>
        </section>
      )}

      <section aria-labelledby="process" className="section-y bg-champagne/40">
        <div className="container-page">
          <Reveal><SectionHeader align="center" eyebrow="How it works" title={<span id="process">From brief to doorstep.</span>} /></Reveal>
          <ol className="mt-14 grid gap-10 md:grid-cols-4">
            {corporateProcess.map((s) => (
              <li key={s.step}><span className="font-display text-5xl italic text-accent-ink">{s.step}</span><h3 className="t-h3 mt-3">{s.title}</h3><p className="t-caption mt-2 text-[0.95rem]">{s.text}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section id="enquire" aria-labelledby="brief" className="section-y scroll-mt-20">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="t-eyebrow mb-4">Corporate enquiry</p>
            <h2 id="brief" className="t-h2">Tell us about your gifting.</h2>
            <p className="t-lead mt-4">Share a few details and we&apos;ll continue the conversation on WhatsApp with options and quotes, usually within 24 hours.</p>
          </Reveal>
          <div className="lg:col-span-7"><CorporateForm /></div>
        </div>
      </section>
    </>
  );
}
