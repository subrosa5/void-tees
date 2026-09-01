import { put, list } from "@vercel/blob";

/** The (store) layout's marquee (/about, /shipping, /size-guide) — separate
 * from the MEGA landing's own ticker in mega-store.ts. */
export type SiteSettings = {
  marqueeText: string;
};

export const DEFAULT_SETTINGS: SiteSettings = {
  marqueeText:
    "БЕСПЛАТНАЯ ДОСТАВКА ОТ 15 000 ₽ /// ДРОП 001 — MEGA /// ЛИМИТИРОВАННАЯ ПАРТИЯ — БЕЗ РЕСТОКА /// ТОЛЬКО ПЛОТНЫЙ ХЛОПОК /// ИЗГОТОВЛЕНИЕ НА ЗАКАЗ /// ФИРМА ВЕНИКОВ НЕ ВЯЖЕТ",
};

const STORE_PATH = "settings/settings.json";

async function findStoreUrl(): Promise<string | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null;
  try {
    const { blobs } = await list({ prefix: STORE_PATH, limit: 1 });
    const match = blobs.find((b) => b.pathname === STORE_PATH);
    return match?.url ?? null;
  } catch {
    return null;
  }
}

export async function getSettings(): Promise<SiteSettings> {
  const url = await findStoreUrl();
  if (!url) return DEFAULT_SETTINGS;
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return DEFAULT_SETTINGS;
    const data = (await res.json()) as Partial<SiteSettings>;
    return { ...DEFAULT_SETTINGS, ...data };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export async function saveSettings(settings: SiteSettings): Promise<void> {
  await put(STORE_PATH, JSON.stringify(settings, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    cacheControlMaxAge: 0,
  });
}
