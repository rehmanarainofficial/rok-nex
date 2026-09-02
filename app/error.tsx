"use client";

import { AlertTriangle, RefreshCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function Error({ reset }: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="relative flex min-h-screen items-center overflow-hidden py-24">
      <div className="state-grid pointer-events-none absolute inset-0 opacity-35" />
      <Container className="relative">
        <section className="max-w-2xl rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-7 shadow-[var(--shadow-card)] sm:p-9">
          <div className="grid size-12 place-items-center rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-accent)] shadow-[var(--shadow-soft)]">
            <AlertTriangle aria-hidden="true" size={22} />
          </div>
          <p className="mt-8 text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-accent)]">
            Application error
          </p>
          <h1 className="mt-4 font-display text-4xl font-black leading-tight text-[var(--color-text)] sm:text-5xl">
            The page could not load safely.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-[var(--color-muted)] sm:text-base sm:leading-7">
            Rox & Nex kept the internal error private. Try again, or return to
            the catalog if the issue continues.
          </p>
          <Button className="mt-7 gap-2" onClick={reset}>
            <RefreshCcw aria-hidden="true" size={16} />
            Try Again
          </Button>
        </section>
      </Container>
    </main>
  );
}
