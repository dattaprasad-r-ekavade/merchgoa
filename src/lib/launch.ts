import type { Product, Settings } from "@/lib/site";

export type Check = { ok: boolean; label: string; href: string };

/** Everything that must be true before the site goes in front of Razorpay and customers. */
export function launchChecks(settings: Settings, products: Product[]): Check[] {
  const visible = products.filter((p) => !p.hidden);
  const unpriced = visible.filter((p) => p.price == null).length;
  const alerts =
    (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) ||
    (process.env.RESEND_API_KEY && process.env.ALERT_EMAIL_TO);
  return [
    { ok: Boolean(settings.phone), label: "Phone number", href: "/admin/settings" },
    { ok: Boolean(settings.whatsapp), label: "WhatsApp number (buttons are hidden until set)", href: "/admin/settings" },
    { ok: Boolean(settings.address), label: "Registered address (needed on policy pages)", href: "/admin/settings" },
    { ok: Boolean(settings.gstin), label: "GSTIN", href: "/admin/settings" },
    { ok: Boolean(settings.grievanceOfficer), label: "Grievance officer name (privacy policy)", href: "/admin/settings" },
    {
      ok: visible.length > 0 && unpriced === 0,
      label: unpriced ? `Prices: ${unpriced} visible product(s) still show "Price on request"` : "All visible products priced",
      href: "/admin/products",
    },
    { ok: Boolean(alerts), label: "Enquiry alerts (Telegram or email env vars)", href: "/admin/settings" },
    { ok: Boolean(settings.googleVerification), label: "Google Search Console verification", href: "/admin/settings" },
  ];
}
