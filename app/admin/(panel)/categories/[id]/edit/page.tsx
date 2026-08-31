import Link from "next/link";
import { notFound } from "next/navigation";

import { updateCategoryAction } from "@/app/admin/(panel)/categories/actions";
import { AdminCard } from "@/components/admin/admin-card";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { CategoryForm } from "@/components/admin/category-form";
import { DataError } from "@/components/admin/data-error";
import { requireAdminPage } from "@/lib/auth/admin-page";
import { getCategoryById } from "@/services/categories";

type EditCategoryPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
};

export default async function EditCategoryPage({
  params,
  searchParams,
}: EditCategoryPageProps) {
  await requireAdminPage();

  const [{ id }, query] = await Promise.all([params, searchParams]);
  const category = await getCategoryById(id);

  if (!category) {
    notFound();
  }

  return (
    <>
      <AdminPageHeader
        action={
          <Link
            className="inline-flex h-11 items-center rounded-[var(--radius-sm)] border border-black/10 px-4 text-sm font-bold text-neutral-700"
            href="/admin/categories"
          >
            Back to Categories
          </Link>
        }
        description="Update category metadata, division, image, active state, and sorting."
        title={`Edit ${category.name}`}
      />
      {query.error ? <DataError message={query.error} /> : null}
      <AdminCard className="mt-5 max-w-3xl p-5">
        <CategoryForm
          action={updateCategoryAction.bind(null, category.id)}
          buttonLabel="Update Category"
          category={category}
        />
      </AdminCard>
    </>
  );
}
