import {
  BarChart3,
  Boxes,
  FolderTree,
  Globe2,
  Inbox,
  LogOut,
  Settings,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { logoutAction } from "@/app/admin/(panel)/actions";
import { BrandMark } from "@/components/layout/brand-mark";

const navigation = [
  { label: "Dashboard", href: "/admin", Icon: BarChart3 },
  { label: "Products", href: "/admin/products", Icon: Boxes },
  { label: "Categories", href: "/admin/categories", Icon: FolderTree },
  { label: "Inquiries", href: "/admin/inquiries", Icon: Inbox },
  { label: "Settings", href: "/admin/settings", Icon: Settings },
];

type AdminShellProps = {
  children: ReactNode;
  email: string;
};

export function AdminShell({ children, email }: AdminShellProps) {
  return (
    <div className="min-h-screen bg-[#f5f5f3] text-[#141312]">
      <div className="grid min-h-screen lg:grid-cols-[17rem_1fr]">
        <aside className="border-b border-black/10 bg-white lg:border-b-0 lg:border-r">
          <div className="flex h-full flex-col gap-6 p-4 lg:sticky lg:top-0 lg:min-h-screen lg:p-5">
            <div className="flex items-center justify-between gap-4 lg:block">
              <BrandMark compact />
              <p className="hidden truncate text-xs font-semibold text-neutral-500 lg:mt-3 lg:block">
                {email}
              </p>
            </div>
            <nav
              aria-label="Admin navigation"
              className="flex gap-2 overflow-x-auto pb-1 lg:grid lg:overflow-visible lg:pb-0"
            >
              {navigation.map(({ Icon, href, label }) => (
                <Link
                  className="inline-flex h-11 shrink-0 items-center gap-3 rounded-[var(--radius-sm)] px-3 text-sm font-bold text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                  href={href}
                  key={href}
                >
                  <Icon aria-hidden="true" size={17} />
                  {label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto hidden space-y-2 lg:block">
              <Link
                className="inline-flex h-11 w-full items-center gap-3 rounded-[var(--radius-sm)] px-3 text-sm font-bold text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                href="/"
              >
                <Globe2 aria-hidden="true" size={17} />
                View Website
              </Link>
              <form action={logoutAction}>
                <button
                  className="inline-flex h-11 w-full items-center gap-3 rounded-[var(--radius-sm)] px-3 text-sm font-bold text-neutral-600 transition hover:bg-red-50 hover:text-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                  type="submit"
                >
                  <LogOut aria-hidden="true" size={17} />
                  Logout
                </button>
              </form>
            </div>
          </div>
        </aside>
        <div className="flex min-w-0 flex-col">
          <header className="flex h-16 items-center justify-between border-b border-black/10 bg-white px-5 lg:px-8">
            <p className="truncate text-sm font-semibold text-neutral-500">{email}</p>
            <div className="flex items-center gap-2">
              <Link
                className="inline-flex h-10 items-center gap-2 rounded-[var(--radius-sm)] px-3 text-sm font-bold text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-950 lg:hidden"
                href="/"
              >
                <Globe2 aria-hidden="true" size={16} />
                View
              </Link>
              <form action={logoutAction} className="lg:hidden">
                <button
                  aria-label="Logout"
                  className="grid size-10 place-items-center rounded-[var(--radius-sm)] text-neutral-600 transition hover:bg-red-50 hover:text-red-700"
                  type="submit"
                >
                  <LogOut aria-hidden="true" size={17} />
                </button>
              </form>
            </div>
          </header>
          <main className="flex-1 p-5 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
