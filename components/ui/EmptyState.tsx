import type { ReactNode } from "react";
import WhatsAppButton from "@/components/whatsapp/WhatsAppButton";
import { createGeneralWhatsAppMessage } from "@/lib/whatsapp";

export default function EmptyState({
  title = "Hmm… we couldn't find that gift.", text = "Try a different word, loosen a filter, or tell us what you have in mind and we'll find it for you.", query, children,
}: { title?: string; text?: string; query?: string; children?: ReactNode }) {
  const message = query ? `Hi Gifthut! I searched for "${query.slice(0, 80)}" but couldn't find the right gift. Could you help?` : createGeneralWhatsAppMessage();
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-16 text-center" role="status">
      <svg viewBox="0 0 64 64" className="mb-6 h-14 w-14 text-accent" fill="none" stroke="currentColor" strokeWidth={1.4} aria-hidden>
        <rect x="10" y="26" width="44" height="28" rx="2" /><rect x="6" y="18" width="52" height="10" rx="2" /><path d="M32 18v36M32 18c-2-9-14-11-14-5s10 5 14 5Zm0 0c2-9 14-11 14-5s-10 5-14 5Z" />
      </svg>
      <h2 className="t-h3">{title}</h2>
      <p className="t-caption mt-3 text-base">{text}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <WhatsAppButton message={message} source="empty_state" label="Talk to Our Corporate Team" />
        {children}
      </div>
    </div>
  );
}
