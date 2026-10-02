import type { Metadata } from "next";
import LegalPage from "@/components/ui/LegalPage";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How Gifthut collects, uses and protects your information when you browse our website or contact us on WhatsApp.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" path="/privacy" updated="1 October 2026">
      <p>Gifthut (&quot;we&quot;, &quot;us&quot;) respects your privacy. This policy explains what we collect when you use this website and how we use it. We do not run customer accounts, take online payments or store orders on this website.</p>
      <h2>What we collect</h2>
      <ul>
        <li><strong>Messages you send us.</strong> When you tap a WhatsApp button or submit a form on this site, your message is sent through WhatsApp. WhatsApp&apos;s own privacy policy applies to that conversation.</li>
        <li><strong>Newsletter email.</strong> If you subscribe, we store your email address to send gifting inspiration. You can unsubscribe at any time.</li>
        <li><strong>Anonymous usage data.</strong> We measure page views, searches and which gifts are enquired about, so we can improve the website. This does not include your name, phone number or message content.</li>
      </ul>
      <h2>How we use it</h2>
      <p>To reply to your enquiries, prepare and deliver your gift, send newsletters you asked for, and understand which gifts and pages are most useful.</p>
      <h2>Sharing</h2>
      <p>We do not sell your data. We share delivery details only with courier partners as needed to deliver your order, and with service providers who help us run the website, under confidentiality obligations.</p>
      <h2>Cookies</h2>
      <p>We use only essential and analytics cookies, where an analytics provider is enabled. You can control cookies through your browser settings.</p>
      <h2>Your choices</h2>
      <p>You can ask us to access, correct or delete your information, or unsubscribe from emails, by writing to <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
      <h2>Contact</h2>
      <p>Questions about this policy? Email <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
    </LegalPage>
  );
}
