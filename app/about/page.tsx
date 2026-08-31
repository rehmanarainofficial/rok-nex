import { Dumbbell, Gamepad2, PackageCheck, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getPublicCategories } from "@/services/public-navigation";

export const metadata: Metadata = {
  title: "About Rox & Nex",
  description:
    "Learn about Rox & Nex, a wholesale sports product showcase with Rox Fitness and Nex Games divisions.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Rox & Nex",
    description:
      "Learn about the Rox Fitness and Nex Games wholesale sports product divisions.",
    url: "/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Rox & Nex",
    description: "Rox & Nex organizes wholesale sports products into two focused divisions.",
  },
};

export const dynamic = "force-dynamic";

const values = [
  {
    icon: PackageCheck,
    title: "Wholesale Product Range",
    text: "A focused catalog for buyers comparing fitness, sports, indoor game, and board game products.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Positioning",
    text: "Product pages are structured around specifications, availability, images, and buyer-ready details.",
  },
  {
    icon: Dumbbell,
    title: "Rox Fitness",
    text: "The performance-led division for strength, training, movement, and everyday exercise equipment.",
  },
  {
    icon: Gamepad2,
    title: "Nex Games",
    text: "The recreation-led division for board games, indoor games, sports games, and play-focused products.",
  },
];

export default async function AboutPage() {
  const categories = await getPublicCategories();

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader categories={categories} />
      <main className="flex-1 overflow-hidden">
        <section className="relative border-b border-[var(--color-border)] py-[var(--section-spacing)]">
          <Container className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <ScrollReveal>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--color-accent)]">
                  About Rox & Nex
                </p>
                <h1 className="mt-5 font-display text-[length:var(--text-section)] font-black leading-none text-[var(--color-text)]">
                  Sports supply, shaped for wholesale discovery.
                </h1>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={130}>
              <p className="max-w-2xl text-lg leading-8 text-[var(--color-muted)]">
                Rox & Nex presents sports, fitness, and games products through two
                clear divisions: Rox Fitness for training-focused equipment and Nex
                Games for board, indoor, recreational, and sports games. The website
                is designed for wholesale customers to browse product information
                before contacting the business.
              </p>
            </ScrollReveal>
          </Container>
        </section>

        <section className="py-[var(--section-spacing)]">
          <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <ScrollReveal>
              <SectionHeading
                description="The brand separates product discovery by buyer intent while keeping one premium Rox & Nex identity."
                eyebrow="Divisions"
                title="Built around two product worlds."
              />
            </ScrollReveal>
            <div className="grid gap-4 sm:grid-cols-2">
              <ScrollReveal delay={80}>
                <Card className="min-h-full p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-accent)]">
                    Rox Fitness
                  </p>
                  <h2 className="mt-4 font-display text-4xl font-black text-[var(--color-text)]">
                    Performance products for training.
                  </h2>
                  <p className="mt-4 leading-7 text-[var(--color-muted)]">
                    Equipment built for strength, movement, performance, and everyday
                    exercise environments.
                  </p>
                </Card>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <Card className="min-h-full p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-accent)]">
                    Nex Games
                  </p>
                  <h2 className="mt-4 font-display text-4xl font-black text-[var(--color-text)]">
                    Recreation products for fast browsing.
                  </h2>
                  <p className="mt-4 leading-7 text-[var(--color-muted)]">
                    Board games, indoor games, sports games, and game-related products
                    organized for wholesale evaluation.
                  </p>
                </Card>
              </ScrollReveal>
            </div>
          </Container>
        </section>

        <section className="border-y border-[var(--color-border)] bg-[var(--color-surface)] py-[var(--section-spacing)]">
          <Container className="space-y-10">
            <ScrollReveal>
              <SectionHeading
                description="No invented company history or inflated statistics are shown here. Verified business milestones can be added when available."
                eyebrow="Wholesale Focus"
                title="Clear product information first."
              />
            </ScrollReveal>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {values.map((item, index) => (
                <ScrollReveal delay={Math.min(index * 70, 220)} key={item.title}>
                  <Card className="min-h-full p-5">
                    <item.icon aria-hidden="true" className="text-[var(--color-accent)]" />
                    <h3 className="mt-5 font-display text-2xl font-bold text-[var(--color-text)]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
                      {item.text}
                    </p>
                  </Card>
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
                  <h2 className="mt-4 font-display text-5xl font-black text-[var(--color-text)]">
                    Explore the current wholesale showcase.
                  </h2>
                </div>
                <Link
                  className="inline-flex h-12 w-fit items-center justify-center rounded-[var(--radius-pill)] bg-[var(--color-accent)] px-6 text-sm font-bold text-white shadow-[var(--shadow-red)] transition hover:bg-[var(--color-accent-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                  href="/products"
                >
                  View Products
                </Link>
              </div>
            </ScrollReveal>
          </Container>
        </section>
      </main>
      <SiteFooter categories={categories} />
    </div>
  );
}
