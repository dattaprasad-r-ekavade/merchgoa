import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EnquireForm } from "@/components/EnquireForm";
import { Price } from "@/components/Price";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { fulfilment, getProduct, products, site } from "@/lib/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.description,
    alternates: { canonical: `/product/${p.slug}` },
    openGraph: { images: [p.image] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: `${site.url}${product.image}`,
    category: product.category,
    brand: { "@type": "Brand", name: site.name },
    ...(product.price != null
      ? {
          offers: {
            "@type": "Offer",
            price: product.price,
            priceCurrency: "INR",
            availability: "https://schema.org/MadeToOrder",
            url: `${site.url}/product/${product.slug}`,
          },
        }
      : {}),
  };

  return (
    <main className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-2">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-[#e7dcc8] md:sticky md:top-24 md:self-start">
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-[#c45c26]">{product.category}</p>
        <h1 className="mt-3 text-4xl md:text-5xl">{product.name}</h1>
        <div className="mt-4">
          <Price product={product} size="lg" />
        </div>
        <p className="mt-5 text-[#5c5148]">{product.description}</p>

        <ul className="mt-6 grid gap-2 text-sm text-[#5c5148]">
          <li>
            <strong className="text-[#241c16]">Made to order:</strong> printed in {fulfilment.productionDays}, delivered
            in {fulfilment.deliveryDays} to {fulfilment.shipsTo}.
          </li>
          <li>
            <strong className="text-[#241c16]">For Christmas:</strong> order by {fulfilment.christmasCutoff}.
          </li>
          <li>
            <strong className="text-[#241c16]">Your logo instead?</strong>{" "}
            <Link href="/business-gifting" className="underline underline-offset-2">
              Branded orders for teams
            </Link>
            .
          </li>
        </ul>

        <div className="mt-6">
          <WhatsAppButton message={`Hi MerchGoa, I'm interested in the ${product.name}.`} />
        </div>

        <div className="mt-10 rounded-2xl bg-[#fffaf3] p-6">
          <h2 className="text-2xl">Enquire about this piece</h2>
          <p className="mt-1 text-sm text-[#5c5148]">Quantity, date and any personalisation. We reply within a day.</p>
          <div className="mt-4">
            <EnquireForm defaultProduct={product.name} />
          </div>
        </div>
      </div>
    </main>
  );
}
