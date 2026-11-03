import type { Metadata } from "next";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shop",
  description: "Collection 01 — seven Goa-inspired pieces. Enquire for options and pricing.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-14">
      <p className="text-xs uppercase tracking-[0.22em] text-[#c45c26]">MerchGoa / Collection 01</p>
      <h1 className="mt-3 text-5xl">Objects for good days.</h1>
      <p className="mt-4 max-w-xl text-[#5c5148]">
        Start with a tote, a desk companion or a small keepsake. Design previews — we quote print and
        timing before an order.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </main>
  );
}
