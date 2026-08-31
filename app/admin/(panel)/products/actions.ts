"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdminSession } from "@/lib/auth/session";
import { storeProductImage } from "@/services/images";
import {
  createProduct,
  deleteProduct,
  setProductActive,
  setProductFeatured,
  updateProduct,
} from "@/services/products";
import type { ProductImage } from "@/types/product";

export type ProductFormState = {
  error?: string;
};

async function requireAdminAction() {
  const session = await requireAdminSession();

  if (!session) {
    redirect("/admin/login");
  }
}

function readText(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function readOptionalText(formData: FormData, key: string) {
  const value = readText(formData, key);

  return value || undefined;
}

function readNumber(formData: FormData, key: string) {
  const value = Number(formData.get(key));

  return Number.isFinite(value) ? value : 0;
}

function readSpecifications(formData: FormData) {
  const labels = formData.getAll("specLabel").map(String);
  const values = formData.getAll("specValue").map(String);

  return labels
    .map((label, index) => ({
      label: label.trim(),
      value: String(values[index] ?? "").trim(),
    }))
    .filter((specification) => specification.label && specification.value);
}

function readExistingImages(formData: FormData): ProductImage[] {
  const urls = formData.getAll("existingImageUrl").map(String);
  const alts = formData.getAll("existingImageAlt").map(String);

  return urls
    .map((url, index) => ({
      url: url.trim(),
      alt: String(alts[index] ?? "Product image").trim() || "Product image",
      sortOrder: index,
    }))
    .filter((image) => image.url);
}

async function readUploadedImages(formData: FormData): Promise<ProductImage[]> {
  const files = formData
    .getAll("productImages")
    .filter((file): file is File => file instanceof File && file.size > 0);
  const images: ProductImage[] = [];

  for (const [index, file] of files.entries()) {
    const stored = await storeProductImage(file);

    if (stored) {
      images.push({ ...stored, sortOrder: index });
    }
  }

  return images;
}

async function parseProductForm(formData: FormData) {
  const existingImages = readExistingImages(formData);
  const uploadedImages = await readUploadedImages(formData);
  const images = [...existingImages, ...uploadedImages].map((image, index) => ({
    ...image,
    sortOrder: index,
  }));
  const thumbnailChoice = readText(formData, "thumbnailChoice");
  const thumbnail =
    thumbnailChoice.startsWith("existing:")
      ? thumbnailChoice.replace("existing:", "")
      : thumbnailChoice.startsWith("new:")
        ? uploadedImages[Number(thumbnailChoice.replace("new:", ""))]?.url
        : images[0]?.url;

  return {
    name: readText(formData, "name"),
    slug: readText(formData, "slug"),
    shortDescription: readText(formData, "shortDescription"),
    description: readText(formData, "description"),
    brandDivision: readText(formData, "brandDivision"),
    category: readText(formData, "category"),
    subcategory: readOptionalText(formData, "subcategory"),
    sku: readOptionalText(formData, "sku"),
    regularPrice: readNumber(formData, "regularPrice"),
    salePrice: readOptionalText(formData, "salePrice")
      ? readNumber(formData, "salePrice")
      : undefined,
    priceDisplay: readOptionalText(formData, "priceDisplay"),
    stockQuantity: readNumber(formData, "stockQuantity"),
    stockStatus: readText(formData, "stockStatus"),
    featured: formData.get("featured") === "on",
    active: formData.get("active") === "on",
    images,
    thumbnail: thumbnail ?? "",
    specifications: readSpecifications(formData),
    tags: readText(formData, "tags")
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
    badge: readOptionalText(formData, "badge"),
    sortOrder: readNumber(formData, "sortOrder"),
    seoTitle: readOptionalText(formData, "seoTitle"),
    seoDescription: readOptionalText(formData, "seoDescription"),
  };
}

export async function createProductAction(
  _previousState: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  await requireAdminAction();

  try {
    const result = await createProduct(await parseProductForm(formData));

    if (!result.success) {
      return { error: result.errors.join(" ") };
    }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Unable to create product.",
    };
  }

  revalidatePath("/admin/products");
  redirect("/admin/products?saved=created");
}

export async function updateProductAction(
  id: string,
  _previousState: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  await requireAdminAction();

  try {
    const result = await updateProduct(id, await parseProductForm(formData));

    if (!result.success) {
      return { error: result.errors.join(" ") };
    }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Unable to update product.",
    };
  }

  revalidatePath("/admin/products");
  redirect("/admin/products?saved=updated");
}

export async function deleteProductAction(formData: FormData) {
  await requireAdminAction();
  await deleteProduct(readText(formData, "id"));
  revalidatePath("/admin/products");
  redirect("/admin/products?saved=deleted");
}

export async function toggleProductActiveAction(formData: FormData) {
  await requireAdminAction();
  await setProductActive(readText(formData, "id"), formData.get("active") === "true");
  revalidatePath("/admin/products");
}

export async function toggleProductFeaturedAction(formData: FormData) {
  await requireAdminAction();
  await setProductFeatured(readText(formData, "id"), formData.get("featured") === "true");
  revalidatePath("/admin/products");
}
