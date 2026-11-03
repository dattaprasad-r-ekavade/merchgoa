"use client";

import Image from "next/image";
import { useActionState, useState } from "react";
import { saveProduct } from "@/app/admin/actions";
import { Card, Field, inputCls } from "@/components/admin/fields";
import { FormMessage, SubmitButton } from "@/components/admin/ui";
import type { Product } from "@/lib/site";

export function ProductForm({
  product,
  categories,
  saved,
}: {
  product?: Product;
  categories: string[];
  saved?: boolean;
}) {
  const [state, action] = useActionState(saveProduct, saved ? { ok: "Product created." } : undefined);
  const [preview, setPreview] = useState<string | null>(null);
  const isNew = !product;
  const seoTitle = product?.seoTitle ?? "";
  const seoDesc = product?.seoDescription ?? "";
  const [titleLen, setTitleLen] = useState(seoTitle.length);
  const [descLen, setDescLen] = useState(seoDesc.length);

  return (
    <form action={action} className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <input type="hidden" name="isNew" value={isNew ? "1" : "0"} />
      {!isNew ? <input type="hidden" name="slug" value={product.slug} /> : null}

      <div className="grid gap-6">
        <Card title="Details">
          <div className="grid gap-4">
            <Field label="Name">
              <input name="name" required defaultValue={product?.name} className={inputCls} />
            </Field>
            {isNew ? (
              <Field label="URL" hint="Leave blank to use the name. Can't be changed later (it would break links).">
                <div className="flex items-center gap-1 text-sm text-[#5c5148]">
                  /product/
                  <input name="slug" pattern="[a-z0-9-]*" className={inputCls} placeholder="goa-sunset-mug" />
                </div>
              </Field>
            ) : null}
            <Field label="One-line pitch" hint="Shown under the name on shop cards.">
              <input name="short" defaultValue={product?.short} maxLength={160} className={inputCls} />
            </Field>
            <Field label="Description">
              <textarea name="description" required rows={5} defaultValue={product?.description} className={inputCls} />
            </Field>
            <Field label="Category">
              <input name="category" list="categories" defaultValue={product?.category} className={inputCls} />
              <datalist id="categories">
                {categories.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </Field>
          </div>
        </Card>

        <Card title="Pricing">
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Price (₹)">
              <input name="price" inputMode="numeric" defaultValue={product?.price ?? ""} className={inputCls} />
            </Field>
            <Field label="Bulk from (pieces)">
              <input name="bulkMin" inputMode="numeric" defaultValue={product?.bulk?.min ?? ""} className={inputCls} placeholder="25" />
            </Field>
            <Field label="Bulk price each (₹)">
              <input name="bulkPrice" inputMode="numeric" defaultValue={product?.bulk?.price ?? ""} className={inputCls} />
            </Field>
          </div>
          <p className="mt-2 text-xs text-[#5c5148]">
            Prices include GST and shipping. Leave the price blank to show “Price on request”.
          </p>
        </Card>

        <Card title="Search engines">
          <div className="grid gap-4">
            <Field label={`Page title (${titleLen}/60)`} hint="Blank = product name. Include what it is and “Goa”, e.g. “Goa Sunset Mug, 11 oz souvenir mug”.">
              <input
                name="seoTitle"
                maxLength={70}
                defaultValue={seoTitle}
                onChange={(e) => setTitleLen(e.target.value.length)}
                className={inputCls}
              />
            </Field>
            <Field label={`Meta description (${descLen}/160)`} hint="Blank = description. One or two sentences that make someone click.">
              <textarea
                name="seoDescription"
                rows={2}
                maxLength={170}
                defaultValue={seoDesc}
                onChange={(e) => setDescLen(e.target.value.length)}
                className={inputCls}
              />
            </Field>
          </div>
        </Card>
      </div>

      <div className="grid content-start gap-6">
        <Card title="Photo">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-[#e7dcc8]">
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="" className="h-full w-full object-cover" />
            ) : product?.image ? (
              <Image src={product.image} alt="" fill sizes="320px" className="object-cover" />
            ) : (
              <span className="grid h-full place-items-center text-sm text-[#5c5148]">No photo yet</span>
            )}
          </div>
          <div className="mt-3 grid gap-3">
            <input
              type="file"
              name="imageFile"
              accept="image/jpeg,image/png,image/webp"
              required={isNew}
              onChange={(e) => {
                const f = e.target.files?.[0];
                setPreview(f ? URL.createObjectURL(f) : null);
              }}
              className="text-sm"
            />
            <p className="text-xs text-[#5c5148]">Square, at least 1200×1200. Max 8 MB. Converted to WebP automatically.</p>
            <Field label="Alt text" hint="Describe the photo for Google Images and screen readers.">
              <input name="imageAlt" defaultValue={product?.imageAlt} maxLength={200} className={inputCls} />
            </Field>
          </div>
        </Card>

        <div className="grid gap-3 rounded-xl border border-[#241c16]/10 bg-white p-4">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="hidden" defaultChecked={product?.hidden} />
            Hide from the site
          </label>
          <FormMessage state={state} />
          <SubmitButton>{isNew ? "Create product" : "Save changes"}</SubmitButton>
          {!isNew ? (
            <a href={`/product/${product.slug}`} target="_blank" rel="noopener" className="text-center text-sm underline underline-offset-2">
              View on site ↗
            </a>
          ) : null}
        </div>
      </div>
    </form>
  );
}
