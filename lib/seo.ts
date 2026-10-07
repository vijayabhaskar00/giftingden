import type { Metadata } from "next";
import { absoluteUrl, site } from "./site";
import type { Faq, Product } from "./types";

interface MetaInput { title: string; description: string; path: string; noindex?: boolean }

/** Unique title, description, canonical, Open Graph and Twitter metadata for any page. */
export function buildMetadata({ title, description, path, noindex }: MetaInput): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: { title, description, url, siteName: site.name, locale: site.locale, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export const organizationLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: absoluteUrl("/icon.svg"),
  description: site.description,
  sameAs: [site.instagramUrl],
  contactPoint: { "@type": "ContactPoint", contactType: "customer support", email: site.email, areaServed: "IN", availableLanguage: ["English", "Hindi"] },
});

export const websiteLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
  potentialAction: { "@type": "SearchAction", target: `${site.url}/gifts?q={search_term_string}`, "query-input": "required name=search_term_string" },
});

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absoluteUrl(it.path) })),
});

export const faqLd = (faqs: Faq[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
});

export const productLd = (p: Product) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: p.name,
  sku: p.sku,
  description: p.description,
  category: p.category,
  url: absoluteUrl(`/gift/${p.slug}`),
  image: [absoluteUrl(`/gift/${p.slug}/opengraph-image`)],
  brand: { "@type": "Brand", name: site.name },
});
