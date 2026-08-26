import type { Metadata } from "next";
import Link from "next/link";
import { BrushField } from "@/components/brush-field";

export const metadata: Metadata = {
  title: "О бренде — VOID.",
  description: "История бренда VOID.",
};

export default function AboutPage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b-2 border-fg bg-fg text-bg">
        <BrushField className="absolute inset-0 h-full w-full" />
        <div className="relative mx-auto max-w-[1600px] px-4 py-20 sm:px-6">
          <p className="font-mono text-xs tracking-[0.15em] opacity-60 mb-4">О БРЕНДЕ</p>
          <h1 className="font-display text-5xl sm:text-7xl tracking-tight leading-[0.9]">
            НИЧТО НЕ ВЕЧНО.
            <br />
            ВСЁ ВОЗВРАЩАЕТСЯ.
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 space-y-6 text-sm leading-relaxed">
        <p>
          VOID. начинался с одной boxy-футболки, напечатанной в гараже у
          друга, и продавался из спортивной сумки на концертах. Никаких
          мудбордов, никаких сезонов — только плотный хлопок и один принт
          за раз.
        </p>
        <p>
          Каждый дроп маленький — намеренно. Мы выпускаем вещь, пока не
          закончится ткань, а потом её больше нет. Никаких предзаказов,
          никаких «лимитированных» рестоков. Если вы её увидели — это
          единственный раз, когда вы её увидите.
        </p>
        <p>
          Палитра остаётся монохромной, потому что говорить должен принт —
          чёрный, белый, серый и изредка ледяной синий для капсулы ARCTIC.
          Больше ничего не должно отвлекать.
        </p>
        <p className="font-mono text-xs tracking-[0.1em] text-muted pt-4 border-t border-hairline">
          Этот сайт — независимый дизайн-концепт и демо-витрина, не
          связанная ни с одним реальным брендом. Реальные заказы не
          обрабатываются.
        </p>
      </section>

      <section className="border-t-2 border-fg bg-hairline/20">
        <div className="mx-auto max-w-[1600px] px-4 py-16 sm:px-6 text-center">
          <h2 className="font-display text-3xl sm:text-4xl tracking-tight mb-6">
            ГОТОВЫ НОСИТЬ ТИШИНУ?
          </h2>
          <Link
            href="/shop"
            className="inline-block border-2 border-fg px-8 py-4 font-mono text-xs tracking-[0.15em] hover:bg-fg hover:text-bg transition-colors duration-150"
          >
            ВЕСЬ КАТАЛОГ
          </Link>
        </div>
      </section>
    </div>
  );
}
