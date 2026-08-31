import { ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";

import { ProductCard } from "@/components/product/product-card";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { SectionHeading } from "@/components/ui/section-heading";
import type { ProductSummary } from "@/types/product";

type DivisionShowcaseProps = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  products: ProductSummary[];
  variant?: "default" | "inverted";
};

export function DivisionShowcase({
  id,
  eyebrow,
  title,
  description,
  ctaLabel,
  products,
  variant = "default",
}: DivisionShowcaseProps) {
  const invertedStyles =
    variant === "inverted"
      ? ({
          "--color-text": "#f7f2ec",
          "--color-muted": "rgba(247, 242, 236, 0.72)",
          "--color-card": "rgba(255, 255, 255, 0.08)",
          "--color-card-solid": "#171313",
          "--color-surface": "rgba(255, 255, 255, 0.08)",
          "--color-surface-raised": "rgba(255, 255, 255, 0.12)",
          "--color-border": "rgba(255, 255, 255, 0.14)",
          "--color-border-strong": "rgba(255, 255, 255, 0.28)",
        } as CSSProperties)
      : undefined;

  return (
    <section
      className={
        variant === "inverted"
          ? "bg-[#151212] py-[var(--section-spacing)] text-[#f7f2ec] dark:bg-[#0c0b0b]"
          : "py-[var(--section-spacing)]"
      }
      id={id}
      style={invertedStyles}
    >
      <Container className="space-y-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            description={description}
            eyebrow={eyebrow}
            title={title}
          />
          <a
            className="inline-flex h-12 w-fit items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-[var(--color-accent)] px-6 text-sm font-bold text-white shadow-[var(--shadow-red)] transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-accent-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
            href="#products"
          >
            {ctaLabel}
            <ArrowRight aria-hidden="true" size={17} />
          </a>
        </div>
        {products.length ? (
          <div className="grid gap-5 md:grid-cols-2">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <EmptyState
            description="Featured products for this division will appear here after active products are created in admin."
            title="No division products yet"
          />
        )}
      </Container>
    </section>
  );
}
