import { Check, Clock, Truck } from "lucide-react";
import Link from "next/link";
import WhatsAppButton from "@/components/whatsapp/WhatsAppButton";
import { getCategory, getOccasion } from "@/lib/data/taxonomy";
import { createProductWhatsAppMessage } from "@/lib/whatsapp";
import type { Product } from "@/lib/types";

const H = ({ children }: { children: React.ReactNode }) => <h2 className="t-eyebrow mb-4">{children}</h2>;

export default function ProductDetails({ product: p }: { product: Product }) {
  const category = getCategory(p.category);
  const tracking = { productId: p.sku, productName: p.name, category: p.category, occasion: p.occasion[0] } as const;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {p.bestseller && <span className="rounded-sm bg-foreground px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-background">Bestseller</span>}
        {category && <Link href={`/gifts?category=${category.slug}`} className="t-eyebrow hover:underline">{category.name}</Link>}
      </div>
      <h1 className="t-h1 mt-4 !text-[clamp(2.4rem,5vw,3.6rem)]">{p.name}</h1>
      <p className="mt-5 text-lg leading-relaxed text-muted">{p.description}</p>

      <div className="mt-7 border-y border-border py-5">
        <p className="font-display text-3xl font-semibold">Bulk pricing on request</p>
        <p className="t-caption mt-1">Pricing depends on quantity, branding and delivery. Tell us your numbers on WhatsApp and we&apos;ll send a quote and mock-up.</p>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col">
        <WhatsAppButton message={createProductWhatsAppMessage(p)} label="Enquire on WhatsApp" size="lg" className="w-full sm:flex-1 lg:flex-none" source="product_page" {...tracking} />
        <WhatsAppButton message={createProductWhatsAppMessage(p, { customisation: true })} label={p.customisable ? "Ask About Branding" : "Ask a Question"} variant="outline" size="lg" icon={false} className="w-full sm:flex-1 lg:flex-none" source="product_page_custom" {...tracking} />
      </div>

      <section aria-labelledby="inside" className="mt-12">
        <H><span id="inside">What&apos;s inside</span></H>
        <ul className="space-y-3">
          {p.contents.map((c) => (
            <li key={c} className="flex items-start gap-3"><Check aria-hidden className="mt-1 h-4 w-4 shrink-0 text-accent-ink" /><span>{c}</span></li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="ideal" className="mt-10">
        <H><span id="ideal">Ideal for</span></H>
        <ul className="flex flex-wrap gap-2">
          {p.idealFor.map((i) => <li key={i} className="rounded-full border border-border px-3.5 py-1.5 text-sm">{i}</li>)}
        </ul>
        <p className="t-caption mt-4">
          Occasions:{" "}
          {p.occasion.map((o, i) => (
            <span key={o}>{i > 0 && ", "}<Link href={`/occasions/${o}`} className="font-semibold text-foreground underline underline-offset-4">{getOccasion(o)?.name ?? o}</Link></span>
          ))}
        </p>
      </section>

      <section aria-labelledby="custom" className="mt-10">
        <H><span id="custom">Branding &amp; customisation</span></H>
        {p.customisable ? (
          <ul className="space-y-2.5">{p.customisationOptions.map((o) => <li key={o} className="flex items-start gap-3"><Check aria-hidden className="mt-1 h-4 w-4 shrink-0 text-accent-ink" />{o}</li>)}</ul>
        ) : <p className="text-muted">This hamper ships as-is. Want changes? Ask us on WhatsApp.</p>}
      </section>

      <section aria-labelledby="delivery" className="mt-10 rounded-md bg-beige/70 p-5">
        <H><span id="delivery">Delivery</span></H>
        <p className="flex items-start gap-3 text-sm leading-relaxed"><Truck aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />{p.deliveryInfo}</p>
        <p className="mt-3 flex items-start gap-3 text-sm leading-relaxed text-muted"><Clock aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />Product ID {p.sku}. Quote this when you message us.</p>
      </section>
    </div>
  );
}
