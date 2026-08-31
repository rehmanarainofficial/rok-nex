import { BrandMark } from "@/components/layout/brand-mark";
import { Container } from "@/components/ui/container";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <BrandMark />
        <p className="max-w-md text-sm leading-6 text-[var(--color-muted)]">
          Wholesale sports product showcase for Rox Fitness and Nex Games buyers.
        </p>
      </Container>
    </footer>
  );
}
