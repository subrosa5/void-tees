"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ADMIN_COOKIE, checkPassword, expectedSessionToken } from "@/lib/admin-auth";
import {
  updateProductPrice as saveProductPrice,
  updateSettings as saveSettings,
  updateProductImage,
  uploadProductImage,
} from "@/lib/blob-store";
import { getMegaData, saveMegaData, uploadMegaImage, type MegaData } from "@/lib/mega-store";
import type { SiteSettings } from "@/lib/products";

function revalidatePublicPages(slug?: string) {
  revalidatePath("/");
  revalidatePath("/shop");
  revalidatePath("/checkout");
  if (slug) revalidatePath(`/product/${slug}`);
}

/** Shared by both image-upload actions below — same rules either way. */
function validateImageFile(entry: FormDataEntryValue | null): { file: File } | { error: string } {
  if (!(entry instanceof File) || entry.size === 0) return { error: "Файл не выбран" };
  if (!entry.type.startsWith("image/")) return { error: "Нужен файл изображения" };
  if (entry.size > 8 * 1024 * 1024) return { error: "Файл больше 8 МБ" };
  return { file: entry };
}

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const ok = await checkPassword(password);
  if (!ok) {
    redirect("/admin/login?error=1");
  }
  const token = await expectedSessionToken();
  const jar = await cookies();
  jar.set(ADMIN_COOKIE, token!, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  redirect("/admin");
}

export async function logoutAction() {
  const jar = await cookies();
  jar.delete(ADMIN_COOKIE);
  redirect("/admin/login");
}

export async function updatePriceAction(formData: FormData) {
  const slug = String(formData.get("slug") ?? "");
  const priceRaw = String(formData.get("price") ?? "");
  const price = Math.round(Number(priceRaw));
  if (!slug || !Number.isFinite(price) || price <= 0) {
    return { ok: false, error: "Некорректная цена" };
  }
  await saveProductPrice(slug, price);
  revalidatePublicPages(slug);
  revalidatePath("/admin");
  return { ok: true };
}

export async function uploadImageAction(formData: FormData) {
  const slug = String(formData.get("slug") ?? "");
  if (!slug) return { ok: false, error: "Не указан товар" };
  const validated = validateImageFile(formData.get("file"));
  if ("error" in validated) return { ok: false, error: validated.error };
  const url = await uploadProductImage(slug, validated.file);
  await updateProductImage(slug, url);
  revalidatePublicPages(slug);
  revalidatePath("/admin");
  return { ok: true, url };
}

export async function updateMegaTextAction(formData: FormData) {
  const productName = String(formData.get("productName") ?? "").trim();
  const tickerText = String(formData.get("tickerText") ?? "").trim();
  const priceRaw = String(formData.get("price") ?? "");
  const price = Math.round(Number(priceRaw));
  if (!productName) {
    return { ok: false, error: "Название не может быть пустым" };
  }
  if (!tickerText) {
    return { ok: false, error: "Бегущая строка не может быть пустой" };
  }
  if (!Number.isFinite(price) || price <= 0) {
    return { ok: false, error: "Некорректная цена" };
  }
  const current = await getMegaData();
  await saveMegaData({ ...current, productName, tickerText, price });
  revalidatePath("/");
  revalidatePath("/admin");
  return { ok: true };
}

const MEGA_IMAGE_FIELDS = ["heroImage", "productImageFront", "productImageBack"] as const;
type MegaImageField = (typeof MEGA_IMAGE_FIELDS)[number];

export async function uploadMegaImageAction(formData: FormData) {
  const field = String(formData.get("field") ?? "") as MegaImageField;
  if (!MEGA_IMAGE_FIELDS.includes(field)) return { ok: false, error: "Неизвестное поле" };
  const validated = validateImageFile(formData.get("file"));
  if ("error" in validated) return { ok: false, error: validated.error };
  const url = await uploadMegaImage(validated.file, field);
  const current = await getMegaData();
  const next: MegaData = { ...current, [field]: url };
  await saveMegaData(next);
  revalidatePath("/");
  revalidatePath("/admin");
  return { ok: true, url };
}

export async function updateSettingsAction(formData: FormData) {
  const settings: SiteSettings = {
    marqueeText: String(formData.get("marqueeText") ?? ""),
    freeShippingThreshold: Math.max(0, Math.round(Number(formData.get("freeShippingThreshold") ?? 0))),
    flatShippingRate: Math.max(0, Math.round(Number(formData.get("flatShippingRate") ?? 0))),
  };
  await saveSettings(settings);
  revalidatePublicPages();
  revalidatePath("/admin");
  return { ok: true };
}
