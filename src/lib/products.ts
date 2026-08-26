export type TeeColor = "black" | "white" | "grey" | "ice";
export type PrintKind = "wordmark" | "graphic" | "patch" | "stripe" | "quote";

export type Product = {
  slug: string;
  name: string;
  price: number;
  compareAt?: number;
  category: "men" | "women" | "unisex";
  collection: string;
  color: TeeColor;
  print: PrintKind;
  tag?: "NEW" | "LIMITED" | "SOLD OUT" | "RESTOCK";
  sizes: string[];
  description: string;
  details: string[];
};

export const PRODUCTS: Product[] = [
  {
    slug: "void-wordmark-tee-black",
    name: "VOID WORDMARK TEE",
    price: 68,
    category: "unisex",
    collection: "CORE",
    color: "black",
    print: "wordmark",
    tag: "NEW",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "The essential. 260gsm heavyweight cotton, boxy oversized fit, dropped shoulder. Puff-print wordmark across the chest.",
    details: [
      "260gsm 100% combed cotton",
      "Oversized boxy fit — size down for regular",
      "Puff-print front graphic",
      "Garment-dyed, enzyme washed",
      "Made to order — ships in 5–7 days",
    ],
  },
  {
    slug: "still-cold-tee-ice",
    name: "STILL COLD TEE",
    price: 72,
    category: "unisex",
    collection: "ARCTIC",
    color: "ice",
    print: "quote",
    tag: "LIMITED",
    sizes: ["S", "M", "L", "XL"],
    description:
      "Part of the ARCTIC capsule. Back print manifesto in condensed type, ice-grey pigment dye that fades with every wash.",
    details: [
      "240gsm cotton jersey",
      "Pigment-dyed for a faded vintage hand-feel",
      "Full back print + small chest hit",
      "Relaxed fit",
      "Limited run of 200 — won't restock",
    ],
  },
  {
    slug: "no-signal-tee-black",
    name: "NO SIGNAL GRAPHIC TEE",
    price: 64,
    category: "men",
    collection: "CORE",
    color: "black",
    print: "graphic",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "Static-glitch graphic across the back, small chest logo. Heavyweight boxy cut built to be lived in.",
    details: [
      "270gsm heavyweight cotton",
      "Screen-printed graphic, cracked-ink finish",
      "Boxy fit, ribbed collar",
      "Pre-shrunk",
    ],
  },
  {
    slug: "aurora-patch-tee-white",
    name: "AURORA PATCH TEE",
    price: 70,
    category: "women",
    collection: "ARCTIC",
    color: "white",
    print: "patch",
    tag: "NEW",
    sizes: ["XS", "S", "M", "L"],
    description:
      "Woven patch on the chest, clean off-white body. The quiet piece in a loud capsule.",
    details: [
      "220gsm combed cotton",
      "Woven chenille patch, chain-stitch border",
      "Cropped relaxed fit",
      "Side-seamed, no distortion after wash",
    ],
  },
  {
    slug: "grid-stripe-tee-grey",
    name: "GRID STRIPE TEE",
    price: 66,
    category: "unisex",
    collection: "CORE",
    color: "grey",
    print: "stripe",
    sizes: ["S", "M", "L", "XL"],
    description:
      "Engineered stripe across the chest referencing technical outerwear. Melange grey body.",
    details: [
      "250gsm cotton melange",
      "Engineered stripe panel",
      "Straight fit",
      "Reinforced neck tape",
    ],
  },
  {
    slug: "blackout-tee-black",
    name: "BLACKOUT TEE",
    price: 74,
    compareAt: 88,
    category: "men",
    collection: "BLACKOUT",
    color: "black",
    print: "wordmark",
    tag: "RESTOCK",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "Triple-black on triple-black. Tonal print, tonal stitching. As close to a void as fabric gets.",
    details: [
      "280gsm heavyweight cotton",
      "Tonal puff print, barely-there sheen",
      "Oversized fit",
      "Double-needle hem",
    ],
  },
  {
    slug: "waiting-room-tee-ice",
    name: "WAITING ROOM TEE",
    price: 70,
    category: "unisex",
    collection: "ARCTIC",
    color: "ice",
    print: "quote",
    sizes: ["S", "M", "L", "XL"],
    description:
      "\"I keep finding myself waiting for the world to change.\" Full chest typographic print, cold-wash finish.",
    details: [
      "240gsm cotton jersey",
      "Cold-wash for a worn-in feel from day one",
      "Oversized fit",
      "Ribbed crew neck",
    ],
  },
  {
    slug: "patch-logo-tee-white",
    name: "PATCH LOGO TEE",
    price: 62,
    category: "women",
    collection: "CORE",
    color: "white",
    print: "patch",
    sizes: ["XS", "S", "M", "L"],
    description:
      "Minimal chest patch, clean construction. The everyday layer under the heavier pieces.",
    details: [
      "220gsm combed cotton",
      "Embroidered chest patch",
      "Relaxed fit",
      "Pre-shrunk, colorfast",
    ],
  },
  {
    slug: "static-graphic-tee-grey",
    name: "STATIC GRAPHIC TEE",
    price: 68,
    category: "men",
    collection: "BLACKOUT",
    color: "grey",
    print: "graphic",
    tag: "LIMITED",
    sizes: ["M", "L", "XL", "XXL"],
    description:
      "All-over static graphic bleeding off the sleeves. Heavyweight and boxy, built for the drop.",
    details: [
      "270gsm heavyweight cotton",
      "All-over screen print",
      "Oversized boxy fit",
      "Limited run",
    ],
  },
];

export const COLLECTIONS = ["CORE", "ARCTIC", "BLACKOUT"] as const;

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function formatPrice(n: number) {
  return `$${n.toFixed(2)}`;
}
