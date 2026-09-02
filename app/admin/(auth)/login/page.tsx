import { redirect } from "next/navigation";
import type { CSSProperties } from "react";

import { BrandMark } from "@/components/layout/brand-mark";
import { Card } from "@/components/ui/card";
import { getAdminSession } from "@/lib/auth/session";

import { LoginForm } from "./login-form";

const adminTheme = {
  "--color-background": "#f5f5f3",
  "--color-background-alt": "#ececea",
  "--color-surface": "#ffffff",
  "--color-surface-raised": "#f4f4f2",
  "--color-card": "#ffffff",
  "--color-card-solid": "#ffffff",
  "--color-text": "#141312",
  "--color-muted": "#63605c",
  "--color-border": "rgba(20, 19, 18, 0.12)",
  "--color-border-strong": "rgba(20, 19, 18, 0.24)",
} as CSSProperties;

export default async function AdminLoginPage() {
  const session = await getAdminSession();

  if (session) {
    redirect("/admin");
  }

  return (
    <main
      className="grid min-h-screen place-items-center bg-[#f5f5f3] px-5 py-12 text-[#141312]"
      style={adminTheme}
    >
      <Card className="w-full max-w-md p-6 sm:p-8">
        <BrandMark variant="black" />
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
