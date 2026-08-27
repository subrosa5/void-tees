import type { Metadata } from "next";
import { loginAction } from "@/app/admin/actions";

export const metadata: Metadata = { title: "Вход в админку — VOID." };

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-4 py-16 sm:px-6">
      <h1 className="font-display text-4xl tracking-tight mb-6">АДМИНКА</h1>
      <form action={loginAction} className="space-y-4">
        <div>
          <label htmlFor="password" className="font-mono text-xs tracking-[0.1em] block mb-2">
            ПАРОЛЬ
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoFocus
            className="w-full border-2 border-fg bg-bg px-3 py-3 font-mono text-sm focus:outline-none"
          />
        </div>
        {error && (
          <p role="alert" className="font-mono text-xs text-danger">
            НЕВЕРНЫЙ ПАРОЛЬ
          </p>
        )}
        <button
          type="submit"
          className="w-full border-2 border-fg bg-fg py-3 font-mono text-xs tracking-[0.15em] text-bg hover:bg-bg hover:text-fg transition-colors duration-150 cursor-pointer"
        >
          ВОЙТИ
        </button>
      </form>
    </div>
  );
}
