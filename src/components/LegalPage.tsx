import { site } from "@/lib/site";
import { getSettings } from "@/lib/store";

export async function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  const { policiesUpdated } = await getSettings();
  return (
    <main className="mx-auto max-w-3xl px-5 py-14">
      <h1 className="text-4xl md:text-5xl">{title}</h1>
      <p className="mt-3 text-sm text-ink-soft">Last updated {policiesUpdated}</p>
      <div className="legal mt-8 rounded-lg bg-surface p-6 text-ink md:p-8">{children}</div>
    </main>
  );
}

/** Seller identity + contact block used at the end of every policy. */
export async function SellerDetails() {
  const { phone, address, gstin } = await getSettings();
  return (
    <>
      <h2>Contact</h2>
      <p>
        MerchGoa is a brand operated by <strong>{site.legalName}</strong>.
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
