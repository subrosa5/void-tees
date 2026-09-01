import type { Metadata } from "next";
import { Golos_Text } from "next/font/google";
import { loginAction } from "@/app/admin/actions";

// Scoped to this one page — the rest of /admin keeps the site's regular
// (light) theme, but this screen is the public-facing door into it, linked
// straight off the MEGA landing's footer, so it wears that dark look.
const golos = Golos_Text({ subsets: ["latin", "cyrillic"], weight: ["500", "800"] });

export const metadata: Metadata = { title: "Вход — MEGA" };

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div
      className={`${golos.className} flex min-h-screen flex-col justify-center px-6 py-16`}
      style={{ background: "#1a1918", color: "#f3f2f2" }}
    >
      <div className="mx-auto w-full max-w-sm">
        <span
          className="mb-8 inline-block font-extrabold text-sm tracking-[0.2em] px-2.5 py-1.5"
          style={{ background: "#f3f2f2", color: "#1a1918" }}
        >
          MEGA
        </span>

        <h1 className="mb-8 font-extrabold text-4xl tracking-tight">ВХОД</h1>

        <form action={loginAction} className="space-y-5">
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-xs tracking-[0.15em] uppercase"
              style={{ color: "#9b9797" }}
            >
              Пароль
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoFocus
              className="w-full border-2 bg-transparent px-3 py-3 text-sm focus:outline-none"
              style={{ borderColor: "color-mix(in srgb, #f3f2f2 32%, transparent)", color: "#f3f2f2" }}
            />
          </div>

          {error && (
            <p role="alert" className="text-xs tracking-[0.1em]" style={{ color: "#ff6b57" }}>
              НЕВЕРНЫЙ ПАРОЛЬ
            </p>
          )}

          <button
            type="submit"
            className="w-full border-2 py-3 text-xs font-extrabold tracking-[0.15em] transition-opacity duration-150 hover:opacity-85 cursor-pointer"
            style={{ background: "#f3f2f2", color: "#1a1918", borderColor: "#f3f2f2" }}
          >
            ВОЙТИ
          </button>
        </form>
      </div>
    </div>
  );
}
