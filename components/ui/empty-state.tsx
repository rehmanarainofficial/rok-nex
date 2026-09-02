import type { ReactNode } from "react";
import { SearchX } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/utilities/cn";

type EmptyStateProps = {
  action?: ReactNode;
  className?: string;
  description: string;
  eyebrow?: string;
  icon?: ReactNode;
  title: string;
};

export function EmptyState({
  action,
  className,
  description,
  eyebrow = "Catalog state",
  icon,
  title,
}: EmptyStateProps) {
  return (
    <Card
      className={cn(
        "relative isolate flex min-h-64 flex-col items-start justify-end overflow-hidden p-6 sm:p-8",
        className,
      )}
    >
      <div className="state-grid pointer-events-none absolute inset-0 -z-10 opacity-40" />
      <div className="pointer-events-none absolute right-0 top-0 -z-10 h-40 w-2/3 bg-[radial-gradient(circle_at_75%_15%,var(--color-red-glow),transparent_58%)]" />
      <div className="grid size-12 place-items-center rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-accent)] shadow-[var(--shadow-soft)]">
        {icon ?? <SearchX aria-hidden="true" size={22} />}
      </div>
      <div className="mt-8 space-y-3">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)]">
          {eyebrow}
        </p>
        <h2 className="font-display text-3xl font-black leading-tight text-[var(--color-text)] sm:text-4xl">
          {title}
        </h2>
        <p className="max-w-xl text-sm leading-6 text-[var(--color-muted)]">
          {description}
        </p>
      </div>
      {action ? <div className="mt-6">{action}</div> : null}
    </Card>
  );
}
