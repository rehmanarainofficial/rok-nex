export type ProductDivisionId = "rox-fitness" | "nex-games";

export type BrandDivision = ProductDivisionId;

export type ProductDivision = {
  id: ProductDivisionId;
  name: string;
  eyebrow: string;
  description: string;
  productFocus: string[];
};

export type StockStatus = "in-stock" | "low-stock" | "out-of-stock";

export type ProductSort = "featured" | "newest" | "price-asc" | "price-desc" | "name";

export type ProductSpecification = {
  label: string;
  value: string;
};

export type ProductImage = {
  url: string;
  alt: string;
  sortOrder?: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
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
  featured: boolean;
  active: boolean;
  images: ProductImage[];
  thumbnail: string;
  specifications: ProductSpecification[];
  tags: string[];
  badge?: string;
  sortOrder: number;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Inquiry = {
  id: string;
  name: string;
  companyName?: string;
  phone: string;
  email?: string;
  productInterest?: string;
  message: string;
  source: "contact-page" | "product-page";
  productSlug?: string;
  status: "new" | "read" | "archived";
  createdAt: Date;
  updatedAt: Date;
};

export type ProductSummary = Pick<
  Product,
  | "slug"
  | "name"
  | "shortDescription"
  | "brandDivision"
  | "category"
  | "regularPrice"
  | "salePrice"
  | "priceDisplay"
  | "stockQuantity"
  | "stockStatus"
  | "thumbnail"
  | "badge"
>;

export type Category = {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  brandDivision: BrandDivision;
  active: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
};
