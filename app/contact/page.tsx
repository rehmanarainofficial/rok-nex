import { Clock, Mail, MapPin, MessageCircle, Phone, Share2 } from "lucide-react";
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
  description: "Send a wholesale product inquiry to Rox & Nex.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Rox & Nex",
    description: "Send wholesale product requirements or catalog inquiries to Rox & Nex.",
    url: "/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Rox & Nex",
    description: "Contact Rox & Nex for wholesale product inquiries.",
  },
};

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const [categories, settings] = await Promise.all([
    getPublicCategories(),
    getPublicSiteSettings(),
  ]);
  const contactItems = [
    { icon: Phone, label: "Phone", value: settings.phone || "Add business phone" },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: settings.whatsapp || "Add WhatsApp number",
    },
    { icon: Mail, label: "Email", value: settings.email || "Add business email" },
    { icon: MapPin, label: "Address", value: settings.address || "Add business address" },
    {
      icon: Clock,
      label: "Business Hours",
      value: settings.businessHours || "Add business hours",
    },
    {
      icon: Share2,
      label: "Social Media",
      value:
        [settings.facebook, settings.instagram, settings.linkedin, settings.youtube]
          .filter(Boolean)
          .join(" | ") || "Add social links",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader categories={categories} />
      <main className="flex-1 overflow-hidden">
        <section className="border-b border-[var(--color-border)] py-[var(--section-spacing)]">
          <Container className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <ScrollReveal>
              <SectionHeading
                description="Use the inquiry form for wholesale requirements, product interest, availability questions, or catalog follow-up."
                eyebrow="Contact Rox & Nex"
                title="Start a wholesale conversation."
              />
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <p className="max-w-2xl text-lg leading-8 text-[var(--color-muted)]">
                Contact details are managed from the admin settings page, so the
                public website can stay current without code changes.
              </p>
            </ScrollReveal>
          </Container>
        </section>

        <section className="py-[var(--section-spacing)]">
          <Container className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
            <ScrollReveal>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {contactItems.map((item) => (
                  <Card className="p-5" key={item.label}>
                    <div className="flex gap-4">
                      <span className="grid size-11 place-items-center rounded-[var(--radius-pill)] bg-[var(--color-red-glow)] text-[var(--color-accent)]">
                        <item.icon aria-hidden="true" size={19} />
                      </span>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                          {item.label}
                        </p>
                        <p className="mt-1 font-semibold text-[var(--color-text)]">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal delay={130}>
              <Card className="p-5 sm:p-7">
                <InquiryForm source="contact-page" />
              </Card>
            </ScrollReveal>
          </Container>
        </section>
      </main>
      <SiteFooter categories={categories} />
    </div>
  );
}
