import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  createCategoryAction,
  deleteCategoryAction,
  toggleCategoryActiveAction,
} from "@/app/admin/(panel)/categories/actions";
import { AdminCard } from "@/components/admin/admin-card";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { CategoryForm } from "@/components/admin/category-form";
import { ConfirmSubmitButton } from "@/components/admin/confirm-submit-button";
import { DataError } from "@/components/admin/data-error";
import { requireAdminPage } from "@/lib/auth/admin-page";
import { getCategories } from "@/services/categories";

type CategoriesPageProps = {
  searchParams: Promise<{ error?: string; saved?: string }>;
};

function formatDivision(division: string) {
  return division === "rox-fitness" ? "Rox Fitness" : "Nex Games";
}

export default async function AdminCategoriesPage({ searchParams }: CategoriesPageProps) {
  await requireAdminPage();

  const params = await searchParams;
  let categories: Awaited<ReturnType<typeof getCategories>> = [];
  let error: string | null = params.error ?? null;

  try {
    categories = await getCategories();
  } catch {
    error = "Unable to load categories right now.";
  }

  return (
    <>
      <AdminPageHeader
        description="Create and maintain the reusable product category list used by product forms and future catalog pages."
        title="Categories"
      />
      {params.saved ? (
        <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
          Category {params.saved}.
        </div>
      ) : null}
      {error ? <DataError message={error} /> : null}
      <div className="mt-5 grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <AdminCard className="p-5">
          <h2 className="font-display text-2xl font-bold text-neutral-950">Add category</h2>
          <div className="mt-5">
            <CategoryForm action={createCategoryAction} buttonLabel="Create Category" />
          </div>
        </AdminCard>
        <AdminCard className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b border-black/10 bg-neutral-50 text-xs uppercase tracking-[0.14em] text-neutral-500">
                <tr>
                  <th className="px-4 py-3">Image</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Division</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10">
                {categories.length ? (
                  categories.map((category) => (
                    <tr key={category.id}>
                      <td className="px-4 py-3">
                        <Image
                          alt={category.name}
                          className="size-14 rounded-md object-cover"
                          height={56}
                          src={category.image}
                          unoptimized
                          width={56}
                        />
                      </td>
                      <td className="px-4 py-3 font-bold text-neutral-950">{category.name}</td>
                      <td className="px-4 py-3">{formatDivision(category.brandDivision)}</td>
                      <td className="px-4 py-3">
                        <form action={toggleCategoryActiveAction}>
                          <input name="id" type="hidden" value={category.id} />
                          <input name="active" type="hidden" value={String(!category.active)} />
                          <button
                            className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-bold text-neutral-700"
                            type="submit"
                          >
                            {category.active ? "Active" : "Inactive"}
                          </button>
                        </form>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Link
                            className="inline-flex h-9 items-center gap-1 rounded-[var(--radius-sm)] border border-black/10 px-3 text-xs font-bold text-neutral-700"
                            href={`/admin/categories/${category.id}/edit`}
                          >
                            <Edit aria-hidden="true" size={14} />
                            Edit
                          </Link>
                          <form action={deleteCategoryAction}>
                            <input name="id" type="hidden" value={category.id} />
                            <ConfirmSubmitButton
                              className="inline-flex h-9 items-center gap-1 rounded-[var(--radius-sm)] border border-red-200 px-3 text-xs font-bold text-red-700"
                              message={`Delete ${category.name}? This will be blocked if products use it.`}
                            >
                              <Trash2 aria-hidden="true" size={14} />
                              Delete
                            </ConfirmSubmitButton>
                          </form>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="px-4 py-10 text-center text-neutral-500" colSpan={5}>
                      No categories found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </AdminCard>
      </div>
    </>
  );
}
