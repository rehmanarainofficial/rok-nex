import { notFound } from "next/navigation";

import { updateProductAction } from "@/app/admin/(panel)/products/actions";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { DataError } from "@/components/admin/data-error";
import { ProductForm, type AdminProductFormValue } from "@/components/admin/product-form";
import { requireAdminPage } from "@/lib/auth/admin-page";
import { getCategories } from "@/services/categories";
import { getProductById } from "@/services/products";

type EditProductPageProps = {
  params: Promise<{ id: string }>;
};

function toFormValue(product: Awaited<ReturnType<typeof getProductById>>): AdminProductFormValue {
  if (!product) {
    notFound();
  }

  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    shortDescription: product.shortDescription,
    description: product.description,
    brandDivision: product.brandDivision,
    category: product.category,
    subcategory: product.subcategory,
    sku: product.sku,
    regularPrice: product.regularPrice,
    salePrice: product.salePrice,
    priceDisplay: product.priceDisplay,
    stockQuantity: product.stockQuantity,
    stockStatus: product.stockStatus,
    featured: product.featured,
    active: product.active,
    images: product.images,
    thumbnail: product.thumbnail,
    specifications: product.specifications,
    tags: product.tags,
    badge: product.badge,
    sortOrder: product.sortOrder,
    seoTitle: product.seoTitle,
    seoDescription: product.seoDescription,
  };
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  await requireAdminPage();

  const { id } = await params;
  let product: Awaited<ReturnType<typeof getProductById>> = null;
  let categories: Awaited<ReturnType<typeof getCategories>> = [];
  let error: string | null = null;

  try {
    [product, categories] = await Promise.all([
      getProductById(id),
      getCategories(),
    ]);
  } catch (caught) {
    error = caught instanceof Error ? caught.message : "Unable to load product.";
  }

  return (
    <>
      <AdminPageHeader
        description="Update product details, pricing, stock, images, specifications, tags, and SEO metadata."
        title="Edit Product"
      />
      {error ? (
        <DataError message={error} />
      ) : (
        <ProductForm
          action={updateProductAction.bind(null, id)}
          categories={categories.map((category) => ({
            id: category.id,
            name: category.name,
            slug: category.slug,
            brandDivision: category.brandDivision,
          }))}
          product={toFormValue(product)}
        />
      )}
    </>
  );
}
