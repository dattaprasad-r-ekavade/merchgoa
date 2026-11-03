import type { Metadata } from "next";
import Link from "next/link";
import { SiteChrome } from "@/components/SiteChrome";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <SiteChrome>
    <main className="mx-auto max-w-3xl px-5 py-24 text-center">
      <p className="text-xs uppercase tracking-[0.22em] text-coral-ink">404</p>
      <h1 className="mt-3 text-5xl">This page washed out with the tide.</h1>
      <p className="mt-4 text-ink-soft">The link may be old, or the piece may have moved.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/shop" className="rounded-full bg-sea px-5 py-3 text-white">
          Browse the collection
        </Link>
        <Link href="/contact" className="rounded-full border border-ink/20 px-5 py-3">
          Contact us
        </Link>
      </div>
    </main>
    </SiteChrome>
  );
}
