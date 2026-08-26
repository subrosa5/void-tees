import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-32 text-center sm:px-6">
      <h1 className="font-display text-6xl sm:text-8xl tracking-tight mb-6">404</h1>
      <p className="font-mono text-sm text-muted mb-8">
        ЭТА СТРАНИЦА ПРОВАЛИЛАСЬ В VOID.
      </p>
      <Link
        href="/"
        className="inline-block border-2 border-fg px-6 py-3 font-mono text-xs tracking-[0.15em] hover:bg-fg hover:text-bg transition-colors duration-150"
      >
        НА ГЛАВНУЮ
      </Link>
    </div>
  );
}
