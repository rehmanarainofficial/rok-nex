import { ArrowDownRight, ArrowRight } from "lucide-react";

import { HeroVisual } from "@/components/home/hero-visual";
import { Container } from "@/components/ui/container";

export function HeroSection() {
  return (
    <section className="hero-shell relative isolate overflow-hidden border-b border-[var(--color-border)]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_22%_18%,var(--color-red-glow),transparent_32%),linear-gradient(135deg,var(--color-background),var(--color-background-alt))]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-36 bg-[linear-gradient(to_top,var(--color-background),transparent)]" />
      <Container className="grid min-h-[min(820px,calc(100vh-4rem))] items-center gap-12 py-12 sm:py-16 lg:grid-cols-[1.02fr_0.98fr] lg:py-20 2xl:min-h-[860px]">
        <div className="max-w-4xl">
          <div className="overflow-hidden">
            <p className="hero-reveal inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-muted)] shadow-[var(--shadow-soft)]">
              <span className="size-2 rounded-full bg-[var(--color-accent)]" />
              Wholesale Sports Collection
            </p>
          </div>
          <div className="mt-7 overflow-hidden">
            <h1 className="hero-reveal hero-reveal--delay font-display text-[length:var(--text-hero)] font-black leading-[0.88] text-[var(--color-text)]">
              Built for Fitness.
              <br />
              <span className="text-[var(--color-accent)]">Made for Play.</span>
            </h1>
          </div>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--color-muted)] sm:text-xl">
            Explore premium fitness equipment, indoor games, board games, and
            sports products from Rox Fitness and Nex Games.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-[var(--color-accent)] px-6 text-sm font-bold text-white shadow-[var(--shadow-red)] transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-accent-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
              href="#products"
            >
              Explore Products
              <ArrowRight aria-hidden="true" size={17} />
            </a>
            <a
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-[var(--color-surface)] px-6 text-sm font-bold text-[var(--color-text)] transition duration-200 hover:-translate-y-0.5 hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-raised)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
              href="#divisions"
            >
              View Collections
              <ArrowDownRight aria-hidden="true" size={17} />
            </a>
          </div>
          <div className="mt-10 grid max-w-xl grid-cols-2 gap-3">
            <div className="border-l-2 border-[var(--color-accent)] pl-4">
              <p className="font-display text-2xl font-bold text-[var(--color-text)]">
                ROX FITNESS
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)]">
                Strength supply
              </p>
            </div>
            <div className="border-l-2 border-[var(--color-border-strong)] pl-4">
              <p className="font-display text-2xl font-bold text-[var(--color-text)]">
                NEX GAMES
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)]">
                Play inventory
              </p>
            </div>
          </div>
        </div>
        <HeroVisual />
      </Container>
    </section>
  );
}
