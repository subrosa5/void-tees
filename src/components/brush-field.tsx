/**
 * Abstract monochrome brush-stroke texture, echoing the grunge
 * poster references (VETEMENTS x Alpha, NIGHTWOLF). Pure SVG, no
 * external assets.
 */
export function BrushField({ className, invert = false }: { className?: string; invert?: boolean }) {
  const stroke = invert ? "#0a0a0a" : "#f5f5f4";
  return (
    <svg
      viewBox="0 0 1200 800"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g opacity={0.16} stroke={stroke} strokeLinecap="round" fill="none">
        <path d="M -50 650 L 350 100" strokeWidth="90" />
        <path d="M 200 750 L 650 50" strokeWidth="60" />
        <path d="M 850 780 L 1300 120" strokeWidth="110" />
        <path d="M 700 800 L 950 500" strokeWidth="40" />
      </g>
      <g opacity={0.08} stroke={stroke} strokeLinecap="round" fill="none">
        <path d="M -100 300 L 400 -50" strokeWidth="140" />
        <path d="M 600 850 L 1250 250" strokeWidth="70" />
      </g>
    </svg>
  );
}
