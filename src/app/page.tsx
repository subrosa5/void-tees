import Link from "next/link";
import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { TeeGraphic } from "@/components/tee-graphic";
import { BrushField } from "@/components/brush-field";
import { TruckIcon, ReturnIcon, BadgeIcon, LockIcon } from "@/components/icons";

const NEW_ARRIVALS = PRODUCTS.filter((p) => p.tag === "NEW" || p.tag === "LIMITED").slice(0, 4);

const CATEGORY_TILES = [
  { label: "MEN", href: "/shop?category=men", product: PRODUCTS.find((p) => p.category === "men")! },
  { label: "WOMEN", href: "/shop?category=women", product: PRODUCTS.find((p) => p.category === "women")! },
  { label: "UNISEX", href: "/shop?category=unisex", product: PRODUCTS.find((p) => p.category === "unisex")! },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b-2 border-fg bg-fg text-bg">
        <BrushField className="absolute inset-0 h-full w-full" />
        <div className="relative mx-auto max-w-[1600px] px-4 pt-14 pb-10 sm:px-6 sm:pt-20">
          <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.15em] opacity-70 mb-6">
            <span>FASHION FOR THE QUIET HOURS</span>
            <span className="hidden sm:inline">DROP 003 — ARCTIC</span>
          </div>

          <h1 className="font-display leading-[0.82] tracking-tight text-[20vw] sm:text-[16vw] md:text-[13rem] select-none">
            VOID<span className="opacity-70">.</span>
          </h1>

          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-md font-mono text-sm tracking-[0.05em] opacity-80">
              STILL COLD. Heavyweight tees built in monochrome — no noise,
              just fabric, print, and the space between.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/shop"
                className="border-2 border-bg bg-bg px-6 py-3 font-mono text-xs tracking-[0.15em] text-fg hover:bg-fg hover:text-bg transition-colors duration-150"
              >
                SHOP NOW
              </Link>
              <Link
                href="/shop?collection=ARCTIC"
                className="border-2 border-bg px-6 py-3 font-mono text-xs tracking-[0.15em] hover:bg-bg hover:text-fg transition-colors duration-150"
              >
                EXPLORE ARCTIC
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY TILES */}
      <section className="border-b-2 border-fg bg-fg text-bg">
        <div className="grid grid-cols-1 divide-y-2 divide-bg/30 sm:grid-cols-3 sm:divide-x-2 sm:divide-y-0">
          {CATEGORY_TILES.map((tile) => (
            <Link
              key={tile.label}
              href={tile.href}
              className="group flex items-center gap-4 px-6 py-8 hover:bg-bg hover:text-fg transition-colors duration-200"
            >
              <div className="h-20 w-16 shrink-0 border border-bg/40 group-hover:border-fg/40 bg-bg/5">
                <TeeGraphic
                  color={tile.product.color}
                  print={tile.product.print}
                  name={tile.product.name}
                  className="h-full w-full"
                />
              </div>
              <div>
                <div className="font-display text-2xl tracking-tight">{tile.label}</div>
                <div className="font-mono text-xs tracking-[0.1em] opacity-60 group-hover:opacity-80">
                  SHOP {tile.label} →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="mx-auto max-w-[1600px] px-4 py-14 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-4xl sm:text-5xl tracking-tight">NEW ARRIVALS</h2>
          <Link href="/shop" className="font-mono text-xs tracking-[0.15em] hover:opacity-60 whitespace-nowrap">
            VIEW ALL →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
          {NEW_ARRIVALS.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      {/* EDITORIAL / MANIFESTO */}
      <section className="relative overflow-hidden border-y-2 border-fg bg-fg text-bg">
        <BrushField className="absolute inset-0 h-full w-full" invert={false} />
        <div className="relative mx-auto max-w-[1600px] px-4 py-20 sm:px-6 grid gap-10 md:grid-cols-2 md:items-center">
          <div className="h-64 sm:h-80 md:h-96 border-2 border-bg/40 bg-bg/5 mx-auto w-48 sm:w-56 md:w-64">
            <TeeGraphic
              color="ice"
              print="quote"
              name="Still Cold Tee"
              className="h-full w-full"
            />
          </div>
          <div>
            <p className="font-mono text-xs tracking-[0.15em] opacity-60 mb-4">
              ARCTIC CAPSULE — 03
            </p>
            <blockquote className="font-display text-3xl sm:text-5xl leading-[0.95] tracking-tight mb-6">
              &ldquo;I KEEP FINDING MYSELF WAITING FOR THE WORLD TO CHANGE.&rdquo;
            </blockquote>
            <p className="max-w-md font-mono text-sm opacity-70 mb-8">
              Cold-wash pigment dye. Condensed type across the back.
              Two hundred pieces, then it&rsquo;s gone for good.
            </p>
            <Link
              href="/shop?collection=ARCTIC"
              className="inline-block border-2 border-bg px-6 py-3 font-mono text-xs tracking-[0.15em] hover:bg-bg hover:text-fg transition-colors duration-150"
            >
              SHOP THE CAPSULE
            </Link>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="mx-auto max-w-[1600px] px-4 py-10 sm:px-6">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4">
          {[
            { icon: TruckIcon, title: "MADE TO ORDER", copy: "Ships in 5–7 days" },
            { icon: ReturnIcon, title: "EASY RETURNS", copy: "Within 15 days" },
            { icon: BadgeIcon, title: "QUALITY ASSURED", copy: "260gsm+ heavyweight cotton" },
            { icon: LockIcon, title: "DEMO CHECKOUT", copy: "Preview only — no real payment" },
          ].map(({ icon: Icon, title, copy }) => (
            <div key={title} className="flex flex-col items-start gap-2">
              <Icon className="h-6 w-6" />
              <div className="font-mono text-xs tracking-[0.1em]">{title}</div>
              <div className="font-mono text-[11px] text-muted">{copy}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
