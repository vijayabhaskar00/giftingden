import type { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import SectionHeader from "@/components/ui/SectionHeader";
import FAQAccordion from "@/components/sections/FAQAccordion";
import WhatsAppButton from "@/components/whatsapp/WhatsAppButton";
import { faqs } from "@/lib/data/content";
import { buildMetadata } from "@/lib/seo";
import { createGeneralWhatsAppMessage } from "@/lib/whatsapp";

export const metadata: Metadata = buildMetadata({
  title: "FAQ | Ordering, Delivery & Customisation",
  description: "Answers about ordering on WhatsApp, delivery across India, customisation, personal messages, corporate gifting and bulk orders.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <div className="container-page pb-20 pt-6 md:pb-28">
      <Breadcrumbs items={[{ name: "FAQ", path: "/faq" }]} />
      <SectionHeader as="h1" className="mt-8" eyebrow="FAQ" title="Questions, answered." subtitle="Everything about ordering, delivery and customising your gift." />
      <div className="mt-12 max-w-3xl"><FAQAccordion faqs={faqs} /></div>
      <div className="mt-14 flex flex-col items-start gap-4">
        <p className="t-lead">Still wondering? We&apos;re a message away.</p>
        <WhatsAppButton message={createGeneralWhatsAppMessage()} label="Ask on WhatsApp" size="lg" source="faq" />
      </div>
    </div>
  );
}
