"use client";

import { ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { buttonClasses, type ButtonVariant } from "@/components/ui/Button";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import { trackWhatsAppEnquiry, type WhatsAppTracking } from "@/lib/whatsapp-client";

interface Props extends WhatsAppTracking {
  message: string;
  label?: string;
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  icon?: boolean;
  arrow?: boolean;
  className?: string;
  /** Accessible name when the visible label is short, e.g. product-specific. */
  ariaLabel?: string;
}

/**
 * The one WhatsApp CTA. A real <a href> (works without JS, middle-click, copy link),
 * with the analytics event fired synchronously on click before the browser navigates.
 */
export default function WhatsAppButton({
  message, label = "Enquire on WhatsApp", variant = "whatsapp", size = "md", icon = true, arrow = false, className = "", ariaLabel,
  ...tracking
}: Props) {
  return (
    <a
      href={createWhatsAppUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppEnquiry(tracking)}
      aria-label={ariaLabel ?? `${label} (opens WhatsApp in a new tab)`}
      className={buttonClasses(variant, size, className)}
    >
      {icon && <WhatsAppIcon className="h-[1.15rem] w-[1.15rem]" />}
      {label}
      {arrow && <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />}
    </a>
  );
}
