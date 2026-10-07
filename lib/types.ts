export type ToneKey = "ivory" | "rose" | "sage" | "champagne" | "charcoal" | "cocoa" | "blush";
export type ArtItem =
  | "candle" | "chocolates" | "card" | "jar" | "bottle" | "tin"
  | "mug" | "flowers" | "notebook" | "soap";

/** Procedural placeholder art. Swap for real photography by setting `src`. */
export interface ArtSpec {
  tone: ToneKey;
  box?: ToneKey;
  items: ArtItem[];
  /** Optional photograph. When set it replaces the illustration. */
  photo?: string;
}

export type ImageVariant = "box" | "flatlay" | "detail" | "wrapped";

export interface ProductImage {
  alt: string;
  /** Real photo path or URL. When absent the procedural art is rendered. */
  src?: string;
  art: ArtSpec;
  variant: ImageVariant;
}

export interface Taxon {
  slug: string;
  name: string;
  description: string;
  /** Emoji used in compact UI */
  emoji?: string;
}

export type CategorySlug =
  | "corporate-hampers" | "new-employee-kits" | "festive-hampers" | "luxury-hampers"
  | "thank-you-boxes" | "birthday-boxes" | "self-care-boxes" | "custom-hampers";

export type OccasionSlug =
  | "onboarding" | "appreciation" | "client-gifting" | "festive" | "new-year"
  | "milestones" | "events" | "thank-you";

export type RecipientSlug = "clients" | "employees" | "teams" | "leadership" | "partners" | "delegates";

export type StyleSlug = "premium" | "minimal" | "festive" | "branded" | "wellness" | "food-treats" | "tech";

export type PriceBandSlug = "under-1000" | "1000-2000" | "2000-3500" | "3500-6000" | "6000-plus";

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  /** Fixed price in whole currency units, when the package has one. */
  price: number | null;
  /** "Starting from" price for packages that scale with customisation. */
  startingPrice: number | null;
  currency: "INR";
  category: CategorySlug;
  occasion: OccasionSlug[];
  recipient: RecipientSlug[];
  style: StyleSlug[];
  tags: string[];
  images: ProductImage[];
  gallery: ProductImage[];
  contents: string[];
  idealFor: string[];
  deliveryInfo: string;
  customisable: boolean;
  customisationOptions: string[];
  featured: boolean;
  bestseller: boolean;
  active: boolean;
  /** Optional override for the pre-filled WhatsApp message. */
  whatsappMessage?: string;
  sku: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  name: string;
  city: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  occasion: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface FinderAnswers {
  recipient?: string;
  occasion?: string;
  budget?: string;
  quantity?: string;
}

export interface Recommendation {
  product: Product;
  score: number;
  reasons: string[];
}
