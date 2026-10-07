import { photoUrl, type PhotoKey } from "../photos";
import type {
  ArtSpec, CategorySlug, OccasionSlug, RecipientSlug, StyleSlug, Taxon,
} from "../types";

type T<S extends string> = Taxon & { slug: S };

export const categories: T<CategorySlug>[] = [
  { slug: "festive-hampers", name: "Diwali & Festive", description: "Diwali hampers for clients and teams, at scale." },
  { slug: "corporate-hampers", name: "Corporate Hampers", description: "Considered hampers for teams and clients." },
  { slug: "new-employee-kits", name: "Onboarding Kits", description: "A first-day welcome new joiners keep." },
  { slug: "luxury-hampers", name: "Executive & Premium", description: "Statement gifts for leaders and key accounts." },
  { slug: "thank-you-boxes", name: "Appreciation Gifts", description: "Thank clients, partners and teams properly." },
  { slug: "birthday-boxes", name: "Milestones & Recognition", description: "Work anniversaries, promotions and wins." },
  { slug: "self-care-boxes", name: "Wellness Gifting", description: "Wellbeing gifts for people-first companies." },
  { slug: "custom-hampers", name: "Branded & Custom", description: "Built around your brand, budget and brief." },
];

export const occasions: T<OccasionSlug>[] = [
  { slug: "festive", name: "Diwali & Festive Gifting", emoji: "🪔", description: "Diwali hampers, branded and delivered on schedule." },
  { slug: "onboarding", name: "Employee Onboarding", emoji: "👋", description: "Make day one feel expected." },
  { slug: "appreciation", name: "Employee Appreciation", emoji: "🌟", description: "Recognition people actually remember." },
  { slug: "client-gifting", name: "Client Gifting", emoji: "🤝", description: "Strengthen relationships with a considered gift." },
  { slug: "new-year", name: "New Year & Year-End", emoji: "🎆", description: "Close the year with gratitude." },
  { slug: "milestones", name: "Milestones & Recognition", emoji: "🏆", description: "Work anniversaries, promotions and big wins." },
  { slug: "events", name: "Events & Conferences", emoji: "🎤", description: "Delegate kits and speaker gifts people keep." },
  { slug: "thank-you", name: "Thank You & Partners", emoji: "🙏", description: "Say thanks to partners, vendors and hosts." },
];

export const recipients: T<RecipientSlug>[] = [
  { slug: "clients", name: "For Clients", description: "A relationship, acknowledged." },
  { slug: "employees", name: "For Employees", description: "Make your people feel seen." },
  { slug: "teams", name: "For Teams", description: "Shared appreciation, one box each." },
  { slug: "leadership", name: "For Leadership & VIPs", description: "Quietly impressive." },
  { slug: "partners", name: "For Partners & Vendors", description: "Thank the people behind the work." },
  { slug: "delegates", name: "For Event Delegates", description: "Take-home gifts with your brand on them." },
];

export const styles: T<StyleSlug>[] = [
  { slug: "premium", name: "Premium", description: "Rich, rare and generously presented." },
  { slug: "minimal", name: "Minimal", description: "Quiet, considered, on-brand." },
  { slug: "festive", name: "Festive", description: "Warm, celebratory and seasonal." },
  { slug: "branded", name: "Branded", description: "Your logo and message throughout." },
  { slug: "wellness", name: "Wellness", description: "Balance, in a box." },
  { slug: "food-treats", name: "Food & Treats", description: "Sweet, savoury and shareable." },
  { slug: "tech", name: "Desk & Tech", description: "Useful things for the workday." },
];

const ph = (art: ArtSpec, key: PhotoKey): ArtSpec => ({ ...art, photo: photoUrl(key) });

export const occasionArt: Record<OccasionSlug, ArtSpec> = {
  onboarding: ph({ tone: "charcoal", box: "sage", items: ["notebook", "mug", "card"] }, "employee"),
  appreciation: ph({ tone: "sage", items: ["soap", "candle", "tin"] }, "selfcare"),
  "client-gifting": ph({ tone: "charcoal", items: ["notebook", "mug", "tin"] }, "corporate"),
  festive: ph({ tone: "cocoa", box: "champagne", items: ["tin", "jar", "candle"] }, "diwali-kraft"),
  "new-year": ph({ tone: "champagne", box: "cocoa", items: ["tin", "candle", "chocolates"] }, "diwali-jute"),
  milestones: ph({ tone: "blush", items: ["chocolates", "candle", "card"] }, "birthday"),
  events: ph({ tone: "charcoal", box: "champagne", items: ["notebook", "tin", "card"] }, "corporate-stack"),
  "thank-you": ph({ tone: "ivory", items: ["flowers", "jar", "card"] }, "thanks"),
};

export const categoryArt: Record<CategorySlug, ArtSpec> = {
  "corporate-hampers": ph({ tone: "charcoal", items: ["notebook", "mug", "tin"] }, "corporate"),
  "new-employee-kits": ph({ tone: "charcoal", box: "sage", items: ["notebook", "mug", "card"] }, "employee"),
  "festive-hampers": ph({ tone: "champagne", box: "cocoa", items: ["tin", "jar", "candle"] }, "diwali-kraft"),
  "luxury-hampers": ph({ tone: "cocoa", box: "charcoal", items: ["bottle", "tin", "candle"] }, "luxury"),
  "thank-you-boxes": ph({ tone: "ivory", items: ["flowers", "jar", "card"] }, "thanks"),
  "birthday-boxes": ph({ tone: "blush", items: ["chocolates", "candle", "card"] }, "birthday"),
  "self-care-boxes": ph({ tone: "sage", items: ["soap", "candle", "tin"] }, "selfcare"),
  "custom-hampers": ph({ tone: "champagne", box: "ivory", items: ["card", "chocolates", "candle"] }, "custom"),
};

/** Homepage "gifting solutions" tiles. Each links to a collection. */
export interface OccasionTile { name: string; description: string; href: string; art: ArtSpec }
export const homeOccasionTiles: OccasionTile[] = occasions.map((o) => ({
  name: o.name, description: o.description, href: `/occasions/${o.slug}`, art: occasionArt[o.slug],
}));

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getOccasion = (slug: string) => occasions.find((o) => o.slug === slug);
export const getRecipient = (slug: string) => recipients.find((r) => r.slug === slug);
export const getStyle = (slug: string) => styles.find((s) => s.slug === slug);
