import { useId, type ReactNode } from "react";
import type { ArtSpec, ImageVariant } from "@/lib/types";
import { ACCENTS, SideItem, TopItem } from "./primitives";
import { TONES, type Tone } from "./tones";

/**
 * Procedural still-life used until real photography is supplied. Always fills its
 * parent and crops with `slice`, so it can never be stretched or distorted.
 */

interface GiftArtProps { art: ArtSpec; variant?: ImageVariant; alt: string; className?: string }

function Bow({ tone, x, y, s = 1 }: { tone: Tone; x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 0 C -40 -50 -86 -34 -70 -4 C -58 16 -22 8 0 0 Z" fill={tone.ribbon} />
      <path d="M0 0 C 40 -50 86 -34 70 -4 C 58 16 22 8 0 0 Z" fill={tone.ribbon} />
      <path d="M0 0 C -40 -50 -86 -34 -70 -4 C -58 16 -22 8 0 0 Z" fill="#000" opacity={0.1} transform="translate(2 4) scale(.9)" />
      <path d="M-4 6 L-26 52 L-8 46 L0 62 L6 8 Z" fill={tone.ribbon} />
      <path d="M4 6 L26 50 L10 46 L2 60 L-2 8 Z" fill={tone.ribbon} opacity={0.88} />
      <rect x={-13} y={-13} width={26} height={24} rx={8} fill={tone.ribbon} />
      <rect x={-13} y={-13} width={26} height={24} rx={8} fill="#fff" opacity={0.16} />
    </g>
  );
}

/** Open gift box with items rising from the tissue. Origin: bottom-centre of the box front. */
export function OpenBox({ art, accentOffset = 0 }: { art: ArtSpec; accentOffset?: number }) {
  const tone = TONES[art.tone];
  const box = TONES[art.box ?? art.tone];
  const slots = [
    { x: 0, y: -190, s: 1.5 }, { x: -118, y: -184, s: 1.2 }, { x: 118, y: -186, s: 1.2 },
  ];
  const [back, ...rest] = art.items;
  const inBox = [back, rest[0], rest[1]].filter(Boolean) as typeof art.items;
  const front = rest[2];
  return (
    <g>
      <ellipse cx={0} cy={6} rx={270} ry={26} fill="#000" opacity={0.16} />
      {/* tissue */}
      <path d="M-190 -190 L-150 -250 L-100 -196 L-40 -262 L20 -196 L90 -258 L140 -200 L190 -246 L190 -180 H-190 Z" fill={tone.bg} opacity={0.95} />
      <path d="M-190 -190 L-150 -250 L-100 -196 L-40 -262 L20 -196 L90 -258 L140 -200 L190 -246 L190 -180 H-190 Z" fill="#fff" opacity={0.35} />
      {inBox.map((item, i) => (
        <g key={item + i} transform={`translate(${slots[i].x} ${slots[i].y}) scale(${slots[i].s})`}>
          <SideItem item={item} tone={box} accent={ACCENTS[(i + accentOffset) % 4]} />
        </g>
      ))}
      {/* box front */}
      <rect x={-230} y={-200} width={460} height={200} rx={3} fill={box.box} />
      <rect x={-230} y={-200} width={460} height={34} rx={3} fill={box.boxDark} />
      <rect x={-230} y={-168} width={460} height={4} fill="#000" opacity={0.08} />
      <rect x={-26} y={-200} width={52} height={200} fill={box.ribbon} />
      <rect x={-26} y={-200} width={52} height={200} fill="#000" opacity={0.06} />
      <Bow tone={box} x={0} y={-196} s={0.9} />
      {front && (
        <g transform="translate(238 -2) scale(1.05)"><SideItem item={front} tone={box} accent={ACCENTS[(3 + accentOffset) % 4]} /></g>
      )}
    </g>
  );
}

export function Backdrop({ tone, uid }: { tone: Tone; uid: string }) {
  return (
    <>
      <defs>
        <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={tone.bg} />
          <stop offset="1" stopColor={tone.bg2} />
        </linearGradient>
        <linearGradient id={`${uid}-light`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity={0.5} />
          <stop offset="1" stopColor="#fff" stopOpacity={0} />
        </linearGradient>
      </defs>
      <rect width={800} height={1000} fill={`url(#${uid}-bg)`} />
      <polygon points="0,0 520,0 150,1000 0,1000" fill={`url(#${uid}-light)`} opacity={0.55} />
    </>
  );
}

export function Table({ tone }: { tone: Tone }) {
  return (
    <>
      <rect y={760} width={800} height={240} fill={tone.surface} opacity={0.55} />
      <rect y={760} width={800} height={3} fill="#000" opacity={0.05} />
    </>
  );
}

function BoxScene({ art, uid }: { art: ArtSpec; uid: string }) {
  const tone = TONES[art.tone];
  return (
    <>
      <Backdrop tone={tone} uid={uid} />
      <Table tone={tone} />
      <g transform="translate(400 880)"><OpenBox art={art} /></g>
    </>
  );
}

function FlatLay({ art, uid }: { art: ArtSpec; uid: string }) {
  const tone = TONES[art.tone];
  const box = TONES[art.box ?? art.tone];
  const slots = [{ x: 290, y: 380 }, { x: 510, y: 360 }, { x: 300, y: 620 }, { x: 515, y: 610 }];
  return (
    <>
      <defs>
        <pattern id={`${uid}-lin`} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="8" height="8" fill={tone.bg2} />
          <rect width="1" height="8" fill="#000" opacity={0.035} />
        </pattern>
      </defs>
      <rect width={800} height={1000} fill={`url(#${uid}-lin)`} />
      <rect x={110} y={190} width={590} height={650} rx={4} fill="#000" opacity={0.14} transform="translate(8 12)" />
      <rect x={100} y={180} width={600} height={650} rx={4} fill={box.box} />
      <rect x={130} y={210} width={540} height={590} rx={2} fill={box.boxDark} />
      <path d="M130 210 L360 210 L260 330 Z M670 800 L470 800 L560 690 Z" fill={tone.bg} opacity={0.7} />
      {art.items.slice(0, 4).map((item, i) => (
        <g key={item + i} transform={`translate(${slots[i].x} ${slots[i].y}) scale(1.5)`}>
          <ellipse cx={4} cy={8} rx={56} ry={50} fill="#000" opacity={0.1} />
          <TopItem item={item} tone={box} accent={ACCENTS[i % 4]} />
        </g>
      ))}
      <rect x={-20} y={470} width={840} height={46} fill={box.ribbon} transform="rotate(-8 400 500)" opacity={0.92} />
      <Bow tone={box} x={400} y={492} s={0.85} />
    </>
  );
}

function Detail({ art, uid }: { art: ArtSpec; uid: string }) {
  const tone = TONES[art.tone];
  const [main, second] = art.items;
  return (
    <>
      <Backdrop tone={tone} uid={uid} />
      {[[140, 220, 90], [660, 150, 60], [610, 420, 110], [90, 560, 70]].map(([x, y, r]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r={r} fill="#fff" opacity={0.18} />
      ))}
      <Table tone={tone} />
      <ellipse cx={400} cy={866} rx={250} ry={22} fill="#000" opacity={0.18} />
      <g transform="translate(400 870) scale(4.1)"><SideItem item={main} tone={tone} accent={ACCENTS[0]} /></g>
      {second && <g transform="translate(660 900) scale(2)"><SideItem item={second} tone={tone} accent={ACCENTS[1]} /></g>}
    </>
  );
}

function Wrapped({ art, uid }: { art: ArtSpec; uid: string }) {
  const tone = TONES[art.tone];
  const box = TONES[art.box ?? art.tone];
  return (
    <>
      <Backdrop tone={tone} uid={uid} />
      <Table tone={tone} />
      <ellipse cx={400} cy={846} rx={310} ry={24} fill="#000" opacity={0.18} />
      <g transform="translate(400 840)">
        <rect x={-290} y={-300} width={580} height={300} rx={3} fill={box.box} />
        <rect x={-310} y={-390} width={620} height={110} rx={3} fill={box.boxDark} />
        <rect x={-310} y={-296} width={620} height={8} fill="#000" opacity={0.08} />
        <rect x={-34} y={-390} width={68} height={390} fill={box.ribbon} />
        <rect x={-34} y={-390} width={68} height={390} fill="#000" opacity={0.06} />
        <Bow tone={box} x={0} y={-388} s={1.25} />
        <g transform="translate(150 -150) rotate(8)">
          <rect x={-62} y={-62} width={124} height={156} rx={3} fill="#FFFCF6" stroke="#E4D9C8" />
          <circle cx={0} cy={-42} r={7} fill="none" stroke="#C9B99F" strokeWidth={3} />
          <text x={0} y={22} textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize={17} letterSpacing={3} fill="#3A3028">GIFTINGDEN</text>
          <line x1={-30} y1={36} x2={30} y2={36} stroke={box.ribbon} strokeWidth={1.5} />
          <text x={0} y={62} textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontSize={13} fill="#7A6B5C">with love</text>
        </g>
      </g>
      {art.items[0] && <g transform="translate(660 872) scale(1.25)"><SideItem item={art.items[0]} tone={tone} accent={ACCENTS[2]} /></g>}
    </>
  );
}

export default function GiftArt({ art, variant = "box", alt, className }: GiftArtProps) {
  const uid = useId().replace(/:/g, "");
  const scene: ReactNode =
    variant === "flatlay" ? <FlatLay art={art} uid={uid} /> :
    variant === "detail" ? <Detail art={art} uid={uid} /> :
    variant === "wrapped" ? <Wrapped art={art} uid={uid} /> :
    <BoxScene art={art} uid={uid} />;
  return (
    <svg
      role="img"
      aria-label={alt}
      viewBox="0 0 800 1000"
      preserveAspectRatio={variant === "flatlay" ? "xMidYMid slice" : "xMidYMax slice"}
      className={className ?? "absolute inset-0 h-full w-full"}
    >
      {scene}
    </svg>
  );
}
