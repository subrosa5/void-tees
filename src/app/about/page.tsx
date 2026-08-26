import type { Metadata } from "next";
import Link from "next/link";
import { BrushField } from "@/components/brush-field";

export const metadata: Metadata = {
  title: "About — VOID.",
  description: "The story behind VOID.",
};

export default function AboutPage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b-2 border-fg bg-fg text-bg">
        <BrushField className="absolute inset-0 h-full w-full" />
        <div className="relative mx-auto max-w-[1600px] px-4 py-20 sm:px-6">
          <p className="font-mono text-xs tracking-[0.15em] opacity-60 mb-4">ABOUT</p>
          <h1 className="font-display text-5xl sm:text-7xl tracking-tight leading-[0.9]">
            NOTHING LASTS.
            <br />
            EVERYTHING RETURNS.
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 space-y-6 text-sm leading-relaxed">
        <p>
          VOID. started as one boxy tee, printed in a friend&rsquo;s garage,
          sold out of a duffel bag at shows. No mood boards, no seasons —
          just heavyweight cotton, one print at a time.
        </p>
        <p>
          Every drop is small on purpose. We run a piece until the fabric is
          gone, then it&rsquo;s gone. No pre-orders, no restocked &ldquo;limited
          editions.&rdquo; If you see it, that&rsquo;s the only time you&rsquo;ll
          see it.
        </p>
        <p>
          The palette stays monochrome because the print should do the
          talking — black, white, grey, and the occasional ice-blue for the
          ARCTIC capsule. Nothing else gets in the way.
        </p>
        <p className="font-mono text-xs tracking-[0.1em] text-muted pt-4 border-t border-hairline">
          This site is an independent, unaffiliated design concept and demo
          storefront — no real orders are processed.
        </p>
      </section>

      <section className="border-t-2 border-fg bg-hairline/20">
        <div className="mx-auto max-w-[1600px] px-4 py-16 sm:px-6 text-center">
          <h2 className="font-display text-3xl sm:text-4xl tracking-tight mb-6">
            READY TO WEAR THE SILENCE?
          </h2>
          <Link
            href="/shop"
            className="inline-block border-2 border-fg px-8 py-4 font-mono text-xs tracking-[0.15em] hover:bg-fg hover:text-bg transition-colors duration-150"
          >
            SHOP ALL TEES
          </Link>
        </div>
      </section>
    </div>
  );
}
