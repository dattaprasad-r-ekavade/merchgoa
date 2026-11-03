import { NextResponse } from "next/server";
import { appendFile, mkdir } from "fs/promises";
import path from "path";

export const runtime = "nodejs";

const DATA = path.join(process.cwd(), "data");
const FILE = path.join(DATA, "enquiries.jsonl");

export async function POST(req: Request) {
  let body: Record<string, string> = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (body.company_website) {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  if (!name || !email || !email.includes("@")) {
    return NextResponse.json({ error: "Name and email required" }, { status: 400 });
  }

  const row = {
    at: new Date().toISOString(),
    name,
    email,
    phone: (body.phone || "").slice(0, 40),
    product: (body.product || "").slice(0, 200),
    quantity: (body.quantity || "").slice(0, 40),
    needed_by: (body.needed_by || "").slice(0, 80),
    location: (body.location || "").slice(0, 120),
    notes: (body.notes || "").slice(0, 4000),
  };

  await mkdir(DATA, { recursive: true });
  await appendFile(FILE, JSON.stringify(row) + "\n", "utf8");
  return NextResponse.json({ ok: true });
}
