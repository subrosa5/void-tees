const ITEMS = [
  "FREE SHIPPING OVER $150",
  "DROP 003 — ARCTIC CAPSULE",
  "LIMITED RUN — WON'T RESTOCK",
  "HEAVYWEIGHT COTTON, ALWAYS",
  "MADE TO ORDER",
];

export function Marquee() {
  const line = ITEMS.join("   ///   ") + "   ///   ";
  return (
    <div
      className="w-full overflow-hidden border-b-2 border-fg bg-fg text-bg py-2"
      aria-hidden="true"
    >
      <div className="flex whitespace-nowrap font-mono text-[11px] tracking-[0.15em] marquee-track motion-reduce:animate-none">
        <span className="pr-0">{line}</span>
        <span className="pr-0">{line}</span>
      </div>
    </div>
  );
}
