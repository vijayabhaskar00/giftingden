import type { ArtSpec, Faq, Review } from "../types";

/** Sample testimonials. Replace with real customer reviews before launch. */
export const reviews: Review[] = [
  { id: "r1", name: "Priya", city: "Bengaluru", rating: 5, occasion: "Birthday", quote: "Beautiful packaging and even better than expected. My sister cried a little, in the best way." },
  { id: "r2", name: "Arjun", city: "Mumbai", rating: 5, occasion: "Anniversary", quote: "I had no idea what to get. They asked three questions on WhatsApp and put together something perfect." },
  { id: "r3", name: "Meera", city: "Hyderabad", rating: 5, occasion: "Corporate", quote: "We sent 60 hampers to clients. Consistent, on time, and several people wrote back to thank us." },
  { id: "r4", name: "Sana", city: "Delhi", rating: 5, occasion: "Wedding", quote: "The bridesmaid boxes were the highlight of my bridal shower. Every card had a name on it." },
  { id: "r5", name: "Karthik", city: "Chennai", rating: 5, occasion: "Thank You", quote: "Felt personal, not shop-bought. My mentor still has the note on her desk." },
];

export const faqs: Faq[] = [
  { question: "Do you deliver across India?", answer: "Yes. We deliver to most pin codes across India. Delivery time and charges depend on your location, so share your pin code on WhatsApp and we'll confirm straight away." },
  { question: "How can I place an order?", answer: "Tap 'Enquire on WhatsApp' on any gift. We'll confirm availability, final pricing, delivery date and payment details in the chat. There's no cart or online checkout." },
  { question: "Can I customise a gift package?", answer: "Absolutely. You can swap items, choose packaging, add a personalised message or build a hamper from scratch with our team. Start at our Custom Gifts page or message us directly." },
  { question: "Can I add a personal message?", answer: "Yes. Every gift can carry a handwritten or printed message card. Just share your message and the recipient's name when you enquire." },
  { question: "Do you offer corporate gifting?", answer: "Yes. We create employee onboarding kits, client hampers, festive gifts and event giveaways, with custom branding and packaging. Visit our Corporate Gifting page to get started." },
  { question: "Do you accept bulk orders?", answer: "We do, from small team orders to several hundred hampers. Bulk orders benefit from tailored pricing and a sample for approval. Tell us your quantity and date on WhatsApp." },
  { question: "How long does delivery take?", answer: "Most orders arrive within 3–5 working days. Express and same-day delivery can be arranged in select cities. Custom and bulk orders need a little more lead time." },
  { question: "Can I request a specific budget?", answer: "Yes, and we encourage it. Tell us your budget and who the gift is for, and we'll recommend what works best within it." },
  { question: "How do I contact Giftingden?", answer: "WhatsApp is the fastest way and our team replies during business hours. You can also email us or message us on Instagram." },
];

/** Moments grid. Placeholders until real UGC is linked. */
export const instagramMoments: { alt: string; art: ArtSpec; variant: "box" | "flatlay" | "detail" | "wrapped" }[] = [
  { alt: "A blush birthday box with ribbon", art: { tone: "blush", items: ["chocolates", "candle", "card"] }, variant: "box" },
  { alt: "Flat lay of a self-care hamper", art: { tone: "sage", items: ["soap", "candle", "tin"] }, variant: "flatlay" },
  { alt: "Close-up of a hand-poured candle", art: { tone: "champagne", items: ["candle", "flowers"] }, variant: "detail" },
  { alt: "Corporate hampers stacked and ready", art: { tone: "charcoal", items: ["notebook", "mug", "tin"] }, variant: "wrapped" },
  { alt: "Rose-toned anniversary box", art: { tone: "rose", items: ["flowers", "chocolates", "candle"] }, variant: "box" },
  { alt: "Festive hamper with brass diyas", art: { tone: "cocoa", items: ["tin", "candle", "jar"] }, variant: "flatlay" },
  { alt: "Handwritten card detail", art: { tone: "ivory", items: ["card", "flowers"] }, variant: "detail" },
  { alt: "Signature Giftingden packaging", art: { tone: "ivory", box: "champagne", items: ["card", "soap"] }, variant: "wrapped" },
  { alt: "Thank-you box with honey jar", art: { tone: "sage", items: ["jar", "tin", "card"] }, variant: "box" },
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
  { title: "Choose the occasion", text: "Birthday, wedding, thank-you, or something only you know about." },
  { title: "Set your budget", text: "From a ₹1,500 hamper to a ₹25,000 statement gift." },
  { title: "Choose the products", text: "Pick from our curated range or let us suggest what suits them." },
  { title: "Add a personal note", text: "A handwritten or printed message, in your words." },
  { title: "Choose the packaging", text: "Colours, ribbons and finishes to match the moment." },
  { title: "Add your branding", text: "Optional logo and message for corporate gifting." },
];

export const aboutValues = [
  { title: "Thoughtfulness first", text: "We start with the person receiving the gift, never the product catalogue." },
  { title: "Personal, not generic", text: "Names, notes and little details turn a gift into a memory." },
  { title: "Beautifully presented", text: "Packaging is part of the gift. We treat it that way." },
  { title: "Human, always", text: "You'll chat with a real person who cares whether it arrives perfectly." },
];
