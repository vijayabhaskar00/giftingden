"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import SearchOverlay from "./SearchOverlay";
import type { SearchDoc } from "./types";

interface Ctx { open: () => void; close: () => void; isOpen: boolean }
const SearchContext = createContext<Ctx | null>(null);

export const useSearch = () => {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearch must be used inside <SearchProvider>");
  return ctx;
};

export default function SearchProvider({ docs, children }: { docs: SearchDoc[]; children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);
  const value = useMemo(() => ({ open, close, isOpen }), [open, close, isOpen]);
  return (
    <SearchContext.Provider value={value}>
      {children}
      {isOpen && <SearchOverlay docs={docs} onClose={close} />}
    </SearchContext.Provider>
  );
}
