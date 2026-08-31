import "server-only";

import { redirect } from "next/navigation";

import { requireAdminSession } from "@/lib/auth/session";

export async function requireAdminPage() {
  const session = await requireAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return session;
}
