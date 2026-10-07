import Link from "next/link";
import Media from "@/components/ui/Media";
import WhatsAppButton from "@/components/whatsapp/WhatsAppButton";
import { createProductWhatsAppMessage } from "@/lib/whatsapp";
import type { Product } from "@/lib/types";

interface Props { product: Product; priority?: boolean; wide?: boolean; sizes?: string }

export default function ProductCard({ product, priority, wide, sizes = "(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw" }: Props) {
  const href = `/gift/${product.slug}`;
  const [primary, secondary] = product.images;
  const badge = product.bestseller ? "Bestseller" : product.featured ? "Curated pick" : null;

  return (
    <article className={`group flex flex-col ${wide ? "lg:col-span-2" : ""}`}>
      <Link href={href} aria-label={product.name} className="relative block overflow-hidden rounded-md bg-beige">
        <div className={`relative ${wide ? "aspect-[4/5] lg:aspect-[8/5]" : "aspect-[4/5]"}`}>
          <Media image={primary} sizes={wide ? "(min-width:1024px) 50vw, 50vw" : sizes} priority={priority}
            className="transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]" />
          {secondary && (
            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 [@media(hover:hover)]:group-hover:opacity-100">
              <Media image={secondary} sizes={sizes} className="scale-[1.02]" />
            </div>
          )}
          {badge && (
            <span className="absolute left-3 top-3 rounded-sm bg-background/95 px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-foreground">
              {badge}
            </span>
          )}
          <span aria-hidden className="absolute inset-x-3 bottom-3 hidden translate-y-2 items-center justify-center rounded-sm bg-background/95 py-2.5 text-[0.7rem] font-bold uppercase tracking-[0.14em] opacity-0 transition-all duration-300 [@media(hover:hover)]:flex group-hover:translate-y-0 group-hover:opacity-100">
            View gift
          </span>
        </div>
      </Link>

      <div className="mt-4 flex flex-1 flex-col">
        <h3 className="t-h3 text-[1.2rem] md:text-[1.4rem]">
          <Link href={href} className="hover:text-brown">{product.name}</Link>
        </h3>
        <p className="t-caption mt-1.5 line-clamp-2">{product.shortDescription}</p>
        <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-muted">Bulk pricing on request</p>
          {product.customisable && <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-accent-ink">Customisable</p>}
        </div>
        <WhatsAppButton
          message={createProductWhatsAppMessage(product)}
          label="Get a quote" variant="link" icon={false} arrow
          ariaLabel={`Enquire about ${product.name} on WhatsApp (opens in a new tab)`}
          className="mt-3 !h-auto self-start !pb-1 text-[0.72rem]"
          source="product_card" productId={product.sku} productName={product.name} category={product.category}
          occasion={product.occasion[0]}
        />
      </div>
    </article>
  );
}
