import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/site";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group overflow-hidden rounded-2xl bg-[#fffaf3] shadow-[0_10px_40px_rgba(36,28,22,0.08)]"
    >
      <div className="relative aspect-square bg-[#e7dcc8]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="p-5">
        <p className="text-xs uppercase tracking-[0.18em] text-[#c45c26]">{product.category}</p>
        <h3 className="mt-1 text-xl">{product.name}</h3>
        <p className="mt-1 text-sm text-[#5c5148]">{product.short}</p>
      </div>
    </Link>
  );
}
