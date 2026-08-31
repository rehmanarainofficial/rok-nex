import { LockKeyhole, ShieldCheck } from "lucide-react";

import { AdminCard } from "@/components/admin/admin-card";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { requireAdminPage } from "@/lib/auth/admin-page";

export default async function AdminSettingsPage() {
  await requireAdminPage();

  const settings = [
    {
      label: "MongoDB connection",
      value: process.env.MONGODB_URI ? "Configured" : "Not configured",
    },
    {
      label: "Admin email",
      value: process.env.ADMIN_EMAIL ? "Configured" : "Not configured",
    },
    {
      label: "Session secret",
      value: process.env.ADMIN_SESSION_SECRET ? "Configured" : "Using fallback secret",
    },
    {
      label: "Password storage",
      value: process.env.ADMIN_PASSWORD_HASH
        ? "Hashed password"
        : "Development fallback only",
    },
  ];

  return (
    <>
      <AdminPageHeader
        description="Read-only environment and security status for the current admin setup."
        title="Site Settings"
      />
      <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <AdminCard className="p-5">
          <ShieldCheck className="text-red-600" size={28} />
          <h2 className="mt-6 font-display text-2xl font-bold text-neutral-950">
            Security architecture
          </h2>
          <p className="mt-3 text-sm leading-6 text-neutral-500">
            Admin authentication uses server-only credential checks, signed
            HTTP-only cookies, protected admin routes, logout, and login rate
            limiting.
          </p>
        </AdminCard>
        <AdminCard className="overflow-hidden">
          <div className="divide-y divide-black/10">
            {settings.map((setting) => (
              <div className="flex items-center justify-between gap-4 p-4" key={setting.label}>
                <div className="flex items-center gap-3">
                  <LockKeyhole aria-hidden="true" className="text-neutral-400" size={17} />
                  <p className="font-bold text-neutral-700">{setting.label}</p>
                </div>
                <p className="text-sm font-semibold text-neutral-500">{setting.value}</p>
              </div>
            ))}
          </div>
        </AdminCard>
      </div>
    </>
  );
}
