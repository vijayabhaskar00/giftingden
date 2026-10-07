import type { Metadata } from "next";
import { Clock, Mail } from "lucide-react";
import ContactForm from "@/components/forms/ContactForm";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { InstagramIcon } from "@/components/ui/Icons";
import WhatsAppButton from "@/components/whatsapp/WhatsAppButton";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { createGeneralWhatsAppMessage } from "@/lib/whatsapp";

export const metadata: Metadata = buildMetadata({
  title: "Contact Gifthut | Corporate Gifting Enquiries",
  description: "Reach Gifthut on WhatsApp, email or Instagram. Our corporate gifting team will help you choose, brand and deliver your hampers.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="container-page pb-20 pt-6 md:pb-28">
      <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />
      <div className="mt-8 grid gap-14 md:mt-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="t-eyebrow mb-5">Contact</p>
          <h1 className="t-h1">Let&apos;s talk corporate gifting.</h1>
          <p className="t-lead mt-6">WhatsApp is the fastest way to reach us. Share the occasion, quantity, budget per gift and delivery date, and we&apos;ll take it from there.</p>
          <div className="mt-8"><WhatsAppButton message={createGeneralWhatsAppMessage()} label="Chat on WhatsApp" size="lg" source="contact_page" /></div>
          <ul className="mt-12 space-y-5 text-[0.95rem]">
            <li className="flex items-center gap-3"><Mail aria-hidden className="h-5 w-5 text-accent-ink" /><a className="underline underline-offset-4" href={`mailto:${site.email}`}>{site.email}</a></li>
            <li className="flex items-center gap-3"><InstagramIcon className="h-5 w-5 text-accent-ink" /><a className="underline underline-offset-4" href={site.instagramUrl} target="_blank" rel="noopener noreferrer">{site.instagramHandle}</a></li>
            <li className="flex items-center gap-3"><Clock aria-hidden className="h-5 w-5 text-accent-ink" />{site.supportHours}</li>
          </ul>
        </div>
        <div className="rounded-md border border-border bg-surface p-6 md:p-10 lg:col-span-7">
          <h2 className="t-h3 mb-6">Send us a message</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
