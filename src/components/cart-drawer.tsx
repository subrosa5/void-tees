"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/components/cart-context";
import { PRODUCTS, formatPrice } from "@/lib/products";
import { TeeGraphic } from "@/components/tee-graphic";

export function CartDrawer() {
  const { isOpen, closeCart, lines, removeLine, setQty, subtotal } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        aria-label="Закрыть корзину"
        onClick={closeCart}
        className="absolute inset-0 bg-fg/60 cursor-pointer"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Корзина"
        className="relative flex h-full w-full max-w-md flex-col border-l-2 border-fg bg-bg"
      >
        <div className="flex items-center justify-between border-b-2 border-fg px-5 py-4">
          <h2 className="font-display text-2xl tracking-tight">ВАША КОРЗИНА</h2>
          <button
            type="button"
            onClick={closeCart}
            className="flex h-11 w-11 items-center justify-center border-2 border-fg cursor-pointer hover:bg-fg hover:text-bg transition-colors duration-150"
            aria-label="Закрыть корзину"
          >
            ✕
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="font-mono text-sm tracking-[0.1em] text-muted">
              КОРЗИНА ПУСТА
            </p>
            <Link
              href="/shop"
              onClick={closeCart}
              className="border-2 border-fg px-6 py-3 font-mono text-xs tracking-[0.15em] hover:bg-fg hover:text-bg transition-colors duration-150"
            >
              ПРОДОЛЖИТЬ ПОКУПКИ
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto divide-y-2 divide-fg">
              {lines.map((line) => {
                const product = PRODUCTS.find((p) => p.slug === line.slug);
                if (!product) return null;
                return (
                  <li key={`${line.slug}-${line.size}`} className="flex gap-4 px-5 py-4">
                    <div className="h-24 w-20 shrink-0 border-2 border-fg bg-hairline/30">
                      <TeeGraphic
                        color={product.color}
                        print={product.print}
                        name={product.name}
                        className="h-full w-full"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between min-w-0">
                      <div>
                        <p className="font-display text-base leading-tight truncate">
                          {product.name}
                        </p>
                        <p className="font-mono text-xs text-muted mt-1">
                          РАЗМЕР {line.size}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-fg">
                          <button
                            type="button"
                            className="h-8 w-8 cursor-pointer hover:bg-fg hover:text-bg transition-colors"
                            onClick={() => setQty(line.slug, line.size, line.qty - 1)}
                            aria-label="Уменьшить количество"
                          >
                            −
                          </button>
                          <span className="w-8 text-center font-mono text-sm">
                            {line.qty}
                          </span>
                          <button
                            type="button"
                            className="h-8 w-8 cursor-pointer hover:bg-fg hover:text-bg transition-colors"
                            onClick={() => setQty(line.slug, line.size, line.qty + 1)}
                            aria-label="Увеличить количество"
                          >
                            +
                          </button>
                        </div>
                        <span className="font-mono text-sm">
                          {formatPrice(product.price * line.qty)}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeLine(line.slug, line.size)}
                      className="self-start font-mono text-xs text-muted hover:text-fg cursor-pointer"
                      aria-label={`Удалить ${product.name}, размер ${line.size}`}
                    >
                      УДАЛИТЬ
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="border-t-2 border-fg px-5 py-5">
              <div className="flex items-center justify-between font-mono text-sm mb-1">
                <span>ПРОМЕЖУТОЧНЫЙ ИТОГ</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <p className="font-mono text-[10px] text-muted mb-4">
                ДОСТАВКА И НАЛОГИ РАССЧИТЫВАЮТСЯ ПРИ ОФОРМЛЕНИИ
              </p>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="block w-full border-2 border-fg bg-fg py-4 text-center font-mono text-xs tracking-[0.15em] text-bg hover:bg-bg hover:text-fg transition-colors duration-150"
              >
                ОФОРМИТЬ ЗАКАЗ
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
