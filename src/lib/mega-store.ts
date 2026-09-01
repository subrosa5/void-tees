import { put, list } from "@vercel/blob";

export type MegaData = {
  heroImage: string;
  productImageFront: string;
  productImageBack: string;
  productName: string;
  price: number;
  /** The landing's own scrolling ticker, right under the hero — separate
   * from SiteSettings.marqueeText, which only covers the old /shop, /about
   * etc. pages. One phrase, repeated across the loop. */
  tickerText: string;
};

const STORE_PATH = "mega/mega.json";

/** Ships with the landing page — what content/mega-drop.html shows until an
 * admin overrides a field. */
export const DEFAULT_MEGA_DATA: MegaData = {
  heroImage: "/mega-assets/hero.png",
  productImageFront: "/mega-assets/product-front.jpg",
  productImageBack: "/mega-assets/product-back.jpg",
  productName: "MAKE ЕВПАТОРИЯ GREAT AGAIN",
  price: 5000,
  tickerText: "ФУТБОЛКИ С ДУШОЙ",
};

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

export async function getMegaData(): Promise<MegaData> {
  const url = await findStoreUrl();
  if (!url) return DEFAULT_MEGA_DATA;
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return DEFAULT_MEGA_DATA;
    const data = (await res.json()) as Partial<MegaData>;
    return { ...DEFAULT_MEGA_DATA, ...data };
  } catch {
    return DEFAULT_MEGA_DATA;
  }
}

export async function saveMegaData(data: MegaData): Promise<void> {
  await put(STORE_PATH, JSON.stringify(data, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    cacheControlMaxAge: 0,
  });
}

export async function uploadMegaImage(file: File, name: string): Promise<string> {
  const ext = (file.type.split("/")[1] || "jpg").replace("jpeg", "jpg");
  const blob = await put(`mega/${name}-${Date.now()}.${ext}`, file, {
    access: "public",
    contentType: file.type || undefined,
  });
  return blob.url;
}
