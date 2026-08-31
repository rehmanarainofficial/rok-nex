import { Boxes, CircleAlert, Dumbbell, PackageCheck, Trophy } from "lucide-react";

import { AdminCard } from "@/components/admin/admin-card";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { DataError } from "@/components/admin/data-error";
import { requireAdminPage } from "@/lib/auth/admin-page";
import { getProductStats } from "@/services/products";

const statMeta = [
  { key: "totalProducts", label: "Total Products", Icon: Boxes },
  { key: "roxFitnessProducts", label: "Rox Fitness Products", Icon: Dumbbell },
  { key: "nexGamesProducts", label: "Nex Games Products", Icon: Trophy },
  { key: "inStock", label: "In Stock", Icon: PackageCheck },
  { key: "lowStock", label: "Low Stock", Icon: CircleAlert },
  { key: "outOfStock", label: "Out of Stock", Icon: CircleAlert },
] as const;

export default async function AdminDashboardPage() {
  await requireAdminPage();

  let stats: Awaited<ReturnType<typeof getProductStats>> | null = null;
  let error: string | null = null;

  try {
    stats = await getProductStats();
  } catch (caught) {
    error =
      caught instanceof Error ? caught.message : "Unable to load product statistics.";
  }

  return (
    <>
      <AdminPageHeader
        description="Live product and stock overview from MongoDB."
        title="Dashboard"
      />
      {error || !stats ? (
        <DataError message={error ?? "Dashboard data could not be loaded."} />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {statMeta.map(({ Icon, key, label }) => (
            <AdminCard className="p-5" key={key}>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-neutral-500">{label}</p>
                  <p className="mt-3 font-display text-4xl font-bold text-neutral-950">
                    {stats[key]}
                  </p>
                </div>
                <span className="grid size-12 place-items-center rounded-lg bg-red-50 text-red-600">
                  <Icon aria-hidden="true" size={22} />
                </span>
              </div>
            </AdminCard>
          ))}
        </div>
      )}
    </>
  );
}
