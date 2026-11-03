import { SettingsForm } from "@/components/admin/SettingsForm";
import { requireAdmin } from "@/lib/auth";
import { getSettings } from "@/lib/store";

export const metadata = { title: "Settings" };

export default async function SettingsPage() {
  await requireAdmin();
  const alerts = {
    telegram: Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID),
    email: Boolean(process.env.RESEND_API_KEY && process.env.ALERT_EMAIL_TO),
  };
  return (
    <div className="grid gap-6">
      <h1 className="text-3xl">Settings</h1>
      <SettingsForm settings={await getSettings()} alerts={alerts} />
    </div>
  );
}
