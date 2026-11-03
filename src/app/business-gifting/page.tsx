import type { Metadata } from "next";
import { EnquireForm } from "@/components/EnquireForm";

export const metadata: Metadata = {
  title: "Business gifting",
  description: "Custom merchandise for Goa businesses, hotels, offices and events.",
  alternates: { canonical: "/business-gifting" },
};

export default function BusinessPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-14">
      <p className="text-xs uppercase tracking-[0.22em] text-[#c45c26]">MerchGoa / for business</p>
      <h1 className="mt-3 text-5xl">Thoughtful gifts, your branding.</h1>
      <p className="mt-4 text-[#5c5148]">
        Custom merchandise for Goa businesses, hotels, offices and events. Tell us budget, quantity and
        date; we plan gifts around your logo or a Goa-inspired design.
      </p>
      <ol className="mt-10 grid gap-4 text-sm">
        <li className="rounded-2xl bg-[#fffaf3] p-5">
          <strong>01 · Brief.</strong> Quantity, budget, recipients, destination and the date you need.
        </li>
        <li className="rounded-2xl bg-[#fffaf3] p-5">
          <strong>02 · Options.</strong> We check products, samples, branding and full cost with suppliers.
        </li>
        <li className="rounded-2xl bg-[#fffaf3] p-5">
          <strong>03 · Approve.</strong> Confirm artwork and a delivery schedule before production.
        </li>
      </ol>
      <div className="mt-10 rounded-2xl bg-[#fffaf3] p-6">
        <h2 className="text-2xl">Send a gift brief</h2>
        <p className="mt-2 text-sm text-[#5c5148]">Even a rough brief is enough.</p>
        <div className="mt-4">
          <EnquireForm defaultProduct="Business gifting" />
        </div>
      </div>
    </main>
  );
}
