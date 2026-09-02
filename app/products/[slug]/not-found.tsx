import { ArrowRight, PackageX } from "lucide-react";
import Link from "next/link";

import { BrandMark } from "@/components/layout/brand-mark";
import { Container } from "@/components/ui/container";

export default function ProductNotFound() {
  return (
    <main className="relative flex min-h-screen items-center overflow-hidden py-24">
      <div className="state-grid pointer-events-none absolute inset-0 opacity-35" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_20%,var(--color-red-glow),transparent_34%)]" />
      <Container className="relative">
        <section className="max-w-3xl">
          <BrandMark />
          <div className="mt-12 grid size-14 place-items-center rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-accent)] shadow-[var(--shadow-soft)]">
            <PackageX aria-hidden="true" size={25} />
          </div>
          <p className="mt-8 text-xs font-bold uppercase tracking-[0.28em] text-[var(--color-accent)]">
            Product unavailable
          </p>
          <h1 className="mt-5 font-display text-[length:var(--text-section)] font-black leading-none text-[var(--color-text)]">
            This product is not in the active catalog.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-[var(--color-muted)] sm:text-lg">
            The product may be inactive, removed, or waiting for updated stock
            information. Browse the live product catalog for available Rox &
            Nex products.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-[var(--color-accent)] px-6 text-sm font-bold text-white shadow-[var(--shadow-red)] transition hover:bg-[var(--color-accent-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
              href="/products"
            >
              Browse Products
              <ArrowRight aria-hidden="true" size={17} />
            </Link>
            <Link
              className="inline-flex h-12 items-center justify-center rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-[var(--color-surface)] px-6 text-sm font-bold text-[var(--color-text)] transition hover:bg-[var(--color-surface-raised)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
              href="/contact"
            >
              Contact Company
            </Link>
          </div>
        </section>
      </Container>
    </main>
  );
}
