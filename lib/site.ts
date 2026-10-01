/**
 * Central, environment-driven site configuration.
 * Nothing here is secret: only NEXT_PUBLIC_* values are read.
 */
const stripNonDigits = (v: string) => v.replace(/\D/g, "");

export const site = {
  name: "Giftingden",
  tagline: "Thoughtful Gifts. Beautifully Delivered.",
  description:
    "Giftingden curates thoughtful gift boxes and hampers for birthdays, anniversaries, weddings, festivals and corporate gifting across India. Discover something special and enquire on WhatsApp.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.giftingden.com").replace(/\/$/, ""),
  /** Digits only, international format. Replace via NEXT_PUBLIC_WHATSAPP_NUMBER. */
  whatsappNumber: stripNonDigits(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919999999999"),
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@giftingden.com",
  instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://www.instagram.com/giftingden",
  instagramHandle: "@giftingden",
  analyticsId: process.env.NEXT_PUBLIC_ANALYTICS_ID || "",
  locale: "en_IN",
  currency: "INR",
  /** Edit freely: surfaced on contact page, FAQ and product pages. */
  supportHours: "Monday to Saturday, 10:00 am – 7:00 pm IST",
  deliveryPromise:
    "Delivered across India, usually within 3–5 working days. Need it sooner? Ask us on WhatsApp for express options.",
} as const;

export function absoluteUrl(path = "/"): string {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}
