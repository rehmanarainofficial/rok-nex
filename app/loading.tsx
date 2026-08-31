export default function Loading() {
  return (
    <main className="flex flex-1 items-center justify-center px-5 py-24">
      <div className="h-2 w-48 overflow-hidden rounded-[var(--radius-pill)] bg-[var(--color-surface-raised)]">
        <div className="h-full w-1/2 animate-[loading-bar_1.1s_ease-in-out_infinite] rounded-[var(--radius-pill)] bg-[var(--color-accent)]" />
      </div>
    </main>
  );
}
