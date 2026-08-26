import type { PrintKind, TeeColor } from "@/lib/products";

const BODY_FILL: Record<TeeColor, string> = {
  black: "#111110",
  white: "#f2f1ed",
  grey: "#8b8b86",
  ice: "#aebcc4",
};

const INK: Record<TeeColor, string> = {
  black: "#f2f1ed",
  white: "#111110",
  grey: "#111110",
  ice: "#111110",
};

const SHADE: Record<TeeColor, string> = {
  black: "#000000",
  white: "#d8d6cf",
  grey: "#75756f",
  ice: "#93a3ac",
};

/**
 * Flat, editorial placeholder illustration for a product tee.
 * Stands in for photography — deliberately graphic/poster-like to match
 * the monochrome streetwear reference moodboard.
 */
export function TeeGraphic({
  color,
  print,
  name,
  className,
}: {
  color: TeeColor;
  print: PrintKind;
  name: string;
  className?: string;
}) {
  const fill = BODY_FILL[color];
  const ink = INK[color];
  const shade = SHADE[color];
  const initials = name
    .split(" ")
    .filter((w) => w.length > 2)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  return (
    <svg
      viewBox="0 0 400 480"
      className={className}
      role="img"
      aria-label={`${name} product illustration`}
    >
      <rect x="0" y="0" width="400" height="480" fill="transparent" />
      {/* tee silhouette */}
      <path
        d="M120 60 L160 40 C170 65 230 65 240 40 L280 60 L340 110 L305 150 L280 132 L280 430 C280 440 272 448 262 448 L138 448 C128 448 120 440 120 430 L120 132 L95 150 L60 110 Z"
        fill={fill}
        stroke={shade}
        strokeWidth="4"
      />
      {/* collar rib */}
      <path
        d="M160 40 C170 65 230 65 240 40"
        fill="none"
        stroke={shade}
        strokeWidth="4"
      />
      {/* sleeve seams */}
      <path d="M120 132 L95 150" stroke={shade} strokeWidth="3" fill="none" />
      <path d="M280 132 L305 150" stroke={shade} strokeWidth="3" fill="none" />

      {/* print variants */}
      {print === "wordmark" && (
        <text
          x="200"
          y="230"
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontWeight={900}
          fontSize="34"
          letterSpacing="1"
          fill={ink}
        >
          VOID.
        </text>
      )}

      {print === "quote" && (
        <g>
          <line x1="150" y1="190" x2="250" y2="190" stroke={ink} strokeWidth="2" />
          <text
            x="200"
            y="225"
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontWeight={800}
            fontSize="20"
            fill={ink}
          >
            STILL
          </text>
          <text
            x="200"
            y="250"
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontWeight={800}
            fontSize="20"
            fill={ink}
          >
            COLD
          </text>
          <line x1="150" y1="270" x2="250" y2="270" stroke={ink} strokeWidth="2" />
        </g>
      )}

      {print === "graphic" && (
        <g opacity={0.95}>
          <circle cx="200" cy="230" r="52" fill="none" stroke={ink} strokeWidth="3" />
          <path d="M160 200 L240 260 M240 200 L160 260" stroke={ink} strokeWidth="3" />
          <text
            x="200"
            y="310"
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontWeight={800}
            fontSize="13"
            letterSpacing="3"
            fill={ink}
          >
            NO SIGNAL
          </text>
        </g>
      )}

      {print === "patch" && (
        <g>
          <rect
            x="172"
            y="150"
            width="56"
            height="40"
            fill="none"
            stroke={ink}
            strokeWidth="3"
          />
          <text
            x="200"
            y="175"
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontWeight={800}
            fontSize="14"
            fill={ink}
          >
            {initials || "V"}
          </text>
        </g>
      )}

      {print === "stripe" && (
        <g>
          <rect x="120" y="150" width="160" height="10" fill={ink} />
          <rect x="120" y="166" width="160" height="4" fill={ink} opacity={0.6} />
        </g>
      )}
    </svg>
  );
}
