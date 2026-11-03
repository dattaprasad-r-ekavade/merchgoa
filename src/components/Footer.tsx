import Link from "next/link";
import { site } from "@/lib/site";
import { getSettings } from "@/lib/store";

const shop = [
  { href: "/shop", label: "Shop" },
  { href: "/business-gifting", label: "Business gifting" },
  { href: "/contact", label: "Contact" },
];

const policies = [
  { href: "/shipping", label: "Shipping & delivery" },
  { href: "/refunds", label: "Cancellations & refunds" },
  { href: "/terms", label: "Terms & conditions" },
  { href: "/privacy", label: "Privacy policy" },
];

export async function Footer() {
  const s = await getSettings();
  const { phone, address, gstin } = s;
  return (
    <footer className="mt-20 border-t border-[#241c16]/10 bg-[#163a44] text-[#fffaf3]">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <p className="font-[family-name:var(--font-display)] text-2xl">MerchGoa</p>
          <p className="mt-2 max-w-xs text-sm text-white/70">
            Goa-inspired merchandise and branded gifting for businesses, teams and events.
          </p>
        </div>
        <nav className="text-sm text-white/80" aria-label="Shop">
          <p className="mb-2 font-medium text-white">Visit</p>
          {shop.map((l) => (
            <Link key={l.href} className="block py-0.5 hover:underline" href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
        <nav className="text-sm text-white/80" aria-label="Policies">
          <p className="mb-2 font-medium text-white">Policies</p>
          {policies.map((l) => (
            <Link key={l.href} className="block py-0.5 hover:underline" href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="text-sm text-white/80">
          <p className="mb-2 font-medium text-white">Contact</p>
          <a className="block py-0.5 hover:underline" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          {phone ? (
            <a className="block py-0.5 hover:underline" href={`tel:${phone.replace(/\s/g, "")}`}>
              {phone}
            </a>
          ) : null}
          {s.instagram ? (
            <a className="block py-0.5 hover:underline" href={s.instagram} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          ) : null}
          {address ? <p className="mt-2 text-white/60">{address}</p> : null}
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} MerchGoa is a brand of {site.legalName}.
        {gstin ? ` GSTIN ${gstin}.` : ""}
      </div>
    </footer>
  );
}
