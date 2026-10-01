"use client";

import { useEffect } from "react";
import WhatsAppButton from "@/components/whatsapp/WhatsAppButton";
import { buttonClasses } from "@/components/ui/Button";
import { createGeneralWhatsAppMessage } from "@/lib/whatsapp";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <section className="container-page section-y flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="t-eyebrow">Something slipped</p>
      <h1 className="t-h1 mt-5 max-w-3xl">We dropped the ribbon.</h1>
      <p className="t-lead mt-5 max-w-lg">Something went wrong on our side. Please try again, or message us and we&apos;ll help you directly.</p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <button type="button" onClick={reset} className={buttonClasses("primary", "lg")}>Try again</button>
        <WhatsAppButton message={createGeneralWhatsAppMessage()} label="Chat on WhatsApp" size="lg" source="error_page" />
      </div>
    </section>
  );
}
