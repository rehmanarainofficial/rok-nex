import { BrandMark } from "@/components/layout/brand-mark";
import { Container } from "@/components/ui/container";
import { getPublicSiteSettings } from "@/services/site-settings";
import type { BrandDivision } from "@/types/product";
import { getCategoryPath } from "@/utilities/seo";

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
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Wholesale Supply", href: "/products" },
    ],
  },
];

const socialLinks = [
  { key: "instagram", label: "Instagram" },
  { key: "facebook", label: "Facebook" },
  { key: "linkedin", label: "LinkedIn" },
  { key: "youtube", label: "YouTube" },
] as const;

export async function SiteFooter({ categories = emptyCategories }: SiteFooterProps) {
  const settings = await getPublicSiteSettings();
  const categoryLinks = categories.slice(0, 6).map((category) => ({
    label: category.name,
    href: getCategoryPath(category.slug),
  }));
  const visibleSocialLinks = socialLinks
    .map((link) => ({
      label: link.label,
      href: settings[link.key],
    }))
    .filter((link) => link.href);
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
            {settings.footerText}
          </p>
          <div className="space-y-2 text-sm text-[var(--color-muted)]">
            <p className="font-bold text-[var(--color-text)]">Contact information</p>
            <p>Email: {settings.email || "Add business email"}</p>
            <p>Phone: {settings.phone || "Add business phone"}</p>
            <p>WhatsApp: {settings.whatsapp || "Add WhatsApp number"}</p>
            <p>Location: {settings.address || "Add business address"}</p>
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
              {visibleSocialLinks.length ? (
                visibleSocialLinks.map((link) => (
                  <a
                    className="text-sm font-semibold text-[var(--color-muted)] transition hover:text-[var(--color-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--color-accent)]"
                    href={link.href}
                    key={link.label}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {link.label}
                  </a>
                ))
              ) : (
                <p className="text-sm font-semibold text-[var(--color-muted)]">
                  Add social links
                </p>
              )}
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
