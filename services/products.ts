import "server-only";

import { connectToDatabase } from "@/lib/mongodb";
import { ProductModel } from "@/models/product";
import type { Product, ProductDivisionId } from "@/types/product";

type ProductQuery = {
  division?: ProductDivisionId;
  featured?: boolean;
};

function serializeProduct(product: ProductDocumentWithId): Product {
  return {
    id: product._id.toString(),
    slug: product.slug,
    name: product.name,
    division: product.division,
    sku: product.sku,
    description: product.description,
    wholesalePrice: product.wholesalePrice,
    currency: product.currency,
    stockStatus: product.stockStatus,
    stockQuantity: product.stockQuantity,
    specifications: product.specifications,
    imageUrls: product.imageUrls,
    isFeatured: product.isFeatured,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
}

type ProductDocumentWithId = {
  _id: { toString: () => string };
  slug: string;
  name: string;
  division: ProductDivisionId;
  sku: string;
  description: string;
  wholesalePrice: number;
  currency: string;
  stockStatus: Product["stockStatus"];
  stockQuantity?: number;
  specifications: Product["specifications"];
  imageUrls: string[];
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export async function getProducts(query: ProductQuery = {}) {
  await connectToDatabase();

  const filters = {
    ...(query.division ? { division: query.division } : {}),
    ...(typeof query.featured === "boolean" ? { isFeatured: query.featured } : {}),
  };

  const products = await ProductModel.find(filters)
    .sort({ isFeatured: -1, updatedAt: -1 })
    .lean<ProductDocumentWithId[]>()
    .exec();

  return products.map(serializeProduct);
}

export async function getProductBySlug(slug: string) {
  await connectToDatabase();

  const product = await ProductModel.findOne({ slug })
    .lean<ProductDocumentWithId | null>()
    .exec();

  return product ? serializeProduct(product) : null;
}
