"use client";

import { Menu, Search, X } from "lucide-react";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";

import { BrandMark } from "@/components/layout/brand-mark";
import { GlobalSearch } from "@/components/search/global-search";
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
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
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

export function SiteHeader({ categories = emptyCategories }: SiteHeaderProps) {
  const scrolled = useHeaderScrolled();
  const menuId = useId();
  const searchDialogId = useId();
  const searchTitleId = useId();
  const searchPanelRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: globalThis.KeyboardEvent) {
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

  const handleSearchKeyDown = useCallback((event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") {
      return;
    }

    const panel = searchPanelRef.current;
    const focusableElements = panel
      ? Array.from(
          panel.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        ).filter((element) => element.offsetParent !== null)
      : [];

    if (!focusableElements.length) {
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement?.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement?.focus();
    }
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
          <button
            aria-controls={searchDialogId}
            aria-expanded={isSearchOpen}
            aria-label={isSearchOpen ? "Close site search" : "Open site search"}
            className="grid size-10 place-items-center rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] shadow-[var(--shadow-soft)] transition duration-200 hover:-translate-y-0.5 hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-raised)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
            onClick={() => setIsSearchOpen((value) => !value)}
            type="button"
          >
            <Search aria-hidden="true" size={18} />
          </button>
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

        {isSearchOpen ? (
          <div
            aria-labelledby={searchTitleId}
            aria-modal="true"
            className="absolute left-5 right-5 top-[calc(100%+0.75rem)] max-h-[min(72vh,38rem)] overflow-y-auto rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card-solid)] p-4 shadow-[var(--shadow-popover)] backdrop-blur-xl sm:left-auto sm:w-[30rem]"
            id={searchDialogId}
            onKeyDown={handleSearchKeyDown}
            ref={searchPanelRef}
            role="dialog"
          >
            <div className="mb-3 flex items-center justify-between gap-4">
              <h2
                className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)]"
                id={searchTitleId}
              >
                Product Search
              </h2>
              <button
                aria-label="Close site search"
                className="grid size-9 place-items-center rounded-[var(--radius-pill)] text-[var(--color-muted)] transition hover:bg-[var(--color-surface-raised)] hover:text-[var(--color-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                onClick={() => setIsSearchOpen(false)}
                type="button"
              >
                <X aria-hidden="true" size={17} />
              </button>
            </div>
            <GlobalSearch categories={categories} onNavigate={closePanels} />
          </div>
        ) : null}
      </Container>

      {isMenuOpen ? (
        <div
          className="border-t border-[var(--color-border)] bg-[var(--color-card-solid)] lg:hidden"
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
