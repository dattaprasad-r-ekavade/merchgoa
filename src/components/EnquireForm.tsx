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
      setMessage("Got it. We’ll come back with options, price and timing.");
      form.reset();
    } catch {
      setStatus("err");
      setMessage("Couldn’t send. Email hello@merchgoa.com instead.");
    }
  }

  const field =
    "w-full rounded-xl border border-[#241c16]/15 bg-white px-4 py-3 text-[#241c16] outline-none focus:border-[#c45c26]";

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <input type="text" name="company_website" className="hidden" tabIndex={-1} autoComplete="off" />
      <label className="grid gap-1 text-sm">
        Name
        <input required name="name" className={field} />
      </label>
      <label className="grid gap-1 text-sm">
        Email
        <input required type="email" name="email" className={field} />
      </label>
      <label className="grid gap-1 text-sm">
        Phone (optional)
        <input name="phone" className={field} />
      </label>
      <label className="grid gap-1 text-sm">
        Product or occasion
        <input name="product" defaultValue={defaultProduct} className={field} />
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-1 text-sm">
          Quantity
          <input name="quantity" className={field} placeholder="e.g. 40" />
        </label>
        <label className="grid gap-1 text-sm">
          Needed by
          <input name="needed_by" className={field} placeholder="e.g. 15 Dec 2026" />
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
      <p className="text-xs text-[#5c5148]">Do not send card numbers or passwords.</p>
      <button
        disabled={status === "sending"}
        className="rounded-full bg-[#c45c26] px-6 py-3 text-white hover:bg-[#241c16] disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send enquiry"}
      </button>
      {message ? (
        <p className={status === "ok" ? "text-sm text-[#163a44]" : "text-sm text-[#c45c26]"}>{message}</p>
      ) : null}
    </form>
  );
}
