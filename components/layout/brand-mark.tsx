import Link from "next/link";

export function BrandMark() {
  return (
    <Link
      aria-label="Rox & Nex home"
      className="group inline-flex items-center gap-3"
      href="/"
    >
      <span className="relative grid size-10 place-items-center overflow-hidden rounded-[var(--radius-sm)] bg-[var(--color-text)] text-[var(--color-background)] shadow-[var(--shadow-soft)]">
        <span className="absolute inset-y-0 left-0 w-1.5 bg-[var(--color-accent)] transition-transform duration-300 group-hover:scale-y-75" />
        <span className="font-display text-sm font-black tracking-normal">RN</span>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-bold text-[var(--color-text)]">
          Rox & Nex
        </span>
        <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--color-muted)]">
          Wholesale sports
        </span>
      </span>
    </Link>
  );
}
