"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

const OPTIONS = [
  { value: "featured", label: "ПО УМОЛЧАНИЮ" },
  { value: "price-asc", label: "ЦЕНА: ПО ВОЗРАСТАНИЮ" },
  { value: "price-desc", label: "ЦЕНА: ПО УБЫВАНИЮ" },
  { value: "name", label: "ПО НАЗВАНИЮ А–Я" },
];

export function SortSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = searchParams.get("sort") ?? "featured";

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort" className="font-mono text-[11px] tracking-[0.1em] text-muted">
        СОРТИРОВКА
      </label>
      <select
        id="sort"
        value={current}
        onChange={(e) => {
          const params = new URLSearchParams(searchParams.toString());
          if (e.target.value === "featured") {
            params.delete("sort");
          } else {
            params.set("sort", e.target.value);
          }
          router.push(`${pathname}?${params.toString()}`);
        }}
        className="border-2 border-fg bg-bg px-2 py-2 font-mono text-xs tracking-[0.1em] cursor-pointer"
      >
        {OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
