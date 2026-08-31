import type { ReactNode } from "react";

import { ProductCard } from "@/components/product/product-card";
import { EmptyState } from "@/components/ui/empty-state";
import type { ProductSummary } from "@/types/product";

type ProductGridProps = {
  emptyAction?: ReactNode;
  emptyDescription: string;
  emptyTitle: string;
  products: ProductSummary[];
};

export function ProductGrid({
  emptyAction,
  emptyDescription,
  emptyTitle,
  products,
}: ProductGridProps) {
  if (!products.length) {
    return (
      <EmptyState
        action={emptyAction}
        description={emptyDescription}
        title={emptyTitle}
      />
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {products.map((product, index) => (
        <ProductCard key={product.slug} priority={index < 2} product={product} />
      ))}
    </div>
  );
}
