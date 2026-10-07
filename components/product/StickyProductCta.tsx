import WhatsAppButton from "@/components/whatsapp/WhatsAppButton";
import { createProductWhatsAppMessage } from "@/lib/whatsapp";
import type { Product } from "@/lib/types";

/** Mobile-only bar so the WhatsApp action never leaves the viewport. */
export default function StickyProductCta({ product: p }: { product: Product }) {
  return (
    <div className="safe-bottom fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-border bg-background/95 px-4 pt-3 backdrop-blur lg:hidden">
      <div className="min-w-0 shrink">
        <p className="truncate text-[0.72rem] text-muted">{p.name}</p>
        <p className="text-[0.95rem] font-bold leading-tight">Get a bulk quote</p>
      </div>
      <WhatsAppButton message={createProductWhatsAppMessage(p)} label="Enquire on WhatsApp" className="ml-auto flex-1 !px-3" source="product_sticky_bar"
        productId={p.sku} productName={p.name} category={p.category} occasion={p.occasion[0]} />
    </div>
  );
}
