import Link from "next/link";
import { Mail } from "lucide-react";
import { InstagramIcon, Logo, WhatsAppIcon } from "@/components/ui/Icons";
import Newsletter from "./Newsletter";
import { site } from "@/lib/site";
import { createGeneralWhatsAppMessage, createWhatsAppUrl } from "@/lib/whatsapp";

const cols = [
  { title: "Shop", links: [["Shop Gifts", "/gifts"], ["Gift Packages", "/gift-packages"], ["Occasions", "/occasions"], ["Gift Finder", "/gift-finder"], ["Custom Gifts", "/custom-gifts"]] },
  { title: "Company", links: [["Corporate Gifting", "/corporate-gifting"], ["About", "/about"], ["Contact", "/contact"], ["FAQ", "/faq"]] },
  { title: "Legal", links: [["Privacy Policy", "/privacy"], ["Terms", "/terms"], ["Shipping Policy", "/terms#shipping"], ["Cancellation Policy", "/terms#cancellation"]] },
] as const;

export default function Footer() {
  return (
    <footer className="on-dark bg-foreground pb-24 text-background lg:pb-0">
      <div className="container-page pb-10 pt-16 md:pt-24">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo className="text-background" />
            <p className="mt-6 max-w-sm font-display text-3xl font-medium italic leading-tight text-champagne">{site.tagline}</p>
            <div className="mt-10"><Newsletter /></div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-7 lg:pl-10">
            {cols.map((c) => (
              <nav key={c.title} aria-label={c.title}>
                <h2 className="t-eyebrow !text-champagne">{c.title}</h2>
                <ul className="mt-5 space-y-3">
                  {c.links.map(([label, href]) => (
                    <li key={label}><Link href={href} className="text-sm text-background/80 transition-colors hover:text-background hover:underline underline-offset-4">{label}</Link></li>
                  ))}
                </ul>
              </nav>
            ))}
            <div>
              <h2 className="t-eyebrow !text-champagne">Customer support</h2>
              <ul className="mt-5 space-y-3 text-sm">
                <li><a href={createWhatsAppUrl(createGeneralWhatsAppMessage())} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-background/80 hover:text-background"><WhatsAppIcon className="h-4 w-4" />WhatsApp</a></li>
                <li><a href={`mailto:${site.email}`} className="flex items-center gap-2 text-background/80 hover:text-background"><Mail aria-hidden className="h-4 w-4" />Email</a></li>
                <li><a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-background/80 hover:text-background"><InstagramIcon className="h-4 w-4" />Instagram</a></li>
              </ul>
              <p className="mt-5 text-xs leading-relaxed text-background/60">{site.supportHours}</p>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-background/15 pt-6 text-xs text-background/60 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Made with care in India. Gifts are enquired and confirmed on WhatsApp.</p>
        </div>
      </div>
    </footer>
  );
}
