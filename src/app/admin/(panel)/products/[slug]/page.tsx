import Link from "next/link";
import { notFound } from "next/navigation";
import { removeProduct } from "@/app/admin/actions";
import { Card } from "@/components/admin/fields";
import { ProductForm } from "@/components/admin/ProductForm";
import { SubmitButton } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";
import { getAllProducts } from "@/lib/store";

export const metadata = { title: "Edit product" };

export default async function EditProduct({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  await requireAdmin();
  const { slug } = await params;
  const all = await getAllProducts();
  const product = all.find((p) => p.slug === slug);
  if (!product) notFound();
  const categories = [...new Set(all.map((p) => p.category))];

  return (
    <div className="grid gap-6">
      <div>
        <Link href="/admin/products" className="text-sm text-[#5c5148] hover:underline">
          ← Products
        </Link>
        <h1 className="mt-1 text-3xl">{product.name}</h1>
      </div>
      <ProductForm product={product} categories={categories} saved={(await searchParams).saved === "1"} />
      <Card title="Delete product">
        <form action={removeProduct} className="flex flex-wrap items-center gap-4 text-sm">
          <input type="hidden" name="slug" value={product.slug} />
          <label className="flex items-center gap-2">
            <input type="checkbox" name="confirm" required /> I understand the page /product/{product.slug} will stop working.
          </label>
          <SubmitButton variant="danger" pendingText="Deleting…">
            Delete
          </SubmitButton>
        </form>
        <p className="mt-2 text-xs text-[#5c5148]">Prefer “Hide from the site” if you might bring it back.</p>
      </Card>
    </div>
  );
}
