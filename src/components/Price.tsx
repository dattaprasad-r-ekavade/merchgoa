import { formatINR, type Product } from "@/lib/site";

export function Price({ product, size = "sm" }: { product: Product; size?: "sm" | "lg" }) {
  if (product.price == null) {
    return <p className="text-sm text-[#5c5148]">Price on request</p>;
  }
  return (
    <div>
      <p className={size === "lg" ? "text-3xl text-[#241c16]" : "font-medium text-[#241c16]"}>
        {formatINR(product.price)}
        <span className="ml-2 text-xs font-normal text-[#5c5148]">incl. GST & shipping</span>
      </p>
      {product.bulk ? (
        <p className="mt-1 text-sm text-[#163a44]">
          {formatINR(product.bulk.price)} each for {product.bulk.min}+ pieces
        </p>
      ) : null}
    </div>
  );
}
