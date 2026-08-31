"use client";

import { Button } from "@/components/ui/button";

export default function Error({ reset }: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex flex-1 items-center justify-center px-5 py-24">
      <section className="w-full max-w-xl rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-8 shadow-[var(--shadow-card)]">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-accent)]">
          Application error
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold text-[var(--color-text)]">
          Something went wrong.
        </h1>
        <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
          The page could not be loaded safely.
        </p>
        <Button className="mt-6" onClick={reset}>
          Try again
        </Button>
      </section>
    </main>
  );
}
