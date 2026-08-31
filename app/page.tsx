import { ArrowRight, Database, Dumbbell, Trophy } from "lucide-react";

import { DivisionCard } from "@/components/product/division-card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { SectionHeading } from "@/components/ui/section-heading";
import { PRODUCT_DIVISIONS } from "@/constants/product-divisions";

export default function Home() {
  return (
    <main className="flex-1 overflow-hidden">
      <section className="relative isolate border-b border-[var(--color-border)]">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,var(--color-red-glow),transparent_30%),linear-gradient(135deg,var(--color-background),var(--color-background-alt))]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-[linear-gradient(to_top,var(--color-background),transparent)]" />
        <Container className="grid min-h-[calc(100vh-5rem)] items-center gap-12 py-16 lg:grid-cols-[1.08fr_0.92fr] lg:py-20">
          <div className="max-w-4xl space-y-8">
            <div className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-muted)] shadow-[var(--shadow-soft)]">
              <span className="size-2 rounded-full bg-[var(--color-accent)]" />
              Wholesale sports showcase
            </div>
            <div className="space-y-6">
              <h1 className="font-display text-[length:var(--text-hero)] font-black leading-[0.9] text-[var(--color-text)]">
                Rox & Nex
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[var(--color-muted)] sm:text-xl">
                A premium product showcase platform for wholesale sports buyers
                browsing prices, stock, specifications, descriptions, and images.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                className="inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-[var(--color-accent)] px-6 text-sm font-bold text-white shadow-[var(--shadow-red)] transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-accent-strong)]"
                href="#products"
              >
                View product foundation
                <ArrowRight aria-hidden="true" size={17} />
              </a>
              <a
                className="inline-flex h-12 items-center justify-center rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-[var(--color-surface)] px-6 text-sm font-bold text-[var(--color-text)] transition duration-200 hover:-translate-y-0.5 hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-raised)]"
                href="#divisions"
              >
                Explore divisions
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)]">
                <Dumbbell className="text-[var(--color-accent)]" size={28} />
                <p className="mt-8 font-display text-3xl font-bold text-[var(--color-text)]">
                  Rox Fitness
                </p>
                <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
                  Fitness and exercise product division.
                </p>
              </div>
              <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)] sm:translate-y-8 lg:translate-y-0 xl:translate-y-8">
                <Trophy className="text-[var(--color-accent)]" size={28} />
                <p className="mt-8 font-display text-3xl font-bold text-[var(--color-text)]">
                  Nex Games
                </p>
                <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
                  Indoor, board, and sports games division.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-[var(--section-spacing)]" id="divisions">
        <Container className="space-y-10">
          <SectionHeading
            description="Two focused catalog divisions keep wholesale browsing clean without mixing fitness equipment and games inventory."
            eyebrow="Product divisions"
            title="Built for Rox Fitness and Nex Games."
          />
          <div className="grid gap-5 lg:grid-cols-2">
            {PRODUCT_DIVISIONS.map((division) => (
              <DivisionCard division={division} key={division.id} />
            ))}
          </div>
        </Container>
      </section>

      <section
        className="border-y border-[var(--color-border)] bg-[var(--color-surface)] py-[var(--section-spacing)]"
        id="products"
      >
        <Container className="space-y-10">
          <SectionHeading
            description="The data model, MongoDB connection layer, and reusable states are ready for real inventory once the connection string and products are provided."
            eyebrow="Catalog foundation"
            title="Product showcase architecture is in place."
          />
          <EmptyState
            action={
              <Button variant="secondary">
                <Database aria-hidden="true" className="mr-2" size={16} />
                Awaiting MongoDB data
              </Button>
            }
            description="No sample products were hardcoded. The showcase is ready to load real wholesale inventory from MongoDB."
            title="No products connected yet."
          />
        </Container>
      </section>
    </main>
  );
}
