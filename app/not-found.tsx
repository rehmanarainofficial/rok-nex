import Link from "next/link";
import { ArrowRight, MapPinned } from "lucide-react";

import { BrandMark } from "@/components/layout/brand-mark";
import { Container } from "@/components/ui/container";
import { cn } from "@/utilities/cn";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center overflow-hidden py-24">
      <div className="state-grid pointer-events-none absolute inset-0 opacity-35" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_18%,var(--color-red-glow),transparent_36%)]" />
      <Container className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <section className="max-w-3xl">
          <BrandMark />
          <p className="mt-12 text-xs font-bold uppercase tracking-[0.28em] text-[var(--color-accent)]">
            404 / Route missed
          </p>
          <h1 className="mt-5 font-display text-[length:var(--text-section)] font-black leading-none text-[var(--color-text)]">
            This page is off the product line.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-[var(--color-muted)] sm:text-lg">
            The requested Rox & Nex page is not available. Head back to the
            product catalog or search the current product range.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              className={cn(
                "inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-[var(--color-accent)] px-6 text-sm font-bold text-white shadow-[var(--shadow-red)] transition duration-200 hover:bg-[var(--color-accent-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]",
              )}
              href="/products"
            >
              Browse Products
              <ArrowRight aria-hidden="true" size={17} />
            </Link>
            <Link
              className="inline-flex h-12 items-center justify-center rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-[var(--color-surface)] px-6 text-sm font-bold text-[var(--color-text)] transition duration-200 hover:bg-[var(--color-surface-raised)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
              href="/"
            >
              Back Home
            </Link>
          </div>
        </section>
        <section
          aria-hidden="true"
          className="relative hidden min-h-80 overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-8 shadow-[var(--shadow-card)] lg:block"
        >
          <div className="absolute inset-8 rounded-full border border-[var(--color-border)]" />
          <div className="absolute inset-20 rounded-full border border-[var(--color-border)]" />
          <div className="absolute left-8 top-8 grid size-20 place-items-center rounded-full bg-[var(--color-accent)] text-white shadow-[var(--shadow-red)]">
            <MapPinned size={34} />
          </div>
          <p className="absolute bottom-8 right-8 font-display text-8xl font-black leading-none text-[var(--color-text)]">
            404
          </p>
        </section>
      </Container>
    </main>
  );
}
