"use client";

import { Menu, Search, X } from "lucide-react";
import Link from "next/link";
import {
  FormEvent,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

import { BrandMark } from "@/components/layout/brand-mark";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { Container } from "@/components/ui/container";
import { useHeaderScrolled } from "@/hooks/use-scroll-state";
import type { BrandDivision } from "@/types/product";
import { cn } from "@/utilities/cn";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Rox Fitness", href: "/rox-fitness" },
  { label: "Nex Games", href: "/nex-games" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export type HeaderCategoryLink = {
  brandDivision: BrandDivision;
  name: string;
  slug: string;
};

type SiteHeaderProps = {
  categories?: HeaderCategoryLink[];
};

const emptyCategories: HeaderCategoryLink[] = [];

function getDivisionPath(division: BrandDivision) {
  return division === "rox-fitness" ? "/rox-fitness" : "/nex-games";
}

export function SiteHeader({ categories = emptyCategories }: SiteHeaderProps) {
  const scrolled = useHeaderScrolled();
  const searchInputId = useId();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const filteredTargets = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const searchTargets = [
      ...navigation.slice(1),
      { label: "Wholesale Sports Collection", href: "/" },
      ...categories.map((category) => ({
        label: category.name,
        href: `${getDivisionPath(category.brandDivision)}?category=${category.slug}`,
      })),
    ];

    if (!normalizedQuery) {
      return searchTargets.slice(0, 5);
    }

    return searchTargets.filter((item) =>
      item.label.toLowerCase().includes(normalizedQuery),
    );
  }, [categories, query]);

  useEffect(() => {
    if (isSearchOpen) {
      searchInputRef.current?.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsSearchOpen(false);
        setIsMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const closePanels = useCallback(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  }, []);

  const handleSearchSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const target = filteredTargets[0];

      if (!target) {
        return;
      }

      closePanels();
      window.location.assign(target.href);
    },
    [closePanels, filteredTargets],
  );

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
          <button
            aria-expanded={isSearchOpen}
            aria-label="Open site search"
            className="grid size-10 place-items-center rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] shadow-[var(--shadow-soft)] transition duration-200 hover:-translate-y-0.5 hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-raised)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
            onClick={() => setIsSearchOpen((value) => !value)}
            type="button"
          >
            <Search aria-hidden="true" size={18} />
          </button>
          <ThemeSwitcher />
          <button
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

        {isSearchOpen ? (
          <div className="absolute left-5 right-5 top-[calc(100%+0.75rem)] rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card-solid)] p-4 shadow-[var(--shadow-popover)] backdrop-blur-xl sm:left-auto sm:w-[25rem]">
            <form className="space-y-3" onSubmit={handleSearchSubmit}>
              <label
                className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-muted)]"
                htmlFor={searchInputId}
              >
                Search sections
              </label>
              <input
                id={searchInputId}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Products, games, fitness..."
                ref={searchInputRef}
                type="search"
                value={query}
              />
            </form>
            <div className="mt-3 grid gap-1">
              {filteredTargets.length > 0 ? (
                filteredTargets.map((item) => (
                  <Link
                    className="rounded-[var(--radius-sm)] px-3 py-2 text-sm font-semibold text-[var(--color-muted)] transition hover:bg-[var(--color-surface-raised)] hover:text-[var(--color-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                    href={item.href}
                    key={`${item.label}-${item.href}`}
                    onClick={closePanels}
                  >
                    {item.label}
                  </Link>
                ))
              ) : (
                <p className="px-3 py-2 text-sm text-[var(--color-muted)]">
                  No matching section found.
                </p>
              )}
            </div>
          </div>
        ) : null}
      </Container>

      {isMenuOpen ? (
        <div className="border-t border-[var(--color-border)] bg-[var(--color-card-solid)] lg:hidden">
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
