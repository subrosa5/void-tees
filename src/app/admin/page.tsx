import type { Metadata } from "next";
import { getSettings } from "@/lib/site-settings";
import { getMegaData } from "@/lib/mega-store";
import { logoutAction } from "@/app/admin/actions";
import { SettingsForm } from "@/app/admin/settings-form";
import { MegaEditor } from "@/app/admin/mega-editor";

export const metadata: Metadata = { title: "Админка — MEGA" };
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [settings, megaData] = await Promise.all([getSettings(), getMegaData()]);
  const blobConfigured = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex items-center justify-between border-b-2 border-fg pb-6">
        <h1 className="font-display text-4xl sm:text-5xl tracking-tight">АДМИНКА</h1>
        <form action={logoutAction}>
          <button
            type="submit"
            className="border-2 border-fg px-4 py-2 font-mono text-xs tracking-[0.1em] hover:bg-fg hover:text-bg transition-colors duration-150 cursor-pointer"
          >
            ВЫЙТИ
          </button>
        </form>
      </div>

      {!blobConfigured && (
        <div className="mb-8 border-2 border-fg bg-hairline/30 px-4 py-3 font-mono text-xs">
          Vercel Blob ещё не подключён к проекту — изменения не будут
          сохраняться между запросами. Добавьте Blob Storage в настройках
          проекта на Vercel (Storage → Create Database → Blob), после этого
          токен подключится автоматически.
        </div>
      )}

      <section className="mb-12">
        <h2 className="font-display text-2xl tracking-tight mb-4">ГЛАВНАЯ — MEGA</h2>
        <MegaEditor data={megaData} />
      </section>

      <section>
        <h2 className="font-display text-2xl tracking-tight mb-4">НАСТРОЙКИ САЙТА</h2>
        <SettingsForm settings={settings} />
      </section>
    </div>
  );
}
