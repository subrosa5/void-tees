"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import type { SiteSettings } from "@/lib/products";
import { updateSettingsAction } from "@/app/admin/actions";

type ActionResult = { ok: boolean; error?: string } | null;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="border-2 border-fg bg-fg px-6 py-3 font-mono text-xs tracking-[0.15em] text-bg hover:bg-bg hover:text-fg transition-colors duration-150 cursor-pointer disabled:opacity-50"
    >
      {pending ? "СОХРАНЕНИЕ…" : "СОХРАНИТЬ НАСТРОЙКИ"}
    </button>
  );
}

export function SettingsForm({ settings }: { settings: SiteSettings }) {
  const [state, formAction] = useActionState<ActionResult, FormData>(
    async (_prev, formData) => updateSettingsAction(formData),
    null
  );

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label htmlFor="marqueeText" className="font-mono text-xs tracking-[0.1em] block mb-2">
          БЕГУЩАЯ СТРОКА НА СТРАНИЦАХ КАТАЛОГА (/shop, /about и т.п.)
        </label>
        <p className="font-mono text-[10px] text-muted mb-2">
          Не влияет на главную (/) — там своя бегущая строка, редактируется выше в блоке «ГЛАВНАЯ — MEGA».
        </p>
        <textarea
          id="marqueeText"
          name="marqueeText"
          defaultValue={settings.marqueeText}
          rows={2}
          className="w-full border-2 border-fg bg-bg px-3 py-2 font-mono text-sm focus:outline-none"
        />
        <p className="font-mono text-[10px] text-muted mt-1">
          Разделяйте фразы через &laquo;/// &raquo;
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="freeShippingThreshold" className="font-mono text-xs tracking-[0.1em] block mb-2">
            БЕСПЛАТНАЯ ДОСТАВКА ОТ, ₽
          </label>
          <input
            id="freeShippingThreshold"
            name="freeShippingThreshold"
            type="number"
            min={0}
            defaultValue={settings.freeShippingThreshold}
            className="w-full border-2 border-fg bg-bg px-3 py-2 font-mono text-sm focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="flatShippingRate" className="font-mono text-xs tracking-[0.1em] block mb-2">
            СТОИМОСТЬ ДОСТАВКИ, ₽
          </label>
          <input
            id="flatShippingRate"
            name="flatShippingRate"
            type="number"
            min={0}
            defaultValue={settings.flatShippingRate}
            className="w-full border-2 border-fg bg-bg px-3 py-2 font-mono text-sm focus:outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <SubmitButton />
        {state?.ok && <span className="font-mono text-xs text-muted">Сохранено</span>}
        {state?.error && <span className="font-mono text-xs text-danger">{state.error}</span>}
      </div>
    </form>
  );
}
