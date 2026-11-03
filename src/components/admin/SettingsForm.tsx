"use client";

import { useActionState } from "react";
import { updateSettings } from "@/app/admin/actions";
import { Card, Field, inputCls } from "@/components/admin/fields";
import { FormMessage, SubmitButton } from "@/components/admin/ui";
import type { Settings } from "@/lib/site";

export function SettingsForm({ settings, alerts }: { settings: Settings; alerts: { telegram: boolean; email: boolean } }) {
  const [state, action] = useActionState(updateSettings, undefined);
  const s = settings;
  return (
    <form action={action} className="grid gap-6">
      <Card title="Contact">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Phone (as shown)">
            <input name="phone" defaultValue={s.phone} placeholder="+91 98765 43210" className={inputCls} />
          </Field>
          <Field label="WhatsApp number" hint="Country code + number, digits only. Blank hides all WhatsApp buttons.">
            <input name="whatsapp" defaultValue={s.whatsapp} placeholder="919876543210" inputMode="numeric" className={inputCls} />
          </Field>
          <Field label="Instagram link">
            <input name="instagram" defaultValue={s.instagram} placeholder="https://instagram.com/merchgoa" className={inputCls} />
          </Field>
        </div>
      </Card>

      <Card title="Business (shown on policy pages and footer)">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Registered address" hint="Must match the LLP registration for Razorpay.">
            <textarea name="address" defaultValue={s.address} rows={2} className={inputCls} />
          </Field>
          <Field label="GSTIN">
            <input name="gstin" defaultValue={s.gstin} className={inputCls} />
          </Field>
          <Field label="Grievance officer" hint="Name of the person who handles complaints (privacy policy).">
            <input name="grievanceOfficer" defaultValue={s.grievanceOfficer} className={inputCls} />
          </Field>
          <Field label="Policies last updated">
            <input name="policiesUpdated" defaultValue={s.policiesUpdated} className={inputCls} />
          </Field>
        </div>
      </Card>

      <Card title="Delivery promises">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Production time">
            <input name="productionDays" defaultValue={s.productionDays} className={inputCls} />
          </Field>
          <Field label="Delivery time">
            <input name="deliveryDays" defaultValue={s.deliveryDays} className={inputCls} />
          </Field>
          <Field label="Christmas order cutoff">
            <input name="christmasCutoff" defaultValue={s.christmasCutoff} className={inputCls} />
          </Field>
          <Field label="Ships to">
            <input name="shipsTo" defaultValue={s.shipsTo} className={inputCls} />
          </Field>
        </div>
      </Card>

      <Card title="Announcement bar">
        <Field label="Message" hint="One line above the header on every page. Blank hides it.">
          <input name="announcement" defaultValue={s.announcement} placeholder="Order by 15 December for Christmas delivery" className={inputCls} />
        </Field>
      </Card>

      <Card title="Search & alerts">
        <div className="grid gap-4">
          <Field
            label="Google Search Console verification"
            hint="In Search Console choose “HTML tag” and paste the whole tag or just the content value."
          >
            <input name="googleVerification" defaultValue={s.googleVerification} className={inputCls} />
          </Field>
          <div className="text-sm">
            <p className="font-medium">Enquiry alerts</p>
            <p className="mt-1 text-[#5c5148]">
              Telegram: {alerts.telegram ? "on" : "off"} · Email: {alerts.email ? "on" : "off"}. These are set with server
              environment variables (see README), not here, so keys never live in the data folder.
            </p>
          </div>
        </div>
      </Card>

      <div className="sticky bottom-4 flex items-center gap-4 rounded-xl border border-[#241c16]/10 bg-white p-4 shadow-lg">
        <SubmitButton>Save settings</SubmitButton>
        <div className="flex-1">
          <FormMessage state={state} />
        </div>
      </div>
    </form>
  );
}
