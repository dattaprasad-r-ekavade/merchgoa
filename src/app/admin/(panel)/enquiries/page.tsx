import Link from "next/link";
import { removeEnquiry, saveEnquiry } from "@/app/admin/actions";
import { SubmitButton } from "@/components/admin/ui";
import { inputCls } from "@/components/admin/fields";
import { requireAdmin } from "@/lib/auth";
import { ENQUIRY_STATUSES, whatsappLink, type EnquiryStatus } from "@/lib/site";
import { listEnquiries } from "@/lib/store";
import { StatusPill } from "@/components/admin/StatusPill";

export const metadata = { title: "Enquiries" };

export default async function EnquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  await requireAdmin();
  const { status, q } = await searchParams;
  const all = await listEnquiries();
  const query = (q || "").toLowerCase();
  const rows = all.filter(
    (e) =>
      (!status || e.status === status) &&
      (!query || [e.name, e.email, e.phone, e.product, e.notes, e.location].join(" ").toLowerCase().includes(query)),
  );

  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h1 className="text-3xl">Enquiries</h1>
        <a href="/admin/enquiries/export" className="rounded-lg border border-ink/20 bg-surface px-3 py-2 text-sm">
          Export CSV
        </a>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-sm">
        <FilterLink label={`All (${all.length})`} active={!status} href="/admin/enquiries" />
        {ENQUIRY_STATUSES.map((s) => (
          <FilterLink
            key={s}
            label={`${s} (${all.filter((e) => e.status === s).length})`}
            active={status === s}
            href={`/admin/enquiries?status=${s}`}
          />
        ))}
        <form className="ml-auto">
          {status ? <input type="hidden" name="status" value={status} /> : null}
          <input name="q" defaultValue={q} placeholder="Search name, email, product…" className={`${inputCls} w-64`} />
        </form>
      </div>

      {rows.length === 0 ? (
        <p className="rounded-xl border border-dashed border-ink/20 p-10 text-center text-sm text-ink-soft">
          No enquiries {status ? `marked “${status}”` : "yet"}.
        </p>
      ) : (
        <ul className="grid gap-4">
          {rows.map((e) => {
            const digits = e.phone.replace(/\D/g, "");
            const wa = digits.length >= 10 ? whatsappLink(digits.length === 10 ? `91${digits}` : digits, `Hi ${e.name}, thanks for your MerchGoa enquiry${e.product ? ` about ${e.product}` : ""}. `) : null;
            return (
              <li key={e.id} className="rounded-xl border border-ink/10 bg-surface p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold">
                      {e.name} <StatusPill status={e.status} />
                    </p>
                    <p className="text-xs text-ink-soft">
                      {new Date(e.at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" })}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <a className="rounded-lg border border-ink/15 px-3 py-1.5" href={`mailto:${e.email}?subject=${encodeURIComponent(`Your MerchGoa enquiry${e.product ? `: ${e.product}` : ""}`)}`}>
                      Email
                    </a>
                    {e.phone ? (
                      <a className="rounded-lg border border-ink/15 px-3 py-1.5" href={`tel:${e.phone.replace(/[^\d+]/g, "")}`}>
                        Call
                      </a>
                    ) : null}
                    {wa ? (
                      <a className="rounded-lg bg-[#1f7a4d] px-3 py-1.5 text-white" href={wa} target="_blank" rel="noopener noreferrer">
                        WhatsApp
                      </a>
                    ) : null}
                  </div>
                </div>

                <dl className="mt-4 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
                  <Info k="Email" v={e.email} />
                  <Info k="Phone" v={e.phone} />
                  <Info k="Product" v={e.product} />
                  <Info k="Quantity" v={e.quantity} />
                  <Info k="Needed by" v={e.needed_by} />
                  <Info k="Location" v={e.location} />
                </dl>
                {e.notes ? <p className="mt-3 whitespace-pre-wrap rounded-lg bg-page p-3 text-sm">{e.notes}</p> : null}

                <form action={saveEnquiry} className="mt-4 grid gap-3 border-t border-ink/10 pt-4 sm:grid-cols-[160px_1fr_auto] sm:items-start">
                  <input type="hidden" name="id" value={e.id} />
                  <select name="status" defaultValue={e.status} className={inputCls} aria-label="Status">
                    {ENQUIRY_STATUSES.map((s: EnquiryStatus) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <textarea name="adminNote" defaultValue={e.adminNote} rows={1} placeholder="Internal note (quote sent, price, follow-up date…)" className={inputCls} aria-label="Internal note" />
                  <SubmitButton>Update</SubmitButton>
                </form>
                <details className="mt-2 text-xs text-ink-soft">
                  <summary className="cursor-pointer">Delete</summary>
                  <form action={removeEnquiry} className="mt-2 flex items-center gap-3">
                    <input type="hidden" name="id" value={e.id} />
                    <span>Permanently delete this enquiry (e.g. spam or a data deletion request)?</span>
                    <SubmitButton variant="danger" pendingText="Deleting…">Delete</SubmitButton>
                  </form>
                </details>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function FilterLink({ label, href, active }: { label: string; href: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={`rounded-full px-3 py-1 capitalize ${active ? "bg-sea text-white" : "border border-ink/15 bg-surface"}`}
    >
      {label}
    </Link>
  );
}

function Info({ k, v }: { k: string; v: string }) {
  if (!v) return null;
  return (
    <div>
      <dt className="text-xs text-ink-soft">{k}</dt>
      <dd className="break-words">{v}</dd>
    </div>
  );
}
