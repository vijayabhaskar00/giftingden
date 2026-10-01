"use client";

import { Check } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { occasions } from "@/lib/data/taxonomy";
import { createCustomGiftWhatsAppMessage } from "@/lib/whatsapp";
import { openWhatsAppChat } from "@/lib/whatsapp-client";
import { SelectField, TextArea } from "./Field";
import { useWhatsAppForm } from "./useWhatsAppForm";

const BUDGETS = ["Under ₹1,500", "₹1,500 – ₹2,500", "₹2,500 – ₹5,000", "₹5,000 – ₹10,000", "₹10,000+"];
const RECIPIENTS = ["Partner", "Friend", "Parent", "Sibling", "Colleague", "Client", "Team / Employees", "Other"];
const PACKAGING = ["Signature ivory box", "Rose keepsake box", "Kraft & ribbon", "Luxe rigid box", "Surprise me"];

export default function CustomGiftForm() {
  const { values, errors, set, submit, sent } = useWhatsAppForm(
    { occasion: "", budget: "", recipient: "", packaging: "", note: "", branding: false as boolean },
    (v) => ({ ...(!v.occasion && { occasion: "Please choose an occasion." }), ...(!v.budget && { budget: "Please choose a budget." }) }),
    (v) => openWhatsAppChat(createCustomGiftWhatsAppMessage({ ...v }), { source: "custom_gift_form", extraEvent: "custom_gift_enquiry" }),
  );

  return (
    <form onSubmit={submit} noValidate aria-label="Create a custom gift" className="grid gap-5 sm:grid-cols-2">
      <SelectField id="occasion" label="Occasion" required options={occasions.map((o) => o.name)} value={values.occasion} onChange={(e) => set("occasion", e.target.value)} error={errors.occasion} />
      <SelectField id="budget" label="Budget" required options={BUDGETS} value={values.budget} onChange={(e) => set("budget", e.target.value)} error={errors.budget} />
      <SelectField id="recipient" label="Who is it for?" options={RECIPIENTS} value={values.recipient} onChange={(e) => set("recipient", e.target.value)} />
      <SelectField id="packaging" label="Packaging" options={PACKAGING} value={values.packaging} onChange={(e) => set("packaging", e.target.value)} />
      <div className="sm:col-span-2"><TextArea id="note" label="Personal note or ideas" maxLength={400} hint="Their favourite things, a message for the card, anything we should know." value={values.note} onChange={(e) => set("note", e.target.value)} /></div>
      <label className="flex cursor-pointer items-center gap-3 text-sm sm:col-span-2">
        <input type="checkbox" checked={values.branding} onChange={(e) => set("branding", e.target.checked)} className="h-5 w-5 accent-[var(--color-foreground)]" />
        Add corporate branding (logo and message)
      </label>
      <div className="sm:col-span-2">
        <button type="submit" className={buttonClasses("whatsapp", "lg", "w-full sm:w-auto")}><WhatsAppIcon className="h-5 w-5" />Create My Gift</button>
        <p role="status" aria-live="polite" className="t-caption mt-3 min-h-5">
          {sent ? <><Check aria-hidden className="mr-1 inline h-3.5 w-3.5 text-wa" />WhatsApp is opening with your brief filled in. Just press send.</> : "We'll reply with ideas and a quote, usually within a few hours."}
        </p>
      </div>
    </form>
  );
}
