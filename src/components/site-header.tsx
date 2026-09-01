"use client";

import Link from "next/link";
import { useState } from "react";
import { Marquee } from "@/components/marquee";

const NAV = [
  { label: "О БРЕНДЕ", href: "/about" },
  { label: "ДОСТАВКА", href: "/shipping" },
  { label: "РАЗМЕРЫ", href: "/size-guide" },
];

export function SiteHeader({ marqueeText }: { marqueeText: string }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-bg">
      <Marquee text={marqueeText} />
      <div className="border-b-2 border-fg">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] md:hidden cursor-pointer"
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={menuOpen}
          >
            <span
              className={`block h-[2px] w-6 bg-fg transition-transform duration-200 ${menuOpen ? "translate-y-[3.5px] rotate-45" : ""}`}
            />
            <span
              className={`block h-[2px] w-6 bg-fg transition-transform duration-200 ${menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`}
            />
          </button>

          <nav className="hidden md:flex items-center gap-6 font-mono text-xs tracking-[0.12em]">
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="hover:opacity-60 transition-opacity duration-150"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/"
            className="font-display text-3xl sm:text-4xl tracking-tight leading-none select-none"
            aria-label="VOID — на главную"
          >
            VOID<span aria-hidden="true">.</span>
          </Link>

          <div className="w-11 md:w-auto" aria-hidden="true" />
        </div>

        {menuOpen && (
          <nav className="md:hidden border-t-2 border-fg px-4 py-4 flex flex-col gap-4 font-mono text-sm tracking-[0.12em]">
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="py-1"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
