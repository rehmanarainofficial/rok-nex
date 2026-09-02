"use client";

import { Send } from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";

import type { Inquiry } from "@/types/product";

type InquiryFormProps = {
  productInterest?: string;
  productSlug?: string;
  source?: Inquiry["source"];
  whatsappNumber: string;
};

function getFormValue(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function createWhatsAppUrl(phone: string, message: string) {
  const digits = phone.replace(/\D/g, "");

  return digits ? `https://wa.me/${digits}?text=${encodeURIComponent(message)}` : "";
}

export function InquiryForm({
  productInterest = "",
  productSlug,
  source = "contact-page",
  whatsappNumber,
}: InquiryFormProps) {
  const [error, setError] = useState("");
  const [isSending, setIsSending] = useState(false);
  const whatsAppBaseUrl = useMemo(
    () => createWhatsAppUrl(whatsappNumber, ""),
    [whatsappNumber],
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = getFormValue(formData, "name");
    const phone = getFormValue(formData, "phone");
    const message = getFormValue(formData, "message");

    if (!name || !phone || !message) {
      setError("Name, phone, and message are required.");
      return;
    }

    if (!whatsAppBaseUrl) {
      setError("WhatsApp number is not configured.");
      return;
    }

    const company = getFormValue(formData, "companyName");
    const email = getFormValue(formData, "email");
    const interest = getFormValue(formData, "productInterest");
    const inquiryText = [
      "Rox & Nex Inquiry",
      `Name: ${name}`,
      company ? `Company: ${company}` : "",
      `Phone: ${phone}`,
      email ? `Email: ${email}` : "",
      interest ? `Product Interest: ${interest}` : "",
      productSlug ? `Product: ${productSlug}` : "",
      `Source: ${source}`,
      "",
      `Message: ${message}`,
    ]
      .filter(Boolean)
      .join("\n");
    const url = createWhatsAppUrl(whatsappNumber, inquiryText);

    setError("");
    setIsSending(true);
    window.open(url, "_blank", "noopener,noreferrer");
    window.setTimeout(() => setIsSending(false), 600);
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {error}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-[var(--color-muted)]">
          Name
          <input name="name" required />
        </label>
        <label className="grid gap-2 text-sm font-bold text-[var(--color-muted)]">
          Company Name
          <input name="companyName" />
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-[var(--color-muted)]">
          Phone
          <input name="phone" required />
        </label>
        <label className="grid gap-2 text-sm font-bold text-[var(--color-muted)]">
          Email
          <input name="email" type="email" />
        </label>
      </div>
      <label className="grid gap-2 text-sm font-bold text-[var(--color-muted)]">
        Product Interest
        <input defaultValue={productInterest} name="productInterest" />
      </label>
      <label className="grid gap-2 text-sm font-bold text-[var(--color-muted)]">
        Message
        <textarea name="message" required />
      </label>
      <button
        className="inline-flex h-12 w-fit items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-[var(--color-accent)] px-6 text-sm font-bold text-white shadow-[var(--shadow-red)] transition hover:bg-[var(--color-accent-strong)] disabled:pointer-events-none disabled:opacity-60"
        disabled={isSending}
        type="submit"
      >
        <Send aria-hidden="true" size={17} />
        {isSending ? "Opening WhatsApp..." : "Send on WhatsApp"}
      </button>
    </form>
  );
}
