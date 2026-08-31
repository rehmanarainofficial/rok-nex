import type { SiteSettings } from "@/types/product";

export type SiteSettingsInput = Omit<SiteSettings, "id" | "createdAt" | "updatedAt">;

type ValidationResult =
  | { success: true; data: SiteSettingsInput }
  | { success: false; errors: string[] };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const urlPattern = /^(https?:\/\/|\/)[^\s]+$/;

function readString(
  input: Record<string, unknown>,
  key: keyof SiteSettingsInput,
  errors: string[],
  options: { maxLength: number; required?: boolean; url?: boolean; email?: boolean },
) {
  const value = input[key];

  if (typeof value !== "string" || value.trim().length === 0) {
    if (options.required) {
      errors.push(`${key} is required.`);
    }

    return "";
  }

  const trimmed = value.trim();

  if (trimmed.length > options.maxLength) {
    errors.push(`${key} must be ${options.maxLength} characters or less.`);
  }

  if (options.email && !emailPattern.test(trimmed)) {
    errors.push(`${key} must be a valid email address.`);
  }

  if (options.url && !urlPattern.test(trimmed)) {
    errors.push(`${key} must be a valid URL or site path.`);
  }

  return options.email ? trimmed.toLowerCase() : trimmed;
}

export function validateSiteSettingsInput(input: unknown): ValidationResult {
  const errors: string[] = [];

  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    return { success: false, errors: ["Site settings input must be an object."] };
  }

  const source = input as Record<string, unknown>;
  const data: SiteSettingsInput = {
    businessName: readString(source, "businessName", errors, {
      maxLength: 100,
      required: true,
    }),
    logoText: readString(source, "logoText", errors, { maxLength: 60 }),
    favicon: readString(source, "favicon", errors, { maxLength: 300, url: true }),
    phone: readString(source, "phone", errors, { maxLength: 50 }),
    whatsapp: readString(source, "whatsapp", errors, { maxLength: 80 }),
    email: readString(source, "email", errors, { maxLength: 120, email: true }),
    address: readString(source, "address", errors, { maxLength: 240 }),
    businessHours: readString(source, "businessHours", errors, { maxLength: 160 }),
    facebook: readString(source, "facebook", errors, { maxLength: 300, url: true }),
    instagram: readString(source, "instagram", errors, { maxLength: 300, url: true }),
    linkedin: readString(source, "linkedin", errors, { maxLength: 300, url: true }),
    youtube: readString(source, "youtube", errors, { maxLength: 300, url: true }),
    footerText: readString(source, "footerText", errors, { maxLength: 280 }),
    homepageSeoTitle: readString(source, "homepageSeoTitle", errors, {
      maxLength: 70,
    }),
    homepageSeoDescription: readString(source, "homepageSeoDescription", errors, {
      maxLength: 170,
    }),
    defaultSeoImage: readString(source, "defaultSeoImage", errors, {
      maxLength: 300,
      url: true,
    }),
  };

  if (errors.length) {
    return { success: false, errors };
  }

  return { success: true, data };
}
