import type { Metadata } from "next";

export const metadata: Metadata = { title: "Доставка и возврат — VOID." };

export default function ShippingPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-4xl sm:text-5xl tracking-tight mb-8">
        ДОСТАВКА И ВОЗВРАТ
      </h1>
      <div className="space-y-8 text-sm leading-relaxed">
        <div>
          <h2 className="font-mono text-xs tracking-[0.1em] mb-2">ДОСТАВКА</h2>
          <p>
            Каждая футболка изготавливается на заказ и отправляется в
            течение 5–7 рабочих дней. Бесплатная доставка при заказе от
            15 000 ₽, иначе фиксированная ставка 800 ₽ при оформлении.
          </p>
        </div>
        <div>
          <h2 className="font-mono text-xs tracking-[0.1em] mb-2">ВОЗВРАТ</h2>
          <p>
            Неношеные вещи в оригинальном виде можно вернуть в течение 15
            дней после доставки. Лимитированные вещи и капсулы с пометкой
            «ЛИМИТ» возврату не подлежат.
          </p>
        </div>
        <div className="border-t border-hairline pt-6 font-mono text-xs text-muted">
          Это демо-витрина — доставки и возвраты фактически не
          обрабатываются.
        </div>
      </div>
    </div>
  );
}
