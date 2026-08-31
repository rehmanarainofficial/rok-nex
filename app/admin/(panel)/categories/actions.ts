"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdminSession } from "@/lib/auth/session";
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

export async function createCategoryAction(formData: FormData) {
  await requireAdminAction();

  const result = await createCategory({
    name: readText(formData, "name"),
    slug: readText(formData, "slug"),
    description: readText(formData, "description"),
    image: readText(formData, "image"),
    brandDivision: readText(formData, "brandDivision"),
    active: formData.get("active") === "on",
    sortOrder: Number(formData.get("sortOrder") ?? 0),
  });

  if (!result.success) {
    redirect(`/admin/categories?error=${encodeURIComponent(result.errors.join(" "))}`);
  }

  revalidatePath("/admin/categories");
  redirect("/admin/categories?saved=created");
}

export async function updateCategoryAction(id: string, formData: FormData) {
  await requireAdminAction();

  const result = await updateCategory(id, {
    name: readText(formData, "name"),
    slug: readText(formData, "slug"),
    description: readText(formData, "description"),
    image: readText(formData, "image"),
    brandDivision: readText(formData, "brandDivision"),
    active: formData.get("active") === "on",
    sortOrder: Number(formData.get("sortOrder") ?? 0),
  });

  if (!result.success) {
    redirect(`/admin/categories/${id}/edit?error=${encodeURIComponent(result.errors.join(" "))}`);
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
