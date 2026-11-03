import { NextResponse } from "next/server";
import { notifyEnquiry } from "@/lib/notify";
import { addEnquiry } from "@/lib/store";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function str(v: unknown, max: number) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const b = body as Record<string, unknown>;

  // Honeypot: bots fill the hidden field; pretend success.
  if (b.company_website) {
    return NextResponse.json({ ok: true });
  }

  const name = str(b.name, 120);
  const email = str(b.email, 200);
  if (!name || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Name and a valid email are required" }, { status: 400 });
  }

  const row = {
    at: new Date().toISOString(),
    name,
    email,
    phone: str(b.phone, 40),
    product: str(b.product, 200),
    quantity: str(b.quantity, 40),
    needed_by: str(b.needed_by, 80),
    location: str(b.location, 120),
    notes: str(b.notes, 4000),
  };

  try {
    await notifyEnquiry(await addEnquiry(row));
  } catch (err) {
    console.error("enquiry write failed", err);
    return NextResponse.json({ error: "Could not save enquiry" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
