/**
 * File-backed data store under ./data (gitignored).
 *
 * - Writes are atomic (temp file + rename) and serialised through one in-process queue,
 *   so run the app as a single process (PM2 fork mode, not cluster).
 * - A corrupt file throws instead of being silently replaced.
 */
import { promises as fs } from "fs";
import path from "path";
import { randomBytes, randomUUID } from "crypto";
import { cache } from "react";
import sharp from "sharp";
import {
  defaultSettings,
  seedProducts,
  type Enquiry,
  type EnquiryStatus,
  type Product,
  type Settings,
} from "@/lib/site";

export const DATA_DIR = path.join(process.cwd(), "data");
export const UPLOAD_DIR = path.join(DATA_DIR, "uploads");

let queue: Promise<unknown> = Promise.resolve();
function locked<T>(fn: () => Promise<T>): Promise<T> {
  const run = queue.then(fn, fn);
  queue = run.catch(() => undefined);
  return run;
}

async function readJSON<T>(file: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(await fs.readFile(path.join(DATA_DIR, file), "utf8")) as T;
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return fallback;
    throw new Error(`data/${file} could not be read: ${(err as Error).message}`);
  }
}

async function writeJSON(file: string, data: unknown) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const target = path.join(DATA_DIR, file);
  const tmp = `${target}.${process.pid}.${Date.now()}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(data, null, 2) + "\n", "utf8");
  await fs.rename(tmp, target);
}

/* ---------- Settings ---------- */

export const getSettings = cache(async (): Promise<Settings> => {
  return { ...defaultSettings, ...(await readJSON<Partial<Settings>>("settings.json", {})) };
});

export function saveSettings(next: Settings) {
  return locked(() => writeJSON("settings.json", next));
}

/* ---------- Products ---------- */

export const getAllProducts = cache(async (): Promise<Product[]> => {
  return readJSON<Product[]>("products.json", seedProducts);
});

export async function getProducts() {
  return (await getAllProducts()).filter((p) => !p.hidden);
}

export async function getProduct(slug: string, { includeHidden = false } = {}) {
  const p = (await getAllProducts()).find((x) => x.slug === slug);
  return p && (includeHidden || !p.hidden) ? p : undefined;
}

export function upsertProduct(product: Product, { isNew }: { isNew: boolean }) {
  return locked(async () => {
    const list = await readJSON<Product[]>("products.json", seedProducts);
    const i = list.findIndex((p) => p.slug === product.slug);
    if (isNew && i !== -1) throw new Error(`A product with the URL "${product.slug}" already exists.`);
    if (!isNew && i === -1) throw new Error("Product not found.");
    const row = { ...product, updatedAt: new Date().toISOString() };
    if (i === -1) list.push(row);
    else list[i] = row;
    await writeJSON("products.json", list);
  });
}

export function deleteProduct(slug: string) {
  return locked(async () => {
    const list = await readJSON<Product[]>("products.json", seedProducts);
    await writeJSON(
      "products.json",
      list.filter((p) => p.slug !== slug),
    );
  });
}

export function moveProduct(slug: string, dir: -1 | 1) {
  return locked(async () => {
    const list = await readJSON<Product[]>("products.json", seedProducts);
    const i = list.findIndex((p) => p.slug === slug);
    const j = i + dir;
    if (i === -1 || j < 0 || j >= list.length) return;
    [list[i], list[j]] = [list[j], list[i]];
    await writeJSON("products.json", list);
  });
}

/* ---------- Enquiries ---------- */

/** One-time import of the old append-only log (data/enquiries.jsonl). */
async function readEnquiries(): Promise<Enquiry[]> {
  const list = await readJSON<Enquiry[] | null>("enquiries.json", null);
  if (list) return list;
  try {
    const raw = await fs.readFile(path.join(DATA_DIR, "enquiries.jsonl"), "utf8");
    return raw
      .split("\n")
      .filter(Boolean)
      .map((line) => ({ id: randomUUID(), status: "new", adminNote: "", ...JSON.parse(line) }) as Enquiry);
  } catch {
    return [];
  }
}

export async function listEnquiries() {
  return (await readEnquiries()).sort((a, b) => b.at.localeCompare(a.at));
}

export function addEnquiry(e: Omit<Enquiry, "id" | "status" | "adminNote">) {
  return locked(async () => {
    const list = await readEnquiries();
    const row: Enquiry = { ...e, id: randomUUID(), status: "new", adminNote: "" };
    list.push(row);
    await writeJSON("enquiries.json", list);
    return row;
  });
}

export function updateEnquiry(id: string, patch: { status: EnquiryStatus; adminNote: string }) {
  return locked(async () => {
    const list = await readEnquiries();
    const row = list.find((e) => e.id === id);
    if (!row) throw new Error("Enquiry not found.");
    Object.assign(row, patch, { updatedAt: new Date().toISOString() });
    await writeJSON("enquiries.json", list);
  });
}

export function deleteEnquiry(id: string) {
  return locked(async () => {
    const list = await readEnquiries();
    await writeJSON(
      "enquiries.json",
      list.filter((e) => e.id !== id),
    );
  });
}

/* ---------- Uploads ---------- */

export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;

/** Re-encodes any uploaded image to WebP (strips EXIF/GPS, rejects non-images). Returns its public URL. */
export async function saveUpload(file: File) {
  if (file.size > MAX_UPLOAD_BYTES) throw new Error("Image is larger than 8 MB.");
  const input = Buffer.from(await file.arrayBuffer());
  let out: Buffer;
  try {
    out = await sharp(input)
      .rotate()
      .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 85 })
      .toBuffer();
  } catch {
    throw new Error("That file is not an image we can read (use JPG, PNG or WebP).");
  }
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  const name = `${randomBytes(8).toString("hex")}.webp`;
  await fs.writeFile(path.join(UPLOAD_DIR, name), out);
  return `/uploads/${name}`;
}
