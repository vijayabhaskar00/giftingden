import type { ArtSpec, Faq, Review } from "../types";

/** Sample testimonials. Replace with real client feedback (with permission) before launch. */
export const reviews: Review[] = [
  { id: "r1", name: "Meera", city: "Hyderabad", rating: 5, quote: "We sent 60 hampers to clients. Consistent, on time, and several people wrote back to thank us.", occasion: "Client gifting" },
  { id: "r2", name: "Arjun", city: "Mumbai", rating: 5, quote: "Our new-joiner kits now arrive before day one. The branding and packaging were spot on.", occasion: "Onboarding" },
  { id: "r3", name: "Priya", city: "Bengaluru", rating: 5, quote: "Diwali gifting for 200 people across five cities, handled without a single follow-up from our side.", occasion: "Festive gifting" },
  { id: "r4", name: "Karthik", city: "Chennai", rating: 5, quote: "They asked three questions on WhatsApp, shared a mock-up the same day and stuck to our budget.", occasion: "Conference" },
  { id: "r5", name: "Sana", city: "Delhi", rating: 5, quote: "Beautiful packaging, and the handwritten notes made it feel personal, not procured.", occasion: "Appreciation" },
];

export const faqs: Faq[] = [
  { question: "What is the minimum order quantity?", answer: "Branded and customised hampers start at 25 units. Ready-to-ship hampers can be ordered in smaller quantities. Share your count on WhatsApp and we'll confirm." },
  { question: "Can you add our logo and branding?", answer: "Yes. We can brand the box, sleeve, message card and select products with your logo and colours. We share a mock-up for approval before production." },
  { question: "How do I place a corporate order?", answer: "Tap 'Talk to Our Corporate Gifting Team' or fill the enquiry form. We'll reply on WhatsApp with options, a quote and a mock-up. There's no online checkout." },
  { question: "Do you deliver across India, to multiple addresses?", answer: "Yes. We deliver to most pin codes across India, to a single address or to many. Share a spreadsheet of addresses and we'll handle dispatch and tracking." },
  { question: "How much lead time do you need?", answer: "Ready hampers usually ship in 3–5 working days. Branded and bulk orders typically need 7–10 working days. For Diwali and year-end, we recommend ordering 3–4 weeks ahead." },
  { question: "Can you work within our budget per gift?", answer: "Yes. Tell us your per-gift budget and we'll build or adjust a hamper to fit it, from under ₹1,000 giveaways to ₹6,000+ executive gifts." },
  { question: "Can each hamper carry a personalised message or name?", answer: "Yes. We can print your message on every card, or add individual recipient names. Send the list and we'll match them to each hamper." },
  { question: "Do you provide GST invoices?", answer: "Yes. Share your company name and GSTIN when you confirm the order and we'll issue a GST invoice." },
  { question: "How do I contact Gifthut?", answer: "WhatsApp is the fastest way and our team replies during business hours. You can also email us or message us on Instagram." },
];

/** Moments grid. Placeholders until real UGC is linked. */
export const instagramMoments: { alt: string; art: ArtSpec; variant: "box" | "flatlay" | "detail" | "wrapped" }[] = [
  { alt: "A recognition hamper with ribbon", art: { tone: "blush", items: ["chocolates", "candle", "card"] }, variant: "box" },
  { alt: "Flat lay of a wellness hamper", art: { tone: "sage", items: ["soap", "candle", "tin"] }, variant: "flatlay" },
  { alt: "Close-up of a hand-poured candle", art: { tone: "champagne", items: ["candle", "flowers"] }, variant: "detail" },
  { alt: "Corporate hampers stacked and ready", art: { tone: "charcoal", items: ["notebook", "mug", "tin"] }, variant: "wrapped" },
  { alt: "Work anniversary box", art: { tone: "rose", items: ["flowers", "chocolates", "candle"] }, variant: "box" },
  { alt: "Festive hamper with brass diyas", art: { tone: "cocoa", items: ["tin", "candle", "jar"] }, variant: "flatlay" },
  { alt: "Handwritten card detail", art: { tone: "ivory", items: ["card", "flowers"] }, variant: "detail" },
  { alt: "Signature Gifthut packaging", art: { tone: "ivory", box: "champagne", items: ["card", "soap"] }, variant: "wrapped" },
  { alt: "Partner thank-you box with honey jar", art: { tone: "sage", items: ["jar", "tin", "card"] }, variant: "box" },
];

export const corporateUseCases = [
  { title: "Employee onboarding", text: "Welcome kits that arrive before day one, so new joiners feel expected." },
  { title: "Employee appreciation", text: "Work anniversaries, promotions and milestones, acknowledged with care." },
  { title: "Client gifting", text: "Considered hampers that strengthen relationships and reflect your brand." },
  { title: "Festive gifting", text: "Diwali, year-end and festival hampers, delivered on schedule at scale." },
  { title: "Conference gifts", text: "Delegate kits and speaker gifts that people take home and actually use." },
  { title: "Event gifting", text: "Launches, offsites and celebrations with gifts tailored to the occasion." },
  { title: "Custom branded hampers", text: "Your logo, your colours and your message, on every box." },
  { title: "Bulk gifting", text: "Tailored pricing and consistent quality from 25 to several hundred hampers." },
];

export const corporateServices = [
  { title: "Bulk orders", text: "Quantities from 25 to 500+, with samples for approval." },
  { title: "Custom packaging", text: "Rigid boxes, sleeves and ribbons in your brand palette." },
  { title: "Branding", text: "Logo embossing, printed cards and branded inserts." },
  { title: "Personalisation", text: "Individual names and notes, for every recipient." },
  { title: "Budget-based packages", text: "Tell us your per-hamper budget and we'll build around it." },
];

export const corporateProcess = [
  { step: "01", title: "Share your brief", text: "Tell us your occasion, quantity, budget and date on WhatsApp." },
  { step: "02", title: "We curate options", text: "Within 24 hours you'll receive tailored hamper suggestions and quotes." },
  { step: "03", title: "Approve a sample", text: "See and approve a sample or mock-up before we begin production." },
  { step: "04", title: "Delivered, beautifully", text: "We pack, brand and deliver to one address or many." },
];

export const customSteps = [
  { title: "Share your brief", text: "Occasion, audience, quantity and the feeling you want to create." },
  { title: "Set a budget per gift", text: "From ₹449 giveaways to ₹7,999+ executive hampers." },
  { title: "Choose the products", text: "Pick from our curated range or let us recommend what suits your people." },
  { title: "Add your branding", text: "Logo, brand colours and a message in your own words." },
  { title: "Approve a mock-up", text: "See the box, sleeve and card before anything goes into production." },
  { title: "We pack and deliver", text: "To one address or many, with tracking shared on WhatsApp." },
];

export const aboutValues = [
  { title: "Thoughtfulness first", text: "We start with the person receiving the gift, never the product catalogue." },
  { title: "Brand-true", text: "Your logo, colours and tone, carried through the box, the card and the note." },
  { title: "Reliable at scale", text: "The 200th hamper is packed with the same care as the first, and arrives on time." },
  { title: "Human, always", text: "You'll chat with a real person who cares whether it arrives perfectly." },
];
