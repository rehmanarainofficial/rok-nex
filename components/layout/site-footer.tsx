import { BrandMark } from "@/components/layout/brand-mark";
import { Container } from "@/components/ui/container";
import type { BrandDivision } from "@/types/product";

export type FooterCategoryLink = {
  brandDivision: BrandDivision;
  name: string;
  slug: string;
};

type SiteFooterProps = {
  categories?: FooterCategoryLink[];
};

const emptyCategories: FooterCategoryLink[] = [];

const baseFooterGroups = [
  {
    title: "Products",
    links: [
      { label: "All Products", href: "/products" },
      { label: "Featured Products", href: "/products?sort=featured" },
    ],
  },
  {
    title: "Divisions",
    links: [
      { label: "Rox Fitness", href: "/rox-fitness" },
      { label: "Nex Games", href: "/nex-games" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/#about" },
      { label: "Contact", href: "/#contact" },
      { label: "Wholesale Supply", href: "/products" },
    ],
  },
];

const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "LinkedIn", href: "#" },
];

function getDivisionPath(division: BrandDivision) {
  return division === "rox-fitness" ? "/rox-fitness" : "/nex-games";
}

export function SiteFooter({ categories = emptyCategories }: SiteFooterProps) {
  const categoryLinks = categories.slice(0, 6).map((category) => ({
    label: category.name,
    href: `${getDivisionPath(category.brandDivision)}?category=${category.slug}`,
  }));
  const footerGroups = categoryLinks.length
    ? [
        ...baseFooterGroups,
        {
          title: "Categories",
          links: categoryLinks,
        },
      ]
    : baseFooterGroups;

  return (
    <footer
      className="border-t border-[var(--color-border)] bg-[var(--color-surface)]"
      id="footer-contact"
    >
      <Container className="grid gap-10 py-12 lg:grid-cols-[1.1fr_1.4fr]">
        <div className="space-y-5">
          <BrandMark />
          <p className="max-w-md text-sm leading-6 text-[var(--color-muted)]">
            Premium wholesale sports product showcase for Rox Fitness and Nex
            Games buyers.
          </p>
          <div className="space-y-2 text-sm text-[var(--color-muted)]">
            <p className="font-bold text-[var(--color-text)]">Contact information</p>
            <p>Email: add business email</p>
            <p>Phone: add business phone</p>
            <p>Location: add business address</p>
          </div>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {footerGroups.map((group) => (
            <div className="space-y-4" key={group.title}>
              <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]">
                {group.title}
              </h2>
              <nav aria-label={`${group.title} footer links`} className="grid gap-3">
                {group.links.map((link) => (
                  <a
                    className="text-sm font-semibold text-[var(--color-muted)] transition hover:text-[var(--color-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--color-accent)]"
                    href={link.href}
                    key={link.label}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          ))}
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]">
              Social
            </h2>
            <div className="grid gap-3">
              {socialLinks.map((link) => (
                <a
                  className="text-sm font-semibold text-[var(--color-muted)] transition hover:text-[var(--color-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--color-accent)]"
                  href={link.href}
                  key={link.label}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-[var(--color-border)] pt-6 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)] lg:col-span-2">
          Copyright 2026 Rox & Nex. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
