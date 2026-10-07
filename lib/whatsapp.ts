import { absoluteUrl, site } from "./site";
import type { FinderAnswers, Product } from "./types";

/** Strip control characters and cap length so user input can't bloat or break a message. */
export function sanitizeText(input: string, max = 300): string {
  return input.replace(/[\u0000-\u001F\u007F]+/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
}

/** https://wa.me/<PHONE>?text=<ENCODED_MESSAGE> */
export function createWhatsAppUrl(message?: string, phone: string = site.whatsappNumber): string {
  const base = `https://wa.me/${phone}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function createGeneralWhatsAppMessage(): string {
  return "Hi Gifthut! I'm looking for Diwali corporate gifting options. Could you help me choose?";
}

export function createProductWhatsAppMessage(product: Product, opts: { customisation?: boolean } = {}): string {
  if (product.whatsappMessage && !opts.customisation) return product.whatsappMessage;
  const lines = [
    "Hi Gifthut! I'm interested in corporate gifting with the following hamper:",
    `Product: ${product.name}`,
    `Product ID: ${product.sku}`,
    `Link: ${absoluteUrl(`/gift/${product.slug}`)}`,
    "",
    opts.customisation
      ? "I'd like to know about branding options (logo, packaging, message card) and customisation."
      : "Quantity needed: \nPlease share bulk pricing, branding options and delivery lead time.",
  ];
  return lines.join("\n");
}

export interface CorporateDetails {
  name?: string; company?: string; occasion?: string; quantity?: string; budget?: string; date?: string; notes?: string;
}

export function createCorporateWhatsAppMessage(d: CorporateDetails = {}): string {
  const rows = [
    ["Name", d.name], ["Company", d.company], ["Gifting for", d.occasion],
    ["Quantity", d.quantity], ["Budget per gift", d.budget], ["Needed by", d.date], ["Notes", d.notes],
  ].filter(([, v]) => v && sanitizeText(String(v)));
  const head = "Hi Gifthut, I'm interested in corporate gifting. Please share your corporate gifting options.";
  if (!rows.length) return head;
  return [head, "", ...rows.map(([k, v]) => `${k}: ${sanitizeText(String(v))}`)].join("\n");
}

export interface CustomGiftDetails {
  company?: string; occasion?: string; budget?: string; quantity?: string; recipient?: string; note?: string; packaging?: string; branding?: boolean;
}

export function createCustomGiftWhatsAppMessage(d: CustomGiftDetails = {}): string {
  const rows = [
    ["Company", d.company], ["Occasion", d.occasion], ["Budget per gift", d.budget], ["Quantity", d.quantity],
    ["Gifting for", d.recipient], ["Packaging", d.packaging], ["Brief / message", d.note],
    ["Branding", d.branding ? "Yes, with our logo" : undefined],
  ].filter(([, v]) => v && sanitizeText(String(v)));
  const head = "Hi Gifthut, I'd like to create a branded, customised hamper for my company.";
  if (!rows.length) return head;
  return [head, "", ...rows.map(([k, v]) => `${k}: ${sanitizeText(String(v))}`)].join("\n");
}

export function createGiftFinderWhatsAppMessage(a: FinderAnswers, picks: Product[] = []): string {
  const lines = [
    "Hi Gifthut! I used the Corporate Gift Finder and would love your help:",
    a.recipient && `Gifting: ${a.recipient}`,
    a.occasion && `Occasion: ${a.occasion}`,
    a.budget && `Budget per gift: ${a.budget}`,
    a.quantity && `Quantity: ${a.quantity}`,
    picks.length ? `Shortlist: ${picks.map((p) => p.name).join(", ")}` : "",
  ].filter(Boolean) as string[];
  return lines.join("\n");
}

export function createContactWhatsAppMessage(d: { name?: string; message?: string }): string {
  const name = d.name ? sanitizeText(d.name, 60) : "";
  const msg = d.message ? sanitizeText(d.message, 500) : "I have a question.";
  return `Hi Gifthut! ${name ? `I'm ${name}. ` : ""}${msg}`;
}
