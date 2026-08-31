import Link from "next/link";

import { cn } from "@/utilities/cn";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center px-5 py-24">
      <section className="w-full max-w-xl rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-8 shadow-[var(--shadow-card)]">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-accent)]">
          404
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold text-[var(--color-text)]">
          Page not found.
        </h1>
        <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
          The requested Rox & Nex page does not exist.
        </p>
        <Link
          className={cn(
            "mt-6 inline-flex h-11 items-center justify-center rounded-[var(--radius-pill)] bg-[var(--color-accent)] px-5 text-sm font-semibold text-white shadow-[var(--shadow-red)] transition duration-200 hover:bg-[var(--color-accent-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]",
          )}
          href="/"
        >
          Back home
        </Link>
      </section>
    </main>
  );
}
