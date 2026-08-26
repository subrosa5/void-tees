import type { Metadata } from "next";

export const metadata: Metadata = { title: "Size Guide — VOID." };

const ROWS = [
  { size: "XS", chest: "34–36\"", length: "26\"" },
  { size: "S", chest: "37–39\"", length: "27\"" },
  { size: "M", chest: "40–42\"", length: "28\"" },
  { size: "L", chest: "43–45\"", length: "29\"" },
  { size: "XL", chest: "46–48\"", length: "30\"" },
  { size: "XXL", chest: "49–51\"", length: "31\"" },
];

export default function SizeGuidePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-4xl sm:text-5xl tracking-tight mb-4">SIZE GUIDE</h1>
      <p className="text-sm mb-8">
        All VOID. tees are cut oversized / boxy. Size down for a regular fit.
      </p>
      <div className="overflow-x-auto border-2 border-fg">
        <table className="w-full border-collapse font-mono text-sm">
          <thead>
            <tr className="border-b-2 border-fg bg-fg text-bg">
              <th className="px-4 py-3 text-left">SIZE</th>
              <th className="px-4 py-3 text-left">CHEST</th>
              <th className="px-4 py-3 text-left">LENGTH</th>
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
