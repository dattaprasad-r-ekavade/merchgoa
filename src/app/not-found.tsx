import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-24 text-center">
      <p className="text-xs uppercase tracking-[0.22em] text-[#c45c26]">404</p>
      <h1 className="mt-3 text-5xl">This page washed out with the tide.</h1>
      <p className="mt-4 text-[#5c5148]">The link may be old, or the piece may have moved.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/shop" className="rounded-full bg-[#163a44] px-5 py-3 text-white">
          Browse the collection
        </Link>
        <Link href="/contact" className="rounded-full border border-[#241c16]/20 px-5 py-3">
          Contact us
        </Link>
      </div>
    </main>
  );
}
