import type { ReactNode } from "react";
import type { ArtItem } from "@/lib/types";
import type { Tone } from "./tones";

/** Hand-built SVG still-life primitives. Coordinates are local: (0,0) is the base-centre of the object. */

const GLASS = "#EDE5D6", WAX = "#F6EFE1", CREAM = "#FFFCF6", GOLD = "#C9A765", CHOC = "#4A2C22", CHOC2 = "#6A4130", HONEY = "#D5A24A", LEAF = "#6E7F5E";
export const ACCENTS = ["#A4573F", "#6F7F66", "#D4A85F", "#44566B"];

const Highlight = ({ x, y, w, h }: { x: number; y: number; w: number; h: number }) => (
  <rect x={x} y={y} width={w} height={h} rx={w / 2} fill="#fff" opacity={0.28} />
);

function Bloom({ x, y, r, color, center = GOLD }: { x: number; y: number; r: number; color: string; center?: string }) {
  return (
    <g>
      {[0, 72, 144, 216, 288].map((a) => (
        <circle key={a} cx={x + Math.cos((a * Math.PI) / 180) * r * 0.85} cy={y + Math.sin((a * Math.PI) / 180) * r * 0.85} r={r} fill={color} />
      ))}
      <circle cx={x} cy={y} r={r * 0.55} fill={center} />
    </g>
  );
}

export function SideItem({ item, tone, accent }: { item: ArtItem; tone: Tone; accent: string }): ReactNode {
  switch (item) {
    case "candle":
      return (
        <g>
          <rect x={-45} y={-86} width={90} height={86} rx={10} fill={GLASS} />
          <rect x={-39} y={-80} width={78} height={70} rx={6} fill={WAX} />
          <rect x={-45} y={-58} width={90} height={30} fill={tone.ribbon} opacity={0.9} />
          <path d="M0 -134 C 11 -116 11 -104 0 -98 C -11 -104 -11 -116 0 -134 Z" fill={GOLD} />
          <path d="M0 -122 C 5 -113 5 -108 0 -105 C -5 -108 -5 -113 0 -122 Z" fill="#FFF3C9" />
          <line x1={0} y1={-98} x2={0} y2={-84} stroke={CHOC} strokeWidth={3} />
          <Highlight x={-36} y={-78} w={8} h={64} />
        </g>
      );
    case "chocolates":
      return (
        <g>
          <rect x={-62} y={-30} width={124} height={30} rx={4} fill={CHOC} />
          <rect x={-62} y={-30} width={124} height={8} rx={3} fill={CHOC2} />
          <rect x={-8} y={-30} width={16} height={30} fill={tone.ribbon} />
          {[-38, -6, 28].map((x, i) => (
            <g key={x}>
              <circle cx={x} cy={-42 - (i % 2) * 8} r={17} fill={CHOC2} />
              <circle cx={x - 5} cy={-48 - (i % 2) * 8} r={4} fill="#fff" opacity={0.22} />
            </g>
          ))}
        </g>
      );
    case "card":
      return (
        <g transform="rotate(-8)">
          <rect x={-46} y={-122} width={92} height={122} rx={3} fill={CREAM} stroke="#E4D9C8" />
          <path d="M0 -66 C -22 -84 -34 -62 0 -40 C 34 -62 22 -84 0 -66 Z" fill={tone.ribbon} opacity={0.9} />
          <rect x={-28} y={-26} width={56} height={3} rx={1.5} fill="#CFC3AF" />
          <rect x={-20} y={-18} width={40} height={3} rx={1.5} fill="#DDD2BF" />
        </g>
      );
    case "jar":
      return (
        <g>
          <rect x={-34} y={-116} width={68} height={18} rx={4} fill={tone.ribbon} />
          <rect x={-41} y={-100} width={82} height={100} rx={16} fill={HONEY} />
          <rect x={-31} y={-70} width={62} height={38} rx={3} fill={CREAM} />
          <rect x={-22} y={-58} width={44} height={4} rx={2} fill="#CFC3AF" />
          <rect x={-22} y={-48} width={30} height={4} rx={2} fill="#DDD2BF" />
          <Highlight x={-34} y={-92} w={8} h={70} />
        </g>
      );
    case "bottle":
      return (
        <g>
          <rect x={-11} y={-168} width={22} height={14} rx={3} fill={GOLD} />
          <path d="M-11 -154 H11 V-112 C11 -100 32 -98 32 -80 V-8 Q32 0 24 0 H-24 Q-32 0 -32 -8 V-80 C-32 -98 -11 -100 -11 -112 Z" fill="#34493D" />
          <rect x={-32} y={-66} width={64} height={44} fill={CREAM} />
          <circle cx={0} cy={-44} r={9} fill={tone.ribbon} opacity={0.85} />
          <Highlight x={-24} y={-92} w={7} h={80} />
        </g>
      );
    case "tin":
      return (
        <g>
          <rect x={-52} y={-72} width={104} height={72} rx={6} fill={accent} />
          <rect x={-56} y={-84} width={112} height={16} rx={4} fill={accent} />
          <rect x={-56} y={-84} width={112} height={16} rx={4} fill="#000" opacity={0.12} />
          <circle cx={0} cy={-36} r={20} fill={CREAM} />
          <circle cx={0} cy={-36} r={12} fill="none" stroke={accent} strokeWidth={2} />
          <Highlight x={-44} y={-66} w={7} h={56} />
        </g>
      );
    case "mug":
      return (
        <g>
          <path d="M36 -54 C 72 -58 72 -14 36 -18" fill="none" stroke={accent} strokeWidth={11} strokeLinecap="round" />
          <rect x={-40} y={-76} width={76} height={76} rx={12} fill={accent} />
          <rect x={-40} y={-76} width={76} height={12} rx={6} fill="#000" opacity={0.1} />
          <Highlight x={-31} y={-62} w={8} h={50} />
        </g>
      );
    case "flowers":
      return (
        <g>
          <path d="M0 0 C -4 -60 -26 -110 -34 -156" stroke={LEAF} strokeWidth={5} fill="none" strokeLinecap="round" />
          <path d="M0 0 C 2 -70 2 -130 0 -200" stroke={LEAF} strokeWidth={5} fill="none" strokeLinecap="round" />
          <path d="M0 0 C 8 -50 30 -96 38 -140" stroke={LEAF} strokeWidth={5} fill="none" strokeLinecap="round" />
          <ellipse cx={-14} cy={-70} rx={16} ry={7} fill={LEAF} transform="rotate(-35 -14 -70)" />
          <ellipse cx={16} cy={-84} rx={16} ry={7} fill={LEAF} transform="rotate(35 16 -84)" />
          <Bloom x={-34} y={-160} r={13} color="#E9B7B0" />
          <Bloom x={0} y={-204} r={15} color="#F6E3DC" />
          <Bloom x={38} y={-144} r={12} color="#D88F8A" />
        </g>
      );
    case "notebook":
      return (
        <g>
          <rect x={-48} y={-126} width={96} height={126} rx={4} fill={accent} />
          <rect x={-48} y={-126} width={12} height={126} rx={3} fill="#000" opacity={0.14} />
          <rect x={26} y={-126} width={6} height={126} fill={CHOC} opacity={0.75} />
          <rect x={-20} y={-96} width={40} height={30} rx={2} fill={CREAM} opacity={0.92} />
          <rect x={-14} y={-84} width={28} height={3} rx={1.5} fill="#CFC3AF" />
        </g>
      );
    case "soap":
      return (
        <g>
          <rect x={-48} y={-32} width={96} height={32} rx={11} fill="#EFE5D3" />
          <rect x={-40} y={-62} width={80} height={30} rx={11} fill="#CDB99B" />
          <rect x={-34} y={-62} width={68} height={6} rx={3} fill="#fff" opacity={0.25} />
          <path d="M-6 -66 C -4 -84 10 -90 18 -98 C 18 -80 8 -70 -6 -66 Z" fill={LEAF} />
        </g>
      );
  }
}

/** Top-down view for flat lays. Centre-origin, nominal radius ≈ 55. */
export function TopItem({ item, tone, accent }: { item: ArtItem; tone: Tone; accent: string }): ReactNode {
  switch (item) {
    case "candle":
      return (<g><circle r={50} fill={GLASS} /><circle r={42} fill={WAX} /><circle r={42} fill="none" stroke={tone.ribbon} strokeWidth={6} opacity={0.8} /><circle r={3.5} fill={CHOC} /><circle cx={-18} cy={-18} r={10} fill="#fff" opacity={0.3} /></g>);
    case "chocolates":
      return (
        <g>
          <rect x={-58} y={-58} width={116} height={116} rx={8} fill={CHOC} />
          {[-34, 0, 34].flatMap((y) => [-34, 0, 34].map((x) => (<g key={`${x}${y}`}><circle cx={x} cy={y} r={14} fill={CHOC2} /><circle cx={x - 4} cy={y - 4} r={3.5} fill="#fff" opacity={0.2} /></g>)))}
        </g>
      );
    case "card":
      return (<g transform="rotate(10)"><rect x={-50} y={-66} width={100} height={132} rx={3} fill={CREAM} stroke="#E4D9C8" /><path d="M0 -14 C -22 -34 -34 -10 0 14 C 34 -10 22 -34 0 -14 Z" fill={tone.ribbon} /><rect x={-28} y={30} width={56} height={3} rx={1.5} fill="#CFC3AF" /></g>);
    case "jar":
      return (<g><circle r={46} fill={HONEY} /><circle r={36} fill={tone.ribbon} /><circle r={24} fill={CREAM} opacity={0.9} /><circle cx={-18} cy={-20} r={8} fill="#fff" opacity={0.25} /></g>);
    case "bottle":
      return (<g transform="rotate(-24)"><rect x={-70} y={-26} width={104} height={52} rx={18} fill="#34493D" /><rect x={30} y={-11} width={44} height={22} rx={6} fill="#34493D" /><rect x={72} y={-12} width={14} height={24} rx={4} fill={GOLD} /><rect x={-50} y={-26} width={44} height={52} fill={CREAM} /><rect x={-60} y={-16} width={70} height={7} rx={3} fill="#fff" opacity={0.2} /></g>);
    case "tin":
      return (<g><circle r={52} fill={accent} /><circle r={52} fill="#000" opacity={0.1} /><circle r={42} fill="none" stroke={CREAM} strokeWidth={2} opacity={0.7} /><circle r={20} fill={CREAM} /><circle r={11} fill="none" stroke={accent} strokeWidth={2} /></g>);
    case "mug":
      return (<g><rect x={34} y={-12} width={30} height={24} rx={10} fill="none" stroke={accent} strokeWidth={10} /><circle r={44} fill={accent} /><circle r={34} fill="#3C2519" /><circle r={34} fill="none" stroke="#fff" strokeWidth={2} opacity={0.25} /><circle cx={-12} cy={-12} r={9} fill="#fff" opacity={0.12} /></g>);
    case "flowers":
      return (<g><Bloom x={-22} y={-18} r={20} color="#E9B7B0" /><Bloom x={26} y={-8} r={17} color="#F6E3DC" /><Bloom x={-2} y={30} r={18} color="#D88F8A" /><ellipse cx={44} cy={36} rx={22} ry={8} fill={LEAF} transform="rotate(30 44 36)" /></g>);
    case "notebook":
      return (<g transform="rotate(-6)"><rect x={-50} y={-66} width={100} height={132} rx={4} fill={accent} /><rect x={-50} y={-66} width={13} height={132} rx={3} fill="#000" opacity={0.14} /><rect x={28} y={-66} width={7} height={132} fill={CHOC} opacity={0.75} /><rect x={-20} y={-30} width={40} height={28} rx={2} fill={CREAM} opacity={0.92} /></g>);
    case "soap":
      return (<g transform="rotate(8)"><rect x={-56} y={-30} width={112} height={60} rx={20} fill="#EFE5D3" /><rect x={-40} y={-18} width={80} height={36} rx={14} fill="#CDB99B" opacity={0.5} /><path d="M-8 -34 C -4 -54 14 -58 24 -66 C 22 -46 10 -36 -8 -34 Z" fill={LEAF} /></g>);
  }
}
