"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { PRODUCTS, DEFAULT_SETTINGS, type Product, type SiteSettings } from "@/lib/products";

type StoreContextValue = {
  products: Product[];
  settings: SiteSettings;
};

/**
 * Client-side view of the live catalog + settings (admin edits included).
 * Seeded with the static defaults for an instant first paint, then swapped
 * for the current data fetched from `/api/store` once it lands — so a price
 * or photo an admin just changed shows up without a redeploy.
 */
const StoreContext = createContext<StoreContextValue>({
  products: PRODUCTS,
  settings: DEFAULT_SETTINGS,
});

export function StoreProvider({
  children,
  initialProducts,
  initialSettings,
}: {
  children: React.ReactNode;
  initialProducts?: Product[];
  initialSettings?: SiteSettings;
}) {
  const [data, setData] = useState<StoreContextValue>({
    products: initialProducts ?? PRODUCTS,
    settings: initialSettings ?? DEFAULT_SETTINGS,
  });

  useEffect(() => {
    // Skip the extra round trip when the server already handed us fresh data.
    if (initialProducts && initialSettings) return;
    let cancelled = false;
    fetch("/api/store")
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (!cancelled && json?.products && json?.settings) {
          setData({ products: json.products, settings: json.settings });
        }
      })
      .catch(() => {
        // network/blob hiccup — keep the seed defaults already shown
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <StoreContext.Provider value={data}>{children}</StoreContext.Provider>;
}

export function useStore() {
  return useContext(StoreContext);
}
