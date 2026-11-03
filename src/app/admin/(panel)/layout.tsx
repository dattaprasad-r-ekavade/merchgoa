import Link from "next/link";
import { logout } from "@/app/admin/actions";
import { ThemeToggle } from "@/components/ThemeToggle";
import { requireAdmin } from "@/lib/auth";
import { listEnquiries } from "@/lib/store";

export const dynamic = "force-dynamic";

const nav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/enquiries", label: "Enquiries" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/settings", label: "Settings" },
];

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  const fresh = (await listEnquiries()).filter((e) => e.status === "new").length;
  return (
    <>
      <header className="z-40 border-b border-ink/10 bg-surface sm:sticky sm:top-0">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-5 py-3">
          <Link href="/admin" className="font-[family-name:var(--font-display)] text-lg">
            MerchGoa <span className="font-sans text-xs text-ink-soft">admin</span>
          </Link>
          <nav className="order-3 flex w-full items-center gap-4 overflow-x-auto whitespace-nowrap text-sm sm:order-none sm:w-auto sm:flex-1">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="text-ink-soft hover:text-ink">
                {n.label}
                {n.href === "/admin/enquiries" && fresh > 0 ? (
                  <span className="ml-1 rounded-full bg-[#c45c26] px-1.5 py-0.5 text-[10px] font-semibold text-white">
                    {fresh}
                  </span>
                ) : null}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-4 text-sm sm:ml-0">
            <a href="/" target="_blank" rel="noopener" className="text-ink-soft hover:text-ink">
              View site ↗
            </a>
            <ThemeToggle />
            <form action={logout}>
              <button className="text-ink-soft hover:text-ink">Sign out</button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-8">{children}</main>
    </>
  );
}
