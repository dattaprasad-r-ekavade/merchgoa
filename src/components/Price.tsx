import { formatINR, type Product } from "@/lib/site";

export function Price({ product, size = "sm" }: { product: Product; size?: "sm" | "lg" }) {
  if (product.price == null) {
    return <p className="text-sm text-ink-soft">Price on request</p>;
  }
  return (
    <div>
      <p className={size === "lg" ? "text-3xl text-ink" : "font-medium text-ink"}>
        {formatINR(product.price)}
        <span className="ml-2 text-xs font-normal text-ink-soft">incl. GST & shipping</span>
      </p>
      {product.bulk ? (
        <p className="mt-1 text-sm text-sea-ink">
          {formatINR(product.bulk.price)} each for {product.bulk.min}+ pieces
        </p>
      ) : null}
    </div>
  );
}
