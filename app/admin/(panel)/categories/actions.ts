"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdminSession } from "@/lib/auth/session";
import { storeProductImage } from "@/services/images";
import {
  createCategory,
  deleteCategory,
  setCategoryActive,
  updateCategory,
} from "@/services/categories";

async function requireAdminAction() {
  const session = await requireAdminSession();

  if (!session) {
    redirect("/admin/login");
  }
}

function readText(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function readNumber(formData: FormData, key: string) {
  const value = Number(formData.get(key));

  return Number.isFinite(value) ? value : 0;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function readCategoryImage(formData: FormData) {
  const file = formData.get("categoryImage");

  if (file instanceof File && file.size > 0) {
    const stored = await storeProductImage(file);

    return stored?.url ?? "";
  }

  return readText(formData, "existingImage");
}

function getSafeCategoryError(error: unknown) {
  if (!(error instanceof Error)) {
    return "Unable to save category.";
  }

  if (
    error.message.includes("supported image type") ||
    error.message.includes("larger than 5 MB") ||
    error.message.includes("valid image file") ||
    error.message.includes("Cloudinary image upload")
  ) {
    return error.message;
  }

  return "Unable to save category.";
}

export async function createCategoryAction(formData: FormData) {
  await requireAdminAction();
  const name = readText(formData, "name");
  let errorMessage = "";

  try {
    const result = await createCategory({
      name,
      slug: slugify(readText(formData, "slug") || name),
      description: readText(formData, "description"),
      image: (await readCategoryImage(formData)) || "/logo.png",
      brandDivision: readText(formData, "brandDivision"),
      active: formData.get("active") === "on",
      sortOrder: readNumber(formData, "sortOrder"),
    });

    if (!result.success) {
      errorMessage = result.errors.join(" ");
    }
  } catch (error) {
    errorMessage = getSafeCategoryError(error);
  }

  if (errorMessage) {
    redirect(`/admin/categories?error=${encodeURIComponent(errorMessage)}`);
  }

  revalidatePath("/admin/categories");
  redirect("/admin/categories?saved=created");
}

export async function updateCategoryAction(id: string, formData: FormData) {
  await requireAdminAction();
  const name = readText(formData, "name");
  let errorMessage = "";

  try {
    const result = await updateCategory(id, {
      name,
      slug: slugify(readText(formData, "slug") || name),
      description: readText(formData, "description"),
      image: (await readCategoryImage(formData)) || "/logo.png",
      brandDivision: readText(formData, "brandDivision"),
      active: formData.get("active") === "on",
      sortOrder: readNumber(formData, "sortOrder"),
    });

    if (!result.success) {
      errorMessage = result.errors.join(" ");
    }
  } catch (error) {
    errorMessage = getSafeCategoryError(error);
  }

  if (errorMessage) {
    redirect(`/admin/categories/${id}/edit?error=${encodeURIComponent(errorMessage)}`);
  }

  revalidatePath("/admin/categories");
  redirect("/admin/categories?saved=updated");
}

export async function toggleCategoryActiveAction(formData: FormData) {
  await requireAdminAction();

  const result = await setCategoryActive(
    readText(formData, "id"),
    formData.get("active") === "true",
  );

  if (!result.success) {
    redirect(`/admin/categories?error=${encodeURIComponent(result.errors.join(" "))}`);
  }

  revalidatePath("/admin/categories");
}

export async function deleteCategoryAction(formData: FormData) {
  await requireAdminAction();
  const result = await deleteCategory(readText(formData, "id"));

  if (!result.success) {
    redirect(`/admin/categories?error=${encodeURIComponent(result.errors.join(" "))}`);
  }

  revalidatePath("/admin/categories");
  redirect("/admin/categories?saved=deleted");
}
