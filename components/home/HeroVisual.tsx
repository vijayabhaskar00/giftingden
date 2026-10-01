"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import GiftArt, { Backdrop, OpenBox, Table } from "@/components/art/GiftArt";
import { TONES } from "@/components/art/tones";
import type { ArtSpec } from "@/lib/types";

const HERO_ART: ArtSpec = { tone: "blush", box: "ivory", items: ["flowers", "candle", "chocolates", "card"] };

/** Layered, parallax hero still-life in an arch frame. Layers drift at different speeds on scroll. */
export default function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBack = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "10%"]);
  const yFront = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "-6%"]);
  const yCard = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "-18%"]);
  const tone = TONES.blush;
  const uid = "hero";

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[34rem] lg:max-w-none">
      <div className="relative aspect-[4/5] overflow-hidden rounded-b-md rounded-t-full bg-rose-soft sm:aspect-[5/6] lg:aspect-[4/5]">
        <motion.div style={{ y: yBack }} className="absolute inset-x-0 -inset-y-[6%]">
          <svg viewBox="0 0 800 1000" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
            <Backdrop tone={tone} uid={uid} />
            <Table tone={tone} />
          </svg>
        </motion.div>
        <motion.div style={{ y: yFront }} className="absolute inset-0">
          <svg role="img" aria-label="A blush gift box overflowing with flowers, a candle and chocolates" viewBox="0 0 800 1000" preserveAspectRatio="xMidYMax slice" className="h-full w-full">
            <g transform="translate(400 940) scale(1.28)"><OpenBox art={HERO_ART} /></g>
          </svg>
        </motion.div>
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/25 to-transparent" />
      </div>

      {/* floating secondary frame */}
      <motion.div style={{ y: yCard }} className="absolute -bottom-6 -left-3 w-[34%] md:-left-8 lg:-left-14">
        <div className="animate-float relative aspect-[4/5] overflow-hidden rounded-md border-[6px] border-background shadow-[0_18px_40px_rgb(42_37_34/0.18)]">
          <GiftArt art={{ tone: "sage", box: "ivory", items: ["soap", "candle", "tin", "flowers"] }} variant="flatlay" alt="Flat lay of a self-care gift hamper" />
        </div>
      </motion.div>

      {/* rotating seal */}
      <div aria-hidden className="absolute -right-2 top-[16%] hidden h-28 w-28 place-items-center sm:grid md:-right-6 lg:-right-8">
        <svg viewBox="0 0 120 120" className="animate-spin-slow h-full w-full text-foreground">
          <defs><path id="seal" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" /></defs>
          <circle cx="60" cy="60" r="58" fill="#faf6ef" stroke="currentColor" strokeOpacity=".2" />
          <text fontSize="10" fill="currentColor" fontWeight="700"><textPath href="#seal" textLength="270" lengthAdjust="spacing">HAND-WRAPPED · WITH LOVE · </textPath></text>
        </svg>
        <svg viewBox="0 0 24 24" className="absolute h-6 w-6 text-accent" fill="currentColor"><path d="M12 21s-7.5-4.6-9.5-9.2C1.2 8.2 3.3 5 6.4 5c2 0 3.5 1.2 5.6 3.3C14.100 6.200 15.600 5 17.600 5c3.100 0 5.200 3.200 3.900 6.800C19.500 16.400 12 21 12 21Z" /></svg>
      </div>

      {/* decorative sparkles */}
      {[["8%", "6%", "h-3 w-3", "0s"], ["88%", "4%", "h-2 w-2", "1.6s"], ["92%", "58%", "h-3.5 w-3.5", "3s"]].map(([l, t, s, d]) => (
        <svg key={l} aria-hidden viewBox="0 0 24 24" style={{ left: l, top: t, animationDelay: d }} className={`animate-float absolute text-accent ${s}`} fill="currentColor"><path d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12Z" /></svg>
      ))}
    </div>
  );
}
