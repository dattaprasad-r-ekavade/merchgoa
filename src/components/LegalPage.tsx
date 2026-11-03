import { business, filled, site } from "@/lib/site";

export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="mx-auto max-w-3xl px-5 py-14">
      <p className="text-xs uppercase tracking-[0.22em] text-[#c45c26]">MerchGoa / policies</p>
      <h1 className="mt-3 text-4xl md:text-5xl">{title}</h1>
      <p className="mt-3 text-sm text-[#5c5148]">Last updated {business.policiesUpdated}</p>
      <div className="legal mt-8 rounded-2xl bg-[#fffaf3] p-6 text-[#3d342c] md:p-8">{children}</div>
    </main>
  );
}

/** Seller identity + contact block used at the end of every policy. */
export function SellerDetails() {
  const phone = filled(site.phone);
  const address = filled(business.address);
  const gstin = filled(business.gstin);
  return (
    <>
      <h2>Contact</h2>
      <p>
        MerchGoa is a brand operated by <strong>{business.legalName}</strong>.
        {address ? (
          <>
            <br />
            Registered address: {address}
          </>
        ) : null}
        {gstin ? (
          <>
            <br />
            GSTIN: {gstin}
          </>
        ) : null}
        <br />
        Email: <a href={`mailto:${site.email}`}>{site.email}</a>
        {phone ? (
          <>
            <br />
            Phone / WhatsApp: {phone}
          </>
        ) : null}
      </p>
    </>
  );
}
