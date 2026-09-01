"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ADMIN_COOKIE, checkPassword, expectedSessionToken } from "@/lib/admin-auth";
import { getMegaData, saveMegaData, uploadMegaImage, type MegaData } from "@/lib/mega-store";
import { saveSettings, type SiteSettings } from "@/lib/site-settings";

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

export async function updateMegaTextAction(formData: FormData) {
  const productName = String(formData.get("productName") ?? "").trim();
  const tickerText = String(formData.get("tickerText") ?? "").trim();
  const card2Name = String(formData.get("card2Name") ?? "").trim();
  const price = Math.round(Number(formData.get("price") ?? ""));
  const card2Price = Math.round(Number(formData.get("card2Price") ?? ""));
  if (!productName || !card2Name) {
    return { ok: false, error: "Название не может быть пустым" };
  }
  if (!tickerText) {
    return { ok: false, error: "Бегущая строка не может быть пустой" };
  }
  if (!Number.isFinite(price) || price <= 0 || !Number.isFinite(card2Price) || card2Price <= 0) {
    return { ok: false, error: "Некорректная цена" };
  }
  const current = await getMegaData();
  await saveMegaData({ ...current, productName, tickerText, price, card2Name, card2Price });
  revalidatePath("/");
  revalidatePath("/admin");
  return { ok: true };
}

const MEGA_IMAGE_FIELDS = [
  "heroImage",
  "productImageFront",
  "productImageBack",
  "card2ImageFront",
  "card2ImageBack",
] as const;
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
  };
  await saveSettings(settings);
  revalidatePath("/about");
  revalidatePath("/shipping");
  revalidatePath("/size-guide");
  revalidatePath("/admin");
  return { ok: true };
}
