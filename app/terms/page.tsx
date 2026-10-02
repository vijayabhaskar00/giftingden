import type { Metadata } from "next";
import LegalPage from "@/components/ui/LegalPage";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Terms, Shipping & Cancellation",
  description: "Gifthut's terms of use, shipping policy and cancellation policy for gifts enquired and confirmed through WhatsApp.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage title="Terms & Policies" path="/terms" updated="1 October 2026">
      <p>These terms apply to your use of this website and to gifts you enquire about and order from Gifthut. By using the website you agree to them.</p>
      <h2>Ordering</h2>
      <p>This website is a catalogue. Prices shown are starting prices and may change with customisation, quantity and delivery location. An order is confirmed only once we have agreed the final items, price, delivery date and payment with you on WhatsApp.</p>
      <h2>Product information</h2>
      <p>We take care to describe and photograph each gift accurately. Contents may be substituted with items of equal or higher value when a specific product is unavailable. Handmade and seasonal items can vary slightly.</p>
      <h2 id="shipping">Shipping policy</h2>
      <ul>
        <li>We deliver to most pin codes across India. Delivery charges and timelines are confirmed when you place your order.</li>
        <li>Standard delivery is usually 3–5 working days. Custom, branded and bulk orders need additional lead time.</li>
        <li>Please share a complete address and a reachable phone number. We are not responsible for delays caused by incorrect or incomplete details.</li>
        <li>Perishable items should be accepted and refrigerated promptly if required.</li>
      </ul>
      <h2 id="cancellation">Cancellation &amp; refunds</h2>
      <ul>
        <li>Standard orders can be cancelled before they are dispatched for a full refund.</li>
        <li>Personalised, custom and branded gifts are made specifically for you and cannot be cancelled once production has started.</li>
        <li>If your gift arrives damaged or incorrect, message us on WhatsApp within 24 hours with photos and we will repair, replace or refund as appropriate.</li>
      </ul>
      <h2>Intellectual property</h2>
      <p>All content on this website, including text, photography and design, belongs to Gifthut and may not be reused without permission.</p>
      <h2>Liability</h2>
      <p>To the extent permitted by law, our liability for any order is limited to the amount you paid for it.</p>
      <h2>Contact</h2>
      <p>Questions? Email <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
    </LegalPage>
  );
}
