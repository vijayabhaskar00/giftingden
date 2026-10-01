import { ArrowUpRight } from "lucide-react";
import Media from "./Media";
import TrackedLink from "./TrackedLink";
import type { ArtSpec, ImageVariant } from "@/lib/types";

interface Props {
  name: string;
  description: string;
  href: string;
  art: ArtSpec;
  variant?: ImageVariant;
  kind: "occasion" | "category";
  className?: string;
  aspect?: string;
}

/** Image-led tile used for occasions, categories and collections. */
export default function CollectionCard({ name, description, href, art, variant = "box", kind, className = "", aspect = "aspect-[4/5]" }: Props) {
  return (
    <TrackedLink
      href={href}
      event={kind === "occasion" ? "occasion_click" : "category_click"}
      eventProps={{ name }}
      className={`group relative block overflow-hidden rounded-md bg-beige ${className}`}
    >
      <div className={`relative w-full ${aspect}`}>
        <div className="absolute inset-0 origin-top -translate-y-[11%] scale-[1.08] transition-transform duration-[900ms] ease-out group-hover:scale-[1.12]">
          <Media art={art} variant={variant} alt="" sizes="(min-width:1024px) 25vw, 50vw" />
        </div>
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-white md:p-6">
          <div className="min-w-0">
            <h3 className="break-words font-display text-[1.35rem] font-semibold leading-tight md:text-[1.6rem]">{name}</h3>
            <p className="mt-1 text-[0.82rem] leading-snug text-white/85 md:text-sm">{description}</p>
          </div>
          <span aria-hidden className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/60 transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-foreground md:h-10 md:w-10">
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
          </span>
        </div>
      </div>
      <span className="sr-only">View {name} gifts</span>
    </TrackedLink>
  );
}

export const OccasionCard = (p: Omit<Props, "kind">) => <CollectionCard {...p} kind="occasion" />;
export const CategoryCard = (p: Omit<Props, "kind">) => <CollectionCard {...p} kind="category" />;
