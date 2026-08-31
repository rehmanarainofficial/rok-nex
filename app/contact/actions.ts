"use server";

import { createInquiry } from "@/services/inquiries";
import type { Inquiry } from "@/types/product";

export type InquiryFormState = {
  error?: string;
  success?: string;
};

function readText(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function submitInquiryAction(
  _previousState: InquiryFormState,
  formData: FormData,
): Promise<InquiryFormState> {
  const startedAt = Number(formData.get("startedAt"));
  const honeypot = readText(formData, "website");

  if (honeypot) {
    return {
      success: "Thanks. Your inquiry has been received.",
    };
  }

  if (!Number.isFinite(startedAt) || Date.now() - startedAt < 1200) {
    return {
      error: "Please wait a moment and submit again.",
    };
  }

  try {
    const result = await createInquiry({
      name: readText(formData, "name"),
      companyName: readText(formData, "companyName") || undefined,
      phone: readText(formData, "phone"),
      email: readText(formData, "email") || undefined,
      productInterest: readText(formData, "productInterest") || undefined,
      message: readText(formData, "message"),
      source: (readText(formData, "source") || "contact-page") as Inquiry["source"],
      productSlug: readText(formData, "productSlug") || undefined,
    });

    if (!result.success) {
      return {
        error: result.errors.join(" "),
      };
    }

    return {
      success: "Thanks. Your inquiry has been received.",
    };
  } catch {
    return {
      error: "Unable to submit inquiry right now.",
    };
  }
}
