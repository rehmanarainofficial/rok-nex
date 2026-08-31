import Link from "next/link";

import { BrandMark } from "@/components/layout/brand-mark";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { Container } from "@/components/ui/container";

const navigation = [
  { label: "Rox Fitness", href: "#rox-fitness" },
  { label: "Nex Games", href: "#nex-games" },
  { label: "Products", href: "#products" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-background)_86%,transparent)] backdrop-blur-xl">
      <Container className="flex h-20 items-center justify-between gap-5">
        <BrandMark />
        <nav aria-label="Primary navigation" className="hidden items-center gap-7 md:flex">
          {navigation.map((item) => (
            <Link
              className="text-sm font-semibold text-[var(--color-muted)] transition hover:text-[var(--color-text)]"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <ThemeSwitcher />
      </Container>
    </header>
  );
}
