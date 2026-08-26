import type { Metadata } from "next";

export const metadata: Metadata = { title: "Shipping & Returns — VOID." };

export default function ShippingPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-4xl sm:text-5xl tracking-tight mb-8">
        SHIPPING &amp; RETURNS
      </h1>
      <div className="space-y-8 text-sm leading-relaxed">
        <div>
          <h2 className="font-mono text-xs tracking-[0.1em] mb-2">SHIPPING</h2>
          <p>
            Every tee is made to order and ships within 5–7 business days.
            Free shipping on orders over $150; otherwise a flat $8 rate
            applies at checkout.
          </p>
        </div>
        <div>
          <h2 className="font-mono text-xs tracking-[0.1em] mb-2">RETURNS</h2>
          <p>
            Unworn, unwashed pieces in original condition can be returned
            within 15 days of delivery. Limited-run and capsule pieces
            marked &ldquo;LIMITED&rdquo; are final sale.
          </p>
        </div>
        <div className="border-t border-hairline pt-6 font-mono text-xs text-muted">
          This is a demo storefront — no shipments or returns are actually
          processed.
        </div>
      </div>
    </div>
  );
}
