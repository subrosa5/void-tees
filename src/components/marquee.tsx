const ITEMS = [
  "БЕСПЛАТНАЯ ДОСТАВКА ОТ 15 000 ₽",
  "ДРОП 003 — КАПСУЛА ARCTIC",
  "ЛИМИТИРОВАННАЯ ПАРТИЯ — БЕЗ РЕСТОКА",
  "ТОЛЬКО ПЛОТНЫЙ ХЛОПОК",
  "ИЗГОТОВЛЕНИЕ НА ЗАКАЗ",
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
