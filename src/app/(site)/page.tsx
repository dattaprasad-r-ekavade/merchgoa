import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { getProducts } from "@/lib/store";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const products = await getProducts();
  return (
    <main>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 md:grid-cols-2 md:py-20">
        <div>
          <h1 className="text-4xl leading-[1.1] sm:text-5xl md:text-6xl">Goa souvenirs &amp; custom gifts, printed to order</h1>
          <p className="mt-5 max-w-md text-lg text-ink-soft">
            Mugs, tees, totes and desk pieces with original Goa artwork, or with your company&rsquo;s logo.
            Delivered anywhere in India.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/shop" className="rounded-md bg-sea px-5 py-3 font-medium text-white hover:bg-sea-hover">
              Shop the collection
            </Link>
            <Link href="/business-gifting" className="rounded-md border border-ink/25 px-5 py-3 font-medium hover:border-ink/50">
              Corporate gifting
            </Link>
          </div>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-surface-2">
          <Image
            src="/images/hero.webp"
            alt="Goa-inspired gift set with a tote bag, mug and notebook on a sunlit balcony by the sea"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3 border-b border-ink/10 pb-4">
          <h2 className="text-4xl">The collection</h2>
          <p className="text-sm text-ink-soft">Each piece is printed to order. Artwork shown on product mockups.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} headingLevel="h3" />
          ))}
        </div>
      </section>

      <section className="mx-auto my-10 max-w-6xl px-5">
        <div className="grid gap-6 rounded-lg bg-sea px-6 py-12 text-[#fffaf3] md:grid-cols-[1fr_auto] md:items-center md:px-12">
          <div>
            <h2 className="max-w-xl text-4xl">Branded gifts for your team this Christmas</h2>
            <p className="mt-3 max-w-xl text-white/80">
              Welcome kits, staff gifts and event merchandise with your logo, planned around your budget and date.
            </p>
          </div>
          <Link
            href="/business-gifting"
            className="justify-self-start rounded-md bg-[#c45c26] px-5 py-3 font-medium text-white hover:bg-[#a84d1f]"
          >
            Get a quote
          </Link>
        </div>
      </section>
    </main>
  );
}
