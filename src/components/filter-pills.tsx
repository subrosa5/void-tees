import Link from "next/link";

export function FilterPills({
  label,
  paramKey,
  options,
  active,
  currentSearch,
  labelFor,
}: {
  label: string;
  paramKey: string;
  options: readonly string[];
  active?: string;
  currentSearch: Record<string, string | undefined>;
  labelFor?: (value: string) => string;
}) {
  function hrefFor(value?: string) {
    const params = new URLSearchParams();
    for (const [k, v] of Object.entries(currentSearch)) {
      if (v && k !== paramKey) params.set(k, v);
    }
    if (value) params.set(paramKey, value);
    const qs = params.toString();
    return qs ? `/shop?${qs}` : "/shop";
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="font-mono text-[11px] tracking-[0.1em] text-muted mr-1">
        {label}
      </span>
      <Link
        href={hrefFor(undefined)}
        className={`border-2 border-fg px-3 py-1.5 font-mono text-[11px] tracking-[0.1em] transition-colors duration-150 ${
          !active ? "bg-fg text-bg" : "hover:bg-fg hover:text-bg"
        }`}
      >
        ВСЕ
      </Link>
      {options.map((opt) => (
        <Link
          key={opt}
          href={hrefFor(opt)}
          className={`border-2 border-fg px-3 py-1.5 font-mono text-[11px] tracking-[0.1em] transition-colors duration-150 ${
            active === opt ? "bg-fg text-bg" : "hover:bg-fg hover:text-bg"
          }`}
        >
          {labelFor ? labelFor(opt) : opt.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
