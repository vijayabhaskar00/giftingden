import type { Metadata } from "next";
import GiftFinder from "@/components/finder/GiftFinder";
import Hero from "@/components/home/Hero";
import OccasionRail from "@/components/home/OccasionRail";
import ProductGrid from "@/components/product/ProductGrid";
import BrandStory from "@/components/sections/BrandStory";
import CorporateBanner from "@/components/sections/CorporateBanner";
import CustomGiftingSection from "@/components/sections/CustomGiftingSection";
import FAQAccordion from "@/components/sections/FAQAccordion";
import InstagramGrid from "@/components/sections/InstagramGrid";
import StatementSection from "@/components/sections/StatementSection";
import TestimonialSection from "@/components/sections/TestimonialSection";
import { LinkButton } from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { getAllProducts, getBestsellers, getFeatured } from "@/lib/catalogue";
import { faqs } from "@/lib/data/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Gifthut | Thoughtful Gifts. Beautifully Delivered.",
  description: "Curated gift boxes and hampers for birthdays, anniversaries, weddings, festivals and corporate gifting across India. Find a gift they'll remember and enquire on WhatsApp.",
  path: "/",
});

export default function HomePage() {
  const featured = getFeatured(4);
  const loved = [...getBestsellers(), ...getAllProducts().filter((p) => !p.bestseller)]
    .filter((p) => !featured.some((f) => f.id === p.id))
    .slice(0, 4);

  return (
    <>
      <Hero />
      <StatementSection />
      <OccasionRail />

      <section aria-labelledby="featured-title" className="section-y bg-beige/50">
        <div className="container-page">
          <Reveal>
            <SectionHeader
              eyebrow="Gift packages"
              title={<span id="featured-title">Curated With Thought.</span>}
              subtitle="Beautifully assembled gift experiences for moments that matter."
              action={<LinkButton href="/gift-packages" variant="outline">View All Gift Packages</LinkButton>}
            />
          </Reveal>
          <Reveal className="mt-12 md:mt-16"><ProductGrid products={featured} priorityCount={2} /></Reveal>
        </div>
      </section>

      <section aria-labelledby="finder-heading" className="section-y">
        <div className="container-page">
          <Reveal>
            <SectionHeader
              align="center"
              eyebrow="Gift finder"
              title={<span id="finder-heading">Not Sure What to Gift?</span>}
              subtitle="Tell us a little about them. We'll help you find something special."
            />
          </Reveal>
          <Reveal className="mx-auto mt-10 max-w-4xl md:mt-14"><GiftFinder /></Reveal>
        </div>
      </section>

      <CustomGiftingSection />
      <TestimonialSection />
      <BrandStory />

      {loved.length > 0 && (
        <section aria-labelledby="loved-title" className="section-y pt-0">
          <div className="container-page">
            <Reveal><SectionHeader eyebrow="Most loved" title={<span id="loved-title">Little details. Big feelings.</span>} action={<LinkButton href="/gifts" variant="link" size="sm">Shop all gifts</LinkButton>} /></Reveal>
            <Reveal className="mt-12"><ProductGrid products={loved} /></Reveal>
          </div>
        </section>
      )}

      <CorporateBanner />
      <InstagramGrid />

      <section aria-labelledby="faq-title" className="section-y pt-0">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="t-eyebrow mb-4">Questions</p>
            <h2 id="faq-title" className="t-h2">Before you gift.</h2>
            <p className="t-lead mt-4">Everything you need to know about ordering, delivery and customising.</p>
            <div className="mt-8"><LinkButton href="/faq" variant="link" size="sm">See all questions</LinkButton></div>
          </Reveal>
          <Reveal className="lg:col-span-8"><FAQAccordion faqs={faqs.slice(0, 5)} schema={false} /></Reveal>
        </div>
      </section>
    </>
  );
}
