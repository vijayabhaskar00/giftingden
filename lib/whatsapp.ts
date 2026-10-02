import { priceLabel } from "./format";
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
  return "Hi Gifthut! I'd love some help choosing a gift. Could you guide me?";
}

export function createProductWhatsAppMessage(product: Product, opts: { customisation?: boolean } = {}): string {
  if (product.whatsappMessage && !opts.customisation) return product.whatsappMessage;
  const lines = [
    "Hi Gifthut! I'm interested in the following gift:",
    `Product: ${product.name}`,
    `Product ID: ${product.sku}`,
    `Price: ${priceLabel(product)}`,
    `Link: ${absoluteUrl(`/gift/${product.slug}`)}`,
    "",
    opts.customisation
      ? "I'd like to know about customisation options (items, packaging, personal message)."
      : "Please share availability, pricing and delivery details.",
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
  occasion?: string; budget?: string; recipient?: string; note?: string; packaging?: string; branding?: boolean;
}

export function createCustomGiftWhatsAppMessage(d: CustomGiftDetails = {}): string {
  const rows = [
    ["Occasion", d.occasion], ["Budget", d.budget], ["Gifting for", d.recipient],
    ["Packaging", d.packaging], ["Personal note", d.note], ["Branding", d.branding ? "Yes, with logo" : undefined],
  ].filter(([, v]) => v && sanitizeText(String(v)));
  const head = "Hi Gifthut, I'd like to create a customised gift package.";
  if (!rows.length) return head;
  return [head, "", ...rows.map(([k, v]) => `${k}: ${sanitizeText(String(v))}`)].join("\n");
}

export function createGiftFinderWhatsAppMessage(a: FinderAnswers, picks: Product[] = []): string {
  const lines = [
    "Hi Gifthut! I used the Gift Finder and would love your help:",
    a.recipient && `Gifting for: ${a.recipient}`,
    a.occasion && `Occasion: ${a.occasion}`,
    a.budget && `Budget: ${a.budget}`,
    a.personality && `Their personality: ${a.personality}`,
    picks.length ? `Shortlist: ${picks.map((p) => p.name).join(", ")}` : "",
  ].filter(Boolean) as string[];
  return lines.join("\n");
}

export function createContactWhatsAppMessage(d: { name?: string; message?: string }): string {
  const name = d.name ? sanitizeText(d.name, 60) : "";
  const msg = d.message ? sanitizeText(d.message, 500) : "I have a question.";
  return `Hi Gifthut! ${name ? `I'm ${name}. ` : ""}${msg}`;
}
