import type { ToneKey } from "@/lib/types";

export interface Tone { bg: string; bg2: string; surface: string; box: string; boxDark: string; ribbon: string; ink: string }

export const TONES: Record<ToneKey, Tone> = {
  ivory:     { bg: "#F1E9DB", bg2: "#E4D8C2", surface: "#DCCDB3", box: "#FBF7EF", boxDark: "#E9E0CF", ribbon: "#B08D4F", ink: "#4A3F36" },
  rose:      { bg: "#EBD2CC", bg2: "#DDB8B0", surface: "#CFA39B", box: "#F6E4DF", boxDark: "#E2C3BB", ribbon: "#8E4F52", ink: "#5A3A3B" },
  sage:      { bg: "#D8DDCD", bg2: "#C0C9B2", surface: "#AEB9A0", box: "#EEF1E5", boxDark: "#CDD5BE", ribbon: "#566852", ink: "#34412F" },
  champagne: { bg: "#EFE0C4", bg2: "#E0CBA2", surface: "#D2B988", box: "#FAF1DC", boxDark: "#E8D6AE", ribbon: "#8B6A2E", ink: "#4F3E1D" },
  charcoal:  { bg: "#45403B", bg2: "#2C2825", surface: "#1F1C1A", box: "#57504A", boxDark: "#3A3531", ribbon: "#CDAA68", ink: "#F3EBDD" },
  cocoa:     { bg: "#CBA88E", bg2: "#B28A6D", surface: "#9A7357", box: "#7C5442", boxDark: "#5E3E30", ribbon: "#F1E3C9", ink: "#3C2519" },
  blush:     { bg: "#F4DDD6", bg2: "#EBC8BE", surface: "#E0B5A9", box: "#FBEDE8", boxDark: "#EAD0C7", ribbon: "#B5736F", ink: "#5E3C38" },
};
