"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart-context";
import { PRODUCTS, formatPrice } from "@/lib/products";

export default function CheckoutPage() {
  const { lines, subtotal } = useCart();
  const [placed, setPlaced] = useState(false);

  const shipping = subtotal > 150 || subtotal === 0 ? 0 : 8;
  const total = subtotal + shipping;

  if (placed) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 sm:px-6 text-center">
        <p className="font-mono text-xs tracking-[0.15em] text-muted mb-4">
          DEMO ONLY — NO CHARGE WAS MADE
        </p>
        <h1 className="font-display text-4xl sm:text-5xl tracking-tight mb-4">
          ORDER SIMULATED
        </h1>
        <p className="text-sm mb-8">
          This is a design preview. In a live store this screen would hand off
          to a real payment processor. Nothing was charged and no order was
          created.
        </p>
        <Link
          href="/shop"
          className="inline-block border-2 border-fg px-6 py-3 font-mono text-xs tracking-[0.15em] hover:bg-fg hover:text-bg transition-colors duration-150"
        >
          CONTINUE SHOPPING
        </Link>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 sm:px-6 text-center">
        <h1 className="font-display text-4xl tracking-tight mb-4">YOUR BAG IS EMPTY</h1>
        <Link
          href="/shop"
          className="inline-block border-2 border-fg px-6 py-3 font-mono text-xs tracking-[0.15em] hover:bg-fg hover:text-bg transition-colors duration-150"
        >
          SHOP TEES
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="mb-6 border-2 border-fg bg-hairline/30 px-4 py-3 font-mono text-[11px] tracking-[0.1em]">
        DEMO STOREFRONT — THIS CHECKOUT DOES NOT PROCESS REAL PAYMENTS.
      </div>

      <h1 className="font-display text-4xl sm:text-5xl tracking-tight mb-8">CHECKOUT</h1>

      <div className="grid gap-10 md:grid-cols-2">
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            setPlaced(true);
          }}
        >
          <div>
            <span className="font-mono text-xs tracking-[0.1em] block mb-3">CONTACT</span>
            <input
              type="email"
              required
              placeholder="EMAIL"
              className="w-full border-2 border-fg bg-bg px-3 py-3 font-mono text-sm placeholder:text-muted focus:outline-none"
            />
          </div>

          <div>
            <span className="font-mono text-xs tracking-[0.1em] block mb-3">SHIPPING ADDRESS</span>
            <div className="grid grid-cols-2 gap-3">
              <input required placeholder="FIRST NAME" className="border-2 border-fg bg-bg px-3 py-3 font-mono text-sm placeholder:text-muted focus:outline-none col-span-1" />
              <input required placeholder="LAST NAME" className="border-2 border-fg bg-bg px-3 py-3 font-mono text-sm placeholder:text-muted focus:outline-none col-span-1" />
              <input required placeholder="ADDRESS" className="border-2 border-fg bg-bg px-3 py-3 font-mono text-sm placeholder:text-muted focus:outline-none col-span-2" />
              <input required placeholder="CITY" className="border-2 border-fg bg-bg px-3 py-3 font-mono text-sm placeholder:text-muted focus:outline-none col-span-1" />
              <input required placeholder="POSTAL CODE" className="border-2 border-fg bg-bg px-3 py-3 font-mono text-sm placeholder:text-muted focus:outline-none col-span-1" />
            </div>
          </div>

          <div>
            <span className="font-mono text-xs tracking-[0.1em] block mb-3">PAYMENT (SIMULATED)</span>
            <input
              disabled
              placeholder="CARD NUMBER — DISABLED IN DEMO"
              className="w-full border-2 border-hairline bg-hairline/20 px-3 py-3 font-mono text-sm text-muted placeholder:text-muted cursor-not-allowed"
            />
          </div>

          <button
            type="submit"
            className="w-full border-2 border-fg bg-fg py-4 font-mono text-xs tracking-[0.15em] text-bg hover:bg-bg hover:text-fg transition-colors duration-150 cursor-pointer"
          >
            PLACE DEMO ORDER — {formatPrice(total)}
          </button>
        </form>

        <div>
          <span className="font-mono text-xs tracking-[0.1em] block mb-4">ORDER SUMMARY</span>
          <ul className="divide-y-2 divide-fg border-2 border-fg mb-4">
            {lines.map((line) => {
              const product = PRODUCTS.find((p) => p.slug === line.slug);
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
              <span>SUBTOTAL</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>SHIPPING</span>
              <span>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between border-t-2 border-fg pt-2 text-base">
              <span>TOTAL</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
