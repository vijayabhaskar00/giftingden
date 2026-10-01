import type { Product } from "@/lib/types";

/** Drops heavy fields the grid never reads, to keep the client payload small. */
export const slimForGrid = (p: Product): Product => ({ ...p, description: "", gallery: [], images: p.images.slice(0, 2) });
