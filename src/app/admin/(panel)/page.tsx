import Link from "next/link";
import { Card } from "@/components/admin/fields";
import { StatusPill } from "@/components/admin/StatusPill";
import { launchChecks } from "@/lib/launch";
import { requireAdmin } from "@/lib/auth";
import { ENQUIRY_STATUSES } from "@/lib/site";
import { getAllProducts, getSettings, listEnquiries } from "@/lib/store";

export default async function Dashboard() {
  await requireAdmin();
  const [enquiries, products, settings] = await Promise.all([listEnquiries(), getAllProducts(), getSettings()]);
  const checks = launchChecks(settings, products);
  const done = checks.filter((c) => c.ok).length;
  const weekAgo = new Date(Date.now() - 7 * 864e5).toISOString();

  return (
    <div className="grid gap-6">
      <h1 className="text-3xl">Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="New enquiries" value={enquiries.filter((e) => e.status === "new").length} href="/admin/enquiries?status=new" />
        <Stat label="Enquiries, last 7 days" value={enquiries.filter((e) => e.at >= weekAgo).length} href="/admin/enquiries" />
        <Stat label="Won" value={enquiries.filter((e) => e.status === "won").length} href="/admin/enquiries?status=won" />
        <Stat label="Products live" value={products.filter((p) => !p.hidden).length} href="/admin/products" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title={`Launch checklist · ${done}/${checks.length}`}>
          <ul className="grid gap-2 text-sm">
            {checks.map((c) => (
              <li key={c.label} className="flex items-start gap-2">
                <span aria-hidden className={c.ok ? "text-ok-ink" : "text-coral-ink"}>
                  {c.ok ? "✓" : "○"}
                </span>
                {c.ok ? (
                  <span className="text-ink-soft">{c.label}</span>
                ) : (
                  <Link href={c.href} className="underline underline-offset-2">
                    {c.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </Card>

        <Card
          title="Latest enquiries"
          actions={
            <Link href="/admin/enquiries" className="text-sm underline underline-offset-2">
              All
            </Link>
          }
        >
          {enquiries.length === 0 ? (
            <p className="text-sm text-ink-soft">No enquiries yet.</p>
          ) : (
            <ul className="divide-y divide-ink/10 text-sm">
              {enquiries.slice(0, 6).map((e) => (
                <li key={e.id} className="flex items-center justify-between gap-3 py-2">
                  <span>
                    <strong>{e.name}</strong> <span className="text-ink-soft">· {e.product || "General"}{e.quantity ? ` · ${e.quantity}` : ""}</span>
                  </span>
                  <StatusPill status={e.status} />
                </li>
              ))}
            </ul>
          )}
          <p className="mt-4 text-xs text-ink-soft">
            Pipeline:{" "}
            {ENQUIRY_STATUSES.map((s) => `${s} ${enquiries.filter((e) => e.status === s).length}`).join(" · ")}
          </p>
        </Card>
      </div>
    </div>
  );
}

function Stat({ label, value, href }: { label: string; value: number; href: string }) {
  return (
    <Link href={href} className="rounded-xl border border-ink/10 bg-surface p-5 hover:border-[#c45c26]/40">
      <p className="text-xs uppercase tracking-[0.14em] text-ink-soft">{label}</p>
      <p className="mt-2 text-3xl font-semibold">{value}</p>
    </Link>
  );
}
