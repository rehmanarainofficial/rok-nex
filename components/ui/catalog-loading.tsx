import { Container } from "@/components/ui/container";

export function CatalogLoading() {
  return (
    <main className="min-h-screen">
      <section className="border-b border-[var(--color-border)] py-[var(--section-spacing)]">
        <Container className="grid gap-8">
          <div className="h-4 w-44 rounded-[var(--radius-pill)] bg-[var(--color-surface-raised)]" />
          <div className="h-20 max-w-3xl rounded-[var(--radius-sm)] bg-[var(--color-surface-raised)]" />
          <div className="h-6 max-w-2xl rounded-[var(--radius-sm)] bg-[var(--color-surface-raised)]" />
        </Container>
      </section>
      <section className="py-[var(--section-spacing)]">
        <Container className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 8 }, (_, index) => (
            <div
              className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)]"
              key={index}
            >
              <div className="aspect-[1.12/1] bg-[var(--color-surface-raised)]" />
              <div className="grid gap-3 p-5">
                <div className="h-3 w-24 rounded-[var(--radius-pill)] bg-[var(--color-surface-raised)]" />
                <div className="h-7 rounded-[var(--radius-sm)] bg-[var(--color-surface-raised)]" />
                <div className="h-4 rounded-[var(--radius-sm)] bg-[var(--color-surface-raised)]" />
                <div className="h-4 w-2/3 rounded-[var(--radius-sm)] bg-[var(--color-surface-raised)]" />
              </div>
            </div>
          ))}
        </Container>
      </section>
    </main>
  );
}
