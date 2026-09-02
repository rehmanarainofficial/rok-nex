import { ArrowRight, Boxes, Dumbbell, Trophy } from "lucide-react";
import Link from "next/link";
import type { CSSProperties } from "react";

import { Container } from "@/components/ui/container";
import type { BrandDivision } from "@/types/product";
import { cn } from "@/utilities/cn";

type DivisionHeroProps = {
  description: string;
  division?: BrandDivision;
  eyebrow: string;
  tone?: "rox" | "nex" | "all";
  title: string;
};

export function DivisionHero({
  description,
  division,
  eyebrow,
  title,
  tone = "all",
}: DivisionHeroProps) {
  const Icon = tone === "rox" ? Dumbbell : tone === "nex" ? Trophy : Boxes;

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden border-b border-[var(--color-border)] pt-12",
        tone === "nex" && "bg-[#151212] text-[#f7f2ec]",
      )}
      style={
        tone === "nex"
          ? ({
              "--color-text": "#f7f2ec",
              "--color-muted": "rgba(247, 242, 236, 0.72)",
              "--color-surface": "rgba(255, 255, 255, 0.08)",
              "--color-card": "rgba(255, 255, 255, 0.08)",
              "--color-border": "rgba(255, 255, 255, 0.14)",
            } as CSSProperties)
          : undefined
      }
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_16%,var(--color-red-glow),transparent_32%),linear-gradient(135deg,var(--color-background),var(--color-background-alt))]" />
      <Container className="grid min-h-[34rem] gap-10 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-accent)]">
            {eyebrow}
          </p>
          <h1 className="mt-5 font-display text-[length:var(--text-hero)] font-black uppercase leading-[0.82] text-[var(--color-text)]">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--color-muted)] sm:text-lg">
            {description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-[var(--color-accent)] px-6 text-sm font-bold text-white shadow-[var(--shadow-red)]"
              href="#catalog"
            >
              Browse Catalog
              <ArrowRight aria-hidden="true" size={17} />
            </Link>
            {division ? (
              <Link
                className="inline-flex h-12 items-center justify-center rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-[var(--color-surface)] px-6 text-sm font-bold text-[var(--color-text)]"
                href={`/products?division=${division}`}
              >
                View in All Products
              </Link>
            ) : null}
          </div>
        </div>
        <div className="hero-shell hidden lg:block">
          <div
            className="relative min-h-[28rem] rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-8 shadow-[var(--shadow-card)]"
            style={{ transform: "rotateX(8deg) rotateY(-12deg)" }}
          >
            <div className="absolute inset-8 rounded-full border border-[var(--color-border)]" />
            <div className="absolute inset-20 rounded-full border border-[var(--color-border)]" />
            <div className="absolute left-8 top-8 grid size-20 place-items-center rounded-full bg-[var(--color-accent)] text-white shadow-[var(--shadow-red)]">
              <Icon aria-hidden="true" size={34} />
            </div>
            <div className="absolute bottom-8 right-8 max-w-xs">
              <p className="font-display text-6xl font-black uppercase leading-none text-[var(--color-text)]">
                {tone === "rox" ? "Strength" : tone === "nex" ? "Play" : "Catalog"}
              </p>
              <p className="mt-4 text-sm font-semibold leading-6 text-[var(--color-muted)]">
                Fast product discovery with live category, stock, and product data.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
