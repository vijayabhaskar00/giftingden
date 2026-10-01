"use client";

import { buttonClasses } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { createContactWhatsAppMessage, sanitizeText } from "@/lib/whatsapp";
import { openWhatsAppChat } from "@/lib/whatsapp-client";
import { TextArea, TextField } from "./Field";
import { useWhatsAppForm } from "./useWhatsAppForm";

export default function ContactForm() {
  const { values, errors, set, submit } = useWhatsAppForm(
    { name: "", message: "" },
    (v) => ({
      ...(sanitizeText(v.name, 60).length < 2 && { name: "Please tell us your name." }),
      ...(sanitizeText(v.message, 500).length < 5 && { message: "Please write a short message." }),
    }),
    (v) => openWhatsAppChat(createContactWhatsAppMessage({ ...v }), { source: "contact_form" }),
  );
  return (
    <form onSubmit={submit} noValidate aria-label="Message Giftingden" className="grid gap-5">
      <TextField id="name" label="Your name" required autoComplete="name" maxLength={60} value={values.name} onChange={(e) => set("name", e.target.value)} error={errors.name} />
      <TextArea id="message" label="How can we help?" required maxLength={500} value={values.message} onChange={(e) => set("message", e.target.value)} error={errors.message} />
      <div>
        <button type="submit" className={buttonClasses("whatsapp", "lg", "w-full sm:w-auto")}><WhatsAppIcon className="h-5 w-5" />Send on WhatsApp</button>
        <p className="t-caption mt-3">Opens WhatsApp with your message ready to send.</p>
      </div>
    </form>
  );
}
