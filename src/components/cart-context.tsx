"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useStore } from "@/lib/store-context";
import type { Product } from "@/lib/products";

export type CartLine = {
  slug: string;
  size: string;
  qty: number;
};

type CartContextValue = {
  lines: CartLine[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (slug: string, size: string, qty?: number) => void;
  removeLine: (slug: string, size: string) => void;
  setQty: (slug: string, size: string, qty: number) => void;
  count: number;
  subtotal: number;
  lastAdded: string | null;
  /** Current catalog (live admin edits included) — for looking up line-item details. */
  products: Product[];
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "void-tees-cart-v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { products } = useStore();
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // One-time hydration from localStorage on mount. This is the standard
    // pattern for client-only persisted state (localStorage doesn't exist
    // during SSR), so the setState-in-effect here is intentional.
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setLines(JSON.parse(raw));
    } catch {
      // ignore corrupt/blocked storage — cart just starts empty
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // storage unavailable — cart stays session-only
    }
  }, [lines, hydrated]);

  const addItem = useCallback((slug: string, size: string, qty = 1) => {
    setLines((prev) => {
      const idx = prev.findIndex((l) => l.slug === slug && l.size === size);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + qty };
        return next;
      }
      return [...prev, { slug, size, qty }];
    });
    setLastAdded(slug);
    setIsOpen(true);
  }, []);

  const removeLine = useCallback((slug: string, size: string) => {
    setLines((prev) => prev.filter((l) => !(l.slug === slug && l.size === size)));
  }, []);

  const setQty = useCallback((slug: string, size: string, qty: number) => {
    setLines((prev) => {
      if (qty <= 0) return prev.filter((l) => !(l.slug === slug && l.size === size));
      return prev.map((l) =>
        l.slug === slug && l.size === size ? { ...l, qty } : l
      );
    });
  }, []);

  const count = useMemo(() => lines.reduce((n, l) => n + l.qty, 0), [lines]);

  const subtotal = useMemo(
    () =>
      lines.reduce((sum, l) => {
        const p = products.find((prod) => prod.slug === l.slug);
        return sum + (p ? p.price * l.qty : 0);
      }, 0),
    [lines, products]
  );

  const value: CartContextValue = {
    lines,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    addItem,
    removeLine,
    setQty,
    count,
    subtotal,
    lastAdded,
    products,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
