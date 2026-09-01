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
    "STILL COLD. Плотные футболки в монохроме — никакого шума, только ткань, принт и пространство между ними.",
  marqueeText:
    "БЕСПЛАТНАЯ ДОСТАВКА ОТ 15 000 ₽ /// ДРОП 003 — КАПСУЛА ARCTIC /// ЛИМИТИРОВАННАЯ ПАРТИЯ — БЕЗ РЕСТОКА /// ТОЛЬКО ПЛОТНЫЙ ХЛОПОК /// ИЗГОТОВЛЕНИЕ НА ЗАКАЗ /// ФИРМА ВЕНИКОВ НЕ ВЯЖЕТ",
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
    slug: "void-wordmark-tee-black",
    name: "VOID WORDMARK TEE",
    price: 6990,
    category: "unisex",
    collection: "CORE",
    color: "black",
    print: "wordmark",
    tag: "NEW",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "Базовая модель. Плотный хлопок 260 г/м², оверсайз-крой, опущенная линия плеча. Объёмная печать логотипа на груди.",
    details: [
      "260 г/м², 100% чёсаный хлопок",
      "Оверсайз-крой — берите на размер меньше для обычной посадки",
      "Puff-принт на груди",
      "Гарм-дай, ферментная стирка",
      "Изготовление на заказ — отправка за 5–7 дней",
    ],
  },
  {
    slug: "still-cold-tee-ice",
    name: "STILL COLD TEE",
    price: 7490,
    category: "unisex",
    collection: "ARCTIC",
    color: "ice",
    print: "quote",
    tag: "LIMITED",
    sizes: ["S", "M", "L", "XL"],
    description:
      "Часть капсулы ARCTIC. Принт-манифест на спине, узкий гротеск, ледяной пигментный краситель, который выцветает с каждой стиркой.",
    details: [
      "240 г/м², хлопковый джерси",
      "Пигментное крашение для выгоревшего винтажного эффекта",
      "Полный принт на спине + небольшой акцент на груди",
      "Свободная посадка",
      "Лимитированная партия — 200 штук, без рестока",
    ],
  },
  {
    slug: "no-signal-tee-black",
    name: "NO SIGNAL GRAPHIC TEE",
    price: 6500,
    category: "men",
    collection: "CORE",
    color: "black",
    print: "graphic",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "Графика в стиле статичных помех на спине, небольшой логотип на груди. Плотный boxy-крой для повседневной носки.",
    details: [
      "270 г/м², плотный хлопок",
      "Шелкография, эффект потрескавшихся чернил",
      "Boxy-крой, рибана на воротнике",
      "Предварительная усадка ткани",
    ],
  },
  {
    slug: "aurora-patch-tee-white",
    name: "AURORA PATCH TEE",
    price: 7200,
    category: "women",
    collection: "ARCTIC",
    color: "white",
    print: "patch",
    tag: "NEW",
    sizes: ["XS", "S", "M", "L"],
    description:
      "Тканевая нашивка на груди, чистый молочно-белый цвет. Тихая вещь в громкой капсуле.",
    details: [
      "220 г/м², чёсаный хлопок",
      "Нашивка из шенилла, окантовка цепным стежком",
      "Укороченный свободный крой",
      "Боковые швы — не деформируется после стирки",
    ],
  },
  {
    slug: "grid-stripe-tee-grey",
    name: "GRID STRIPE TEE",
    price: 6800,
    category: "unisex",
    collection: "CORE",
    color: "grey",
    print: "stripe",
    sizes: ["S", "M", "L", "XL"],
    description:
      "Инженерная полоса на груди, отсылающая к технической верхней одежде. Меланжевый серый цвет.",
    details: [
      "250 г/м², хлопковый меланж",
      "Инженерная полоса-панель",
      "Прямой крой",
      "Усиленная лента на горловине",
    ],
  },
  {
    slug: "blackout-tee-black",
    name: "BLACKOUT TEE",
    price: 7600,
    compareAt: 9200,
    category: "men",
    collection: "BLACKOUT",
    color: "black",
    print: "wordmark",
    tag: "RESTOCK",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "Тройной чёрный на тройном чёрном. Тональный принт, тональная строчка. Ближе к пустоте ткань уже не бывает.",
    details: [
      "280 г/м², плотный хлопок",
      "Тональный puff-принт, едва заметный блеск",
      "Оверсайз-крой",
      "Двойная строчка по низу",
    ],
  },
  {
    slug: "waiting-room-tee-ice",
    name: "WAITING ROOM TEE",
    price: 7200,
    category: "unisex",
    collection: "ARCTIC",
    color: "ice",
    print: "quote",
    sizes: ["S", "M", "L", "XL"],
    description:
      "«Я всё жду, когда изменится мир». Крупный типографский принт на груди, эффект холодной стирки.",
    details: [
      "240 г/м², хлопковый джерси",
      "Эффект холодной стирки — потёртый вид с первого дня",
      "Оверсайз-крой",
      "Рибана на горловине",
    ],
  },
  {
    slug: "patch-logo-tee-white",
    name: "PATCH LOGO TEE",
    price: 6400,
    category: "women",
    collection: "CORE",
    color: "white",
    print: "patch",
    sizes: ["XS", "S", "M", "L"],
    description:
      "Минималистичная нашивка на груди, аккуратная конструкция. Повседневный слой под более тяжёлые вещи.",
    details: [
      "220 г/м², чёсаный хлопок",
      "Вышитая нашивка на груди",
      "Свободная посадка",
      "Предварительная усадка, стойкий цвет",
    ],
  },
  {
    slug: "static-graphic-tee-grey",
    name: "STATIC GRAPHIC TEE",
    price: 6900,
    category: "men",
    collection: "BLACKOUT",
    color: "grey",
    print: "graphic",
    tag: "LIMITED",
    sizes: ["M", "L", "XL", "XXL"],
    description:
      "Крупная графика статичных помех, переходящая на рукава. Плотный boxy-крой, создан специально для дропа.",
    details: [
      "270 г/м², плотный хлопок",
      "Принт на всю поверхность",
      "Оверсайз boxy-крой",
      "Лимитированная партия",
    ],
  },
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
