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
import type { SiteSettings } from "@/lib/products";

function revalidatePublicPages(slug?: string) {
  revalidatePath("/");
  revalidatePath("/shop");
  revalidatePath("/checkout");
  if (slug) revalidatePath(`/product/${slug}`);
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
  const file = formData.get("file");
  if (!slug || !(file instanceof File) || file.size === 0) {
    return { ok: false, error: "Файл не выбран" };
  }
  if (!file.type.startsWith("image/")) {
    return { ok: false, error: "Нужен файл изображения" };
  }
  if (file.size > 8 * 1024 * 1024) {
    return { ok: false, error: "Файл больше 8 МБ" };
  }
  const url = await uploadProductImage(slug, file);
  await updateProductImage(slug, url);
  revalidatePublicPages(slug);
  revalidatePath("/admin");
  return { ok: true, url };
}

export async function updateSettingsAction(formData: FormData) {
  const settings: SiteSettings = {
    heroTagline: String(formData.get("heroTagline") ?? ""),
    marqueeText: String(formData.get("marqueeText") ?? ""),
    freeShippingThreshold: Math.max(0, Math.round(Number(formData.get("freeShippingThreshold") ?? 0))),
    flatShippingRate: Math.max(0, Math.round(Number(formData.get("flatShippingRate") ?? 0))),
  };
  await saveSettings(settings);
  revalidatePublicPages();
  revalidatePath("/admin");
  return { ok: true };
}
