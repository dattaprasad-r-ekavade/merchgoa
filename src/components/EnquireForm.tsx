"use client";

import { useState } from "react";

export function EnquireForm({ defaultProduct = "" }: { defaultProduct?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const res = await fetch("/api/enquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed");
      setStatus("ok");
      setMessage("Got it. We’ll reply within a day with options, price and timing.");
      form.reset();
    } catch {
      setStatus("err");
      setMessage("Couldn’t send. Email hello@merchgoa.com instead.");
    }
  }

  const field =
    "w-full rounded-xl border border-ink/15 bg-field px-4 py-3 text-ink outline-none focus:border-[#c45c26]";

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <input type="text" name="company_website" className="hidden" tabIndex={-1} autoComplete="off" />
      <label className="grid gap-1 text-sm">
        Name
        <input required name="name" autoComplete="name" className={field} />
      </label>
      <label className="grid gap-1 text-sm">
        Email
        <input required type="email" name="email" autoComplete="email" className={field} />
      </label>
      <label className="grid gap-1 text-sm">
        WhatsApp / phone
        <input required type="tel" name="phone" autoComplete="tel" inputMode="tel" className={field} placeholder="+91" />
      </label>
      <label className="grid gap-1 text-sm">
        Product or occasion
        <input name="product" defaultValue={defaultProduct} className={field} />
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-1 text-sm">
          Quantity
          <input name="quantity" inputMode="numeric" className={field} placeholder="e.g. 40" />
        </label>
        <label className="grid gap-1 text-sm">
          Needed by
          <input type="date" name="needed_by" className={field} />
        </label>
      </div>
      <label className="grid gap-1 text-sm">
        Delivery location
        <input name="location" className={field} placeholder="Goa / city" />
      </label>
      <label className="grid gap-1 text-sm">
        Logo or personalisation
        <textarea name="notes" rows={4} className={field} placeholder="Budget, branding, anything useful." />
      </label>
      <p className="text-xs text-ink-soft">Do not send card numbers or passwords.</p>
      <button
        disabled={status === "sending"}
        className="rounded-full bg-[#c45c26] px-6 py-3 text-white hover:bg-sea-hover disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send enquiry"}
      </button>
      {message ? (
        <p className={status === "ok" ? "text-sm text-sea-ink" : "text-sm text-coral-ink"}>{message}</p>
      ) : null}
    </form>
  );
}
