import { Mail, MessageCircle, Phone } from "lucide-react";
import type { Metadata } from "next";

import { InquiryForm } from "@/components/contact/inquiry-form";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getPublicCategories } from "@/services/public-navigation";
import { getPublicSiteSettings } from "@/services/site-settings";

export const metadata: Metadata = {
  title: "Contact Rox & Nex",
  description: "Send a product inquiry to Rox & Nex.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Rox & Nex",
    description: "Send product requirements or catalog inquiries to Rox & Nex.",
    url: "/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Rox & Nex",
    description: "Contact Rox & Nex for product inquiries.",
  },
};

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const [categories, settings] = await Promise.all([
    getPublicCategories(),
    getPublicSiteSettings(),
  ]);
  const mapUrl = settings.address || "https://maps.app.goo.gl/JVh6kZQAeukm4evm9";
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(mapUrl)}&output=embed`;
  const contactItems = [
    {
      href: settings.phone ? `tel:${settings.phone.replace(/\s/g, "")}` : "",
      icon: Phone,
      label: "Phone",
      value: settings.phone || "Add business phone",
    },
    {
      href: settings.whatsapp
        ? `https://wa.me/${settings.whatsapp.replace(/\D/g, "")}`
        : "",
      icon: MessageCircle,
      label: "WhatsApp",
      value: settings.whatsapp || "Add WhatsApp number",
    },
    {
      href: settings.email ? `mailto:${settings.email}` : "",
      icon: Mail,
      label: "Email",
      value: settings.email || "Add business email",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 overflow-hidden">
        <section className="border-b border-[var(--color-border)] py-[var(--section-spacing)]">
          <Container className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
            <ScrollReveal>
              <SectionHeading
                description="Call, email, or send a product inquiry directly on WhatsApp."
                eyebrow="Contact Rox & Nex"
                title="Tell us what product you need."
              />
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <div className="grid gap-3 sm:grid-cols-3">
                {contactItems.map((item) => {
                  const content = (
                    <>
                      <span className="grid size-11 place-items-center rounded-full bg-[var(--color-red-glow)] text-[var(--color-accent)]">
                        <item.icon aria-hidden="true" size={19} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                          {item.label}
                        </span>
                        <span className="mt-1 block break-words font-semibold text-[var(--color-text)]">
                          {item.value}
                        </span>
                      </span>
                    </>
                  );

                  return item.href ? (
                    <a
                      className="flex min-h-28 gap-4 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-4 transition hover:-translate-y-0.5 hover:border-[var(--color-border-strong)]"
                      href={item.href}
                      key={item.label}
                      rel="noreferrer"
                      target={item.label === "WhatsApp" ? "_blank" : undefined}
                    >
                      {content}
                    </a>
                  ) : (
                    <div
                      className="flex min-h-28 gap-4 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-4"
                      key={item.label}
                    >
                      {content}
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>
          </Container>
        </section>

        <section className="py-[var(--section-spacing)]">
          <Container className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
            <ScrollReveal>
              <Card className="relative h-full overflow-hidden p-6 sm:p-8">
                <div className="absolute right-0 top-0 h-1/2 w-2/3 bg-[radial-gradient(circle_at_70%_30%,var(--color-red-glow),transparent_58%)]" />
                <div className="relative flex h-full flex-col justify-between gap-10">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-accent)]">
                      Quick inquiry
                    </p>
                    <h2 className="mt-5 font-display text-4xl font-normal leading-none text-[var(--color-text)] sm:text-5xl">
                      Your message opens in WhatsApp.
                    </h2>
                    <p className="mt-5 text-base leading-7 text-[var(--color-muted)]">
                      Fill the form once. We prepare the message with your
                      product interest and contact details.
                    </p>
                  </div>
                  <div className="grid gap-3 text-sm font-semibold text-[var(--color-muted)]">
                    <p className="flex items-center gap-3">
                      <MessageCircle className="text-[var(--color-accent)]" size={18} />
                      WhatsApp: {settings.whatsapp}
                    </p>
                    <p className="flex items-center gap-3">
                      <Mail className="text-[var(--color-accent)]" size={18} />
                      Email: {settings.email}
                    </p>
                  </div>
                </div>
              </Card>
            </ScrollReveal>
            <ScrollReveal delay={130}>
              <Card className="p-5 sm:p-7">
                <InquiryForm source="contact-page" whatsappNumber={settings.whatsapp} />
              </Card>
            </ScrollReveal>
          </Container>
        </section>

        <section className="pb-[var(--section-spacing)]">
          <Container>
            <Card className="overflow-hidden p-0">
              <div className="grid gap-0 lg:grid-cols-[0.75fr_1.25fr]">
                <div className="p-6 sm:p-8">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                    Location
                  </p>
                  <h2 className="mt-4 font-display text-3xl font-normal text-[var(--color-text)] sm:text-4xl">
                    Visit Rox & Nex
                  </h2>
                  <p className="mt-4 text-sm leading-6 text-[var(--color-muted)]">
                    Use the map for directions or open the location directly in
                    Google Maps.
                  </p>
                  <a
                    className="mt-6 inline-flex h-11 items-center justify-center rounded-[var(--radius-pill)] bg-[var(--color-accent)] px-5 text-sm font-bold text-white shadow-[var(--shadow-red)]"
                    href={mapUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Open Google Maps
                  </a>
                </div>
                <iframe
                  className="min-h-[22rem] w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={mapEmbedUrl}
                  title="Rox & Nex location map"
                />
              </div>
            </Card>
          </Container>
        </section>
      </main>
      <SiteFooter categories={categories} />
    </div>
  );
}
