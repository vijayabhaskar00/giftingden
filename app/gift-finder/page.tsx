import type { Metadata } from "next";
import GiftFinder from "@/components/finder/GiftFinder";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import SectionHeader from "@/components/ui/SectionHeader";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Gift Finder | Not Sure What to Gift?",
  description: "Answer four quick questions about who you're gifting, the occasion, your budget and their personality, and we'll recommend gifts they'll love.",
  path: "/gift-finder",
});

export default function GiftFinderPage() {
  return (
    <div className="container-page pb-20 pt-6 md:pb-28">
      <Breadcrumbs items={[{ name: "Gift Finder", path: "/gift-finder" }]} />
      <SectionHeader as="h1" align="center" className="mt-8 md:mt-12" eyebrow="Gift finder" title="Not Sure What to Gift?" subtitle="Tell us a little about them. We'll help you find something special." />
      <div className="mx-auto mt-10 max-w-4xl md:mt-14"><GiftFinder /></div>
    </div>
  );
}
