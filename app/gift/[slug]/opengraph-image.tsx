import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { getAllProducts, getProductBySlug } from "@/lib/catalogue";
import { priceLabel } from "@/lib/format";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";
export const generateStaticParams = () => getAllProducts().map((p) => ({ slug: p.slug }));
export const alt = "Giftingden gift";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProductBySlug((await params).slug);
  if (!p) notFound();
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#f0dbd5", color: "#2a2522", fontFamily: "Georgia, serif" }}>
        <div style={{ fontSize: 26, letterSpacing: 12, textTransform: "uppercase", color: "#7a5e27" }}>Giftingden</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, lineHeight: 1.05 }}>{p.name}</div>
          <div style={{ fontSize: 34, marginTop: 24, color: "#6b6159" }}>{p.shortDescription}</div>
        </div>
        <div style={{ fontSize: 34 }}>{`${priceLabel(p)} · Enquire on WhatsApp`}</div>
      </div>
    ),
    size,
  );
}
