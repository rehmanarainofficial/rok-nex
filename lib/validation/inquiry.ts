export type InquiryInput = {
  name: string;
  companyName?: string;
  phone: string;
  email?: string;
  productInterest?: string;
  message: string;
  source: "contact-page" | "product-page";
  productSlug?: string;
};

type ValidationResult =
  | { success: true; data: InquiryInput }
  | { success: false; errors: string[] };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readString(
  input: Record<string, unknown>,
  key: string,
  errors: string[],
  options: { maxLength?: number; required?: boolean } = {},
) {
  const value = input[key];

  if (typeof value !== "string" || value.trim().length === 0) {
    if (options.required !== false) {
      errors.push(`${key} is required.`);
    }

    return undefined;
  }

  const trimmed = value.trim();

  if (options.maxLength && trimmed.length > options.maxLength) {
    errors.push(`${key} must be ${options.maxLength} characters or less.`);
  }

  return trimmed;
}

export function validateInquiryInput(input: unknown): ValidationResult {
  const errors: string[] = [];

  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    return { success: false, errors: ["Inquiry input must be an object."] };
  }

  const sourceInput = input as Record<string, unknown>;
  const name = readString(sourceInput, "name", errors, { maxLength: 90 });
  const phone = readString(sourceInput, "phone", errors, { maxLength: 40 });
  const message = readString(sourceInput, "message", errors, { maxLength: 1200 });
  const email = readString(sourceInput, "email", errors, {
    maxLength: 120,
    required: false,
  })?.toLowerCase();
  const companyName = readString(sourceInput, "companyName", errors, {
    maxLength: 120,
    required: false,
  });
  const productInterest = readString(sourceInput, "productInterest", errors, {
    maxLength: 180,
    required: false,
  });
  const productSlug = readString(sourceInput, "productSlug", errors, {
    maxLength: 160,
    required: false,
  })?.toLowerCase();
  let source: InquiryInput["source"] | undefined;

  if (email && !emailPattern.test(email)) {
    errors.push("email must be a valid email address.");
  }

  if (sourceInput.source === "contact-page" || sourceInput.source === "product-page") {
    source = sourceInput.source;
  } else {
    errors.push("source is invalid.");
  }

  if (!name || !phone || !message || !source || errors.length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      name,
      phone,
      message,
      source,
      companyName,
      email,
      productInterest,
      productSlug,
    },
  };
}
