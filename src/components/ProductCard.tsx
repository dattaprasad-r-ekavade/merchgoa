import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/site";
import { Price } from "@/components/Price";

export function ProductCard({ product, headingLevel = "h2" }: { product: Product; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group overflow-hidden rounded-2xl bg-surface shadow-[0_10px_40px_rgba(36,28,22,0.08)]"
    >
      <div className="relative aspect-square bg-surface-2">
        <Image
          src={product.image}
          alt={product.imageAlt || product.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="p-5">
        <p className="text-xs uppercase tracking-[0.18em] text-coral-ink">{product.category}</p>
        <Heading className="mt-1 text-xl">{product.name}</Heading>
        <p className="mt-1 text-sm text-ink-soft">{product.short}</p>
        <div className="mt-3">
          <Price product={product} />
        </div>
      </div>
    </Link>
  );
}
