import { put, list } from "@vercel/blob";
import { PRODUCTS, DEFAULT_SETTINGS, type Product, type SiteSettings } from "@/lib/products";

export type StoreData = {
  products: Product[];
  settings: SiteSettings;
};

const STORE_PATH = "store/store.json";

function seedData(): StoreData {
  return { products: PRODUCTS, settings: DEFAULT_SETTINGS };
}

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

/**
 * Reads the current catalog + settings. Falls back to the static seed data
 * when Blob storage isn't configured yet, or nothing has been saved yet —
 * so the site works out of the box before an admin ever logs in.
 */
export async function getStoreData(): Promise<StoreData> {
  const url = await findStoreUrl();
  if (!url) return seedData();

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return seedData();
    const data = (await res.json()) as Partial<StoreData>;
    if (!data.products || !data.settings) return seedData();
    return { products: data.products, settings: data.settings };
  } catch {
    return seedData();
  }
}

export async function saveStoreData(data: StoreData): Promise<void> {
  await put(STORE_PATH, JSON.stringify(data, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    cacheControlMaxAge: 0,
  });
}

export async function updateProductPrice(slug: string, price: number): Promise<StoreData> {
  const data = await getStoreData();
  data.products = data.products.map((p) => (p.slug === slug ? { ...p, price } : p));
  await saveStoreData(data);
  return data;
}

export async function updateProductImage(slug: string, imageUrl: string): Promise<StoreData> {
  const data = await getStoreData();
  data.products = data.products.map((p) => (p.slug === slug ? { ...p, image: imageUrl } : p));
  await saveStoreData(data);
  return data;
}

export async function updateSettings(settings: SiteSettings): Promise<StoreData> {
  const data = await getStoreData();
  data.settings = settings;
  await saveStoreData(data);
  return data;
}

export async function uploadProductImage(slug: string, file: File): Promise<string> {
  const ext = (file.type.split("/")[1] || "jpg").replace("jpeg", "jpg");
  const blob = await put(`products/${slug}-${Date.now()}.${ext}`, file, {
    access: "public",
    contentType: file.type || undefined,
  });
  return blob.url;
}
