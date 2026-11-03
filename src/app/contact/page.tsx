import type { Metadata } from "next";
import { EnquireForm } from "@/components/EnquireForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Enquire about MerchGoa pieces or a team gift.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-14">
      <h1 className="text-5xl">Tell us what you have in mind.</h1>
      <p className="mt-4 text-[#5c5148]">
        A favourite from the collection? A gift for a whole team? Send what you have — we confirm
        options, price and timing before an order.
      </p>
      <ul className="mt-6 list-disc pl-5 text-sm text-[#5c5148]">
        <li>Which product or occasion?</li>
        <li>How many pieces?</li>
        <li>Where and when are they needed?</li>
        <li>Any logo or personalisation?</li>
      </ul>
      <div className="mt-10 rounded-2xl bg-[#fffaf3] p-6">
        <EnquireForm />
      </div>
    </main>
  );
}
