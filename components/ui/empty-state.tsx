import type { ReactNode } from "react";

import { Card } from "@/components/ui/card";

type EmptyStateProps = {
  title: string;
  description: string;
  action?: ReactNode;
};

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <Card className="flex flex-col items-start gap-4 p-6">
      <div className="space-y-2">
        <h3 className="font-display text-2xl font-bold text-[var(--color-text)]">
          {title}
        </h3>
        <p className="max-w-xl text-sm leading-6 text-[var(--color-muted)]">
          {description}
        </p>
      </div>
      {action}
    </Card>
  );
}
