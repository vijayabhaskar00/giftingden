"use client";

import { Check } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { occasions } from "@/lib/data/taxonomy";
import { createCustomGiftWhatsAppMessage, sanitizeText } from "@/lib/whatsapp";
import { openWhatsAppChat } from "@/lib/whatsapp-client";
import { SelectField, TextArea, TextField } from "./Field";
import { useWhatsAppForm } from "./useWhatsAppForm";

const BUDGETS = ["Under ₹1,000", "₹1,000 – ₹2,000", "₹2,000 – ₹3,500", "₹3,500 – ₹6,000", "₹6,000+"];
const QUANTITIES = ["Under 25", "25 – 50", "50 – 100", "100 – 250", "250+"];
const RECIPIENTS = ["Clients", "Employees", "New joiners", "Leadership & VIPs", "Partners & vendors", "Event delegates"];
const PACKAGING = ["Signature ivory box", "Charcoal & kraft box", "Luxe rigid box", "Eco kraft & ribbon", "Match our brand colours"];

export default function CustomGiftForm() {
  const { values, errors, set, submit, sent } = useWhatsAppForm(
    { company: "", occasion: "", budget: "", quantity: "", recipient: "", packaging: "", note: "", branding: true as boolean },
    (v) => ({
      ...(sanitizeText(v.company, 100).length < 2 && { company: "Please enter your company name." }),
      ...(!v.occasion && { occasion: "Please choose an occasion." }),
      ...(!v.budget && { budget: "Please choose a budget per gift." }),
    }),
    (v) => openWhatsAppChat(createCustomGiftWhatsAppMessage({ ...v }), { source: "custom_gift_form", extraEvent: "custom_gift_enquiry" }),
  );

  return (
    <form onSubmit={submit} noValidate aria-label="Custom branded hamper brief" className="grid gap-5 sm:grid-cols-2">
      <div className="sm:col-span-2"><TextField id="company" label="Company" required autoComplete="organization" maxLength={100} value={values.company} onChange={(e) => set("company", e.target.value)} error={errors.company} /></div>
      <SelectField id="occasion" label="Occasion" required options={occasions.map((o) => o.name)} value={values.occasion} onChange={(e) => set("occasion", e.target.value)} error={errors.occasion} />
      <SelectField id="recipient" label="Who is it for?" options={RECIPIENTS} value={values.recipient} onChange={(e) => set("recipient", e.target.value)} />
      <SelectField id="budget" label="Budget per gift" required options={BUDGETS} value={values.budget} onChange={(e) => set("budget", e.target.value)} error={errors.budget} />
      <SelectField id="quantity" label="Approx. quantity" options={QUANTITIES} value={values.quantity} onChange={(e) => set("quantity", e.target.value)} />
      <div className="sm:col-span-2"><SelectField id="packaging" label="Packaging" options={PACKAGING} value={values.packaging} onChange={(e) => set("packaging", e.target.value)} /></div>
      <div className="sm:col-span-2"><TextArea id="note" label="Brief or message for the card" maxLength={400} hint="Delivery date, number of addresses, brand guidelines, anything we should know." value={values.note} onChange={(e) => set("note", e.target.value)} /></div>
      <label className="flex cursor-pointer items-center gap-3 text-sm sm:col-span-2">
        <input type="checkbox" checked={values.branding} onChange={(e) => set("branding", e.target.checked)} className="h-5 w-5 accent-[var(--color-foreground)]" />
        Add our logo and brand colours
      </label>
      <div className="sm:col-span-2">
        <button type="submit" className={buttonClasses("whatsapp", "lg", "w-full sm:w-auto")}><WhatsAppIcon className="h-5 w-5" />Send Brief on WhatsApp</button>
        <p role="status" aria-live="polite" className="t-caption mt-3 min-h-5">
          {sent ? <><Check aria-hidden className="mr-1 inline h-3.5 w-3.5 text-wa" />WhatsApp is opening with your brief filled in. Just press send.</> : "We'll reply with ideas, a quote and a mock-up, usually within 24 hours."}
        </p>
      </div>
    </form>
  );
}
