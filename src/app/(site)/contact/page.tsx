import type { Metadata } from "next";
import { EnquireForm } from "@/components/EnquireForm";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { site } from "@/lib/site";
import { getSettings } from "@/lib/store";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Contact MerchGoa for Goa souvenirs, custom printed merchandise and corporate gift orders. We reply within a day by email or WhatsApp.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const { phone, address } = await getSettings();
  return (
    <main className="mx-auto max-w-3xl px-5 py-14">
      <h1 className="text-4xl sm:text-5xl">Contact us</h1>
      <p className="mt-4 text-ink-soft">
        A favourite from the collection? A gift for a whole team? Send what you have and we&rsquo;ll reply within a day
        with options, price and timing.
      </p>

      <dl className="mt-8 grid gap-4 rounded-lg bg-surface p-6 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-sm font-medium text-ink-soft">Email</dt>
          <dd className="mt-1">
            <a className="underline underline-offset-2" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </dd>
        </div>
        {phone ? (
          <div>
            <dt className="text-sm font-medium text-ink-soft">Phone / WhatsApp</dt>
            <dd className="mt-1">
              <a className="underline underline-offset-2" href={`tel:${phone.replace(/\s/g, "")}`}>
                {phone}
              </a>
            </dd>
          </div>
        ) : null}
        <div className="sm:col-span-2">
          <dt className="text-sm font-medium text-ink-soft">Business</dt>
          <dd className="mt-1">
            MerchGoa is a brand of {site.legalName}
            {address ? (
              <>
                <br />
                {address}
              </>
            ) : null}
          </dd>
        </div>
      </dl>

      <div className="mt-6">
        <WhatsAppButton message="Hi MerchGoa, " label="Chat on WhatsApp" />
      </div>

      <div className="mt-10 rounded-lg bg-surface p-6">
        <h2 className="text-2xl">Send an enquiry</h2>
        <div className="mt-4">
          <EnquireForm />
        </div>
      </div>
    </main>
  );
}
