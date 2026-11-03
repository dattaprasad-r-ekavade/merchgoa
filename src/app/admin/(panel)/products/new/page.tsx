import Link from "next/link";
import { ProductForm } from "@/components/admin/ProductForm";
import { requireAdmin } from "@/lib/auth";
import { getAllProducts } from "@/lib/store";

export const metadata = { title: "New product" };

export default async function NewProduct() {
  await requireAdmin();
  const categories = [...new Set((await getAllProducts()).map((p) => p.category))];
  return (
    <div className="grid gap-6">
      <div>
        <Link href="/admin/products" className="text-sm text-ink-soft hover:underline">
          ← Products
        </Link>
        <h1 className="mt-1 text-3xl">New product</h1>
      </div>
      <ProductForm categories={categories} />
    </div>
  );
}
