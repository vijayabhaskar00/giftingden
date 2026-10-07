import { slugify } from "../format";
import { photoUrl, type PhotoKey } from "../photos";
import type { ArtSpec, CategorySlug, Product, ProductImage } from "../types";

/**
 * Product catalogue. This file is the single source of truth today; swap
 * `getAllProducts` in lib/catalogue.ts for a CMS / Shopify / WooCommerce
 * fetch later without touching any component.
 */

const DEFAULT_DELIVERY =
  "Ready-to-ship hampers usually dispatch within 3–5 working days. Branded and bulk orders typically need 7–10 working days. We deliver to one address or many across India. Share your date and quantity on WhatsApp and we'll confirm.";

const CORPORATE_CUSTOMISATION = [
  "Logo on the box or sleeve",
  "Custom message card, signed by your team",
  "Bulk quantities from 25",
  "Budget-based product swaps",
  "Multi-address delivery",
];

/** Primary + secondary photograph per category. Give a product its own `photos` to override. */
export const CATEGORY_PHOTOS: Record<CategorySlug, [PhotoKey, PhotoKey]> = {
  "birthday-boxes": ["birthday", "birthday-flat"],
  "self-care-boxes": ["selfcare", "selfcare-close"],
  "corporate-hampers": ["corporate", "corporate-flat"],
  "luxury-hampers": ["luxury", "gourmet"],
  "festive-hampers": ["diwali-kraft", "diwali-white"],
  "new-employee-kits": ["employee", "employee-close"],
  "thank-you-boxes": ["thanks", "thanks-close"],
  "custom-hampers": ["custom", "ribbon"],
};

function photoShots(name: string, category: CategorySlug, art: ArtSpec, override?: [PhotoKey, PhotoKey]): ProductImage[] {
  const [a, b] = override ?? CATEGORY_PHOTOS[category];
  return [
    { variant: "box", art, src: photoUrl(a), alt: `${name} gift box, styled and ready to gift` },
    { variant: "detail", art, src: photoUrl(b), alt: `Close-up details of ${name}` },
  ];
}

type Seed = Omit<
  Product,
  "slug" | "currency" | "images" | "gallery" | "deliveryInfo" | "active" | "createdAt" | "updatedAt" |
  "price" | "customisationOptions" | "style" | "recipient" | "featured" | "bestseller" | "tags"
> &
  Partial<Pick<Product, "price" | "customisationOptions" | "style" | "recipient" | "featured" | "bestseller" | "tags" | "deliveryInfo">> & {
    art: ArtSpec;
    created: string;
  };

function make({ art, created, photos, ...p }: Seed & { photos?: [PhotoKey, PhotoKey] }): Product {
  const gallery = photoShots(p.name, p.category, art, photos);
  return {
    price: null,
    customisationOptions: CORPORATE_CUSTOMISATION,
    style: [],
    recipient: [],
    featured: false,
    bestseller: false,
    tags: [],
    deliveryInfo: DEFAULT_DELIVERY,
    ...p,
    slug: slugify(p.name),
    currency: "INR",
    images: gallery,
    gallery,
    active: true,
    createdAt: created,
    updatedAt: created,
  };
}

const products: Product[] = [
  make({
    id: "gh-005", sku: "GH-005", name: "The Corporate Classic", created: "2026-02-18",
    shortDescription: "A polished, no-fuss hamper for teams and clients.",
    description:
      "Understated and well made. A hardbound notebook, ceramic mug and gourmet snacks in a clean charcoal-and-kraft box, with space for your logo and a custom message. Our most-ordered corporate hamper, with consistent quality from 25 to several hundred.",
    startingPrice: 1499, category: "corporate-hampers", occasion: ["client-gifting", "appreciation", "festive", "thank-you"],
    recipient: ["clients", "employees", "teams"], style: ["minimal", "branded"], tags: ["Bestseller", "Bulk friendly", "Logo ready"],
    contents: ["Hardbound notebook", "Ceramic mug", "Gourmet snack tin", "Logo-branded sleeve", "Greeting card"],
    idealFor: ["Client gifting", "Employee appreciation", "Festive gifting"], customisable: true, featured: true, bestseller: true,
    art: { tone: "charcoal", box: "champagne", items: ["notebook", "mug", "tin", "card"] },
  }),
  make({
    id: "gh-015", sku: "GH-015", name: "The Executive Hamper", created: "2026-04-28",
    shortDescription: "Quietly impressive. Made for the boardroom.",
    description:
      "A premium hamper for leaders and key accounts: a leather-bound notebook, insulated steel sipper, gourmet nuts, fine chocolate and a hand-finished presentation box carrying your branding.",
    startingPrice: 5999, category: "luxury-hampers", occasion: ["client-gifting", "milestones", "festive"],
    recipient: ["leadership", "clients"], style: ["premium", "branded"], tags: ["Premium", "VIP", "Bulk friendly"],
    contents: ["Leather-bound notebook", "Insulated steel sipper", "Roasted gourmet nuts", "Fine chocolate collection", "Branded presentation box"],
    idealFor: ["Key accounts", "Leadership gifting", "Annual milestones"], customisable: true, featured: true,
    art: { tone: "charcoal", box: "cocoa", items: ["notebook", "bottle", "tin", "chocolates"] },
  }),
  make({
    id: "gh-016", sku: "GH-016", name: "The Welcome Kit", created: "2026-05-05",
    shortDescription: "A first-day welcome new joiners actually keep.",
    description:
      "Make new joiners feel expected. A branded notebook, a mug, a desk plant and a handwritten welcome card from the team, sent to their home or desk before day one. Ideal for remote and hybrid teams.",
    startingPrice: 1799, category: "new-employee-kits", occasion: ["onboarding"],
    recipient: ["employees", "teams"], style: ["branded", "minimal"], tags: ["Onboarding", "Bulk friendly", "Direct-to-home"],
    contents: ["Branded notebook", "Ceramic mug", "Desk succulent", "Welcome card from the team", "Branded gift box"],
    idealFor: ["Employee onboarding", "Internships", "Remote joiners"], customisable: true, featured: true, bestseller: true,
    art: { tone: "charcoal", box: "sage", items: ["notebook", "mug", "flowers", "card"] },
  }),
  make({
    id: "gh-021", sku: "GH-021", name: "The Desk Companion", created: "2026-06-18",
    shortDescription: "Make the workday feel a little more considered.",
    description:
      "A small, smart set for a better desk: a wireless charging pad, a ceramic mug, a premium notebook and gourmet coffee sachets, in a slim, minimal box that ships flat-friendly and brands beautifully.",
    startingPrice: 2499, category: "corporate-hampers", occasion: ["milestones", "appreciation", "onboarding"],
    recipient: ["employees", "teams", "clients"], style: ["tech", "minimal", "branded"], tags: ["Desk & tech", "Bulk friendly"],
    contents: ["Wireless charging pad", "Ceramic mug", "Premium notebook", "Gourmet coffee sachets"],
    idealFor: ["Work anniversaries", "Promotions", "Remote teams"], customisable: true,
    art: { tone: "charcoal", box: "ivory", items: ["mug", "notebook", "tin"] },
  }),
  make({
    id: "gh-011", sku: "GH-011", name: "The Festive Edit", created: "2026-08-02", photos: ["diwali-jute", "diwali-kraft"],
    shortDescription: "Festival warmth, beautifully shared with your people.",
    description:
      "Our festive corporate hamper: dry fruits, nuts, hand-poured diya candles and sweet treats in a gold-trimmed box. Made for Diwali, year-end and festival gifting to clients and teams, delivered on schedule at scale.",
    startingPrice: 2499, category: "festive-hampers", occasion: ["festive", "client-gifting", "new-year"],
    recipient: ["clients", "employees", "partners"], style: ["festive", "food-treats", "branded"], tags: ["Bestseller", "Diwali", "Bulk friendly"],
    contents: ["Premium dry fruit assortment", "Spiced nut mix", "Hand-poured diya candles", "Festive sweets box", "Gold-trimmed gift box"],
    idealFor: ["Diwali gifting", "Year-end gifting", "Client relationships"], customisable: true, featured: true, bestseller: true,
    art: { tone: "cocoa", box: "champagne", items: ["tin", "jar", "candle", "chocolates"] },
  }),
  make({
    id: "gh-023", sku: "GH-023", name: "The Diwali Gathering", created: "2026-08-20", photos: ["diwali-kraft", "diwali-jute"],
    shortDescription: "Light, sweetness and a table full of goodwill.",
    description:
      "A festive hamper made for sharing. Assorted mithai, roasted nuts, scented diyas and a decorative torana, in a rich cocoa-and-gold box that looks lovely on any festive table. A favourite for client and family-of-the-team gifting.",
    startingPrice: 3299, category: "festive-hampers", occasion: ["festive", "client-gifting"],
    recipient: ["clients", "leadership", "partners"], style: ["festive", "premium", "food-treats"], tags: ["Diwali", "Festive", "Sharing"],
    contents: ["Assorted mithai box", "Roasted spiced nuts", "Scented diya pair", "Mini torana", "Cocoa-and-gold gift box"],
    idealFor: ["Diwali", "Key client gifting", "Festive visits"], customisable: true, featured: true,
    art: { tone: "cocoa", box: "champagne", items: ["tin", "candle", "jar", "flowers"] },
  }),
  make({
    id: "gh-004", sku: "GH-004", name: "The Luxe Hamper", created: "2026-02-10",
    shortDescription: "Rare finds, generously presented.",
    description:
      "Our most generous hamper. Single-estate preserves, artisanal chocolates, a fine fragrance candle and premium sparkling juice, presented in a rigid black keepsake box with gold foiling. A statement gift for your most important relationships.",
    startingPrice: 7999, category: "luxury-hampers", occasion: ["client-gifting", "milestones", "festive"],
    recipient: ["leadership", "clients", "partners"], style: ["premium", "food-treats"], tags: ["Luxury", "Statement gift"],
    contents: ["Premium sparkling juice", "Single-estate preserve", "Artisanal chocolate collection", "Luxury fragrance candle", "Gold-foiled rigid box"],
    idealFor: ["VIP clients", "Board members", "Major milestones"], customisable: true,
    art: { tone: "charcoal", box: "charcoal", items: ["bottle", "tin", "candle", "chocolates"] },
  }),
  make({
    id: "gh-013", sku: "GH-013", name: "The Gourmet Box", created: "2026-04-12",
    shortDescription: "For clients who plan their holidays around lunch.",
    description:
      "A well-stocked box for food lovers: herb-infused olive oil, handmade preserves, artisanal crackers, dark chocolate and a premium tea selection. A confident, safe choice for diverse client lists.",
    startingPrice: 3999, category: "luxury-hampers", occasion: ["client-gifting", "festive", "thank-you"],
    recipient: ["clients", "partners", "leadership"], style: ["premium", "food-treats"], tags: ["Gourmet", "Client favourite"],
    contents: ["Herb-infused olive oil", "Handmade fruit preserve", "Artisanal crackers", "Dark chocolate block", "Premium tea selection"],
    idealFor: ["Client gifting", "Festive hosting", "Partner thank-yous"], customisable: true,
    art: { tone: "cocoa", box: "ivory", items: ["bottle", "jar", "tin", "chocolates"] },
  }),
  make({
    id: "gh-010", sku: "GH-010", name: "The Thank You Box", created: "2026-03-24",
    shortDescription: "Gratitude, said properly.",
    description:
      "A warm, generous way to thank a partner, vendor, mentor or host. Gourmet snacks, a pot of wildflower honey and a handwritten note from your team, simply and beautifully presented.",
    startingPrice: 999, category: "thank-you-boxes", occasion: ["thank-you", "appreciation"],
    recipient: ["partners", "clients", "teams"], style: ["minimal", "food-treats"], tags: ["Thank you", "Under ₹1,000", "Bulk friendly"],
    contents: ["Wildflower honey jar", "Artisanal biscuits", "Fresh-brew tea sachets", "Handwritten thank-you note"],
    idealFor: ["Vendors and partners", "Hosts and speakers", "Team thank-yous"], customisable: true,
    art: { tone: "ivory", box: "champagne", items: ["jar", "tin", "card", "flowers"] },
  }),
  make({
    id: "gh-022", sku: "GH-022", name: "The Little Thank You", created: "2026-07-01",
    shortDescription: "A small gesture that scales beautifully.",
    description:
      "Compact, sweet and ready to go: a handmade chocolate bar, a mini candle and a handwritten card in a ribboned kraft sleeve. Brilliant for event giveaways, customer-appreciation drives and large team thank-yous.",
    startingPrice: 449, category: "thank-you-boxes", occasion: ["thank-you", "events", "appreciation"],
    recipient: ["delegates", "teams", "clients"], style: ["minimal", "branded"], tags: ["Under ₹1,000", "Giveaway", "Bulk friendly"],
    contents: ["Handmade chocolate bar", "Mini scented candle", "Handwritten card", "Ribboned kraft sleeve"],
    idealFor: ["Event giveaways", "Customer appreciation", "Large teams"], customisable: true,
    art: { tone: "ivory", box: "blush", items: ["chocolates", "candle", "card"] },
  }),
  make({
    id: "gh-024", sku: "GH-024", name: "The Conference Kit", created: "2026-09-10", photos: ["corporate-flat", "employee-close"],
    shortDescription: "Delegate gifts people carry home.",
    description:
      "A compact delegate kit for conferences, offsites and launches: a branded notebook, steel water bottle, tote bag and a small gourmet treat, packed flat for easy distribution at the venue or shipped to attendees.",
    startingPrice: 1199, category: "corporate-hampers", occasion: ["events", "onboarding"],
    recipient: ["delegates", "employees"], style: ["branded", "tech"], tags: ["Events", "Bulk friendly", "Logo ready"],
    contents: ["Branded notebook", "Steel water bottle", "Cotton tote bag", "Gourmet treat", "Welcome card"],
    idealFor: ["Conferences", "Offsites", "Product launches"], customisable: true,
    art: { tone: "charcoal", box: "ivory", items: ["notebook", "bottle", "card"] },
  }),
  make({
    id: "gh-006", sku: "GH-006", name: "The Wellness Box", created: "2026-02-25",
    shortDescription: "Small rituals for a calmer week.",
    description:
      "For people-first companies: herbal teas, a gratitude journal, a calming balm and a candle that smells like first rain, wrapped in recycled, plantable-seed paper. A thoughtful nod to wellbeing weeks, burnout recovery and recognition.",
    startingPrice: 2999, category: "self-care-boxes", occasion: ["appreciation", "milestones", "new-year"],
    recipient: ["employees", "teams", "leadership"], style: ["wellness", "minimal"], tags: ["Wellness", "Calming"],
    contents: ["Assorted herbal tea tin", "Gratitude journal", "Calming balm", "Petrichor soy candle", "Plantable seed card"],
    idealFor: ["Wellness weeks", "Employee appreciation", "Year-end thank-yous"], customisable: true,
    art: { tone: "sage", box: "sage", items: ["tin", "notebook", "candle", "soap"] },
  }),
  make({
    id: "gh-001", sku: "GH-001", name: "The Milestone Box", created: "2026-01-12",
    shortDescription: "An elegant way to mark work anniversaries and wins.",
    description:
      "An elegant collection of treats and keepsakes for recognition moments: premium chocolates, a hand-poured candle, a personalised card and a curated keepsake, finished with a satin ribbon. Add names for every recipient.",
    startingPrice: 1999, category: "birthday-boxes", occasion: ["milestones", "appreciation"],
    recipient: ["employees", "teams", "clients"], style: ["branded", "food-treats"], tags: ["Bestseller", "Recognition", "Personalised"],
    contents: ["Premium assorted chocolates", "Hand-poured scented candle", "Personalised message card", "Curated keepsake", "Luxury ribbon packaging"],
    idealFor: ["Work anniversaries", "Promotions", "Team wins"], customisable: true, bestseller: true,
    art: { tone: "blush", box: "ivory", items: ["chocolates", "candle", "card", "flowers"] },
  }),
  make({
    id: "gh-012", sku: "GH-012", name: "The Minimalist Gift", created: "2026-04-05",
    shortDescription: "Quiet, considered, effortlessly on-brand.",
    description:
      "For brands that prefer fewer, better things. One beautifully made candle, a linen-bound notebook and a bar of small-batch chocolate in a plain ivory box with a single ribbon, ready for a discreet logo.",
    startingPrice: 1299, category: "corporate-hampers", occasion: ["client-gifting", "thank-you", "milestones"],
    recipient: ["clients", "employees", "partners"], style: ["minimal", "branded"], tags: ["Minimal", "Design-led"],
    contents: ["Single-wick soy candle", "Linen-bound notebook", "Small-batch chocolate bar", "Plain ivory box"],
    idealFor: ["Design-led brands", "Discreet client gifting", "Milestones"], customisable: true,
    art: { tone: "ivory", box: "ivory", items: ["candle", "notebook", "chocolates"] },
  }),
  make({
    id: "gh-014", sku: "GH-014", name: "The New Year Box", created: "2026-04-20", photos: ["diwali-white", "diwali-jute"],
    shortDescription: "Close the year with gratitude, open the next with goodwill.",
    description:
      "A hopeful year-end hamper: a desk plant, a candle for quiet evenings, a planner for the year ahead and a jar of honey to sweeten it. Built to thank clients and teams and set the tone for January.",
    startingPrice: 2199, category: "festive-hampers", occasion: ["new-year", "client-gifting", "appreciation"],
    recipient: ["clients", "employees", "partners"], style: ["festive", "minimal"], tags: ["Year-end", "New Year"],
    contents: ["Mini potted succulent", "Soy wax candle", "Planner for the new year", "Wildflower honey", "New Year greeting card"],
    idealFor: ["Year-end client gifts", "Team thank-yous", "New Year greetings"], customisable: true,
    art: { tone: "sage", box: "ivory", items: ["flowers", "candle", "notebook", "jar"] },
  }),
  make({
    id: "gh-019", sku: "GH-019", name: "The Build-Your-Own Hamper", created: "2026-06-01",
    shortDescription: "Your brand, your budget, your brief. We handle the rest.",
    description:
      "Tell us who it's for, your per-gift budget and the feeling you're after. Our corporate gifting team curates a hamper around your brief, with your choice of products, packaging, message card and logo, and delivers to one address or many.",
    startingPrice: 1499, category: "custom-hampers", occasion: ["client-gifting", "onboarding", "festive", "events"],
    recipient: ["clients", "employees", "leadership", "delegates"], style: ["branded", "premium"], tags: ["Custom", "Branded"],
    contents: ["Products chosen with you", "Custom packaging", "Personalised message card", "Logo branding"],
    idealFor: ["Specific budgets", "Brand-matched packaging", "Unusual briefs"], customisable: true,
    customisationOptions: ["Choose occasion and per-gift budget", "Choose products", "Custom packaging colours and finish", "Logo and brand message", "Individual names on each gift", "Multi-address delivery"],
    art: { tone: "champagne", box: "ivory", items: ["card", "chocolates", "candle", "bottle"] },
  }),
];

export const allProducts: Product[] = products;
