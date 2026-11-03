import type { Metadata } from "next";
import { EnquireForm } from "@/components/EnquireForm";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { business, filled, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Enquire about MerchGoa pieces or a team gift.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const phone = filled(site.phone);
  const address = filled(business.address);
  return (
    <main className="mx-auto max-w-3xl px-5 py-14">
      <h1 className="text-5xl">Tell us what you have in mind.</h1>
      <p className="mt-4 text-[#5c5148]">
        A favourite from the collection? A gift for a whole team? Send what you have and we&rsquo;ll reply within a day
        with options, price and timing.
      </p>

      <dl className="mt-8 grid gap-4 rounded-2xl bg-[#fffaf3] p-6 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-xs uppercase tracking-[0.18em] text-[#c45c26]">Email</dt>
          <dd className="mt-1">
            <a className="underline underline-offset-2" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </dd>
        </div>
        {phone ? (
          <div>
            <dt className="text-xs uppercase tracking-[0.18em] text-[#c45c26]">Phone / WhatsApp</dt>
            <dd className="mt-1">
              <a className="underline underline-offset-2" href={`tel:${phone.replace(/\s/g, "")}`}>
                {phone}
              </a>
            </dd>
          </div>
        ) : null}
        <div className="sm:col-span-2">
          <dt className="text-xs uppercase tracking-[0.18em] text-[#c45c26]">Business</dt>
          <dd className="mt-1">
            MerchGoa is a brand of {business.legalName}
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

      <div className="mt-10 rounded-2xl bg-[#fffaf3] p-6">
        <h2 className="text-2xl">Send an enquiry</h2>
        <div className="mt-4">
          <EnquireForm />
        </div>
      </div>
    </main>
  );
}
