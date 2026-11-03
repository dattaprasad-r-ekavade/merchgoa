import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/site";

export default function HomePage() {
  return (
    <main>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 md:grid-cols-2 md:py-20">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-[#c45c26]">MerchGoa / Collection 01</p>
          <h1 className="mt-4 text-5xl leading-[1.05] md:text-6xl">
            Good things to <em className="not-italic text-[#163a44]">carry away.</em>
          </h1>
          <p className="mt-5 max-w-md text-[#5c5148]">
            Custom merchandise and corporate gifts for Goa businesses, teams and events. Pick a
            Goa-inspired design or bring your own branding.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/shop" className="rounded-full bg-[#163a44] px-5 py-3 text-white">
              Explore the collection
            </Link>
            <Link href="/business-gifting" className="rounded-full border border-[#241c16]/20 px-5 py-3">
              Planning gifts for a team?
            </Link>
          </div>
          <p className="mt-4 text-sm text-[#5c5148]">Printed to order · Delivered across India · Branded orders for teams</p>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-[#e7dcc8]">
          <Image
            src="/images/hero.webp"
            alt="Goa-inspired gift set with tote, mug and notebook"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10">
        <p className="text-xs uppercase tracking-[0.22em] text-[#c45c26]">The first collection</p>
        <h2 className="mt-2 text-4xl">
          For desks, day trips <em className="not-italic text-[#163a44]">& everything between.</em>
        </h2>
        <p className="mb-8 mt-4 max-w-2xl text-sm text-[#5c5148]">
          Every piece is printed to order. Artwork is shown on product mockups.
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <section className="mx-auto my-10 max-w-6xl rounded-[2rem] bg-[#163a44] px-6 py-14 text-[#fffaf3] md:px-12">
        <p className="text-xs uppercase tracking-[0.22em] text-[#f0c9a8]">Christmas 2026 / corporate gifting</p>
        <h2 className="mt-3 max-w-xl text-4xl">
          Your team. Your brand. <em className="not-italic text-[#f0c9a8]">Thoughtful gifts.</em>
        </h2>
        <p className="mt-4 max-w-xl text-white/75">
          Build Christmas gifts, staff welcome kits or event merchandise around your logo and budget.
        </p>
        <Link href="/business-gifting" className="mt-8 inline-block rounded-full bg-[#c45c26] px-5 py-3 text-white">
          Talk through a gift brief
        </Link>
      </section>
    </main>
  );
}
