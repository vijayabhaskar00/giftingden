"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
import { site } from "@/lib/site";

/** Loads GA4 only when NEXT_PUBLIC_ANALYTICS_ID is set, and reports route changes as page views. */
export default function Analytics() {
  const pathname = usePathname();
  useEffect(() => { trackEvent("page_view", { page: pathname }); }, [pathname]);

  if (!site.analyticsId) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(site.analyticsId)}`} strategy="afterInteractive" />
      <Script id="gtag-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', ${JSON.stringify(site.analyticsId)}, { send_page_view: false, anonymize_ip: true });
      `}</Script>
    </>
  );
}
