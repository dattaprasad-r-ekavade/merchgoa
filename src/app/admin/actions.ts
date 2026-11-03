"use server";

import { cookies, headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  clearLoginFailures,
  loginBlocked,
  passwordMatches,
  recordLoginFailure,
  requireAdmin,
} from "@/lib/auth";
import { SESSION_COOKIE, SESSION_MAX_AGE, adminConfigured, createSessionToken } from "@/lib/session";
import {
  deleteEnquiry,
  deleteProduct,
  getProduct,
  getSettings,
  moveProduct,
  saveSettings,
  saveUpload,
  updateEnquiry,
  upsertProduct,
} from "@/lib/store";
import { ENQUIRY_STATUSES, defaultSettings, slugify, type EnquiryStatus, type Product, type Settings } from "@/lib/site";

export type FormState = { error?: string; ok?: string } | undefined;

const text = (fd: FormData, key: string, max = 500) => String(fd.get(key) ?? "").trim().slice(0, max);

function optionalInt(fd: FormData, key: string, label: string) {
  const raw = text(fd, key, 20).replace(/[₹,\s]/g, "");
  if (!raw) return null;
  const n = Number(raw);
  if (!Number.isInteger(n) || n <= 0 || n > 10_000_000) throw new Error(`${label} must be a whole number of rupees.`);
  return n;
}

/** Rebuild every public page that shows products or settings. */
function refreshSite() {
  revalidatePath("/", "layout");
}

/* ---------- Auth ---------- */

export async function login(_: FormState, fd: FormData): Promise<FormState> {
  if (!adminConfigured()) return { error: "Admin is not set up: ADMIN_PASSWORD and ADMIN_SECRET env vars are missing." };
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0].trim() || h.get("x-real-ip") || "local";
  if (loginBlocked(ip)) return { error: "Too many attempts. Try again in 15 minutes." };
  if (!passwordMatches(String(fd.get("password") ?? ""))) {
    recordLoginFailure(ip);
    return { error: "Wrong password." };
  }
  clearLoginFailures(ip);
  (await cookies()).set(SESSION_COOKIE, await createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: SESSION_MAX_AGE,
  });
  redirect("/admin");
}

export async function logout() {
  (await cookies()).set(SESSION_COOKIE, "", { path: "/admin", maxAge: 0 });
  redirect("/admin/login");
}

/* ---------- Enquiries ---------- */

export async function saveEnquiry(fd: FormData) {
  await requireAdmin();
  const status = text(fd, "status") as EnquiryStatus;
  if (!ENQUIRY_STATUSES.includes(status)) throw new Error("Unknown status");
  await updateEnquiry(text(fd, "id", 100), { status, adminNote: text(fd, "adminNote", 4000) });
  revalidatePath("/admin", "layout");
}

export async function removeEnquiry(fd: FormData) {
  await requireAdmin();
  await deleteEnquiry(text(fd, "id", 100));
  revalidatePath("/admin", "layout");
}

/* ---------- Products ---------- */

export async function saveProduct(_: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const isNew = fd.get("isNew") === "1";
  let slug = text(fd, "slug", 100);
  try {
    if (isNew) slug = slugify(slug || text(fd, "name", 120));
    if (!slug) throw new Error("Name is required.");
    const existing = isNew ? undefined : await getProduct(slug, { includeHidden: true });
    if (!isNew && !existing) throw new Error("Product not found.");

    const name = text(fd, "name", 120);
    const description = text(fd, "description", 3000);
    if (!name || !description) throw new Error("Name and description are required.");

    let image = existing?.image ?? "";
    const upload = fd.get("imageFile");
    if (upload instanceof File && upload.size > 0) image = await saveUpload(upload);
    if (!image) throw new Error("Upload a product photo.");

    const price = optionalInt(fd, "price", "Price");
    const bulkMin = optionalInt(fd, "bulkMin", "Bulk quantity");
    const bulkPrice = optionalInt(fd, "bulkPrice", "Bulk price");
    if (Boolean(bulkMin) !== Boolean(bulkPrice)) throw new Error("Fill in both bulk quantity and bulk price, or neither.");

    const product: Product = {
      slug,
      name,
      short: text(fd, "short", 160),
      description,
      image,
      imageAlt: text(fd, "imageAlt", 200),
      category: text(fd, "category", 60) || "Other",
      price,
      bulk: bulkMin && bulkPrice ? { min: bulkMin, price: bulkPrice } : null,
      hidden: fd.get("hidden") === "on",
      seoTitle: text(fd, "seoTitle", 70),
      seoDescription: text(fd, "seoDescription", 170),
    };
    await upsertProduct(product, { isNew });
  } catch (err) {
    return { error: (err as Error).message };
  }
  refreshSite();
  if (isNew) redirect(`/admin/products/${slug}?saved=1`);
  return { ok: "Saved. The public page is updated." };
}

export async function removeProduct(fd: FormData) {
  await requireAdmin();
  if (fd.get("confirm") !== "on") throw new Error("Tick the confirmation box to delete.");
  await deleteProduct(text(fd, "slug", 100));
  refreshSite();
  redirect("/admin/products");
}

export async function reorderProduct(fd: FormData) {
  await requireAdmin();
  await moveProduct(text(fd, "slug", 100), fd.get("dir") === "up" ? -1 : 1);
  refreshSite();
}

/* ---------- Settings ---------- */

export async function updateSettings(_: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const current = await getSettings();
  const next = { ...current } as Settings;
  for (const key of Object.keys(defaultSettings) as (keyof Settings)[]) {
    if (fd.has(key)) next[key] = text(fd, key, 300);
  }
  next.whatsapp = next.whatsapp.replace(/\D/g, "");
  if (next.whatsapp && !/^\d{11,15}$/.test(next.whatsapp)) {
    return { error: "WhatsApp number needs the country code, e.g. 919876543210." };
  }
  if (next.instagram && !/^https:\/\/(www\.)?instagram\.com\//.test(next.instagram)) {
    return { error: "Instagram should be a full link, e.g. https://instagram.com/merchgoa" };
  }
  next.googleVerification = next.googleVerification.replace(/.*content="([^"]+)".*/, "$1");
  await saveSettings(next);
  refreshSite();
  return { ok: "Settings saved. All pages are updated." };
}
