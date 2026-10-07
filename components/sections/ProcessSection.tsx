import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { corporateProcess } from "@/lib/data/content";

export default function ProcessSection({ tone = "champagne" }: { tone?: "champagne" | "none" }) {
  return (
    <section aria-labelledby="process" className={`section-y ${tone === "champagne" ? "bg-champagne/40" : ""}`}>
      <div className="container-page">
        <Reveal><SectionHeader align="center" eyebrow="How it works" title={<span id="process">From brief to doorstep.</span>} /></Reveal>
        <ol className="mt-14 grid gap-10 md:grid-cols-4">
          {corporateProcess.map((s) => (
            <li key={s.step}><span className="font-display text-5xl italic text-accent-ink">{s.step}</span><h3 className="t-h3 mt-3">{s.title}</h3><p className="t-caption mt-2 text-[0.95rem]">{s.text}</p></li>
          ))}
        </ol>
      </div>
    </section>
  );
}
