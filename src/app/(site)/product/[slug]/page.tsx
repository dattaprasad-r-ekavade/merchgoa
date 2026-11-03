import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EnquireForm } from "@/components/EnquireForm";
import { JsonLd } from "@/components/JsonLd";
import { Price } from "@/components/Price";
import { ProductCard } from "@/components/ProductCard";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { site } from "@/lib/site";
import { getProduct, getProducts, getSettings } from "@/lib/store";

export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = await getProduct((await params).slug);
  if (!p) return {};
  const title = p.seoTitle || p.name;
  const description = p.seoDescription || p.description;
  return {
    title,
    description,
    alternates: { canonical: `/product/${p.slug}` },
    openGraph: {
      title,
      description,
      url: `/product/${p.slug}`,
      images: [{ url: p.image, alt: p.imageAlt || p.name }],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [product, settings, all] = await Promise.all([getProduct(slug), getSettings(), getProducts()]);
  if (!product) notFound();
  const url = `${site.url}/product/${product.slug}`;
  const related = all.filter((p) => p.slug !== product.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${url}#product`,
        name: product.name,
        description: product.description,
        image: product.image.startsWith("http") ? product.image : `${site.url}${product.image}`,
        sku: product.slug,
        category: product.category,
        brand: { "@type": "Brand", name: site.name },
        ...(product.price != null
          ? {
              offers: {
                "@type": "Offer",
                url,
                price: product.price,
                priceCurrency: "INR",
                availability: "https://schema.org/InStock",
                itemCondition: "https://schema.org/NewCondition",
                seller: { "@id": `${site.url}/#org` },
                shippingDetails: {
                  "@type": "OfferShippingDetails",
                  shippingRate: { "@type": "MonetaryAmount", value: 0, currency: "INR" },
                  shippingDestination: { "@type": "DefinedRegion", addressCountry: "IN" },
                },
                hasMerchantReturnPolicy: {
                  "@type": "MerchantReturnPolicy",
                  applicableCountry: "IN",
                  returnPolicyCategory: "https://schema.org/MerchantReturnNotPermitted",
                  url: `${site.url}/refunds`,
                },
              },
            }
          : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "Shop", item: `${site.url}/shop` },
          { "@type": "ListItem", position: 3, name: product.name, item: url },
        ],
      },
    ],
  };

  return (
    <main className="mx-auto max-w-6xl px-5 py-10">
      <JsonLd data={jsonLd} />
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-ink-soft">
        <ol className="flex flex-wrap gap-2">
          <li>
            <Link href="/" className="hover:underline">Home</Link> /
          </li>
          <li>
            <Link href="/shop" className="hover:underline">Shop</Link> /
          </li>
          <li aria-current="page" className="text-ink">{product.name}</li>
        </ol>
      </nav>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-surface-2 md:sticky md:top-24 md:self-start">
          <Image
            src={product.image}
            alt={product.imageAlt || product.name}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div>
          <h1 className="text-4xl md:text-5xl">{product.name}</h1>
          <div className="mt-4">
            <Price product={product} size="lg" />
          </div>
          <p className="mt-5 text-ink-soft">{product.description}</p>

          <ul className="mt-6 grid gap-2 text-sm text-ink-soft">
            <li>
              <strong className="text-ink">Made to order:</strong> printed in {settings.productionDays}, delivered
              in {settings.deliveryDays} to {settings.shipsTo}.
            </li>
            {settings.christmasCutoff ? (
              <li>
                <strong className="text-ink">For Christmas:</strong> order by {settings.christmasCutoff}.
              </li>
            ) : null}
            <li>
              <strong className="text-ink">Your logo instead?</strong>{" "}
              <Link href="/business-gifting" className="underline underline-offset-2">
                Branded orders for teams
              </Link>
              .
            </li>
          </ul>

          <div className="mt-6">
            <WhatsAppButton message={`Hi MerchGoa, I'm interested in the ${product.name}.`} />
          </div>

          <div className="mt-10 rounded-lg border border-ink/10 bg-surface p-6">
            <h2 className="text-2xl">Enquire about this piece</h2>
            <p className="mt-1 text-sm text-ink-soft">Quantity, date and any personalisation. We reply within a day.</p>
            <div className="mt-4">
              <EnquireForm defaultProduct={product.name} />
            </div>
          </div>
        </div>
      </div>

      {related.length ? (
        <section className="mt-20">
          <h2 className="border-b border-ink/10 pb-4 text-3xl">More from the collection</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} headingLevel="h3" />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
