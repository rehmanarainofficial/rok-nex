import type {
  BrandDivision,
  ProductImage,
  ProductSpecification,
  StockStatus,
} from "@/types/product";

const brandDivisions = ["rox-fitness", "nex-games"] as const satisfies BrandDivision[];
const stockStatuses = ["in-stock", "low-stock", "out-of-stock"] as const satisfies StockStatus[];

type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; errors: string[] };

export type ProductInput = {
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  brandDivision: BrandDivision;
  category: string;
  subcategory?: string;
  sku?: string;
  regularPrice: number;
  salePrice?: number;
  priceDisplay?: string;
  stockQuantity: number;
  stockStatus: StockStatus;
  featured?: boolean;
  active?: boolean;
  images?: ProductImage[];
  thumbnail: string;
  specifications?: ProductSpecification[];
  tags?: string[];
  badge?: string;
  sortOrder?: number;
  seoTitle?: string;
  seoDescription?: string;
};

export type CategoryInput = {
  name: string;
  slug: string;
  description: string;
  image: string;
  brandDivision: BrandDivision;
  active?: boolean;
  sortOrder?: number;
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readString(
  source: Record<string, unknown>,
  key: string,
  errors: string[],
  options: { required?: boolean; maxLength?: number } = {},
) {
  const value = source[key];

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

function readNumber(source: Record<string, unknown>, key: string, errors: string[]) {
  const value = source[key];

  if (typeof value !== "number" || Number.isNaN(value)) {
    errors.push(`${key} must be a number.`);
    return undefined;
  }

  if (value < 0) {
    errors.push(`${key} cannot be negative.`);
  }

  return value;
}

function readBoolean(source: Record<string, unknown>, key: string) {
  return typeof source[key] === "boolean" ? source[key] : undefined;
}

function readStringArray(source: Record<string, unknown>, key: string) {
  const value = source[key];

  if (!Array.isArray(value)) {
    return undefined;
  }

  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
}

function readSpecifications(source: Record<string, unknown>) {
  const value = source.specifications;

  if (!Array.isArray(value)) {
    return undefined;
  }

  return value
    .filter(isPlainObject)
    .map((item) => ({
      label: typeof item.label === "string" ? item.label.trim() : "",
      value: typeof item.value === "string" ? item.value.trim() : "",
    }))
    .filter((item) => item.label && item.value);
}

function readImages(source: Record<string, unknown>) {
  const value = source.images;

  if (!Array.isArray(value)) {
    return undefined;
  }

  return value
    .filter(isPlainObject)
    .map((item) => ({
      url: typeof item.url === "string" ? item.url.trim() : "",
      alt: typeof item.alt === "string" ? item.alt.trim() : "",
      sortOrder: typeof item.sortOrder === "number" ? item.sortOrder : 0,
    }))
    .filter((item) => item.url && item.alt);
}

export function validateProductInput(input: unknown): ValidationResult<ProductInput> {
  const errors: string[] = [];

  if (!isPlainObject(input)) {
    return { success: false, errors: ["Product input must be an object."] };
  }

  const name = readString(input, "name", errors);
  const slug = readString(input, "slug", errors);
  const shortDescription = readString(input, "shortDescription", errors, {
    maxLength: 220,
  });
  const description = readString(input, "description", errors);
  const category = readString(input, "category", errors);
  const thumbnail = readString(input, "thumbnail", errors);
  const regularPrice = readNumber(input, "regularPrice", errors);
  const stockQuantity = readNumber(input, "stockQuantity", errors);
  const brandDivision = input.brandDivision;
  const stockStatus = input.stockStatus;

  if (!brandDivisions.includes(brandDivision as BrandDivision)) {
    errors.push("brandDivision must be rox-fitness or nex-games.");
  }

  if (!stockStatuses.includes(stockStatus as StockStatus)) {
    errors.push("stockStatus must be in-stock, low-stock, or out-of-stock.");
  }

  if (typeof input.salePrice === "number" && input.salePrice < 0) {
    errors.push("salePrice cannot be negative.");
  }

  if (
    typeof input.salePrice === "number" &&
    regularPrice !== undefined &&
    input.salePrice > regularPrice
  ) {
    errors.push("salePrice cannot be greater than regularPrice.");
  }

  if (
    errors.length > 0 ||
    !name ||
    !slug ||
    !shortDescription ||
    !description ||
    !category ||
    !thumbnail ||
    regularPrice === undefined ||
    stockQuantity === undefined
  ) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      name,
      slug,
      shortDescription,
      description,
      brandDivision: brandDivision as BrandDivision,
      category,
      subcategory: readString(input, "subcategory", errors, { required: false }),
      sku: readString(input, "sku", errors, { required: false }),
      regularPrice,
      salePrice: typeof input.salePrice === "number" ? input.salePrice : undefined,
      priceDisplay: readString(input, "priceDisplay", errors, { required: false }),
      stockQuantity,
      stockStatus: stockStatus as StockStatus,
      featured: readBoolean(input, "featured") ?? false,
      active: readBoolean(input, "active") ?? true,
      images: readImages(input) ?? [],
      thumbnail,
      specifications: readSpecifications(input) ?? [],
      tags: readStringArray(input, "tags") ?? [],
      badge: readString(input, "badge", errors, { required: false }),
      sortOrder: typeof input.sortOrder === "number" ? input.sortOrder : 0,
      seoTitle: readString(input, "seoTitle", errors, { required: false }),
      seoDescription: readString(input, "seoDescription", errors, {
        required: false,
        maxLength: 180,
      }),
    },
  };
}

export function validateCategoryInput(input: unknown): ValidationResult<CategoryInput> {
  const errors: string[] = [];

  if (!isPlainObject(input)) {
    return { success: false, errors: ["Category input must be an object."] };
  }

  const name = readString(input, "name", errors);
  const slug = readString(input, "slug", errors);
  const description = readString(input, "description", errors);
  const image = readString(input, "image", errors);
  const brandDivision = input.brandDivision;

  if (!brandDivisions.includes(brandDivision as BrandDivision)) {
    errors.push("brandDivision must be rox-fitness or nex-games.");
  }

  if (errors.length > 0 || !name || !slug || !description || !image) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      name,
      slug,
      description,
      image,
      brandDivision: brandDivision as BrandDivision,
      active: readBoolean(input, "active") ?? true,
      sortOrder: typeof input.sortOrder === "number" ? input.sortOrder : 0,
    },
  };
}
