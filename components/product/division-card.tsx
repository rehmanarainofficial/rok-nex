import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Card } from "@/components/ui/card";
import type { ProductDivision } from "@/types/product";

type DivisionCardProps = {
  division: ProductDivision;
};

export function DivisionCard({ division }: DivisionCardProps) {
  return (
    <Card
      className="group relative overflow-hidden p-6 transition duration-300 hover:-translate-y-1 hover:border-[var(--color-border-strong)] hover:shadow-[var(--shadow-card-hover)]"
      id={division.id}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-[var(--color-accent)] opacity-90" />
      <div className="flex min-h-72 flex-col justify-between gap-10">
        <div className="space-y-5">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-accent)]">
            {division.eyebrow}
          </p>
          <div className="space-y-3">
            <h3 className="font-display text-4xl font-bold leading-none text-[var(--color-text)]">
              {division.name}
            </h3>
            <p className="max-w-md text-sm leading-6 text-[var(--color-muted)]">
              {division.description}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap gap-2">
            {division.productFocus.map((item) => (
              <span
                className="rounded-[var(--radius-pill)] border border-[var(--color-border)] px-3 py-1 text-xs font-semibold text-[var(--color-muted)]"
                key={item}
              >
                {item}
              </span>
            ))}
          </div>
          <Link
            className="inline-flex w-fit items-center gap-2 text-sm font-bold text-[var(--color-text)] transition group-hover:text-[var(--color-accent)]"
            href="#products"
          >
            View showcase status
            <ArrowUpRight aria-hidden="true" size={16} />
          </Link>
        </div>
      </div>
    </Card>
  );
}
