import Image from "next/image";
import Link from "next/link";

import { cn } from "@/utilities/cn";
import type { Category } from "@/types/product";

type CategoryCardProps = {
  category: Pick<Category, "brandDivision" | "description" | "image" | "name" | "slug">;
  index?: number;
};

type CategoryAccent = "red" | "light" | "dark";

const accentClasses: Record<CategoryAccent, string> = {
  red: "from-[rgba(215,25,32,0.24)]",
  dark: "from-[rgba(21,19,18,0.18)] dark:from-[rgba(255,255,255,0.09)]",
  light: "from-[rgba(247,242,236,0.5)] dark:from-[rgba(247,242,236,0.08)]",
};

function getDivisionPath(division: Category["brandDivision"]) {
  return division === "rox-fitness" ? "/rox-fitness" : "/nex-games";
}

function getCategoryAccent(division: Category["brandDivision"], index: number): CategoryAccent {
  if (division === "rox-fitness") {
    return index % 2 === 0 ? "red" : "dark";
  }

  return index % 2 === 0 ? "light" : "red";
}

export function CategoryCard({ category, index = 0 }: CategoryCardProps) {
  const accent = getCategoryAccent(category.brandDivision, index);
  const productCountLabel =
    category.brandDivision === "rox-fitness" ? "Rox Fitness" : "Nex Games";

  return (
    <Link
      className="group block overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-card)] transition duration-300 hover:-translate-y-1 hover:border-[var(--color-border-strong)] hover:shadow-[var(--shadow-card-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]"
      href={`${getDivisionPath(category.brandDivision)}?category=${category.slug}`}
    >
      <div
        className={cn(
          "relative aspect-[4/3] overflow-hidden bg-gradient-to-br to-transparent",
          accentClasses[accent],
        )}
      >
        <Image
          alt={`${category.name} category`}
          className="object-cover transition duration-500 group-hover:scale-105"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          src={category.image}
        />
      </div>
      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]">
            {productCountLabel}
          </span>
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-muted)]">
            Catalog
          </span>
        </div>
        <div>
          <h3 className="font-display text-3xl font-bold leading-none text-[var(--color-text)]">
            {category.name}
          </h3>
          <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
            {category.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
