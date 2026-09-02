import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { DataError } from "@/components/admin/data-error";
import { ProductForm } from "@/components/admin/product-form";
import { createProductAction } from "@/app/admin/(panel)/products/actions";
import { requireAdminPage } from "@/lib/auth/admin-page";
import { getCategories } from "@/services/categories";

export default async function AddProductPage() {
  await requireAdminPage();

  let categories: Awaited<ReturnType<typeof getCategories>> = [];
  let error: string | null = null;

  try {
    categories = await getCategories();
  } catch {
    error = "Unable to load categories right now.";
  }

  return (
    <>
      <AdminPageHeader
        description="Create a new showcase product with images, stock, pricing, specifications, and SEO metadata."
        title="Add Product"
      />
      {error ? (
        <DataError message={error} />
      ) : (
        <ProductForm
          action={createProductAction}
          categories={categories.map((category) => ({
            id: category.id,
            name: category.name,
            slug: category.slug,
            brandDivision: category.brandDivision,
          }))}
        />
      )}
    </>
  );
}
