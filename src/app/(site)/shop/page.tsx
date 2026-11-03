import type { Metadata } from "next";
import { ProductCard } from "@/components/ProductCard";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";
import { getProducts } from "@/lib/store";

export const metadata: Metadata = {
  title: "Shop Goa souvenirs: mugs, t-shirts, totes & more",
  description:
    "Goa-inspired mugs, t-shirts, tote bags, notebooks, coasters and magnets. Printed to order and delivered across India.",
  alternates: { canonical: "/shop" },
};

export default async function ShopPage() {
  const products = await getProducts();
  const list = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "MerchGoa shop",
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${site.url}/product/${p.slug}`,
      name: p.name,
    })),
  };
  return (
    <main className="mx-auto max-w-6xl px-5 py-14">
      <JsonLd data={list} />
      <p className="text-xs uppercase tracking-[0.22em] text-[#c45c26]">MerchGoa / Collection 01</p>
      <h1 className="mt-3 text-5xl">Objects for good days.</h1>
      <p className="mt-4 max-w-xl text-[#5c5148]">
        Start with a tote, a desk companion or a small keepsake. Printed to order and delivered across
        India. Need 25 or more, or your own logo? Ask about business gifting.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </main>
  );
}
