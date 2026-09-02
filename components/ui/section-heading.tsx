import type { ReactNode } from "react";

import { cn } from "@/utilities/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  children?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  children,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex w-full max-w-full flex-col gap-4 lg:max-w-[75%]",
        align === "center" && "mx-auto items-center text-center",
      )}
    >
      {eyebrow ? (
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-[var(--color-accent)]">
          {eyebrow}
        </p>
      ) : null}
      <div className="space-y-4">
        <h2 className="font-display text-[length:var(--text-section)] font-normal leading-[1.04] text-[var(--color-text)]">
          {title}
        </h2>
        {description ? (
          <p className="text-base leading-7 text-[var(--color-muted)] sm:text-lg">
            {description}
          </p>
        ) : null}
      </div>
      {children}
    </div>
  );
}
