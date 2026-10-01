import Link from "next/link";
import Media from "@/components/ui/Media";
import WhatsAppButton from "@/components/whatsapp/WhatsAppButton";
import { buttonClasses } from "@/components/ui/Button";
import { priceLabel } from "@/lib/format";
import { createProductWhatsAppMessage } from "@/lib/whatsapp";
import type { Recommendation } from "@/lib/types";

export default function GiftRecommendation({ rec }: { rec: Recommendation }) {
  const { product: p, reasons } = rec;
  return (
    <article className="flex h-full flex-col">
      <Link href={`/gift/${p.slug}`} className="relative block aspect-[4/5] overflow-hidden rounded-md bg-beige" aria-label={`View ${p.name}`}>
        <Media image={p.images[0]} sizes="(min-width:768px) 30vw, 90vw" className="transition-transform duration-700 hover:scale-[1.04]" />
      </Link>
      <h4 className="t-h3 mt-4">{p.name}</h4>
      <p className="mt-1 text-sm font-semibold">{priceLabel(p)}</p>
      {reasons.length > 0 && (
        <ul className="t-caption mt-2 space-y-0.5">{reasons.slice(0, 2).map((r) => <li key={r}>· {r}</li>)}</ul>
      )}
      <div className="mt-auto flex flex-col gap-2 pt-5 sm:flex-row md:flex-col xl:flex-row">
        <Link href={`/gift/${p.slug}`} className={buttonClasses("outline", "sm", "w-full sm:flex-1 md:flex-none xl:flex-1")}>View Gift</Link>
        <WhatsAppButton
          message={createProductWhatsAppMessage(p)} label="Enquire" size="sm" className="w-full sm:flex-1 md:flex-none xl:flex-1"
          ariaLabel={`Enquire about ${p.name} on WhatsApp (opens in a new tab)`}
          source="gift_finder" productId={p.sku} productName={p.name} category={p.category} occasion={p.occasion[0]}
        />
      </div>
    </article>
  );
}
