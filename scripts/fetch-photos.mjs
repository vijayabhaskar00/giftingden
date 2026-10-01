// Downloads every photo in lib/photos.ts and writes compressed WebP files to public/photos.
// Usage: node scripts/fetch-photos.mjs   (then build with NEXT_PUBLIC_LOCAL_PHOTOS=1)
import { readFile, mkdir, writeFile } from "node:fs/promises";
import sharp from "sharp";

const src = await readFile(new URL("../lib/photos.ts", import.meta.url), "utf8");
const cdn = src.match(/const CDN = "([^"]+)"/)[1];
const files = [...src.matchAll(/^\s*"?([\w-]+)"?: "(hf_[^"]+)"/gm)].map((m) => [m[1], m[2]]);
await mkdir(new URL("../public/photos/", import.meta.url), { recursive: true });
for (const [key, file] of files) {
  const res = await fetch(`${cdn}${file}.png`);
  if (!res.ok) throw new Error(`${key}: ${res.status}`);
  const out = await sharp(Buffer.from(await res.arrayBuffer())).resize({ width: 1000, withoutEnlargement: true }).webp({ quality: 78 }).toBuffer();
  await writeFile(new URL(`../public/photos/${key}.webp`, import.meta.url), out);
  console.log(key, Math.round(out.length / 1024) + " KB");
}
