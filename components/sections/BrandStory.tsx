import { LinkButton } from "@/components/ui/Button";
import GiftArt from "@/components/art/GiftArt";
import Reveal from "@/components/ui/Reveal";
import { aboutValues } from "@/lib/data/content";

export default function BrandStory() {
  return (
    <section aria-labelledby="story-title" className="section-y">
      <div className="container-page grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
        <Reveal className="relative lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-md">
            <GiftArt art={{ tone: "champagne", box: "ivory", items: ["card", "candle", "flowers"] }} variant="wrapped" alt="A Giftingden box tied with a ribbon and a handwritten tag" />
          </div>
          <div className="absolute -bottom-6 right-4 hidden w-40 overflow-hidden rounded-md border-[6px] border-background shadow-xl sm:block md:-right-6 lg:-right-10">
            <div className="relative aspect-square"><GiftArt art={{ tone: "rose", items: ["card", "flowers"] }} variant="detail" alt="A handwritten card beside dried flowers" /></div>
          </div>
        </Reveal>
        <Reveal delay={120} className="lg:col-span-7">
          <p className="t-eyebrow mb-5">Our story</p>
          <h2 id="story-title" className="t-h1">Gifting Is More Than Giving.</h2>
          <p className="t-lead mt-6 max-w-xl">
            Giftingden began with a simple belief: the best gifts aren&apos;t just opened. They&apos;re felt. We curate every box around the person receiving it, with the right details, a handwritten note and packaging worth keeping, so a gift says exactly what you meant.
          </p>
          <dl className="mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {aboutValues.map((v) => (
              <div key={v.title} className="border-t border-border pt-4">
                <dt className="font-display text-xl font-semibold">{v.title}</dt>
                <dd className="t-caption mt-1.5">{v.text}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-10"><LinkButton href="/about" variant="outline" size="lg">Discover Our Story</LinkButton></div>
        </Reveal>
      </div>
    </section>
  );
}
