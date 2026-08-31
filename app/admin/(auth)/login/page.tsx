import { redirect } from "next/navigation";

import { BrandMark } from "@/components/layout/brand-mark";
import { Card } from "@/components/ui/card";
import { getAdminSession } from "@/lib/auth/session";

import { LoginForm } from "./login-form";

export default async function AdminLoginPage() {
  const session = await getAdminSession();

  if (session) {
    redirect("/admin");
  }

  return (
    <main className="grid min-h-screen place-items-center px-5 py-12">
      <Card className="w-full max-w-md p-6 sm:p-8">
        <BrandMark />
        <div className="my-8 space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-accent)]">
            Admin Panel
          </p>
          <h1 className="font-display text-4xl font-bold text-[var(--color-text)]">
            Sign in to manage Rox & Nex.
          </h1>
          <p className="text-sm leading-6 text-[var(--color-muted)]">
            Administrator access only. Customer accounts are not enabled.
          </p>
        </div>
        <LoginForm />
      </Card>
    </main>
  );
}
