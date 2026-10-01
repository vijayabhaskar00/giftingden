"use client";

import { Check } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { createCorporateWhatsAppMessage, sanitizeText } from "@/lib/whatsapp";
import { openWhatsAppChat } from "@/lib/whatsapp-client";
import { SelectField, TextArea, TextField } from "./Field";
import { useWhatsAppForm } from "./useWhatsAppForm";

const OCCASIONS = ["Employee onboarding", "Employee appreciation", "Client gifting", "Festive gifting", "Conference gifts", "Event gifting", "Custom branded hampers", "Other"];
const QUANTITIES = ["Under 25", "25 – 50", "50 – 100", "100 – 250", "250+"];
const BUDGETS = ["Under ₹1,000", "₹1,000 – ₹2,500", "₹2,500 – ₹5,000", "₹5,000+", "Not sure yet"];

export default function CorporateForm() {
  const { values, errors, set, submit, sent } = useWhatsAppForm(
    { name: "", company: "", occasion: "", quantity: "", budget: "", notes: "" },
    (v) => ({
      ...(sanitizeText(v.name, 80).length < 2 && { name: "Please tell us your name." }),
      ...(sanitizeText(v.company, 100).length < 2 && { company: "Please enter your company name." }),
      ...(!v.occasion && { occasion: "Please choose what you're gifting for." }),
    }),
    (v) => openWhatsAppChat(createCorporateWhatsAppMessage({ ...v }), { source: "corporate_form", extraEvent: "corporate_enquiry" }),
  );

  return (
    <form onSubmit={submit} noValidate aria-label="Corporate gifting enquiry" className="grid gap-5 sm:grid-cols-2">
      <TextField id="name" label="Your name" required autoComplete="name" maxLength={80} value={values.name} onChange={(e) => set("name", e.target.value)} error={errors.name} />
      <TextField id="company" label="Company" required autoComplete="organization" maxLength={100} value={values.company} onChange={(e) => set("company", e.target.value)} error={errors.company} />
      <div className="sm:col-span-2"><SelectField id="occasion" label="What are you gifting for?" required options={OCCASIONS} value={values.occasion} onChange={(e) => set("occasion", e.target.value)} error={errors.occasion} /></div>
      <SelectField id="quantity" label="Approx. quantity" options={QUANTITIES} value={values.quantity} onChange={(e) => set("quantity", e.target.value)} />
      <SelectField id="budget" label="Budget per gift" options={BUDGETS} value={values.budget} onChange={(e) => set("budget", e.target.value)} />
      <div className="sm:col-span-2"><TextArea id="notes" label="Anything else?" maxLength={400} hint="Delivery date, branding needs, number of addresses…" value={values.notes} onChange={(e) => set("notes", e.target.value)} /></div>
      <div className="sm:col-span-2">
        <button type="submit" className={buttonClasses("whatsapp", "lg", "w-full sm:w-auto")}><WhatsAppIcon className="h-5 w-5" />Talk to Our Corporate Gifting Team</button>
        <p role="status" aria-live="polite" className="t-caption mt-3 min-h-5">
          {sent ? <><Check aria-hidden className="mr-1 inline h-3.5 w-3.5 text-wa" />WhatsApp is opening with your details filled in. Just press send.</> : "This opens WhatsApp with your details pre-filled. Nothing is stored on our website."}
        </p>
      </div>
    </form>
  );
}
