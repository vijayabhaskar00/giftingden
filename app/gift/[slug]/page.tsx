import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetails from "@/components/product/ProductDetails";
import ProductGallery from "@/components/product/ProductGallery";
import ProductGrid from "@/components/product/ProductGrid";
import StickyProductCta from "@/components/product/StickyProductCta";
import { slimForGrid } from "@/components/product/slim";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import JsonLd from "@/components/ui/JsonLd";
import SectionHeader from "@/components/ui/SectionHeader";
import TrackView from "@/components/ui/TrackView";
import { getAllProducts, getProductBySlug, getRelated } from "@/lib/catalogue";
import { getCategory } from "@/lib/data/taxonomy";
import { priceLabel } from "@/lib/format";
import { buildMetadata, productLd } from "@/lib/seo";

type Params = { slug: string };

export const generateStaticParams = () => getAllProducts().map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const p = getProductBySlug((await params).slug);
  if (!p) return {};
  return buildMetadata({ title: `${p.name} | ${getCategory(p.category)?.name ?? "Gift"}`, description: `${p.shortDescription} ${priceLabel(p)}. Enquire on WhatsApp for availability and delivery.`, path: `/gift/${p.slug}` });
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const p = getProductBySlug((await params).slug);
  if (!p) notFound();
  const related = getRelated(p, 4).map(slimForGrid);

  return (
    <>
      <JsonLd data={productLd(p)} />
      <TrackView event="product_view" props={{ productId: p.sku, productName: p.name, category: p.category, occasion: p.occasion[0] }} />
      <div className="container-page pb-28 pt-5 lg:pb-24">
        <Breadcrumbs items={[{ name: "Corporate Hampers", path: "/gifts" }, { name: p.name, path: `/gift/${p.slug}` }]} className="mb-6" />
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="-mx-5 sm:mx-0 lg:col-span-7"><div className="lg:sticky lg:top-28"><ProductGallery images={p.gallery} name={p.name} /></div></div>
          <div className="lg:col-span-5"><ProductDetails product={p} /></div>
        </div>
      </div>

      <section aria-labelledby="related" className="section-y border-t border-border pt-16">
        <div className="container-page">
          <SectionHeader eyebrow="You may also love" title={<span id="related">More thoughtful gifts.</span>} />
          <div className="mt-12"><ProductGrid products={related} /></div>
        </div>
      </section>
      <StickyProductCta product={p} />
    </>
  );
}
