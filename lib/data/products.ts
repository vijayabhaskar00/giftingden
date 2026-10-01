import { slugify } from "../format";
import type { ArtSpec, ImageVariant, Product, ProductImage } from "../types";

/**
 * Product catalogue. This file is the single source of truth today; swap
 * `getAllProducts` in lib/catalogue.ts for a CMS / Shopify / WooCommerce
 * fetch later without touching any component.
 */

const DEFAULT_DELIVERY =
  "Delivered across India, usually within 3–5 working days. Express and same-day options available in select cities. Tell us your date on WhatsApp and we'll confirm.";

const VARIANTS: ImageVariant[] = ["box", "flatlay", "detail", "wrapped"];
const VARIANT_ALT: Record<ImageVariant, (n: string) => string> = {
  box: (n) => `${n} gift box, styled and ribboned`,
  flatlay: (n) => `Flat lay of everything inside ${n}`,
  detail: (n) => `Close-up of a keepsake from ${n}`,
  wrapped: (n) => `${n} in signature Giftingden packaging`,
};

function shots(name: string, art: ArtSpec): ProductImage[] {
  return VARIANTS.map((variant) => ({ variant, art, alt: VARIANT_ALT[variant](name) }));
}

type Seed = Omit<
  Product,
  "slug" | "currency" | "images" | "gallery" | "deliveryInfo" | "active" | "createdAt" | "updatedAt" |
  "price" | "customisationOptions" | "personality" | "style" | "recipient" | "featured" | "bestseller" | "tags"
> &
  Partial<Pick<Product, "price" | "customisationOptions" | "personality" | "style" | "recipient" | "featured" | "bestseller" | "tags" | "deliveryInfo">> & {
    art: ArtSpec;
    created: string;
  };

function make({ art, created, ...p }: Seed): Product {
  const gallery = shots(p.name, art);
  return {
    price: null,
    customisationOptions: p.customisable
      ? ["Personalised message card", "Choice of packaging colour", "Swap selected items"]
      : [],
    personality: [],
    style: [],
    recipient: [],
    featured: false,
    bestseller: false,
    tags: [],
    deliveryInfo: DEFAULT_DELIVERY,
    ...p,
    slug: slugify(p.name),
    currency: "INR",
    images: gallery.slice(0, 2),
    gallery,
    active: true,
    createdAt: created,
    updatedAt: created,
  };
}

const products: Product[] = [
  make({
    id: "gd-001", sku: "GD-001", name: "The Celebration Box", created: "2026-01-12",
    shortDescription: "An elegant mix of delightful treats and thoughtful keepsakes.",
    description:
      "An elegant collection of delightful treats and thoughtful keepsakes, created to make birthdays feel a little more special. Every box is hand-assembled, tissue-wrapped and finished with a satin ribbon.",
    startingPrice: 1999, category: "birthday-boxes", occasion: ["birthday", "anniversary", "congratulations"],
    recipient: ["her", "him", "friends"], style: ["cute", "food-treats", "personalised"],
    personality: ["foodie", "sentimental"], tags: ["Bestseller", "Birthday", "Treats"],
    contents: ["Premium assorted chocolates", "Hand-poured scented candle", "Personalised message card", "Curated keepsake", "Luxury ribbon packaging"],
    idealFor: ["Birthdays", "Anniversaries", "Celebrations"], customisable: true, featured: true, bestseller: true,
    art: { tone: "blush", box: "ivory", items: ["chocolates", "candle", "card", "flowers"] },
  }),
  make({
    id: "gd-002", sku: "GD-002", name: "The Self Care Edit", created: "2026-01-20",
    shortDescription: "A slow evening, wrapped up with a ribbon.",
    description:
      "For the person who gives everything to everyone else. A calming collection of bath, body and tea rituals, packed in a keepsake box she'll reuse long after the last candle burns down.",
    startingPrice: 2299, category: "self-care-boxes", occasion: ["birthday", "thank-you", "just-because"],
    recipient: ["her", "friends", "parents"], style: ["self-care", "wellness", "minimal"],
    personality: ["self-care", "minimalist"], tags: ["Bestseller", "Self care"],
    contents: ["Cold-pressed botanical soap", "Soy wax candle", "Herbal tea in a tin", "Muslin face cloth", "Handwritten note"],
    idealFor: ["Birthdays", "Thank-yous", "Just because"], customisable: true, featured: true, bestseller: true,
    art: { tone: "sage", box: "ivory", items: ["soap", "candle", "tin", "flowers"] },
  }),
  make({
    id: "gd-003", sku: "GD-003", name: "The Love Box", created: "2026-02-01",
    shortDescription: "Everything a quiet, romantic evening needs.",
    description:
      "A romantic edit for anniversaries and Valentine's: dark chocolates, a fragrant candle, dried flowers and a letter-style card, arranged in a blush-and-rose box tied with a satin bow.",
    startingPrice: 2799, category: "couple-hampers", occasion: ["anniversary", "valentines", "just-because"],
    recipient: ["couples", "her", "him"], style: ["personalised", "food-treats", "cute"],
    personality: ["sentimental", "foodie"], tags: ["Romantic", "Anniversary"],
    contents: ["Dark chocolate truffles", "Rose-amber candle", "Dried flower posy", "Love-letter card", "Satin-ribbon rose box"],
    idealFor: ["Anniversaries", "Valentine's Day", "Date nights"], customisable: true, featured: true,
    art: { tone: "rose", box: "blush", items: ["flowers", "chocolates", "candle", "card"] },
  }),
  make({
    id: "gd-004", sku: "GD-004", name: "The Luxe Hamper", created: "2026-02-10",
    shortDescription: "Rare finds, generously presented.",
    description:
      "Our most generous hamper. Single-estate preserves, artisanal chocolates, a fine fragrance candle and a bottle of premium sparkling juice, presented in a rigid black keepsake box with gold foiling.",
    startingPrice: 7999, category: "luxury-hampers", occasion: ["anniversary", "wedding", "congratulations", "corporate"],
    recipient: ["parents", "couples", "clients"], style: ["luxury", "food-treats"],
    personality: ["luxury-lover", "foodie"], tags: ["Luxury", "Statement gift"],
    contents: ["Premium sparkling juice", "Single-estate preserve", "Artisanal chocolate collection", "Luxury fragrance candle", "Gold-foiled rigid box"],
    idealFor: ["Weddings", "Milestone anniversaries", "VIP clients"], customisable: true, featured: true,
    art: { tone: "charcoal", box: "charcoal", items: ["bottle", "tin", "candle", "chocolates"] },
  }),
  make({
    id: "gd-005", sku: "GD-005", name: "The Corporate Classic", created: "2026-02-18",
    shortDescription: "A polished, no-fuss hamper for teams and clients.",
    description:
      "Understated and well made. Desk-friendly essentials and gourmet snacks in a clean kraft-and-charcoal box, with space for your logo and a custom message. Available in bulk with consistent quality.",
    startingPrice: 1499, category: "corporate-hampers", occasion: ["corporate", "festive", "thank-you"],
    recipient: ["colleagues", "clients", "employees"], style: ["minimal", "personalised"],
    personality: ["minimalist", "tech-lover"], tags: ["Bestseller", "Bulk friendly", "Corporate"],
    contents: ["Hardbound notebook", "Ceramic mug", "Gourmet snack tin", "Logo-branded sleeve", "Greeting card"],
    idealFor: ["Client gifting", "Employee appreciation", "Festive gifting"], customisable: true, bestseller: true,
    customisationOptions: ["Logo branding", "Custom message card", "Bulk quantities from 25", "Budget-based variations"],
    art: { tone: "charcoal", box: "champagne", items: ["notebook", "mug", "tin", "card"] },
  }),
  make({
    id: "gd-006", sku: "GD-006", name: "The Wellness Box", created: "2026-02-25",
    shortDescription: "Small rituals for a calmer week.",
    description:
      "Thoughtfully chosen for anyone who needs a pause: herbal teas, a gratitude journal, a calming balm and a candle that smells like first rain. Wrapped in recycled, plantable-seed paper.",
    startingPrice: 2999, category: "self-care-boxes", occasion: ["birthday", "thank-you", "new-beginnings"],
    recipient: ["her", "him", "parents", "friends"], style: ["wellness", "self-care", "minimal"],
    personality: ["self-care", "minimalist"], tags: ["Wellness", "Calming"],
    contents: ["Assorted herbal tea tin", "Gratitude journal", "Calming balm", "Petrichor soy candle", "Plantable seed card"],
    idealFor: ["Get-well wishes", "Birthdays", "New beginnings"], customisable: true,
    art: { tone: "sage", box: "sage", items: ["tin", "notebook", "candle", "soap"] },
  }),
  make({
    id: "gd-007", sku: "GD-007", name: "The Sweet Moments Box", created: "2026-03-03",
    shortDescription: "Chocolates, cookies and a smile in a box.",
    description:
      "A cheerful little box of handmade cookies, truffles and a tiny bouquet of dried blooms. Easy to send, impossible to forget. Our favourite way to say 'thinking of you' without the fuss.",
    startingPrice: 799, category: "birthday-boxes", occasion: ["birthday", "congratulations", "just-because"],
    recipient: ["friends", "her", "colleagues"], style: ["cute", "food-treats"],
    personality: ["foodie"], tags: ["Treats", "Under ₹1,000"],
    contents: ["Hand-baked cookies", "Chocolate truffles", "Mini dried bouquet", "Handwritten tag"],
    idealFor: ["Birthdays", "Small celebrations", "Last-minute gifts"], customisable: false,
    art: { tone: "blush", box: "blush", items: ["chocolates", "flowers", "card"] },
  }),
  make({
    id: "gd-008", sku: "GD-008", name: "The Birthday Edit", created: "2026-03-10",
    shortDescription: "Everything a birthday needs, thoughtfully edited.",
    description:
      "A fuller birthday gift: a keepsake mug, a hand-poured candle, gourmet chocolate, a personalised card and a small surprise that changes every season. Packed with confetti-free, fuss-free elegance.",
    startingPrice: 3499, category: "birthday-boxes", occasion: ["birthday"],
    recipient: ["her", "him", "friends", "parents"], style: ["personalised", "cute", "food-treats"],
    personality: ["sentimental", "foodie"], tags: ["Birthday", "Personalised"],
    contents: ["Keepsake ceramic mug", "Hand-poured candle", "Gourmet chocolate bar set", "Personalised birthday card", "Seasonal surprise"],
    idealFor: ["Birthdays", "Milestone birthdays"], customisable: true, featured: true,
    art: { tone: "champagne", box: "blush", items: ["mug", "candle", "chocolates", "card"] },
  }),
  make({
    id: "gd-009", sku: "GD-009", name: "The Couple's Box", created: "2026-03-17",
    shortDescription: "A shared evening, curated for two.",
    description:
      "Two of everything, deliberately. Matching ceramic mugs, a sharing chocolate board, tea for two and a conversation-starter card deck. A gift for couples, for newlyweds, or for anyone who wants to be one.",
    startingPrice: 4499, category: "couple-hampers", occasion: ["anniversary", "wedding", "valentines"],
    recipient: ["couples"], style: ["experiences", "personalised"],
    personality: ["sentimental", "foodie"], tags: ["For two", "Anniversary"],
    contents: ["Matching ceramic mug pair", "Sharing chocolate board", "Tea for two", "Conversation card deck", "Linen-wrapped keepsake box"],
    idealFor: ["Anniversaries", "Newlyweds", "Housewarmings"], customisable: true,
    art: { tone: "rose", box: "ivory", items: ["mug", "chocolates", "tin", "card"] },
  }),
  make({
    id: "gd-010", sku: "GD-010", name: "The Thank You Box", created: "2026-03-24",
    shortDescription: "Gratitude, said properly.",
    description:
      "A warm, generous way to say thank you to a mentor, a host or a friend who showed up. Gourmet snacks, a pot of honey and a handwritten note, simply and beautifully presented.",
    startingPrice: 999, category: "thank-you-boxes", occasion: ["thank-you", "congratulations"],
    recipient: ["friends", "colleagues", "parents"], style: ["minimal", "food-treats"],
    personality: ["foodie", "minimalist"], tags: ["Thank you", "Under ₹1,000"],
    contents: ["Wildflower honey jar", "Artisanal biscuits", "Fresh-brew tea sachets", "Handwritten thank-you note"],
    idealFor: ["Hosts", "Mentors", "Teachers"], customisable: true,
    art: { tone: "ivory", box: "champagne", items: ["jar", "tin", "card", "flowers"] },
  }),
  make({
    id: "gd-011", sku: "GD-011", name: "The Festive Edit", created: "2026-08-02",
    shortDescription: "Festival warmth, beautifully shared.",
    description:
      "A festive hamper with dry fruits, nuts, hand-poured diya candles and sweet treats, presented in a gold-trimmed box. Made for Diwali, Christmas, Eid and every family gathering in between.",
    startingPrice: 2499, category: "festive-hampers", occasion: ["festive", "corporate", "thank-you"],
    recipient: ["parents", "friends", "clients", "colleagues"], style: ["food-treats", "luxury"],
    personality: ["foodie", "luxury-lover"], tags: ["Bestseller", "Festive"],
    contents: ["Premium dry fruit assortment", "Spiced nut mix", "Hand-poured diya candles", "Festive sweets box", "Gold-trimmed gift box"],
    idealFor: ["Diwali", "Christmas", "Eid", "Family gifting"], customisable: true, featured: true, bestseller: true,
    art: { tone: "cocoa", box: "champagne", items: ["tin", "jar", "candle", "chocolates"] },
  }),
  make({
    id: "gd-012", sku: "GD-012", name: "The Minimalist Gift", created: "2026-04-05",
    shortDescription: "Quiet, considered, effortlessly stylish.",
    description:
      "For people who prefer fewer, better things. One beautifully made candle, a linen-bound notebook and a bar of small-batch chocolate, in a plain ivory box with a single ribbon.",
    startingPrice: 1299, category: "birthday-boxes", occasion: ["birthday", "just-because", "congratulations"],
    recipient: ["her", "him", "colleagues"], style: ["minimal"],
    personality: ["minimalist", "luxury-lover"], tags: ["Minimal"],
    contents: ["Single-wick soy candle", "Linen-bound notebook", "Small-batch chocolate bar", "Plain ivory box"],
    idealFor: ["Birthdays", "Housewarmings", "Design lovers"], customisable: false,
    art: { tone: "ivory", box: "ivory", items: ["candle", "notebook", "chocolates"] },
  }),
  make({
    id: "gd-013", sku: "GD-013", name: "The Gourmet Box", created: "2026-04-12",
    shortDescription: "For people who plan their holidays around lunch.",
    description:
      "A well-stocked box for food lovers: olive oil infused with herbs, handmade preserves, artisanal crackers, a block of dark chocolate and a premium tea selection.",
    startingPrice: 3999, category: "luxury-hampers", occasion: ["birthday", "anniversary", "festive", "thank-you"],
    recipient: ["parents", "friends", "couples"], style: ["food-treats", "luxury"],
    personality: ["foodie", "luxury-lover"], tags: ["Gourmet", "Foodie"],
    contents: ["Herb-infused olive oil", "Handmade fruit preserve", "Artisanal crackers", "Dark chocolate block", "Premium tea selection"],
    idealFor: ["Food lovers", "Housewarmings", "Festive hosting"], customisable: true,
    art: { tone: "cocoa", box: "ivory", items: ["bottle", "jar", "tin", "chocolates"] },
  }),
  make({
    id: "gd-014", sku: "GD-014", name: "The New Beginnings Box", created: "2026-04-20",
    shortDescription: "For new homes, new jobs and new chapters.",
    description:
      "A hopeful hamper to mark a fresh start: a small potted plant, a candle for the first evening, a notebook for plans and a jar of honey to sweeten the days ahead.",
    startingPrice: 1999, category: "thank-you-boxes", occasion: ["new-beginnings", "congratulations"],
    recipient: ["friends", "colleagues", "parents", "couples"], style: ["wellness", "minimal"],
    personality: ["sentimental", "minimalist"], tags: ["Housewarming", "New chapter"],
    contents: ["Mini potted succulent", "Soy wax candle", "Notebook for new plans", "Wildflower honey", "Good-luck card"],
    idealFor: ["Housewarmings", "New jobs", "Welcoming a baby"], customisable: true,
    art: { tone: "sage", box: "ivory", items: ["flowers", "candle", "notebook", "jar"] },
  }),
  make({
    id: "gd-015", sku: "GD-015", name: "The Executive Hamper", created: "2026-04-28",
    shortDescription: "Quietly impressive. Made for the boardroom.",
    description:
      "A premium corporate hamper for leaders and key clients: a leather-bound notebook, a premium sipper, gourmet nuts, fine chocolate and a hand-finished presentation box with your branding.",
    startingPrice: 5999, category: "corporate-hampers", occasion: ["corporate", "congratulations", "festive"],
    recipient: ["clients", "colleagues"], style: ["luxury", "personalised"],
    personality: ["luxury-lover", "tech-lover"], tags: ["Corporate", "Premium", "Bulk friendly"],
    contents: ["Leather-bound notebook", "Insulated steel sipper", "Roasted gourmet nuts", "Fine chocolate collection", "Branded presentation box"],
    idealFor: ["Key clients", "Leadership gifting", "Annual milestones"], customisable: true,
    customisationOptions: ["Logo embossing", "Custom message card", "Bulk quantities from 25", "Budget-based variations"],
    art: { tone: "charcoal", box: "cocoa", items: ["notebook", "bottle", "tin", "chocolates"] },
  }),
  make({
    id: "gd-016", sku: "GD-016", name: "The Welcome Kit", created: "2026-05-05",
    shortDescription: "A first-day welcome they'll actually keep.",
    description:
      "Make new joiners feel expected. A branded notebook, a mug, a desk plant and a handwritten welcome card from the team, sent to their home or desk before day one.",
    startingPrice: 1799, category: "new-employee-kits", occasion: ["corporate", "new-beginnings"],
    recipient: ["employees", "colleagues"], style: ["personalised", "minimal"],
    personality: ["tech-lover", "minimalist"], tags: ["Onboarding", "Corporate", "Bulk friendly"],
    contents: ["Branded notebook", "Ceramic mug", "Desk succulent", "Welcome card from the team", "Branded gift box"],
    idealFor: ["Employee onboarding", "Internships", "Remote joiners"], customisable: true,
    customisationOptions: ["Logo branding", "Team-signed card", "Bulk quantities from 10", "Direct-to-home delivery"],
    art: { tone: "charcoal", box: "sage", items: ["notebook", "mug", "flowers", "card"] },
  }),
  make({
    id: "gd-017", sku: "GD-017", name: "The Bridesmaid Box", created: "2026-05-12",
    shortDescription: "A thank-you for the women who stood beside her.",
    description:
      "A beautiful 'will you be my bridesmaid' keepsake: a silk scrunchie, scented candle, rose body balm, a personalised card and a small mirror. Available in sets, with names on every card.",
    startingPrice: 1499, category: "bridesmaid-gifts", occasion: ["wedding"],
    recipient: ["her", "friends"], style: ["personalised", "cute", "self-care"],
    personality: ["sentimental", "self-care"], tags: ["Wedding", "Sets available"],
    contents: ["Silk scrunchie", "Rose body balm", "Scented candle", "Personalised card", "Compact mirror"],
    idealFor: ["Bridesmaid proposals", "Bridal showers", "Maids of honour"], customisable: true,
    customisationOptions: ["Names on every card", "Choice of colour palette", "Sets of 3, 5 or 8"],
    art: { tone: "blush", box: "rose", items: ["soap", "candle", "card", "flowers"] },
  }),
  make({
    id: "gd-018", sku: "GD-018", name: "The Shaadi Hamper", created: "2026-05-20",
    shortDescription: "Gifting worthy of the biggest day.",
    description:
      "A grand wedding hamper for the couple or the family: handcrafted sweets, dry fruits, a pair of brass diyas, a bottle of sparkling juice and a blessing card, in an ornate gold-trimmed trunk.",
    startingPrice: 6499, category: "wedding-hampers", occasion: ["wedding", "anniversary", "festive"],
    recipient: ["couples", "parents"], style: ["luxury", "food-treats"],
    personality: ["luxury-lover", "sentimental"], tags: ["Wedding", "Luxury"],
    contents: ["Handcrafted sweets", "Premium dry fruits", "Pair of brass diyas", "Sparkling juice", "Blessing card", "Gold-trimmed keepsake trunk"],
    idealFor: ["Wedding gifting", "Engagement ceremonies", "Family gifting"], customisable: true,
    art: { tone: "champagne", box: "cocoa", items: ["bottle", "tin", "candle", "flowers"] },
  }),
  make({
    id: "gd-019", sku: "GD-019", name: "The Build-Your-Own Hamper", created: "2026-06-01",
    shortDescription: "You choose the theme. We handle the rest.",
    description:
      "Tell us who it's for, your budget and the feeling you're after. Our gifting team curates a hamper around them, with your choice of products, packaging, message card and branding.",
    startingPrice: 1499, category: "custom-hampers", occasion: ["birthday", "anniversary", "wedding", "corporate", "just-because"],
    recipient: ["her", "him", "parents", "couples", "friends", "clients"], style: ["personalised", "experiences"],
    personality: ["sentimental", "luxury-lover", "minimalist"], tags: ["Custom", "Made for them"],
    contents: ["Products chosen with you", "Your choice of packaging", "Personalised note", "Optional branding"],
    idealFor: ["Specific budgets", "Unusual requests", "Corporate branding"], customisable: true,
    customisationOptions: ["Choose occasion and budget", "Choose products", "Personalised note", "Packaging colour and finish", "Corporate branding"],
    art: { tone: "champagne", box: "ivory", items: ["card", "chocolates", "candle", "bottle"] },
  }),
  make({
    id: "gd-020", sku: "GD-020", name: "The Traveller's Edit", created: "2026-06-10",
    shortDescription: "For the one with a passport that's always out.",
    description:
      "A handsome gift for people who live out of a carry-on: a leather luggage tag, a compact journal, travel-size amenities, trail snacks and a handwritten bon-voyage card.",
    startingPrice: 2899, category: "birthday-boxes", occasion: ["birthday", "congratulations", "just-because"],
    recipient: ["him", "her", "friends", "colleagues"], style: ["experiences", "minimal"],
    personality: ["travel-lover", "tech-lover"], tags: ["Travel", "For him"],
    contents: ["Leather luggage tag", "Pocket travel journal", "Travel-size amenities", "Trail snack mix", "Bon-voyage card"],
    idealFor: ["Frequent flyers", "Farewells", "Birthdays"], customisable: true,
    art: { tone: "cocoa", box: "sage", items: ["notebook", "tin", "bottle", "card"] },
  }),
  make({
    id: "gd-021", sku: "GD-021", name: "The Desk Companion", created: "2026-06-18",
    shortDescription: "Make the workday feel a little more considered.",
    description:
      "A small, smart set for a better desk: a wireless charging pad, a ceramic mug, a premium notebook and a gourmet coffee sachet set, in a slim, minimal box.",
    startingPrice: 2499, category: "corporate-hampers", occasion: ["birthday", "corporate", "congratulations"],
    recipient: ["colleagues", "him", "her", "employees"], style: ["minimal"],
    personality: ["tech-lover", "minimalist"], tags: ["Tech", "Workspace"],
    contents: ["Wireless charging pad", "Ceramic mug", "Premium notebook", "Gourmet coffee sachets"],
    idealFor: ["Work anniversaries", "Promotions", "Colleagues"], customisable: true,
    art: { tone: "charcoal", box: "ivory", items: ["mug", "notebook", "tin"] },
  }),
  make({
    id: "gd-022", sku: "GD-022", name: "The Little Thank You", created: "2026-07-01",
    shortDescription: "A small gesture that lands beautifully.",
    description:
      "Compact, sweet and ready to go: a handmade chocolate bar, a mini candle and a handwritten card in a ribboned kraft sleeve. Brilliant for return gifts, teachers and teammates.",
    startingPrice: 449, category: "thank-you-boxes", occasion: ["thank-you", "just-because", "congratulations"],
    recipient: ["friends", "colleagues"], style: ["cute", "minimal"],
    personality: ["foodie", "minimalist"], tags: ["Under ₹500", "Return gift"],
    contents: ["Handmade chocolate bar", "Mini scented candle", "Handwritten card", "Ribboned kraft sleeve"],
    idealFor: ["Teachers", "Return gifts", "Teammates"], customisable: false,
    art: { tone: "ivory", box: "blush", items: ["chocolates", "candle", "card"] },
  }),
  make({
    id: "gd-023", sku: "GD-023", name: "The Diwali Gathering", created: "2026-08-20",
    shortDescription: "Light, sweetness and a table full of family.",
    description:
      "A festive hamper made for sharing. Assorted mithai, roasted nuts, a pair of scented diyas and a decorative torana, packed in a rich cocoa-and-gold box that looks lovely on any festive table.",
    startingPrice: 3299, category: "festive-hampers", occasion: ["festive"],
    recipient: ["parents", "friends", "clients"], style: ["food-treats", "luxury"],
    personality: ["foodie", "sentimental", "luxury-lover"], tags: ["Diwali", "Festive", "Sharing"],
    contents: ["Assorted mithai box", "Roasted spiced nuts", "Scented diya pair", "Mini torana", "Cocoa-and-gold gift box"],
    idealFor: ["Diwali", "Family gifting", "Festive visits"], customisable: true,
    art: { tone: "cocoa", box: "champagne", items: ["tin", "candle", "jar", "flowers"] },
  }),
];

export const allProducts: Product[] = products;
