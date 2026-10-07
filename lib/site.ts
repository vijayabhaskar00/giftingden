/**
 * Central, environment-driven site configuration.
 * Nothing here is secret: only NEXT_PUBLIC_* values are read.
 */
const stripNonDigits = (v: string) => v.replace(/\D/g, "");

export const site = {
  name: "Gifthut",
  tagline: "Corporate Gifting, Beautifully Delivered.",
  description:
    "Gifthut designs branded Diwali hampers and premium corporate gifts for clients, employees and partners, with bulk orders, custom branding and delivery across India. Get a quote on WhatsApp.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://gifthut.in").replace(/\/$/, ""),
  /** Digits only, international format. Replace via NEXT_PUBLIC_WHATSAPP_NUMBER. */
  whatsappNumber: stripNonDigits(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919030515380"),
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@gifthut.in",
  instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://www.instagram.com/gifthut",
  instagramHandle: "@gifthut",
  analyticsId: process.env.NEXT_PUBLIC_ANALYTICS_ID || "",
  locale: "en_IN",
  currency: "INR",
  /** Edit freely: surfaced on contact page, FAQ and product pages. */
  supportHours: "Monday to Saturday, 10:00 am – 7:00 pm IST",
  deliveryPromise:
    "Delivered across India to one address or many. Ready hampers usually ship in 3–5 working days; branded and bulk orders in 7–10.",
} as const;

/** Absolute URL matching the static export's trailing-slash routes (/gifts/ not /gifts). */
export function absoluteUrl(path = "/"): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  const withSlash = /[.?#]/.test(p.split("/").pop() ?? "") || p.endsWith("/") ? p : `${p}/`;
  return `${site.url}${withSlash}`;
}
