import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/layout/Analytics";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import SearchProvider from "@/components/search/SearchProvider";
import { toSearchDoc } from "@/components/search/types";
import FloatingWhatsApp from "@/components/whatsapp/FloatingWhatsApp";
import JsonLd from "@/components/ui/JsonLd";
import { getAllProducts } from "@/lib/catalogue";
import { organizationLd, websiteLd } from "@/lib/seo";
import { site } from "@/lib/site";

const display = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--font-cormorant", display: "swap" });
const sans = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Thoughtful Gifts. Beautifully Delivered.`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  openGraph: { siteName: site.name, locale: site.locale, type: "website" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#faf6ef", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const docs = getAllProducts().map(toSearchDoc);
  return (
    <html lang="en-IN" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <JsonLd data={[organizationLd(), websiteLd()]} />
        <SearchProvider docs={docs}>
          <Navbar />
          <main id="main" tabIndex={-1} className="outline-none">{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </SearchProvider>
        <Analytics />
      </body>
    </html>
  );
}
