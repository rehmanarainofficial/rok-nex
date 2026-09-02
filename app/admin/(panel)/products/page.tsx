import { Edit, Plus, Star, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { deleteProductAction, toggleProductActiveAction, toggleProductFeaturedAction } from "@/app/admin/(panel)/products/actions";
import { AdminCard } from "@/components/admin/admin-card";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ConfirmSubmitButton } from "@/components/admin/confirm-submit-button";
import { DataError } from "@/components/admin/data-error";
import { requireAdminPage } from "@/lib/auth/admin-page";
import { getProducts } from "@/services/products";
import type { BrandDivision, StockStatus } from "@/types/product";

type ProductsPageProps = {
  searchParams: Promise<{
    active?: string;
    division?: BrandDivision;
    featured?: string;
    q?: string;
    saved?: string;
    status?: StockStatus;
  }>;
};

export default async function AdminProductsPage({ searchParams }: ProductsPageProps) {
  await requireAdminPage();

  const params = await searchParams;
  const active =
    params.active === "active" ? true : params.active === "inactive" ? false : undefined;
  let products: Awaited<ReturnType<typeof getProducts>> = [];
  let error: string | null = null;

  try {
    products = await getProducts({
      active,
      brandDivision: params.division,
      featured: params.featured === "true" ? true : undefined,
      search: params.q,
      stockStatus: params.status,
    });
  } catch {
    error = "Unable to load products right now.";
  }

  return (
    <>
      <AdminPageHeader
        action={
          <Link
            className="inline-flex h-11 items-center gap-2 rounded-[var(--radius-sm)] bg-[var(--color-accent)] px-4 text-sm font-bold text-white shadow-[var(--shadow-red)]"
            href="/admin/products/new"
          >
            <Plus aria-hidden="true" size={17} />
            Add Product
          </Link>
        }
        description="Search, filter, edit, delete, activate, and feature products."
        title="Products"
      />
      {params.saved ? (
        <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
          Product {params.saved}.
        </div>
      ) : null}
      <AdminCard className="mb-5 p-4">
        <form className="grid gap-3 md:grid-cols-[1fr_repeat(4,auto)]" role="search">
          <input defaultValue={params.q} name="q" placeholder="Search name, SKU, category" />
          <select defaultValue={params.division ?? ""} name="division">
            <option value="">All divisions</option>
            <option value="rox-fitness">Rox Fitness</option>
            <option value="nex-games">Nex Games</option>
          </select>
          <select defaultValue={params.status ?? ""} name="status">
            <option value="">All stock</option>
            <option value="in-stock">In stock</option>
            <option value="low-stock">Low stock</option>
            <option value="out-of-stock">Out of stock</option>
          </select>
          <select defaultValue={params.active ?? ""} name="active">
            <option value="">All visibility</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <button className="h-11 rounded-[var(--radius-sm)] bg-neutral-950 px-4 text-sm font-bold text-white" type="submit">
            Filter
          </button>
        </form>
      </AdminCard>
      {error ? (
        <DataError message={error} />
      ) : (
        <AdminCard className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="border-b border-black/10 bg-neutral-50 text-xs uppercase tracking-[0.14em] text-neutral-500">
                <tr>
                  <th className="px-4 py-3">Thumbnail</th>
                  <th className="px-4 py-3">Title & Description</th>
                  <th className="px-4 py-3">Stock</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Featured</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10">
                {products.length ? (
                  products.map((product) => (
                    <tr key={product.id}>
                      <td className="px-4 py-3">
                        <Image
                          alt={product.name}
                          className="size-14 rounded-md object-cover"
                          height={56}
                          src={product.thumbnail}
                          unoptimized
                          width={56}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-bold text-neutral-950">{product.name}</p>
                        <p className="mt-1 max-w-xl text-xs leading-5 text-neutral-500">
                          {product.shortDescription}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-bold text-neutral-950">{product.stockQuantity}</span>
                        <span className="mt-1 block text-xs capitalize text-neutral-500">
                          {product.stockStatus.replaceAll("-", " ")}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <form action={toggleProductActiveAction}>
                          <input name="id" type="hidden" value={product.id} />
                          <input name="active" type="hidden" value={String(!product.active)} />
                          <button className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-bold text-neutral-700" type="submit">
                            {product.active ? "Active" : "Inactive"}
                          </button>
                        </form>
                      </td>
                      <td className="px-4 py-3">
                        <form action={toggleProductFeaturedAction}>
                          <input name="id" type="hidden" value={product.id} />
                          <input name="featured" type="hidden" value={String(!product.featured)} />
                          <button className="inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-700" type="submit">
                            <Star aria-hidden="true" size={13} />
                            {product.featured ? "Yes" : "No"}
                          </button>
                        </form>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Link
                            className="inline-flex h-9 items-center gap-1 rounded-[var(--radius-sm)] border border-black/10 px-3 text-xs font-bold text-neutral-700"
                            href={`/admin/products/${product.id}/edit`}
                          >
                            <Edit aria-hidden="true" size={14} />
                            Edit
                          </Link>
                          <form action={deleteProductAction}>
                            <input name="id" type="hidden" value={product.id} />
                            <ConfirmSubmitButton
                              className="inline-flex h-9 items-center gap-1 rounded-[var(--radius-sm)] border border-red-200 px-3 text-xs font-bold text-red-700"
                              message={`Delete ${product.name}? This cannot be undone.`}
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
                    <td className="px-4 py-10 text-center text-neutral-500" colSpan={6}>
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </AdminCard>
      )}
    </>
  );
}
