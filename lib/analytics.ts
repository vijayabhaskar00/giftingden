/**
 * Provider-agnostic analytics. Components only ever call `trackEvent`.
 * Swap or add providers in `sinks` (GA4, Meta Pixel, PostHog, a CRM webhook…)
 * without touching UI code. Never pass personal data in properties.
 */
export type AnalyticsEvent =
  | "page_view" | "product_view" | "search" | "category_click" | "occasion_click"
  | "whatsapp_enquiry" | "gift_finder_start" | "gift_finder_complete"
  | "corporate_enquiry" | "custom_gift_enquiry" | "newsletter_subscribe" | "filter_change";

export type AnalyticsProps = Record<string, string | number | boolean | null | undefined>;

type Sink = (event: AnalyticsEvent, props: AnalyticsProps) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const gtagSink: Sink = (event, props) => {
  if (typeof window.gtag === "function") window.gtag("event", event, props);
};

const dataLayerSink: Sink = (event, props) => {
  window.dataLayer?.push({ event, ...props });
};

const devSink: Sink = (event, props) => {
  if (process.env.NODE_ENV !== "production") console.debug("[analytics]", event, props);
};

const sinks: Sink[] = [gtagSink, dataLayerSink, devSink];

export function trackEvent(event: AnalyticsEvent, props: AnalyticsProps = {}): void {
  if (typeof window === "undefined") return;
  const payload = { ...props, timestamp: new Date().toISOString() };
  for (const sink of sinks) {
    try { sink(event, payload); } catch { /* analytics must never break the UI */ }
  }
}
