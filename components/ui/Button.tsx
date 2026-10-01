import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

export type ButtonVariant = "primary" | "outline" | "light" | "whatsapp" | "link";

export const buttonClasses = (variant: ButtonVariant = "primary", size: "md" | "lg" | "sm" = "md", extra = "") => {
  const base =
    "group/btn t-button inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-sm transition-all duration-300 ease-out active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none";
  const sizes = { sm: "h-10 px-4", md: "h-12 px-6", lg: "h-14 px-8" }[size];
  const variants: Record<ButtonVariant, string> = {
    primary: "bg-primary text-primary-foreground hover:bg-brown",
    outline: "border border-foreground/80 text-foreground hover:bg-foreground hover:text-background",
    light: "bg-background text-foreground hover:bg-champagne",
    whatsapp: "bg-wa text-white hover:bg-wa-dark",
    link: "h-auto px-0 text-foreground underline decoration-accent decoration-2 underline-offset-8 hover:decoration-foreground",
  };
  return `${base} ${variant === "link" ? "" : sizes} ${variants[variant]} ${extra}`;
};

interface LinkButtonProps extends Omit<ComponentProps<typeof Link>, "className"> {
  variant?: ButtonVariant; size?: "md" | "lg" | "sm"; arrow?: boolean; className?: string; children: ReactNode;
}

/** Internal navigation button. For WhatsApp actions use <WhatsAppButton />. */
export function LinkButton({ variant = "primary", size = "md", arrow = true, className = "", children, ...rest }: LinkButtonProps) {
  return (
    <Link className={buttonClasses(variant, size, className)} {...rest}>
      {children}
      {arrow && <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />}
    </Link>
  );
}
