import { photoUrl, type PhotoKey } from "../photos";
import type {
  ArtSpec, CategorySlug, OccasionSlug, PersonalitySlug, PriceBandSlug, RecipientSlug, StyleSlug, Taxon,
} from "../types";

type T<S extends string> = Taxon & { slug: S };

export const categories: T<CategorySlug>[] = [
  { slug: "birthday-boxes", name: "Birthday Boxes", description: "Little celebrations, beautifully boxed." },
  { slug: "self-care-boxes", name: "Self-Care Boxes", description: "Permission to slow down, wrapped up." },
  { slug: "couple-hampers", name: "Couple Hampers", description: "For two people and one very good evening." },
  { slug: "corporate-hampers", name: "Corporate Hampers", description: "Considered gifting for teams and clients." },
  { slug: "luxury-hampers", name: "Luxury Hampers", description: "Rare finds, generously presented." },
  { slug: "festive-hampers", name: "Festive Hampers", description: "Festival gifting with warmth and sparkle." },
  { slug: "bridesmaid-gifts", name: "Bridesmaid Gifts", description: "A thank-you for the ones who stood beside her." },
  { slug: "wedding-hampers", name: "Wedding Hampers", description: "Gifts worthy of the biggest day." },
  { slug: "new-employee-kits", name: "New Employee Kits", description: "A first-day welcome they'll keep." },
  { slug: "thank-you-boxes", name: "Thank You Boxes", description: "Gratitude, said properly." },
  { slug: "custom-hampers", name: "Custom Hampers", description: "Built around them. Entirely yours to shape." },
];

export const occasions: T<OccasionSlug>[] = [
  { slug: "birthday", name: "Birthday", emoji: "🎂", description: "Make their day unforgettable." },
  { slug: "anniversary", name: "Anniversary", emoji: "💍", description: "Honour the years, big and small." },
  { slug: "wedding", name: "Wedding", emoji: "💒", description: "Gifts for the couple, the family and the bridal party." },
  { slug: "congratulations", name: "Congratulations", emoji: "🎉", description: "For wins worth celebrating out loud." },
  { slug: "valentines", name: "Valentine's", emoji: "❤️", description: "Say it with something they can hold." },
  { slug: "festive", name: "Festive", emoji: "🎁", description: "Diwali, Raksha Bandhan, Christmas and more." },
  { slug: "corporate", name: "Corporate", emoji: "🏢", description: "Gifting that reflects well on your brand." },
  { slug: "thank-you", name: "Thank You", emoji: "🌸", description: "Because 'thanks' deserves a little more." },
  { slug: "new-beginnings", name: "New Beginnings", emoji: "👶", description: "New homes, new jobs, new babies." },
  { slug: "just-because", name: "Just Because", emoji: "✨", description: "No reason needed. That's the point." },
];

export const recipients: T<RecipientSlug>[] = [
  { slug: "her", name: "For Her", description: "Gifts she'll actually use and love." },
  { slug: "him", name: "For Him", description: "Thoughtful, never generic." },
  { slug: "parents", name: "For Parents", description: "Because they gave you everything." },
  { slug: "couples", name: "For Couples", description: "Shared moments, boxed up." },
  { slug: "friends", name: "For Friends", description: "For the people who show up." },
  { slug: "colleagues", name: "For Colleagues", description: "Warm without being awkward." },
  { slug: "clients", name: "For Clients", description: "A relationship, acknowledged." },
  { slug: "employees", name: "For Employees", description: "Make your people feel seen." },
];

export const styles: T<StyleSlug>[] = [
  { slug: "luxury", name: "Luxury", description: "Rare, rich, unhurried." },
  { slug: "minimal", name: "Minimal", description: "Quiet, considered, clean." },
  { slug: "cute", name: "Cute", description: "Playful details that make people smile." },
  { slug: "personalised", name: "Personalised", description: "Made specifically for them." },
  { slug: "self-care", name: "Self Care", description: "Rituals of rest." },
  { slug: "food-treats", name: "Food & Treats", description: "Sweet, savoury and shareable." },
  { slug: "wellness", name: "Wellness", description: "Balance, in a box." },
  { slug: "experiences", name: "Experiences", description: "Gifts that become memories." },
];

export const priceBands: (Taxon & { slug: PriceBandSlug; min: number; max: number })[] = [
  { slug: "under-500", name: "Under ₹500", description: "Small gestures, big feelings.", min: 0, max: 499 },
  { slug: "500-1000", name: "₹500 – ₹1,000", description: "Thoughtful, easy and lovely.", min: 500, max: 1000 },
  { slug: "1000-2500", name: "₹1,000 – ₹2,500", description: "Our most-gifted range.", min: 1001, max: 2500 },
  { slug: "2500-5000", name: "₹2,500 – ₹5,000", description: "Generous and beautifully presented.", min: 2501, max: 5000 },
  { slug: "5000-plus", name: "₹5,000+", description: "Statement gifting.", min: 5001, max: Infinity },
];

export const personalities: Taxon[] = [
  { slug: "minimalist", name: "Minimalist", description: "" },
  { slug: "luxury-lover", name: "Luxury Lover", description: "" },
  { slug: "foodie", name: "Foodie", description: "" },
  { slug: "self-care", name: "Self-Care", description: "" },
  { slug: "tech-lover", name: "Tech Lover", description: "" },
  { slug: "travel-lover", name: "Travel Lover", description: "" },
  { slug: "sentimental", name: "Sentimental", description: "" },
];

const ph = (art: ArtSpec, key: PhotoKey): ArtSpec => ({ ...art, photo: photoUrl(key) });

/** Visual art for taxonomy cards (swap with photography via `src`). */
export const occasionArt: Record<OccasionSlug, ArtSpec> = {
  birthday: ph({ tone: "blush", items: ["chocolates", "candle", "card"] }, "birthday"),
  anniversary: ph({ tone: "rose", box: "ivory", items: ["flowers", "candle", "card"] }, "couple"),
  wedding: ph({ tone: "champagne", box: "ivory", items: ["flowers", "bottle", "card"] }, "wedding"),
  congratulations: ph({ tone: "sage", items: ["bottle", "chocolates", "card"] }, "gourmet"),
  valentines: ph({ tone: "rose", box: "cocoa", items: ["flowers", "chocolates", "candle"] }, "couple-close"),
  festive: ph({ tone: "cocoa", box: "champagne", items: ["tin", "jar", "candle"] }, "diwali-kraft"),
  corporate: ph({ tone: "charcoal", items: ["notebook", "mug", "tin"] }, "corporate"),
  "thank-you": ph({ tone: "ivory", items: ["flowers", "tin", "card"] }, "thanks"),
  "new-beginnings": ph({ tone: "sage", box: "ivory", items: ["candle", "jar", "card"] }, "employee-close"),
  "just-because": ph({ tone: "champagne", items: ["soap", "flowers", "chocolates"] }, "custom"),
};

export const categoryArt: Record<CategorySlug, ArtSpec> = {
  "birthday-boxes": ph({ tone: "blush", items: ["chocolates", "candle", "card"] }, "birthday"),
  "self-care-boxes": ph({ tone: "sage", items: ["soap", "candle", "tin"] }, "selfcare"),
  "couple-hampers": ph({ tone: "rose", items: ["bottle", "chocolates", "flowers"] }, "couple"),
  "corporate-hampers": ph({ tone: "charcoal", items: ["notebook", "mug", "tin"] }, "corporate"),
  "luxury-hampers": ph({ tone: "cocoa", box: "charcoal", items: ["bottle", "tin", "candle"] }, "luxury"),
  "festive-hampers": ph({ tone: "champagne", box: "cocoa", items: ["tin", "jar", "candle"] }, "diwali-kraft"),
  "bridesmaid-gifts": ph({ tone: "blush", box: "ivory", items: ["flowers", "soap", "card"] }, "bridesmaid"),
  "wedding-hampers": ph({ tone: "ivory", box: "champagne", items: ["flowers", "bottle", "tin"] }, "wedding"),
  "new-employee-kits": ph({ tone: "charcoal", box: "sage", items: ["notebook", "mug", "card"] }, "employee"),
  "thank-you-boxes": ph({ tone: "ivory", items: ["flowers", "jar", "card"] }, "thanks"),
  "custom-hampers": ph({ tone: "champagne", box: "ivory", items: ["card", "chocolates", "candle"] }, "custom"),
};

/** Homepage "Shop by occasion" tiles. Each links to a collection. */
export interface OccasionTile { name: string; description: string; href: string; art: ArtSpec }
export const homeOccasionTiles: OccasionTile[] = [
  { name: "Birthday", description: "Make their day unforgettable.", href: "/occasions/birthday", art: occasionArt.birthday },
  { name: "Anniversary", description: "Honour the years, big and small.", href: "/occasions/anniversary", art: occasionArt.anniversary },
  { name: "Wedding", description: "For the couple and the people beside them.", href: "/occasions/wedding", art: occasionArt.wedding },
  { name: "Corporate", description: "Gifting that reflects well on your brand.", href: "/corporate-gifting", art: occasionArt.corporate },
  { name: "Festive", description: "Warmth and sparkle for every festival.", href: "/occasions/festive", art: occasionArt.festive },
  { name: "For Her", description: "Gifts she'll actually use and love.", href: "/gifts?recipient=her", art: ph({ tone: "rose", items: ["flowers", "soap", "candle"] }, "selfcare") },
  { name: "For Him", description: "Thoughtful, never generic.", href: "/gifts?recipient=him", art: ph({ tone: "cocoa", box: "charcoal", items: ["bottle", "notebook", "mug"] }, "luxury") },
  { name: "Thank You", description: "Because 'thanks' deserves more.", href: "/occasions/thank-you", art: occasionArt["thank-you"] },
  { name: "Congratulations", description: "For wins worth celebrating.", href: "/occasions/congratulations", art: occasionArt.congratulations },
  { name: "Just Because", description: "No reason needed. That's the point.", href: "/occasions/just-because", art: occasionArt["just-because"] },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getOccasion = (slug: string) => occasions.find((o) => o.slug === slug);
export const getRecipient = (slug: string) => recipients.find((r) => r.slug === slug);
export const getStyle = (slug: string) => styles.find((s) => s.slug === slug);
export const getPriceBand = (slug: string) => priceBands.find((b) => b.slug === slug);
export type { PersonalitySlug };
