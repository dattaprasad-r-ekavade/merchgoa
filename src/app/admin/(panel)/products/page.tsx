import Image from "next/image";
import Link from "next/link";
import { reorderProduct } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/auth";
import { formatINR } from "@/lib/site";
import { getAllProducts } from "@/lib/store";

export const metadata = { title: "Products" };

export default async function ProductsPage() {
  await requireAdmin();
  const products = await getAllProducts();
  return (
    <div className="grid gap-5">
      <div className="flex items-end justify-between gap-3">
        <h1 className="text-3xl">Products</h1>
        <Link href="/admin/products/new" className="rounded-lg bg-sea px-4 py-2 text-sm text-white">
          Add product
        </Link>
      </div>
      <p className="text-sm text-ink-soft">Shown on the shop in this order. Hidden products are removed from the site and sitemap.</p>
      <ul className="divide-y divide-ink/10 overflow-hidden rounded-xl border border-ink/10 bg-surface">
        {products.map((p, i) => (
          <li key={p.slug} className="flex items-center gap-4 p-3">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-surface-2">
              <Image src={p.image} alt="" fill sizes="56px" className="object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <Link href={`/admin/products/${p.slug}`} className="font-medium hover:underline">
                {p.name}
              </Link>
              <p className="text-xs text-ink-soft">
                {p.category} · /product/{p.slug}
              </p>
            </div>
            <div className="hidden text-right text-sm sm:block">
              {p.price != null ? formatINR(p.price) : <span className="text-coral-ink">No price</span>}
              {p.bulk ? <p className="text-xs text-ink-soft">{formatINR(p.bulk.price)} @ {p.bulk.min}+</p> : null}
            </div>
            {p.hidden ? <span className="rounded-full bg-muted-bg px-2 py-0.5 text-xs text-muted-ink">Hidden</span> : null}
            <div className="flex gap-1">
              <MoveButton slug={p.slug} dir="up" disabled={i === 0} />
              <MoveButton slug={p.slug} dir="down" disabled={i === products.length - 1} />
            </div>
            <Link href={`/admin/products/${p.slug}`} className="rounded-lg border border-ink/15 px-3 py-1.5 text-sm">
              Edit
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MoveButton({ slug, dir, disabled }: { slug: string; dir: "up" | "down"; disabled: boolean }) {
  return (
    <form action={reorderProduct}>
      <input type="hidden" name="slug" value={slug} />
      <input type="hidden" name="dir" value={dir} />
      <button
        disabled={disabled}
        aria-label={`Move ${dir}`}
        className="grid h-8 w-8 place-items-center rounded-lg border border-ink/15 text-sm disabled:opacity-30"
      >
        {dir === "up" ? "↑" : "↓"}
      </button>
    </form>
  );
}
