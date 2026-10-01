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
  | "birthday-boxes" | "self-care-boxes" | "couple-hampers" | "corporate-hampers"
  | "luxury-hampers" | "festive-hampers" | "bridesmaid-gifts" | "wedding-hampers"
  | "new-employee-kits" | "thank-you-boxes" | "custom-hampers";

export type OccasionSlug =
  | "birthday" | "anniversary" | "wedding" | "congratulations" | "valentines"
  | "festive" | "corporate" | "thank-you" | "new-beginnings" | "just-because";

export type RecipientSlug =
  | "her" | "him" | "parents" | "couples" | "friends" | "colleagues" | "clients" | "employees";

export type StyleSlug =
  | "luxury" | "minimal" | "cute" | "personalised" | "self-care" | "food-treats" | "wellness" | "experiences";

export type PersonalitySlug =
  | "minimalist" | "luxury-lover" | "foodie" | "self-care" | "tech-lover" | "travel-lover" | "sentimental";

export type PriceBandSlug = "under-500" | "500-1000" | "1000-2500" | "2500-5000" | "5000-plus";

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
  personality: PersonalitySlug[];
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
  personality?: string;
}

export interface Recommendation {
  product: Product;
  score: number;
  reasons: string[];
}
