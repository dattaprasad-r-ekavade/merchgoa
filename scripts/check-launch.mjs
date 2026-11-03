// Fails while launch-blocking placeholders remain in the site config.
// Usage: npm run check:launch
import { readFileSync } from "node:fs";

const file = "src/lib/site.ts";
const src = readFileSync(file, "utf8");
const problems = [];

src.split("\n").forEach((line, i) => {
  if (/:\s*"TODO|\/\/ TODO/.test(line)) problems.push(`${file}:${i + 1}  ${line.trim()}`);
});
if (/whatsapp:\s*""/.test(src)) problems.push(`${file}  site.whatsapp is empty (WhatsApp buttons are hidden)`);

const env = ["TELEGRAM_BOT_TOKEN", "TELEGRAM_CHAT_ID", "RESEND_API_KEY", "ALERT_EMAIL_TO"];
const hasTelegram = process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID;
const hasEmail = process.env.RESEND_API_KEY && process.env.ALERT_EMAIL_TO;
if (!hasTelegram && !hasEmail) problems.push(`env: no enquiry alert channel set (${env.join(", ")})`);

if (problems.length) {
  console.error(`Not ready to launch, ${problems.length} item(s) to fix:\n`);
  for (const p of problems) console.error("  - " + p);
  process.exit(1);
}
console.log("Launch check passed.");
