import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { EnquireForm } from "@/components/EnquireForm";
import { getProduct, products } from "@/lib/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const p = getProduct(slug);
    if (!p) return {};
    return {
      title: p.name,
      description: p.description,
      alternates: { canonical: `/product/${p.slug}` },
      openGraph: { images: [p.image] },
    };
  });
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <main className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-2">
      <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-[#e7dcc8]">
        <Image src={product.image} alt={product.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-[#c45c26]">{product.category}</p>
        <h1 className="mt-3 text-4xl md:text-5xl">{product.name}</h1>
        <p className="mt-4 text-[#5c5148]">{product.description}</p>
        <p className="mt-3 text-sm text-[#5c5148]">
          Images are visual concepts. Final print, options and price are confirmed before ordering.
        </p>
        <div className="mt-10 rounded-2xl bg-[#fffaf3] p-6">
          <h2 className="text-2xl">Enquire about this piece</h2>
          <div className="mt-4">
            <EnquireForm defaultProduct={product.name} />
          </div>
        </div>
      </div>
    </main>
  );
}
