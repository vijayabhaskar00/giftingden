import GiftArt from "@/components/art/GiftArt";
import type { ArtSpec, ImageVariant, ProductImage } from "@/lib/types";

interface MediaProps {
  image?: ProductImage;
  art?: ArtSpec;
  variant?: ImageVariant;
  alt?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

/** Fills its (relatively positioned) parent. Renders a photo when available, else the procedural still-life. */
export default function Media({ image, art, variant, alt, priority, className = "" }: MediaProps) {
  const text = alt ?? image?.alt ?? "";
  if (image?.src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={image.src} alt={text} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} decoding="async" className={`absolute inset-0 h-full w-full object-cover ${className}`} />;
  }
  const a = image?.art ?? art;
  if (!a) return null;
  return <GiftArt art={a} variant={image?.variant ?? variant ?? "box"} alt={text} priority={priority} className={`absolute inset-0 h-full w-full ${className}`} />;
}
