import { Container } from "@/components/ui/container";

function SkeletonBlock({ className }: { className: string }) {
  return <div className={`skeleton-surface ${className}`} />;
}

export function CatalogLoading() {
  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden border-b border-[var(--color-border)] py-[var(--section-spacing)]">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_82%_18%,var(--color-red-glow),transparent_30%)]" />
        <Container className="grid gap-7">
          <SkeletonBlock className="h-4 w-44 rounded-[var(--radius-pill)]" />
          <SkeletonBlock className="h-24 max-w-3xl rounded-[var(--radius-sm)]" />
          <SkeletonBlock className="h-6 max-w-2xl rounded-[var(--radius-sm)]" />
          <div className="flex flex-wrap gap-3 pt-3">
            <SkeletonBlock className="h-11 w-36 rounded-[var(--radius-pill)]" />
            <SkeletonBlock className="h-11 w-44 rounded-[var(--radius-pill)]" />
          </div>
        </Container>
      </section>
      <section className="py-[var(--section-spacing)]">
        <Container className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 8 }, (_, index) => (
            <div
              className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)]"
              key={index}
            >
              <SkeletonBlock className="aspect-[1.12/1]" />
              <div className="grid gap-3 p-5">
                <SkeletonBlock className="h-3 w-24 rounded-[var(--radius-pill)]" />
                <SkeletonBlock className="h-7 rounded-[var(--radius-sm)]" />
                <SkeletonBlock className="h-4 rounded-[var(--radius-sm)]" />
                <SkeletonBlock className="h-4 w-2/3 rounded-[var(--radius-sm)]" />
              </div>
            </div>
          ))}
        </Container>
      </section>
    </main>
  );
}
