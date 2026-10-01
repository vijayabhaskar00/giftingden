# Giftingden

Premium gifting catalogue where every purchase action leads to WhatsApp. No cart, checkout, payments or logins.

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide.

## Run

```bash
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_WHATSAPP_NUMBER etc.
npm run dev
npm run build && npm start
```

## Where things live

| Concern | Location |
|---|---|
| Products (schema in `lib/types.ts`) | `lib/data/products.ts` |
| Categories, occasions, recipients, styles, price bands | `lib/data/taxonomy.ts` |
| FAQs, reviews, copy blocks | `lib/data/content.ts` |
| Data access, filter, sort, search | `lib/catalogue.ts` (swap for CMS/Shopify/WooCommerce here) |
| WhatsApp URLs + messages | `lib/whatsapp.ts`, `lib/whatsapp-client.ts` |
| Analytics (provider-agnostic) | `lib/analytics.ts` |
| Gift Finder (rule-based, AI-ready) | `lib/gift-finder.ts`, `app/actions/gift-finder.ts` |
| SEO / JSON-LD | `lib/seo.ts`, `app/sitemap.ts`, `app/robots.ts` |
| Design tokens | `app/globals.css` (`@theme`) |

## Before launch

- Set `NEXT_PUBLIC_WHATSAPP_NUMBER` (the default is a placeholder) and `NEXT_PUBLIC_SITE_URL`.
- Images are procedural SVG still-lifes. Add real photography by setting `src` on a product image (see `ProductImage`); `Media` renders it with `next/image`.
- Reviews, delivery promises, support hours and legal text are sample content. Replace and have legal text reviewed.
- Newsletter posts to `/api/newsletter`, which forwards to `NEWSLETTER_WEBHOOK_URL`. Without it production returns 503.
- Set `NEXT_PUBLIC_ANALYTICS_ID` (GA4) to enable analytics; `whatsapp_enquiry` is the key conversion event.
