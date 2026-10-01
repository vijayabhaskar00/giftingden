"use client";

import { trackEvent, type AnalyticsEvent, type AnalyticsProps } from "./analytics";
import { createWhatsAppUrl } from "./whatsapp";

export interface WhatsAppTracking {
  /** Where on the site the CTA lives, e.g. "product_page", "hero". */
  source: string;
  productId?: string;
  productName?: string;
  category?: string;
  occasion?: string;
  /** Extra conversion event fired alongside `whatsapp_enquiry`. */
  extraEvent?: AnalyticsEvent;
}

/** Fires the central `whatsapp_enquiry` conversion event (no personal data). */
export function trackWhatsAppEnquiry({ extraEvent, ...t }: WhatsAppTracking): void {
  const props: AnalyticsProps = {
    productId: t.productId, productName: t.productName, category: t.category, occasion: t.occasion,
    source: t.source, page: typeof window !== "undefined" ? window.location.pathname : undefined,
  };
  trackEvent("whatsapp_enquiry", props);
  if (extraEvent) trackEvent(extraEvent, props);
}

/** For form submissions: track, then open WhatsApp (falls back to same-tab if a popup is blocked). */
export function openWhatsAppChat(message: string, tracking: WhatsAppTracking): void {
  trackWhatsAppEnquiry(tracking);
  const url = createWhatsAppUrl(message);
  const win = window.open(url, "_blank", "noopener,noreferrer");
  if (!win) window.location.href = url;
}
