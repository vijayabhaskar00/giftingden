"use client";

import { usePathname } from "next/navigation";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { createGeneralWhatsAppMessage, createWhatsAppUrl } from "@/lib/whatsapp";
import { trackWhatsAppEnquiry } from "@/lib/whatsapp-client";

/**
 * Desktop: bottom-right floating button.
 * Mobile: sticky bottom bar (hidden on product pages, which render their own product-specific bar).
 */
export default function FloatingWhatsApp() {
  const pathname = usePathname();
  const href = createWhatsAppUrl(createGeneralWhatsAppMessage());
  const onProduct = pathname.startsWith("/gift/");
  const track = () => trackWhatsAppEnquiry({ source: "floating_button" });

  return (
    <>
      <a
        href={href} target="_blank" rel="noopener noreferrer" onClick={track}
        aria-label="Chat with Giftingden on WhatsApp (opens in a new tab)"
        className="group fixed bottom-6 right-6 z-40 hidden items-center gap-0 rounded-full bg-wa text-white shadow-[0_8px_30px_rgb(31_107_82/0.35)] transition-all duration-300 hover:bg-wa-dark hover:shadow-[0_10px_36px_rgb(31_107_82/0.45)] lg:flex animate-pulse-ring"
      >
        <span className="grid h-14 w-14 place-items-center"><WhatsAppIcon className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" /></span>
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-[0.8rem] font-semibold tracking-wide opacity-0 transition-all duration-300 group-hover:max-w-44 group-hover:pr-5 group-hover:opacity-100 group-focus-visible:max-w-44 group-focus-visible:pr-5 group-focus-visible:opacity-100">
          Chat with Giftingden
        </span>
      </a>

      {!onProduct && (
        <div className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-4 pt-3 backdrop-blur lg:hidden">
          <a
            href={href} target="_blank" rel="noopener noreferrer" onClick={track}
            aria-label="Chat with Giftingden on WhatsApp (opens in a new tab)"
            className="t-button flex h-12 w-full items-center justify-center gap-2.5 rounded-sm bg-wa text-white active:bg-wa-dark"
          >
            <WhatsAppIcon className="h-5 w-5" /> Chat with a Gifting Expert
          </a>
        </div>
      )}
    </>
  );
}
