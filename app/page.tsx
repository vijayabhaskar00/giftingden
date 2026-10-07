import type { Metadata } from "next";
import CorporateForm from "@/components/forms/CorporateForm";
import GiftFinder from "@/components/finder/GiftFinder";
import Hero from "@/components/home/Hero";
import OccasionRail from "@/components/home/OccasionRail";
import ProductGrid from "@/components/product/ProductGrid";
import BrandStory from "@/components/sections/BrandStory";
import CapabilityStrip from "@/components/sections/CapabilityStrip";
import CustomGiftingSection from "@/components/sections/CustomGiftingSection";
import FAQAccordion from "@/components/sections/FAQAccordion";
import FestiveBanner from "@/components/sections/FestiveBanner";
import ProcessSection from "@/components/sections/ProcessSection";
import StatementSection from "@/components/sections/StatementSection";
import TestimonialSection from "@/components/sections/TestimonialSection";
import { LinkButton } from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { getAllProducts, getFeatured } from "@/lib/catalogue";
import { faqs } from "@/lib/data/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Gifthut | Diwali Corporate Gifting & Branded Hampers in India",
  description: "Branded Diwali hampers and premium corporate gifts for clients, employees and partners. Bulk orders from 25, your logo on every box, delivery across India. Get a Diwali quote on WhatsApp.",
  path: "/",
});

export default function HomePage() {
  const diwali = getAllProducts().filter((p) => p.category === "festive-hampers");
  const yearRound = getFeatured(12).filter((p) => !p.occasion.includes("festive")).slice(0, 4);

  return (
    <>
      <Hero />
      <CapabilityStrip />

      <section aria-labelledby="diwali-title" className="section-y bg-beige/50">
        <div className="container-page">
          <Reveal>
            <SectionHeader
              eyebrow="Diwali 2026 hampers"
              title={<span id="diwali-title">Diwali hampers, ready to brand.</span>}
              subtitle="Mithai, dry fruits, diyas and keepsakes for clients, teams and partners. Every hamper can carry your logo, your message and your packaging."
              action={<LinkButton href="/occasions/festive" variant="outline">All Diwali Hampers</LinkButton>}
            />
          </Reveal>
          <Reveal className="mt-12 md:mt-16"><ProductGrid products={diwali} columns={3} priorityCount={3} /></Reveal>
        </div>
      </section>

      <FestiveBanner />
      <StatementSection />
      <OccasionRail />

      <section aria-labelledby="featured-title" className="section-y bg-beige/50">
        <div className="container-page">
          <Reveal>
            <SectionHeader
              eyebrow="Year-round corporate gifting"
              title={<span id="featured-title">Beyond Diwali.</span>}
              subtitle="Onboarding, client and executive hampers for every other moment of the business year."
              action={<LinkButton href="/gifts" variant="outline">View All Hampers</LinkButton>}
            />
          </Reveal>
          <Reveal className="mt-12 md:mt-16"><ProductGrid products={yearRound} /></Reveal>
        </div>
      </section>

      <CustomGiftingSection />
      <ProcessSection tone="none" />

      <section aria-labelledby="finder-heading" className="section-y bg-beige/50">
        <div className="container-page">
          <Reveal>
            <SectionHeader
              align="center"
              eyebrow="Corporate gift finder"
              title={<span id="finder-heading">Not Sure What to Send?</span>}
              subtitle="Tell us who you're gifting, the occasion, budget and quantity. We'll shortlist hampers that fit."
            />
          </Reveal>
          <Reveal className="mx-auto mt-10 max-w-4xl md:mt-14"><GiftFinder /></Reveal>
        </div>
      </section>

      <TestimonialSection />
      <BrandStory />

      <section id="enquire" aria-labelledby="brief" className="section-y scroll-mt-20 bg-champagne/40">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="t-eyebrow mb-4">Request a quote</p>
            <h2 id="brief" className="t-h2">Tell us about your gifting.</h2>
            <p className="t-lead mt-4">Share a few details and we&apos;ll continue on WhatsApp with options, a quote and a mock-up, usually within 24 hours.</p>
          </Reveal>
          <div className="lg:col-span-7"><CorporateForm /></div>
        </div>
      </section>

      <section aria-labelledby="faq-title" className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="t-eyebrow mb-4">Questions</p>
            <h2 id="faq-title" className="t-h2">Before you order.</h2>
            <p className="t-lead mt-4">Quantities, branding, delivery and invoicing, answered.</p>
            <div className="mt-8"><LinkButton href="/faq" variant="link" size="sm">See all questions</LinkButton></div>
          </Reveal>
          <Reveal className="lg:col-span-8"><FAQAccordion faqs={faqs.slice(0, 5)} schema={false} /></Reveal>
        </div>
      </section>
    </>
  );
}
