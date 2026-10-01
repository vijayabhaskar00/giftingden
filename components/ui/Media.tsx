import Image from "next/image";
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

/** Fills its (relatively positioned) parent. Renders a real photo when `src` is set, else the procedural still-life. */
export default function Media({ image, art, variant, alt, sizes = "(min-width:1024px) 33vw, 100vw", priority, className = "" }: MediaProps) {
  const a = image?.art ?? art;
  const text = alt ?? image?.alt ?? "";
  if (image?.src) {
    return <Image src={image.src} alt={text} fill sizes={sizes} priority={priority} className={`object-cover ${className}`} />;
  }
  if (!a) return null;
  return <GiftArt art={a} variant={image?.variant ?? variant ?? "box"} alt={text} className={`absolute inset-0 h-full w-full ${className}`} />;
}
