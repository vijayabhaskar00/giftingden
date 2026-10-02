import Media from "@/components/ui/Media";
import Reveal from "@/components/ui/Reveal";
import { InstagramIcon } from "@/components/ui/Icons";
import { instagramMoments } from "@/lib/data/content";
import { site } from "@/lib/site";

export default function InstagramGrid() {
  return (
    <section aria-labelledby="ig-title" className="section-y">
      <div className="container-page">
        <Reveal className="text-center">
          <p className="t-eyebrow mb-4">Gifthut Moments</p>
          <h2 id="ig-title" className="t-h2">{site.instagramHandle}</h2>
          <p className="t-lead mx-auto mt-4 max-w-md">Tag us in your gifting moments.</p>
        </Reveal>
        <ul className="mt-12 grid grid-cols-3 gap-1.5 md:gap-3">
          {instagramMoments.map((m, i) => (
            <li key={m.alt} className={i === 0 ? "col-span-2 row-span-2" : ""}>
              <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label={`${m.alt} (view on Instagram, opens in a new tab)`}
                className="group relative block aspect-square h-full overflow-hidden rounded-sm bg-beige">
                <Media art={m.art} variant={m.variant} alt={m.alt} sizes="(min-width:768px) 28vw, 33vw" className="transition-transform duration-700 group-hover:scale-105" />
                <span aria-hidden className="absolute inset-0 grid place-items-center bg-foreground/0 text-white opacity-0 transition-all duration-300 group-hover:bg-foreground/35 group-hover:opacity-100 group-focus-visible:bg-foreground/35 group-focus-visible:opacity-100">
                  <InstagramIcon className="h-7 w-7" />
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex justify-center">
          <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" className="t-button inline-flex items-center gap-2 underline decoration-accent decoration-2 underline-offset-8 hover:decoration-foreground">
            <InstagramIcon className="h-4 w-4" /> Follow {site.instagramHandle}
          </a>
        </div>
      </div>
    </section>
  );
}
