import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import CatalogueExplorer from "@/components/product/CatalogueExplorer";
import { slimForGrid } from "@/components/product/slim";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import LoadingState from "@/components/ui/LoadingState";
import SectionHeader from "@/components/ui/SectionHeader";
import { getAllProducts } from "@/lib/catalogue";
import { priceBands, recipients, styles } from "@/lib/data/taxonomy";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Corporate Hampers | Branded Gift Boxes for Teams & Clients",
  description: "Browse Gifthut corporate hampers. Filter by occasion, audience, budget per gift and style, then request a quote with your branding on WhatsApp.",
  path: "/gifts",
});

const chip = "rounded-full border border-border px-3.5 py-1.5 text-xs font-semibold transition-colors hover:border-foreground hover:bg-beige";

export default function GiftsPage() {
  const products = getAllProducts().map(slimForGrid);
  return (
    <div className="container-page pb-20 pt-6 md:pb-28">
      <Breadcrumbs items={[{ name: "Corporate Hampers", path: "/gifts" }]} />
      <SectionHeader as="h1" className="mt-6 md:mt-8" eyebrow="Corporate hampers" title="Find the right hamper for your people." subtitle="Search and filter by occasion, audience and budget per gift. When something fits, ask for a quote on WhatsApp with your quantity and branding." />

      <nav aria-label="Browse collections" className="no-scrollbar mt-8 flex gap-2 overflow-x-auto pb-1">
        {priceBands.map((b) => <Link key={b.slug} href={`/gifts?price=${b.slug}`} className={`${chip} shrink-0`}>{b.name}</Link>)}
        {recipients.map((r) => <Link key={r.slug} href={`/gifts?recipient=${r.slug}`} className={`${chip} shrink-0`}>{r.name}</Link>)}
        {styles.map((s) => <Link key={s.slug} href={`/gifts?style=${s.slug}`} className={`${chip} shrink-0`}>{s.name}</Link>)}
      </nav>

      <div className="mt-8">
        <Suspense fallback={<LoadingState />}><CatalogueExplorer products={products} /></Suspense>
      </div>
    </div>
  );
}
