import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const dynamic = "force-static";
export const alt = `${site.name} | ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: "#faf6ef", color: "#2a2522", fontFamily: "Georgia, serif" }}>
        <div style={{ fontSize: 30, letterSpacing: 14, textTransform: "uppercase", color: "#7a5e27" }}>Giftingden</div>
        <div style={{ fontSize: 96, marginTop: 28, fontStyle: "italic" }}>Gifts That Say More.</div>
        <div style={{ fontSize: 30, marginTop: 28, color: "#6b6159" }}>{site.tagline}</div>
      </div>
    ),
    size,
  );
}
