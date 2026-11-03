import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-[#241c16]/10 bg-[#163a44] text-[#fffaf3]">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-3">
        <div>
          <p className="font-[family-name:var(--font-display)] text-2xl">MerchGoa</p>
          <p className="mt-2 max-w-xs text-sm text-white/70">
            Useful merchandise and thoughtful gifting for Goa businesses, teams and events.
          </p>
        </div>
        <div className="text-sm text-white/80">
          <p className="mb-2 font-medium text-white">Visit</p>
          <Link className="block hover:underline" href="/shop">
            Collection 01
          </Link>
          <Link className="block hover:underline" href="/business-gifting">
            Business gifting
          </Link>
          <Link className="block hover:underline" href="/contact">
            Contact
          </Link>
        </div>
        <div className="text-sm text-white/70">
          <p>Enquiries: {site.email}</p>
          <p className="mt-2">Quotes after we check print, timing and supplier stock. No card details in forms.</p>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} MerchGoa. All rights reserved.
      </div>
    </footer>
  );
}
