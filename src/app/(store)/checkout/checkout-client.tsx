"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart-context";
import { formatPrice } from "@/lib/products";

export function CheckoutClient({
  freeShippingThreshold,
  flatShippingRate,
}: {
  freeShippingThreshold: number;
  flatShippingRate: number;
}) {
  const { lines, subtotal, products } = useCart();
  const [placed, setPlaced] = useState(false);

  const shipping = subtotal > freeShippingThreshold || subtotal === 0 ? 0 : flatShippingRate;
  const total = subtotal + shipping;

  if (placed) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 sm:px-6 text-center">
        <p className="font-mono text-xs tracking-[0.15em] text-muted mb-4">
          ТОЛЬКО ДЕМО — СПИСАНИЯ НЕ БЫЛО
        </p>
        <h1 className="font-display text-4xl sm:text-5xl tracking-tight mb-4">
          ЗАКАЗ СИМУЛИРОВАН
        </h1>
        <p className="text-sm mb-8">
          Это дизайн-превью. В реальном магазине этот экран передавал бы
          данные настоящему платёжному провайдеру. Списаний не было, заказ
          не создан.
        </p>
        <Link
          href="/shop"
          className="inline-block border-2 border-fg px-6 py-3 font-mono text-xs tracking-[0.15em] hover:bg-fg hover:text-bg transition-colors duration-150"
        >
          ПРОДОЛЖИТЬ ПОКУПКИ
        </Link>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 sm:px-6 text-center">
        <h1 className="font-display text-4xl tracking-tight mb-4">КОРЗИНА ПУСТА</h1>
        <Link
          href="/shop"
          className="inline-block border-2 border-fg px-6 py-3 font-mono text-xs tracking-[0.15em] hover:bg-fg hover:text-bg transition-colors duration-150"
        >
          В КАТАЛОГ
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="mb-6 border-2 border-fg bg-hairline/30 px-4 py-3 font-mono text-[11px] tracking-[0.1em]">
        ДЕМО-ВИТРИНА — ЭТОТ ЧЕКАУТ НЕ ПРОВОДИТ РЕАЛЬНЫЕ ПЛАТЕЖИ.
      </div>

      <h1 className="font-display text-4xl sm:text-5xl tracking-tight mb-8">ОФОРМЛЕНИЕ ЗАКАЗА</h1>

      <div className="grid gap-10 md:grid-cols-2">
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            setPlaced(true);
          }}
        >
          <div>
            <span className="font-mono text-xs tracking-[0.1em] block mb-3">КОНТАКТЫ</span>
            <input
              type="email"
              required
              placeholder="EMAIL"
              className="w-full border-2 border-fg bg-bg px-3 py-3 font-mono text-sm placeholder:text-muted focus:outline-none"
            />
          </div>

          <div>
            <span className="font-mono text-xs tracking-[0.1em] block mb-3">АДРЕС ДОСТАВКИ</span>
            <div className="grid grid-cols-2 gap-3">
              <input required placeholder="ИМЯ" className="border-2 border-fg bg-bg px-3 py-3 font-mono text-sm placeholder:text-muted focus:outline-none col-span-1" />
              <input required placeholder="ФАМИЛИЯ" className="border-2 border-fg bg-bg px-3 py-3 font-mono text-sm placeholder:text-muted focus:outline-none col-span-1" />
              <input required placeholder="АДРЕС" className="border-2 border-fg bg-bg px-3 py-3 font-mono text-sm placeholder:text-muted focus:outline-none col-span-2" />
              <input required placeholder="ГОРОД" className="border-2 border-fg bg-bg px-3 py-3 font-mono text-sm placeholder:text-muted focus:outline-none col-span-1" />
              <input required placeholder="ИНДЕКС" className="border-2 border-fg bg-bg px-3 py-3 font-mono text-sm placeholder:text-muted focus:outline-none col-span-1" />
            </div>
          </div>

          <div>
            <span className="font-mono text-xs tracking-[0.1em] block mb-3">ОПЛАТА (СИМУЛЯЦИЯ)</span>
            <input
              disabled
              placeholder="НОМЕР КАРТЫ — ОТКЛЮЧЕНО В ДЕМО"
              className="w-full border-2 border-hairline bg-hairline/20 px-3 py-3 font-mono text-sm text-muted placeholder:text-muted cursor-not-allowed"
            />
          </div>

          <button
            type="submit"
            className="w-full border-2 border-fg bg-fg py-4 font-mono text-xs tracking-[0.15em] text-bg hover:bg-bg hover:text-fg transition-colors duration-150 cursor-pointer"
          >
            ОФОРМИТЬ ДЕМО-ЗАКАЗ — {formatPrice(total)}
          </button>
        </form>

        <div>
          <span className="font-mono text-xs tracking-[0.1em] block mb-4">ВАШ ЗАКАЗ</span>
          <ul className="divide-y-2 divide-fg border-2 border-fg mb-4">
            {lines.map((line) => {
              const product = products.find((p) => p.slug === line.slug);
              if (!product) return null;
              return (
                <li key={`${line.slug}-${line.size}`} className="flex items-center justify-between px-4 py-3 font-mono text-sm">
                  <span>
                    {product.name} — {line.size} × {line.qty}
                  </span>
                  <span>{formatPrice(product.price * line.qty)}</span>
                </li>
              );
            })}
          </ul>
          <div className="space-y-2 font-mono text-sm">
            <div className="flex justify-between">
              <span>ПРОМЕЖУТОЧНЫЙ ИТОГ</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>ДОСТАВКА</span>
              <span>{shipping === 0 ? "БЕСПЛАТНО" : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between border-t-2 border-fg pt-2 text-base">
              <span>ИТОГО</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
