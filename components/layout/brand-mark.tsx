import Link from "next/link";

type BrandMarkProps = {
  compact?: boolean;
};

export function BrandMark({ compact = false }: BrandMarkProps) {
  return (
    <Link
      aria-label="Rox & Nex home"
      className="group inline-flex items-center gap-3 rounded-[var(--radius-sm)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]"
      href="/"
    >
      <span
        aria-hidden="true"
        className="relative hidden h-10 w-2 overflow-hidden rounded-[var(--radius-pill)] bg-[var(--color-text)] sm:block"
      >
        <span className="absolute inset-x-0 top-0 h-1/2 bg-[var(--color-accent)] transition-transform duration-300 group-hover:translate-y-1" />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={
            compact
              ? "font-display text-xl font-black leading-none"
              : "font-display text-2xl font-black leading-none sm:text-[1.7rem]"
          }
        >
          <span className="text-[var(--color-accent)]">ROX</span>
          <span className="mx-1.5 text-[var(--color-logo-link)]">&</span>
          <span className="text-[var(--color-logo-nex)]">NEX</span>
        </span>
        {!compact ? (
          <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--color-muted)]">
            Wholesale sports
          </span>
        ) : null}
      </span>
    </Link>
  );
}
