/**
 * New-enquiry alerts. Each channel is optional and switched on by env vars:
 *
 *   TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID   → message to your phone (free, instant)
 *   RESEND_API_KEY + ALERT_EMAIL_TO          → email via resend.com
 *   ALERT_EMAIL_FROM (optional)              → defaults to "MerchGoa <alerts@merchgoa.com>"
 *
 * Failures are logged, never thrown: the enquiry is already saved to disk.
 */


import type { Enquiry } from "@/lib/site";

const TIMEOUT_MS = 5000;

function summary(e: Enquiry) {
  return [
    `New MerchGoa enquiry`,
    `${process.env.SITE_URL || "https://merchgoa.com"}/admin/enquiries`,
    ``,
    `Name: ${e.name}`,
    `Email: ${e.email}`,
    e.phone && `Phone: ${e.phone}`,
    e.product && `Product: ${e.product}`,
    e.quantity && `Quantity: ${e.quantity}`,
    e.needed_by && `Needed by: ${e.needed_by}`,
    e.location && `Location: ${e.location}`,
    e.notes && `\nNotes:\n${e.notes}`,
  ]
    .filter(Boolean)
    .join("\n");
}

async function post(url: string, init: RequestInit) {
  const res = await fetch(url, { ...init, signal: AbortSignal.timeout(TIMEOUT_MS) });
  if (!res.ok) throw new Error(`${url} → ${res.status} ${await res.text().catch(() => "")}`);
}

function telegram(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chat) return null;
  return post(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chat, text, disable_web_page_preview: true }),
  });
}

function email(e: Enquiry, text: string) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.ALERT_EMAIL_TO;
  if (!key || !to) return null;
  return post("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.ALERT_EMAIL_FROM || "MerchGoa <alerts@merchgoa.com>",
      to: to.split(",").map((s) => s.trim()),
      reply_to: e.email,
      subject: `Enquiry: ${e.product || "general"} — ${e.name}${e.quantity ? ` (${e.quantity})` : ""}`,
      text,
    }),
  });
}

export async function notifyEnquiry(e: Enquiry) {
  const text = summary(e);
  const jobs = [telegram(text), email(e, text)].filter((j): j is Promise<void> => j !== null);
  if (jobs.length === 0) {
    console.warn("enquiry received but no alert channel is configured (see src/lib/notify.ts)");
    return;
  }
  const results = await Promise.allSettled(jobs);
  for (const r of results) if (r.status === "rejected") console.error("enquiry alert failed", r.reason);
}
