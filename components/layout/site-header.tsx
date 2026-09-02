"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useId, useState } from "react";

import { BrandMark } from "@/components/layout/brand-mark";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { Container } from "@/components/ui/container";
import { useHeaderScrolled } from "@/hooks/use-scroll-state";
import { cn } from "@/utilities/cn";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Rox Fitness", href: "/rox-fitness" },
  { label: "Nex Games", href: "/nex-games" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  const scrolled = useHeaderScrolled();
  const menuId = useId();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const closePanels = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-all duration-300",
        scrolled
          ? "border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-background)_88%,transparent)] shadow-[var(--shadow-header)] backdrop-blur-xl"
          : "border-transparent bg-[color-mix(in_srgb,var(--color-background)_74%,transparent)] backdrop-blur-sm",
      )}
    >
      <Container
        className={cn(
          "relative flex items-center justify-between gap-5 transition-[height] duration-300",
          scrolled ? "h-16" : "h-20",
        )}
      >
        <BrandMark compact={scrolled} />
        <nav aria-label="Primary navigation" className="hidden items-center gap-6 lg:flex">
          {navigation.map((item) => (
            <Link
              className="rounded-[var(--radius-sm)] px-1 py-2 text-sm font-semibold text-[var(--color-muted)] transition hover:text-[var(--color-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--color-accent)]"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <button
            aria-controls={menuId}
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
            className="grid size-10 place-items-center rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] shadow-[var(--shadow-soft)] transition duration-200 hover:-translate-y-0.5 hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-raised)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] lg:hidden"
            onClick={() => setIsMenuOpen((value) => !value)}
            type="button"
          >
            {isMenuOpen ? (
              <X aria-hidden="true" size={18} />
            ) : (
              <Menu aria-hidden="true" size={18} />
            )}
          </button>
        </div>
      </Container>

      {isMenuOpen ? (
        <div
          className="absolute inset-x-0 top-full border-y border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-card-solid)_96%,transparent)] shadow-[var(--shadow-popover)] backdrop-blur-xl lg:hidden"
          id={menuId}
        >
          <Container className="grid gap-1 py-3">
            {navigation.map((item) => (
              <Link
                className="rounded-[var(--radius-sm)] px-3 py-3 text-sm font-bold text-[var(--color-text)] transition hover:bg-[var(--color-surface-raised)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                href={item.href}
                key={item.href}
                onClick={closePanels}
              >
                {item.label}
              </Link>
            ))}
          </Container>
        </div>
      ) : null}
    </header>
  );
}
