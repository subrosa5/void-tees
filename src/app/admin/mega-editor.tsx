"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import type { MegaData } from "@/lib/mega-store";
import { updateMegaTextAction, uploadMegaImageAction } from "@/app/admin/actions";

type ActionResult = { ok: boolean; error?: string; url?: string } | null;

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="border-2 border-fg px-4 py-2 font-mono text-xs tracking-[0.1em] hover:bg-fg hover:text-bg transition-colors duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? "…" : label}
    </button>
  );
}

function ImageUploadRow({
  field,
  label,
  currentUrl,
}: {
  field: "heroImage" | "productImageFront" | "productImageBack";
  label: string;
  currentUrl: string;
}) {
  const [state, formAction] = useActionState<ActionResult, FormData>(
    async (_prev, formData) => uploadMegaImageAction(formData),
    null
  );

  return (
    <div className="flex flex-col gap-3 border-2 border-fg p-4 sm:flex-row sm:items-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={currentUrl} alt={label} className="h-24 w-20 shrink-0 border-2 border-fg object-cover" />
      <div className="flex-1 min-w-0">
        <div className="font-mono text-[10px] tracking-[0.15em] text-muted mb-1">{label}</div>
        <p className="font-mono text-xs text-muted truncate">{currentUrl}</p>
      </div>
      <form action={formAction} className="flex items-end gap-2">
        <input type="hidden" name="field" value={field} />
        <input
          type="file"
          name="file"
          accept="image/*"
          className="w-40 font-mono text-xs file:mr-2 file:border-2 file:border-fg file:bg-bg file:px-2 file:py-1 file:font-mono file:text-[10px] file:cursor-pointer"
        />
        <SubmitButton label="ЗАГРУЗИТЬ" />
      </form>
      <div className="w-full sm:w-28 shrink-0 text-right">
        {state?.error && <p className="font-mono text-[10px] text-danger">{state.error}</p>}
        {state?.ok && <p className="font-mono text-[10px] text-muted">Обновлено</p>}
      </div>
    </div>
  );
}

export function MegaEditor({ data }: { data: MegaData }) {
  const [textState, textFormAction] = useActionState<ActionResult, FormData>(
    async (_prev, formData) => updateMegaTextAction(formData),
    null
  );

  return (
    <div className="flex flex-col gap-4">
      <form action={textFormAction} className="flex flex-col gap-4 border-2 border-fg p-4 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label className="font-mono text-[10px] tracking-[0.1em] block mb-1">НАЗВАНИЕ ТОВАРА</label>
          <input
            type="text"
            name="productName"
            defaultValue={data.productName}
            className="w-full border-2 border-fg bg-bg px-3 py-2 font-mono text-sm focus:outline-none"
          />
        </div>
        <div>
          <label className="font-mono text-[10px] tracking-[0.1em] block mb-1">ЦЕНА, ₽</label>
          <input
            type="number"
            name="price"
            min={1}
            step={1}
            defaultValue={data.price}
            className="w-28 border-2 border-fg bg-bg px-2 py-2 font-mono text-sm focus:outline-none"
          />
        </div>
        <SubmitButton label="СОХРАНИТЬ" />
        {textState?.error && <p className="font-mono text-[10px] text-danger">{textState.error}</p>}
        {textState?.ok && <p className="font-mono text-[10px] text-muted">Сохранено</p>}
      </form>

      <ImageUploadRow field="heroImage" label="ФОТО ХИРО (фон на весь экран)" currentUrl={data.heroImage} />
      <ImageUploadRow field="productImageFront" label="ФОТО ТОВАРА — СПЕРЕДИ" currentUrl={data.productImageFront} />
      <ImageUploadRow field="productImageBack" label="ФОТО ТОВАРА — СЗАДИ" currentUrl={data.productImageBack} />
    </div>
  );
}
