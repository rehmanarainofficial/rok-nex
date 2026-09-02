"use client";

import { Plus, Trash2, Upload } from "lucide-react";
import Image from "next/image";
import type { ChangeEvent, ReactNode } from "react";
import { useActionState, useEffect, useMemo, useRef, useState } from "react";
import { useFormStatus } from "react-dom";

import type { ProductFormState } from "@/app/admin/(panel)/products/actions";
import type {
  BrandDivision,
  ProductImage,
  ProductSpecification,
  StockStatus,
} from "@/types/product";

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
  featured: true,
  active: true,
  images: [],
  thumbnail: "",
  specifications: [],
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

function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function ProductForm({ action, categories, product }: ProductFormProps) {
  const values = product ?? emptyProduct;
  const [state, formAction] = useActionState(action, initialState);
  const [name, setName] = useState(values.name);
  const [description, setDescription] = useState(values.description);
  const [division, setDivision] = useState<BrandDivision>(values.brandDivision);
  const [existingImages, setExistingImages] = useState<ProductImage[]>(values.images);
  const [newImagePreviews, setNewImagePreviews] = useState<NewImagePreview[]>([]);
  const [thumbnailChoice, setThumbnailChoice] = useState(
    values.thumbnail ? `existing:${values.thumbnail}` : "",
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const filteredCategories = useMemo(
    () => categories.filter((category) => category.brandDivision === division),
    [categories, division],
  );
  const fallbackCategory = filteredCategories[0]?.name ?? values.category ?? "Products";

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
      setThumbnailChoice(
        nextPreviews[0]
          ? "new:0"
          : existingImages[0]
            ? `existing:${existingImages[0].url}`
            : "",
      );
    }
  }

  function removeExistingImage(url: string) {
    const nextImages = existingImages.filter((image) => image.url !== url);

    setExistingImages(nextImages);

    if (thumbnailChoice === `existing:${url}`) {
      setThumbnailChoice(
        nextImages[0]
          ? `existing:${nextImages[0].url}`
          : newImagePreviews[0]
            ? "new:0"
            : "",
      );
    }
  }

  return (
    <form action={formAction} className="grid gap-6">
      {state.error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {state.error}
        </div>
      ) : null}

      <input name="slug" type="hidden" value={values.slug || createSlug(name)} />
      <input name="shortDescription" type="hidden" value={description.slice(0, 180)} />
      <input name="regularPrice" type="hidden" value={values.regularPrice || 0} />
      <input name="sortOrder" type="hidden" value={values.sortOrder} />
      <input name="thumbnailChoice" type="hidden" value={thumbnailChoice} />

      <section className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
        <h2 className="font-display text-2xl font-normal text-neutral-950">Product</h2>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold text-neutral-700">
            Title
            <input
              name="name"
              onChange={(event) => setName(event.target.value)}
              required
              value={name}
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-neutral-700">
            Division
            <select
              name="brandDivision"
              onChange={(event) => setDivision(event.target.value as BrandDivision)}
              value={division}
            >
              <option value="rox-fitness">Rox Fitness</option>
              <option value="nex-games">Nex Games</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-neutral-700">
            Category
            {filteredCategories.length ? (
              <select defaultValue={values.category || fallbackCategory} name="category">
                {filteredCategories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            ) : (
              <input defaultValue={fallbackCategory} name="category" />
            )}
          </label>
          <label className="grid gap-2 text-sm font-bold text-neutral-700">
            Stock
            <input
              defaultValue={values.stockQuantity}
              min="0"
              name="stockQuantity"
              required
              type="number"
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-neutral-700 lg:col-span-2">
            Description
            <textarea
              name="description"
              onChange={(event) => setDescription(event.target.value)}
              required
              value={description}
            />
          </label>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <label className="grid gap-2 text-sm font-bold text-neutral-700">
            Stock status
            <select defaultValue={values.stockStatus} name="stockStatus" required>
              <option value="in-stock">In stock</option>
              <option value="low-stock">Low stock</option>
              <option value="out-of-stock">Out of stock</option>
            </select>
          </label>
          <label className="inline-flex items-center gap-2 self-end text-sm font-bold text-neutral-700">
            <input
              className="size-4"
              defaultChecked={values.active}
              name="active"
              type="checkbox"
            />
            Active
          </label>
          <label className="inline-flex items-center gap-2 self-end text-sm font-bold text-neutral-700">
            <input
              className="size-4"
              defaultChecked={values.featured}
              name="featured"
              type="checkbox"
            />
            Featured
          </label>
        </div>
      </section>

      <section className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-display text-2xl font-normal text-neutral-950">Images</h2>
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
                  Main
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
                  Main
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
          {!existingImages.length && !newImagePreviews.length ? (
            <div className="grid min-h-44 place-items-center rounded-lg border border-dashed border-black/15 bg-neutral-50 p-5 text-center text-sm font-semibold text-neutral-500">
              <div>
                <Plus aria-hidden="true" className="mx-auto mb-3 text-red-600" size={22} />
                Add at least one product image.
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <div className="flex justify-end">
        <SubmitButton label={product ? "Update Product" : "Create Product"} />
      </div>
    </form>
  );
}
