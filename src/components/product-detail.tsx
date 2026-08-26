"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart-context";
import { TeeGraphic } from "@/components/tee-graphic";
import { formatPrice, TAG_LABELS, type Product } from "@/lib/products";

export function ProductDetail({ product }: { product: Product }) {
  const [size, setSize] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const { addItem } = useCart();

  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div className="border-2 border-fg bg-hairline/30 aspect-[4/5]">
        <TeeGraphic
          color={product.color}
          print={product.print}
          name={product.name}
          className="h-full w-full"
        />
      </div>

      <div>
        <div className="font-mono text-xs tracking-[0.15em] text-muted mb-2">
          {product.collection}
          {product.tag ? ` — ${TAG_LABELS[product.tag]}` : ""}
        </div>
        <h1 className="font-display text-4xl sm:text-5xl tracking-tight leading-[0.95] mb-4">
          {product.name}
        </h1>
        <div className="flex items-center gap-3 font-mono text-lg mb-6">
          <span>{formatPrice(product.price)}</span>
          {product.compareAt && (
            <span className="text-muted line-through text-sm">
              {formatPrice(product.compareAt)}
            </span>
          )}
        </div>

        <p className="text-sm leading-relaxed mb-8 max-w-md">{product.description}</p>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-xs tracking-[0.1em]">РАЗМЕР</span>
            <Link
              href="/size-guide"
              className="font-mono text-[11px] tracking-[0.1em] text-muted hover:text-fg underline underline-offset-2"
            >
              ТАБЛИЦА РАЗМЕРОВ
            </Link>
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Выбор размера">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setSize(s);
                  setError(false);
                }}
                aria-pressed={size === s}
                className={`h-11 min-w-11 border-2 border-fg px-3 font-mono text-xs cursor-pointer transition-colors duration-150 ${
                  size === s ? "bg-fg text-bg" : "hover:bg-fg hover:text-bg"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          {error && (
            <p role="alert" className="mt-2 font-mono text-xs text-danger">
              ВЫБЕРИТЕ РАЗМЕР
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={() => {
            if (!size) {
              setError(true);
              return;
            }
            addItem(product.slug, size);
          }}
          className="w-full border-2 border-fg bg-fg py-4 font-mono text-xs tracking-[0.15em] text-bg hover:bg-bg hover:text-fg transition-colors duration-150 cursor-pointer sm:w-auto sm:px-10"
        >
          ДОБАВИТЬ В КОРЗИНУ
        </button>

        <div className="mt-10 border-t-2 border-fg pt-6">
          <span className="font-mono text-xs tracking-[0.1em] block mb-3">ХАРАКТЕРИСТИКИ</span>
          <ul className="space-y-2">
            {product.details.map((d) => (
              <li key={d} className="flex gap-2 text-sm">
                <span aria-hidden="true">—</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
