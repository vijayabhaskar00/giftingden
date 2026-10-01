import Link from "next/link";
import { ChevronRight } from "lucide-react";
import JsonLd from "./JsonLd";
import { breadcrumbLd } from "@/lib/seo";

export interface Crumb { name: string; path: string }

export default function Breadcrumbs({ items, className = "" }: { items: Crumb[]; className?: string }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <JsonLd data={breadcrumbLd(all)} />
      <ol className="t-caption flex flex-wrap items-center gap-1.5">
        {all.map((c, i) => {
          const last = i === all.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-1.5">
              {last ? <span aria-current="page" className="text-foreground">{c.name}</span> : <Link href={c.path} className="hover:text-foreground hover:underline">{c.name}</Link>}
              {!last && <ChevronRight aria-hidden className="h-3.5 w-3.5 opacity-60" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
