import type { ReactNode } from "react";
import Breadcrumbs from "./Breadcrumbs";

export default function LegalPage({ title, path, updated, children }: { title: string; path: string; updated: string; children: ReactNode }) {
  return (
    <div className="container-page pb-20 pt-6 md:pb-28">
      <Breadcrumbs items={[{ name: title, path }]} />
      <h1 className="t-h1 mt-8 !text-[clamp(2.4rem,5vw,3.8rem)]">{title}</h1>
      <p className="t-caption mt-3">Last updated {updated}</p>
      <div className="mt-10 max-w-3xl space-y-4 text-[1.02rem] leading-relaxed text-muted [&_h2]:mb-3 [&_h2]:mt-12 [&_h2]:scroll-mt-28 [&_h2]:font-display [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:text-foreground [&_a]:text-foreground [&_a]:underline [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
        {children}
      </div>
    </div>
  );
}
