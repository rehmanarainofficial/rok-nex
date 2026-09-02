import { ArrowRight, Dumbbell, Gamepad2, PackageCheck, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "About Rox & Nex",
  description:
    "Learn about Rox & Nex, a sports product showcase with Rox Fitness and Nex Games divisions.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Rox & Nex",
    description: "Rox & Nex organizes sports, fitness, and games products into two clear divisions.",
    url: "/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Rox & Nex",
    description: "Rox & Nex organizes sports products into two focused divisions.",
  },
};

const principles = [
  {
    icon: PackageCheck,
    title: "Focused Catalog",
    text: "Products are presented with clean images, clear descriptions, and stock status.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Positioning",
    text: "The site keeps the product range polished without unnecessary checkout complexity.",
  },
  {
    icon: Dumbbell,
    title: "Rox Fitness",
    text: "Training, movement, strength, and everyday fitness products.",
  },
  {
    icon: Gamepad2,
    title: "Nex Games",
    text: "Board games, indoor games, sports games, and recreation products.",
  },
];

export const dynamic = "force-dynamic";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 overflow-hidden">
        <section className="relative border-b border-[var(--color-border)] py-[var(--section-spacing)]">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_22%,var(--color-red-glow),transparent_34%)]" />
          <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <ScrollReveal>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--color-accent)]">
                  About Rox & Nex
                </p>
                <h1 className="mt-5 max-w-4xl font-display text-[length:var(--text-section)] font-normal leading-none text-[var(--color-text)]">
                  Sports, fitness, and games in one sharp product catalog.
                </h1>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <div className="max-w-2xl border-l border-[var(--color-border)] pl-6">
                <p className="text-lg leading-8 text-[var(--color-muted)]">
                  Rox & Nex brings two product worlds together: Rox Fitness for
                  performance and training, Nex Games for indoor play, board
                  games, and recreation. The website is made for quick browsing,
                  clean product review, and direct contact.
                </p>
              </div>
            </ScrollReveal>
          </Container>
        </section>

        <section className="py-[var(--section-spacing)]">
          <Container>
            <div className="grid overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] lg:grid-cols-2">
              <ScrollReveal>
                <Link
                  className="group relative block min-h-[28rem] overflow-hidden bg-[#111] p-7 text-white sm:p-9"
                  href="/rox-fitness"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(242,58,63,0.28),transparent_42%)]" />
                  <p className="relative text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-accent)]">
                    Rox Fitness
                  </p>
                  <h2 className="relative mt-5 max-w-xl font-display text-5xl font-normal leading-none sm:text-6xl">
                    Built for movement and strength.
                  </h2>
                  <p className="relative mt-5 max-w-md leading-7 text-white/70">
                    Fitness equipment and training products arranged for fast,
                    confident product discovery.
                  </p>
                  <span className="relative mt-8 inline-flex items-center gap-2 text-sm font-bold text-white">
                    Explore Rox Fitness
                    <ArrowRight className="transition group-hover:translate-x-1" size={17} />
                  </span>
                  <span className="absolute -bottom-5 left-6 font-display text-[9rem] font-normal leading-none text-white/10 sm:text-[12rem]">
                    ROX
                  </span>
                </Link>
              </ScrollReveal>
              <ScrollReveal delay={120}>
                <Link
                  className="group relative block min-h-[28rem] overflow-hidden bg-[var(--color-surface)] p-7 sm:p-9"
                  href="/nex-games"
                >
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,var(--color-surface),var(--color-card-solid))]" />
                  <p className="relative text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-accent)]">
                    Nex Games
                  </p>
                  <h2 className="relative mt-5 max-w-xl font-display text-5xl font-normal leading-none text-[var(--color-text)] sm:text-6xl">
                    Made for play and discovery.
                  </h2>
                  <p className="relative mt-5 max-w-md leading-7 text-[var(--color-muted)]">
                    Board games, indoor games, and recreation products presented
                    with a premium but simple browsing experience.
                  </p>
                  <span className="relative mt-8 inline-flex items-center gap-2 text-sm font-bold text-[var(--color-text)]">
                    Explore Nex Games
                    <ArrowRight className="transition group-hover:translate-x-1" size={17} />
                  </span>
                  <span className="absolute -bottom-5 left-6 font-display text-[9rem] font-normal leading-none text-[var(--color-text)]/10 sm:text-[12rem]">
                    NEX
                  </span>
                </Link>
              </ScrollReveal>
            </div>
          </Container>
        </section>

        <section className="border-y border-[var(--color-border)] bg-[var(--color-surface)] py-[var(--section-spacing)]">
          <Container className="space-y-10">
            <ScrollReveal>
              <div className="max-w-4xl">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-accent)]">
                  What matters
                </p>
                <h2 className="mt-5 font-display text-[length:var(--text-section)] font-normal leading-none text-[var(--color-text)]">
                  Clear product information without extra noise.
                </h2>
              </div>
            </ScrollReveal>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {principles.map((item, index) => (
                <ScrollReveal delay={Math.min(index * 60, 180)} key={item.title}>
                  <div className="min-h-full border-t border-[var(--color-border)] pt-5">
                    <item.icon aria-hidden="true" className="text-[var(--color-accent)]" size={25} />
                    <h3 className="mt-6 font-display text-2xl font-normal text-[var(--color-text)]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
                      {item.text}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-[var(--section-spacing)]">
          <Container>
            <ScrollReveal>
              <div className="grid gap-6 border-y border-[var(--color-border)] py-10 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-accent)]">
                    Product Catalog
                  </p>
                  <h2 className="mt-4 max-w-4xl font-display text-4xl font-normal leading-tight text-[var(--color-text)] sm:text-5xl">
                    Browse the current Rox & Nex product range.
                  </h2>
                </div>
                <Link
                  className="inline-flex h-12 w-fit items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-[var(--color-accent)] px-6 text-sm font-bold text-white shadow-[var(--shadow-red)] transition hover:bg-[var(--color-accent-strong)]"
                  href="/products"
                >
                  View Products
                  <ArrowRight aria-hidden="true" size={17} />
                </Link>
              </div>
            </ScrollReveal>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
