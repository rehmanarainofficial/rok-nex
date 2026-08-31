"use client";

import { Plus, Trash2, Upload } from "lucide-react";
import Image from "next/image";
import type { ChangeEvent, ReactNode } from "react";
import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";

import type { ProductFormState } from "@/app/admin/(panel)/products/actions";
import type { BrandDivision, ProductImage, ProductSpecification, StockStatus } from "@/types/product";

export type AdminProductFormValue = {
  id?: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  brandDivision: BrandDivision;
  category: string;
  subcategory?: string;
  sku?: string;
  regularPrice: number;
  salePrice?: number;
  priceDisplay?: string;
  stockQuantity: number;
  stockStatus: StockStatus;
  featured: boolean;
  active: boolean;
  images: ProductImage[];
  thumbnail: string;
  specifications: ProductSpecification[];
  tags: string[];
  badge?: string;
  sortOrder: number;
  seoTitle?: string;
  seoDescription?: string;
};

export type AdminCategoryOption = {
  id: string;
  name: string;
  slug: string;
  brandDivision: BrandDivision;
};

type ProductFormProps = {
  action: (previousState: ProductFormState, formData: FormData) => Promise<ProductFormState>;
  categories: AdminCategoryOption[];
  product?: AdminProductFormValue;
};

type NewImagePreview = {
  index: number;
  name: string;
  url: string;
};

const emptyProduct: AdminProductFormValue = {
  name: "",
  slug: "",
  shortDescription: "",
  description: "",
  brandDivision: "rox-fitness",
  category: "",
  regularPrice: 0,
  stockQuantity: 0,
  stockStatus: "in-stock",
  featured: false,
  active: true,
  images: [],
  thumbnail: "",
  specifications: [{ label: "", value: "" }],
  tags: [],
  sortOrder: 0,
};

const initialState: ProductFormState = {};

function SubmitButton({ label }: { label: ReactNode }) {
  const { pending } = useFormStatus();

  return (
    <button
      className="inline-flex h-11 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--color-accent)] px-5 text-sm font-bold text-white shadow-[var(--shadow-red)] transition hover:bg-[var(--color-accent-strong)] disabled:pointer-events-none disabled:opacity-60"
      disabled={pending}
      type="submit"
    >
      {pending ? "Saving..." : label}
    </button>
  );
}

export function ProductForm({ action, categories, product }: ProductFormProps) {
  const values = product ?? emptyProduct;
  const [state, formAction] = useActionState(action, initialState);
  const [specifications, setSpecifications] = useState<ProductSpecification[]>(
    values.specifications.length ? values.specifications : [{ label: "", value: "" }],
  );
  const [existingImages, setExistingImages] = useState<ProductImage[]>(values.images);
  const [newImagePreviews, setNewImagePreviews] = useState<NewImagePreview[]>([]);
  const [thumbnailChoice, setThumbnailChoice] = useState(
    values.thumbnail ? `existing:${values.thumbnail}` : "",
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      newImagePreviews.forEach((preview) => URL.revokeObjectURL(preview.url));
    };
  }, [newImagePreviews]);

  function handleFilesChange(event: ChangeEvent<HTMLInputElement>) {
    newImagePreviews.forEach((preview) => URL.revokeObjectURL(preview.url));

    const files = Array.from(event.target.files ?? []);
    setNewImagePreviews(
      files.map((file, index) => ({
        index,
        name: file.name,
        url: URL.createObjectURL(file),
      })),
    );

    if (!thumbnailChoice && files.length > 0) {
      setThumbnailChoice("new:0");
    }
  }

  function removeNewImage(indexToRemove: number) {
    const input = fileInputRef.current;

    if (!input?.files) {
      return;
    }

    const transfer = new DataTransfer();

    Array.from(input.files).forEach((file, index) => {
      if (index !== indexToRemove) {
        transfer.items.add(file);
      }
    });

    input.files = transfer.files;
    const previewUrl = newImagePreviews[indexToRemove]?.url;

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    const nextPreviews = Array.from(input.files).map((file, index) => ({
      index,
      name: file.name,
      url: URL.createObjectURL(file),
    }));

    setNewImagePreviews(nextPreviews);

    if (thumbnailChoice === `new:${indexToRemove}`) {
      setThumbnailChoice(nextPreviews[0] ? "new:0" : existingImages[0] ? `existing:${existingImages[0].url}` : "");
    }
  }

  function removeExistingImage(url: string) {
    const nextImages = existingImages.filter((image) => image.url !== url);
    setExistingImages(nextImages);

    if (thumbnailChoice === `existing:${url}`) {
      setThumbnailChoice(nextImages[0] ? `existing:${nextImages[0].url}` : newImagePreviews[0] ? "new:0" : "");
    }
  }

  return (
    <form action={formAction} className="grid gap-6">
      {state.error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {state.error}
        </div>
      ) : null}

      <section className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
        <h2 className="font-display text-2xl font-bold text-neutral-950">Product details</h2>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold text-neutral-700">
            Product name
            <input defaultValue={values.name} name="name" required />
          </label>
          <label className="grid gap-2 text-sm font-bold text-neutral-700">
            Slug
            <input defaultValue={values.slug} name="slug" required />
          </label>
          <label className="grid gap-2 text-sm font-bold text-neutral-700">
            Division
            <select defaultValue={values.brandDivision} name="brandDivision" required>
              <option value="rox-fitness">Rox Fitness</option>
              <option value="nex-games">Nex Games</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-neutral-700">
            Category
            {categories.length ? (
              <select defaultValue={values.category} name="category" required>
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            ) : (
              <input defaultValue={values.category} name="category" required />
            )}
          </label>
          <label className="grid gap-2 text-sm font-bold text-neutral-700">
            Subcategory
            <input defaultValue={values.subcategory} name="subcategory" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-neutral-700">
            SKU
            <input defaultValue={values.sku} name="sku" />
          </label>
        </div>
        <label className="mt-4 grid gap-2 text-sm font-bold text-neutral-700">
          Short description
          <textarea defaultValue={values.shortDescription} name="shortDescription" required />
        </label>
        <label className="mt-4 grid gap-2 text-sm font-bold text-neutral-700">
          Full description
          <textarea defaultValue={values.description} name="description" required />
        </label>
      </section>

      <section className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
        <h2 className="font-display text-2xl font-bold text-neutral-950">Pricing and stock</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <label className="grid gap-2 text-sm font-bold text-neutral-700">
            Regular price
            <input defaultValue={values.regularPrice} min="0" name="regularPrice" required step="0.01" type="number" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-neutral-700">
            Sale price
            <input defaultValue={values.salePrice} min="0" name="salePrice" step="0.01" type="number" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-neutral-700">
            Stock quantity
            <input defaultValue={values.stockQuantity} min="0" name="stockQuantity" required type="number" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-neutral-700">
            Stock status
            <select defaultValue={values.stockStatus} name="stockStatus" required>
              <option value="in-stock">In stock</option>
              <option value="low-stock">Low stock</option>
              <option value="out-of-stock">Out of stock</option>
            </select>
          </label>
        </div>
        <label className="mt-4 grid gap-2 text-sm font-bold text-neutral-700">
          Price display override
          <input defaultValue={values.priceDisplay} name="priceDisplay" placeholder="Wholesale tiers available" />
        </label>
        <div className="mt-5 flex flex-wrap gap-5">
          <label className="inline-flex items-center gap-2 text-sm font-bold text-neutral-700">
            <input className="size-4" defaultChecked={values.active} name="active" type="checkbox" />
            Active
          </label>
          <label className="inline-flex items-center gap-2 text-sm font-bold text-neutral-700">
            <input className="size-4" defaultChecked={values.featured} name="featured" type="checkbox" />
            Featured
          </label>
        </div>
      </section>

      <section className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-display text-2xl font-bold text-neutral-950">Images</h2>
          <label className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-[var(--radius-sm)] border border-black/10 px-4 text-sm font-bold text-neutral-700 transition hover:bg-neutral-50">
            <Upload aria-hidden="true" size={16} />
            Upload images
            <input
              accept="image/jpeg,image/png,image/webp"
              className="sr-only"
              multiple
              name="productImages"
              onChange={handleFilesChange}
              ref={fileInputRef}
              type="file"
            />
          </label>
        </div>
        <input name="thumbnailChoice" type="hidden" value={thumbnailChoice} />
        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {existingImages.map((image) => (
            <div className="rounded-lg border border-black/10 p-3" key={image.url}>
              <input name="existingImageUrl" type="hidden" value={image.url} />
              <input name="existingImageAlt" type="hidden" value={image.alt} />
              <div className="aspect-square overflow-hidden rounded-md bg-neutral-100">
                <Image
                  alt={image.alt}
                  className="h-full w-full object-cover"
                  height={300}
                  src={image.url}
                  unoptimized
                  width={300}
                />
              </div>
              <div className="mt-3 flex items-center justify-between gap-2">
                <label className="inline-flex items-center gap-2 text-xs font-bold text-neutral-600">
                  <input
                    checked={thumbnailChoice === `existing:${image.url}`}
                    onChange={() => setThumbnailChoice(`existing:${image.url}`)}
                    type="radio"
                  />
                  Thumbnail
                </label>
                <button
                  className="inline-flex items-center gap-1 text-xs font-bold text-red-600"
                  onClick={() => removeExistingImage(image.url)}
                  type="button"
                >
                  <Trash2 aria-hidden="true" size={14} />
                  Remove
                </button>
              </div>
            </div>
          ))}
          {newImagePreviews.map((image) => (
            <div className="rounded-lg border border-black/10 p-3" key={image.url}>
              <div className="aspect-square overflow-hidden rounded-md bg-neutral-100">
                <Image
                  alt={image.name}
                  className="h-full w-full object-cover"
                  height={300}
                  src={image.url}
                  unoptimized
                  width={300}
                />
              </div>
              <div className="mt-3 flex items-center justify-between gap-2">
                <label className="inline-flex items-center gap-2 text-xs font-bold text-neutral-600">
                  <input
                    checked={thumbnailChoice === `new:${image.index}`}
                    onChange={() => setThumbnailChoice(`new:${image.index}`)}
                    type="radio"
                  />
                  Thumbnail
                </label>
                <button
                  className="inline-flex items-center gap-1 text-xs font-bold text-red-600"
                  onClick={() => removeNewImage(image.index)}
                  type="button"
                >
                  <Trash2 aria-hidden="true" size={14} />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-display text-2xl font-bold text-neutral-950">Specifications</h2>
          <button
            className="inline-flex h-10 items-center gap-2 rounded-[var(--radius-sm)] border border-black/10 px-4 text-sm font-bold text-neutral-700 transition hover:bg-neutral-50"
            onClick={() => setSpecifications((current) => [...current, { label: "", value: "" }])}
            type="button"
          >
            <Plus aria-hidden="true" size={16} />
            Add row
          </button>
        </div>
        <div className="mt-5 grid gap-3">
          {specifications.map((specification, index) => (
            <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto]" key={`${index}-${specification.label}`}>
              <input defaultValue={specification.label} name="specLabel" placeholder="Material" />
              <input defaultValue={specification.value} name="specValue" placeholder="Rubber" />
              <button
                aria-label="Remove specification"
                className="inline-flex h-11 items-center justify-center rounded-[var(--radius-sm)] border border-black/10 px-3 text-red-600"
                onClick={() =>
                  setSpecifications((current) =>
                    current.filter((_, currentIndex) => currentIndex !== index),
                  )
                }
                type="button"
              >
                <Trash2 aria-hidden="true" size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
        <h2 className="font-display text-2xl font-bold text-neutral-950">Publishing and SEO</h2>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold text-neutral-700">
            Badge
            <input defaultValue={values.badge} name="badge" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-neutral-700">
            Sort order
            <input defaultValue={values.sortOrder} name="sortOrder" type="number" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-neutral-700 lg:col-span-2">
            Tags
            <input defaultValue={values.tags.join(", ")} name="tags" placeholder="rubber, gym, wholesale" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-neutral-700">
            SEO title
            <input defaultValue={values.seoTitle} name="seoTitle" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-neutral-700">
            SEO description
            <input defaultValue={values.seoDescription} maxLength={180} name="seoDescription" />
          </label>
        </div>
      </section>

      <div className="flex justify-end">
        <SubmitButton label={product ? "Update Product" : "Create Product"} />
      </div>
    </form>
  );
}
