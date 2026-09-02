import { MessageCircle } from "lucide-react";
import type { ReactNode, SVGProps } from "react";

import { getPublicSiteSettings } from "@/services/site-settings";

function createWhatsAppUrl(phone: string) {
  const digits = phone.replace(/\D/g, "");

  return digits ? `https://wa.me/${digits}` : "";
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" {...props}>
      <rect height="16" rx="5" stroke="currentColor" strokeWidth="2" width="16" x="4" y="4" />
      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="2" />
      <circle cx="17" cy="7" fill="currentColor" r="1.2" />
    </svg>
  );
}

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" {...props}>
      <path
        d="M14 8.4h2.2V5.2A12.4 12.4 0 0 0 13 5c-3.1 0-5.1 1.8-5.1 5v2.8H4.6v3.6h3.3V23h4v-6.6h3.3l.5-3.6h-3.8v-2.4c0-1 .3-2 2.1-2Z"
        fill="currentColor"
      />
    </svg>
  );
}

function SecondarySocial({
  children,
  href,
  label,
}: {
  children: ReactNode;
  href: string;
  label: string;
}) {
  if (!href) {
    return (
      <span
        aria-label={`${label} link not configured`}
        className="grid size-10 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-card-solid)] text-[var(--color-muted)] opacity-55 shadow-[var(--shadow-soft)]"
        role="img"
      >
        {children}
      </span>
    );
  }

  return (
    <a
      aria-label={label}
      className="grid size-10 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-card-solid)] text-[var(--color-text)] shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:text-[var(--color-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      {children}
    </a>
  );
}

export async function FloatingSocials() {
  const settings = await getPublicSiteSettings();
  const whatsappUrl = createWhatsAppUrl(settings.whatsapp || settings.phone);
  const instagramUrl = settings.instagram || "https://www.instagram.com/";
  const facebookUrl = settings.facebook || "https://www.facebook.com/";

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
      <div className="flex flex-col gap-2">
        <SecondarySocial href={instagramUrl} label="Instagram">
          <InstagramIcon className="size-[18px]" />
        </SecondarySocial>
        <SecondarySocial href={facebookUrl} label="Facebook">
          <FacebookIcon className="size-[18px]" />
        </SecondarySocial>
      </div>
      {whatsappUrl ? (
        <a
          aria-label="Chat on WhatsApp"
          className="floating-whatsapp grid size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_18px_42px_rgba(37,211,102,0.36)] transition hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25d366]"
          href={whatsappUrl}
          rel="noreferrer"
          target="_blank"
        >
          <MessageCircle aria-hidden="true" size={25} />
        </a>
      ) : null}
    </div>
  );
}
