import type { Metadata } from "next";
import Link from "next/link";
import { SiteChrome } from "@/components/SiteChrome";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <SiteChrome>
    <main className="mx-auto max-w-3xl px-5 py-24 text-center">
      <h1 className="text-4xl sm:text-5xl">Page not found</h1>
      <p className="mt-4 text-ink-soft">The link may be old, or the piece may have moved.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/shop" className="rounded-md bg-sea px-5 py-3 text-white">
          Browse the collection
        </Link>
        <Link href="/contact" className="rounded-md border border-ink/20 px-5 py-3">
          Contact us
        </Link>
      </div>
    </main>
    </SiteChrome>
  );
}
