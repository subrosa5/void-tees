import type { Metadata } from "next";

export const metadata: Metadata = { title: "Таблица размеров — VOID." };

const ROWS = [
  { size: "XS", chest: "86–91 см", length: "66 см" },
  { size: "S", chest: "94–99 см", length: "69 см" },
  { size: "M", chest: "102–107 см", length: "71 см" },
  { size: "L", chest: "109–114 см", length: "74 см" },
  { size: "XL", chest: "117–122 см", length: "76 см" },
  { size: "XXL", chest: "124–130 см", length: "79 см" },
];

export default function SizeGuidePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-4xl sm:text-5xl tracking-tight mb-4">ТАБЛИЦА РАЗМЕРОВ</h1>
      <p className="text-sm mb-8">
        Все футболки VOID. кроятся оверсайз / boxy. Берите на размер меньше
        для обычной посадки.
      </p>
      <div className="overflow-x-auto border-2 border-fg">
        <table className="w-full border-collapse font-mono text-sm">
          <thead>
            <tr className="border-b-2 border-fg bg-fg text-bg">
              <th className="px-4 py-3 text-left">РАЗМЕР</th>
              <th className="px-4 py-3 text-left">ОБХВАТ ГРУДИ</th>
              <th className="px-4 py-3 text-left">ДЛИНА</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {ROWS.map((row) => (
              <tr key={row.size}>
                <td className="px-4 py-3">{row.size}</td>
                <td className="px-4 py-3">{row.chest}</td>
                <td className="px-4 py-3">{row.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
