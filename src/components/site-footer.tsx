import Link from "next/link";
import { NewsletterForm } from "@/components/newsletter-form";

export function SiteFooter() {
  return (
    <footer className="border-t-2 border-fg bg-fg text-bg">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 py-14">
        <div className="font-display text-5xl sm:text-7xl leading-[0.9] mb-10">
          ОСТАВАЙСЯ
          <br />
          В VOID.
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 border-t border-bg/25 pt-8">
          <div>
            <div className="font-mono text-xs tracking-[0.15em] opacity-60 mb-3">КАТАЛОГ</div>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shop" className="hover:opacity-60">Все футболки</Link></li>
              <li><Link href="/shop?collection=CORE" className="hover:opacity-60">Core</Link></li>
              <li><Link href="/shop?collection=ARCTIC" className="hover:opacity-60">Arctic</Link></li>
              <li><Link href="/shop?collection=BLACKOUT" className="hover:opacity-60">Blackout</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-mono text-xs tracking-[0.15em] opacity-60 mb-3">ПОМОЩЬ</div>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:opacity-60">О бренде VOID</Link></li>
              <li><Link href="/shipping" className="hover:opacity-60">Доставка и возврат</Link></li>
              <li><Link href="/size-guide" className="hover:opacity-60">Таблица размеров</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-mono text-xs tracking-[0.15em] opacity-60 mb-3">СОЦСЕТИ</div>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:opacity-60">Instagram</a></li>
              <li><a href="#" className="hover:opacity-60">TikTok</a></li>
            </ul>
          </div>
          <div>
            <div className="font-mono text-xs tracking-[0.15em] opacity-60 mb-3">РАССЫЛКА</div>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-bg/25 flex flex-col sm:flex-row gap-2 justify-between font-mono text-[11px] tracking-[0.1em] opacity-60">
          <span>© {new Date().getFullYear()} VOID. ВСЕ ПРАВА ЗАЩИЩЕНЫ.</span>
          <span>ДЕМО-ВИТРИНА — РЕАЛЬНЫЕ ПЛАТЕЖИ НЕ ПРОВОДЯТСЯ.</span>
        </div>
      </div>
    </footer>
  );
}
