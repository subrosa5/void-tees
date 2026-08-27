"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { ProductVisual } from "@/components/product-visual";
import { TAG_LABELS, formatPrice, type Product } from "@/lib/products";
import { updatePriceAction, uploadImageAction } from "@/app/admin/actions";

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

export function ProductRow({ product }: { product: Product }) {
  const [priceState, priceFormAction] = useActionState<ActionResult, FormData>(
    async (_prev, formData) => updatePriceAction(formData),
    null
  );
  const [imageState, imageFormAction] = useActionState<ActionResult, FormData>(
    async (_prev, formData) => uploadImageAction(formData),
    null
  );

  return (
    <li className="flex flex-col gap-4 border-2 border-fg p-4 sm:flex-row sm:items-center">
      <div className="h-28 w-24 shrink-0 border-2 border-fg bg-hairline/30">
        <ProductVisual product={product} className="h-full w-full" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="font-mono text-[10px] tracking-[0.15em] text-muted mb-1">
          {product.collection}
          {product.tag ? ` — ${TAG_LABELS[product.tag]}` : ""}
        </div>
        <h3 className="font-display text-lg tracking-tight truncate">{product.name}</h3>
        <p className="font-mono text-xs text-muted">
          {product.slug} · сейчас {formatPrice(product.price)}
        </p>
      </div>

      <form action={priceFormAction} className="flex items-end gap-2">
        <input type="hidden" name="slug" value={product.slug} />
        <div>
          <label className="font-mono text-[10px] tracking-[0.1em] block mb-1">ЦЕНА, ₽</label>
          <input
            type="number"
            name="price"
            min={1}
            step={1}
            defaultValue={product.price}
            className="w-28 border-2 border-fg bg-bg px-2 py-2 font-mono text-sm focus:outline-none"
          />
        </div>
        <SubmitButton label="СОХРАНИТЬ" />
      </form>

      <form action={imageFormAction} className="flex items-end gap-2">
        <input type="hidden" name="slug" value={product.slug} />
        <div>
          <label className="font-mono text-[10px] tracking-[0.1em] block mb-1">ФОТО</label>
          <input
            type="file"
            name="file"
            accept="image/*"
            className="w-40 font-mono text-xs file:mr-2 file:border-2 file:border-fg file:bg-bg file:px-2 file:py-1 file:font-mono file:text-[10px] file:cursor-pointer"
          />
        </div>
        <SubmitButton label="ЗАГРУЗИТЬ" />
      </form>

      <div className="w-full sm:w-24 shrink-0 text-right">
        {priceState?.error && <p className="font-mono text-[10px] text-danger">{priceState.error}</p>}
        {priceState?.ok && <p className="font-mono text-[10px] text-muted">Цена обновлена</p>}
        {imageState?.error && <p className="font-mono text-[10px] text-danger">{imageState.error}</p>}
        {imageState?.ok && <p className="font-mono text-[10px] text-muted">Фото обновлено</p>}
      </div>
    </li>
  );
}
