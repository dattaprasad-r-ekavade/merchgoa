import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

const links = [
  { href: "/shop", label: "Shop", short: "Shop" },
  { href: "/business-gifting", label: "Business gifting", short: "Gifting" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-page/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <Link href="/" className="text-lg tracking-tight">
          <span className="font-[family-name:var(--font-display)] text-xl">MerchGoa</span>
        </Link>
        <nav className="flex items-center gap-3 text-sm text-ink-soft sm:gap-5">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="whitespace-nowrap hover:text-ink">
              <span className="sm:hidden">{l.short}</span>
              <span className="hidden sm:inline">{l.label}</span>
            </Link>
          ))}
          <Link
            href="/contact"
            className="whitespace-nowrap rounded-full bg-sea px-4 py-2 text-[#fffaf3] hover:bg-sea-hover"
          >
            Enquire
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
