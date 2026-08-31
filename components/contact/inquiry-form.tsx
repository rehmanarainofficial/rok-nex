"use client";

import { Send } from "lucide-react";
import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";

import { submitInquiryAction, type InquiryFormState } from "@/app/contact/actions";
import type { Inquiry } from "@/types/product";

type InquiryFormProps = {
  productInterest?: string;
  productSlug?: string;
  source?: Inquiry["source"];
};

const initialState: InquiryFormState = {};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-[var(--color-accent)] px-6 text-sm font-bold text-white shadow-[var(--shadow-red)] transition hover:bg-[var(--color-accent-strong)] disabled:pointer-events-none disabled:opacity-60"
      disabled={pending}
      type="submit"
    >
      <Send aria-hidden="true" size={17} />
      {pending ? "Sending..." : "Send Inquiry"}
    </button>
  );
}

export function InquiryForm({
  productInterest = "",
  productSlug,
  source = "contact-page",
}: InquiryFormProps) {
  const [state, formAction] = useActionState(submitInquiryAction, initialState);
  const [startedAt] = useState(() => Date.now());

  return (
    <form action={formAction} className="grid gap-4">
      {state.error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {state.error}
        </div>
      ) : null}
      {state.success ? (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
          {state.success}
        </div>
      ) : null}

      <input name="source" type="hidden" value={source} />
      <input name="productSlug" type="hidden" value={productSlug ?? ""} />
      <input name="startedAt" type="hidden" value={startedAt} />
      <label className="sr-only" htmlFor="website">
        Website
      </label>
      <input
        autoComplete="off"
        className="hidden"
        id="website"
        name="website"
        tabIndex={-1}
      />

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
      <SubmitButton />
    </form>
  );
}
