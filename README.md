# Giftingden

Premium gifting catalogue where every purchase action leads to WhatsApp. No cart, checkout, payments or logins.

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide.

## Deploy (GitHub Pages)

Static export. `.github/workflows/deploy.yml` builds and publishes on every push to `main`. In repo Settings → Pages set Source to **GitHub Actions**. Optional repository *variables*: `WHATSAPP_NUMBER`, `ANALYTICS_ID`, `NEWSLETTER_ENDPOINT`, `LOCAL_PHOTOS`.

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
- Photos are AI-generated and referenced from a CDN (`lib/photos.ts`). Run `node scripts/fetch-photos.mjs` to self-host compressed WebP, then set `LOCAL_PHOTOS=1`. Replace with your own photography any time.
- Reviews, delivery promises, support hours and legal text are sample content. Replace and have legal text reviewed.
- Newsletter: set `NEXT_PUBLIC_NEWSLETTER_ENDPOINT` (e.g. a Formspree URL). Without it, sign-ups open a pre-filled WhatsApp message instead.
- Set `NEXT_PUBLIC_ANALYTICS_ID` (GA4) to enable analytics; `whatsapp_enquiry` is the key conversion event.
