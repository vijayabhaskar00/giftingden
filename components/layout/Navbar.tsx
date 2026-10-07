"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { Logo, WhatsAppIcon } from "@/components/ui/Icons";
import { useSearch } from "@/components/search/SearchProvider";
import WhatsAppButton from "@/components/whatsapp/WhatsAppButton";
import { createCorporateWhatsAppMessage, createGeneralWhatsAppMessage, createWhatsAppUrl } from "@/lib/whatsapp";
import { trackWhatsAppEnquiry } from "@/lib/whatsapp-client";
import { primaryNav, secondaryNav } from "./nav-links";

const isActive = (pathname: string, href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));

export default function Navbar() {
  const pathname = usePathname();
  const { open: openSearch } = useSearch();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer on navigation, lock page scroll while open.
  useEffect(() => { setMenuOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; document.removeEventListener("keydown", onKey); };
  }, [menuOpen]);

  const waHref = createWhatsAppUrl(createGeneralWhatsAppMessage());

  return (
    <>
      <a href="#main" className="sr-only z-[100] bg-foreground px-4 py-2 text-background focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled || menuOpen ? "border-b border-border bg-background/92 backdrop-blur-md" : "border-b border-transparent bg-background"}`}>
        <div className={`container-page flex items-center justify-between transition-all duration-300 ${scrolled ? "h-16" : "h-[4.5rem] md:h-20"}`}>
          <Link href="/" aria-label="Gifthut, home" className="shrink-0"><Logo className="text-foreground" /></Link>

          <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex xl:gap-9">
            {primaryNav.map((l) => {
              const active = isActive(pathname, l.href);
              return (
                <Link key={l.href} href={l.href} aria-current={active ? "page" : undefined}
                  className={`relative py-2 text-[0.8rem] font-semibold tracking-wide transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-foreground after:transition-transform after:duration-300 ${active ? "text-foreground after:scale-x-100" : "text-muted hover:text-foreground after:scale-x-0 hover:after:scale-x-100"}`}>
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1 md:gap-2">
            <button type="button" onClick={openSearch} aria-label="Search gifts" className="grid h-11 w-11 place-items-center rounded-full transition-colors hover:bg-beige">
              <Search className="h-[1.2rem] w-[1.2rem]" />
            </button>
            <div className="hidden xl:block">
              <WhatsAppButton
                message={createCorporateWhatsAppMessage({ occasion: "Diwali gifting" })} label="Get a Diwali Quote" size="sm" source="navbar" extraEvent="corporate_enquiry"
                className="!px-4" ariaLabel="Get a corporate quote on WhatsApp (opens in a new tab)"
              />
            </div>
            <a href={waHref} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppEnquiry({ source: "navbar_icon" })}
              aria-label="Chat on WhatsApp (opens in a new tab)" className="grid h-11 w-11 place-items-center rounded-full text-wa transition-colors hover:bg-beige xl:hidden">
              <WhatsAppIcon className="h-[1.35rem] w-[1.35rem]" />
            </a>
            <button type="button" onClick={() => setMenuOpen((v) => !v)} aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="grid h-11 w-11 place-items-center rounded-full transition-colors hover:bg-beige lg:hidden">
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div id="mobile-menu" className="animate-fade fixed inset-x-0 bottom-0 top-[4.5rem] z-[45] overflow-y-auto bg-background lg:hidden">
          <nav aria-label="Mobile" className="container-page flex min-h-full flex-col pb-10 pt-6">
            <ul>
              {primaryNav.map((l, i) => (
                <li key={l.href} className="animate-rise border-b border-border" style={{ animationDelay: `${i * 40}ms` }}>
                  <Link href={l.href} aria-current={isActive(pathname, l.href) ? "page" : undefined} className="flex items-center justify-between py-4 font-display text-[2rem] font-medium leading-none">
                    {l.label}
                    {isActive(pathname, l.href) && <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-1">
              {secondaryNav.map((l) => (
                <li key={l.href}><Link href={l.href} className="block py-2.5 text-sm font-semibold text-muted hover:text-foreground">{l.label}</Link></li>
              ))}
            </ul>
            <div className="mt-auto pt-8">
              <WhatsAppButton message={createCorporateWhatsAppMessage({ occasion: "Diwali gifting" })} label="Get a Diwali Quote" size="lg" source="mobile_menu" extraEvent="corporate_enquiry" className="w-full" />
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
