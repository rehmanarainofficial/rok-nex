import { Dumbbell } from "lucide-react";

import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <main className="relative flex min-h-screen items-center overflow-hidden py-24">
      <div className="state-grid pointer-events-none absolute inset-0 opacity-35" />
      <Container className="relative grid justify-items-start gap-6">
        <div className="grid size-14 place-items-center rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-accent)] shadow-[var(--shadow-soft)]">
          <Dumbbell aria-hidden="true" size={25} />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-accent)]">
            Rox & Nex
          </p>
          <h1 className="mt-3 font-display text-4xl font-black text-[var(--color-text)] sm:text-5xl">
            Loading catalog experience.
          </h1>
        </div>
        <div className="h-2 w-56 overflow-hidden rounded-[var(--radius-pill)] bg-[var(--color-surface-raised)]">
          <div className="h-full w-1/2 animate-[loading-bar_1.1s_ease-in-out_infinite] rounded-[var(--radius-pill)] bg-[var(--color-accent)]" />
        </div>
      </Container>
    </main>
  );
}
