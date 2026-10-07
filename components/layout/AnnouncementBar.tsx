import Link from "next/link";

/** Seasonal strip above the navbar. Edit the copy (or remove from app/layout.tsx) when the season ends. */
export default function AnnouncementBar() {
  return (
    <div className="bg-foreground text-background">
      <p className="container-page flex flex-wrap items-center justify-center gap-x-3 gap-y-0.5 py-2 text-center text-[0.78rem] leading-snug">
        <span aria-hidden>🪔</span>
        <span>Diwali corporate gifting is open. Order 3–4 weeks ahead for branded hampers.</span>
        <Link href="/occasions/festive" className="font-bold underline decoration-accent underline-offset-4 hover:decoration-background">See Diwali hampers</Link>
      </p>
    </div>
  );
}
