export type TeeColor = "black" | "white" | "grey" | "ice";
export type PrintKind = "wordmark" | "graphic" | "patch" | "stripe" | "quote";
export type Category = "men" | "women" | "unisex";
export type Tag = "NEW" | "LIMITED" | "SOLD_OUT" | "RESTOCK";

export type Product = {
  slug: string;
  name: string;
  price: number;
  compareAt?: number;
  category: Category;
  collection: string;
  color: TeeColor;
  print: PrintKind;
  tag?: Tag;
  sizes: string[];
  description: string;
  details: string[];
  /** Admin-uploaded product photo. Falls back to the illustrated TeeGraphic when unset. */
  image?: string;
  /** Extra gallery shots for the product page (front/back, different treatments). Falls back to just `image` when unset. */
  images?: string[];
};

export type SiteSettings = {
  heroTagline: string;
  marqueeText: string;
  freeShippingThreshold: number;
  flatShippingRate: number;
};

export const DEFAULT_SETTINGS: SiteSettings = {
  heroTagline:
    "MEGA. Плотные футболки в монохроме — никакого шума, только ткань, принт и пространство между ними.",
  marqueeText:
    "БЕСПЛАТНАЯ ДОСТАВКА ОТ 15 000 ₽ /// ДРОП 001 — MEGA /// ЛИМИТИРОВАННАЯ ПАРТИЯ — БЕЗ РЕСТОКА /// ТОЛЬКО ПЛОТНЫЙ ХЛОПОК /// ИЗГОТОВЛЕНИЕ НА ЗАКАЗ /// ФИРМА ВЕНИКОВ НЕ ВЯЖЕТ",
  freeShippingThreshold: 15000,
  flatShippingRate: 800,
};

export const CATEGORY_LABELS: Record<Category, string> = {
  men: "МУЖСКОЕ",
  women: "ЖЕНСКОЕ",
  unisex: "УНИСЕКС",
};

export const TAG_LABELS: Record<Tag, string> = {
  NEW: "НОВИНКА",
  LIMITED: "ЛИМИТ",
  SOLD_OUT: "РАСПРОДАНО",
  RESTOCK: "РЕСТОК",
};

/**
 * Seed catalog. Used as the starting point the first time the Blob store is
 * written, and as a fallback if Blob storage isn't configured yet. Once the
 * store exists, live data (including admin price/photo edits) comes from
 * `getStoreData()` in `blob-store.ts` instead of this array.
 */
export const PRODUCTS: Product[] = [
  {
    slug: "mega-evpatoria-tee-black",
    name: "MEGA EVPATORIA TEE",
    price: 6990,
    category: "unisex",
    collection: "MEGA",
    color: "black",
    print: "wordmark",
    tag: "NEW",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "Настоящий дроп, не рендер. Акроним на груди, крупный вордмарк на спине — локальная гордость, оверсайз-крой, плотный хлопок.",
    details: [
      "260 г/м², плотный хлопковый трикотаж",
      "Вышивка на груди, шелкография на спине",
      "Оверсайз-крой, опущенная линия плеча",
      "Фото — реальный образец, не иллюстрация",
    ],
    image: "/products/mega-front-atmospheric.jpg",
    images: [
      "/products/mega-front-atmospheric.jpg",
      "/products/mega-back-atmospheric.jpg",
      "/products/mega-front-clean.jpg",
      "/products/mega-back-clean.jpg",
    ],
  },
];

export const COLLECTIONS = ["CORE", "ARCTIC", "BLACKOUT", "MEGA"] as const;

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function formatPrice(n: number) {
  return `${n.toLocaleString("ru-RU")} ₽`;
}
