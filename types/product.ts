export type ProductDivisionId = "rox-fitness" | "nex-games";

export type ProductDivision = {
  id: ProductDivisionId;
  name: string;
  eyebrow: string;
  description: string;
  productFocus: string[];
};

export type StockStatus = "in-stock" | "low-stock" | "out-of-stock" | "on-request";

export type ProductSpecification = {
  label: string;
  value: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  division: ProductDivisionId;
  sku: string;
  description: string;
  wholesalePrice: number;
  currency: string;
  stockStatus: StockStatus;
  stockQuantity?: number;
  specifications: ProductSpecification[];
  imageUrls: string[];
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
};
