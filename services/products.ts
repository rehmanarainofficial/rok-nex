import "server-only";

import { connectToDatabase } from "@/lib/mongodb";
import { validateProductInput, type ProductInput } from "@/lib/validation/catalog";
import { ProductModel } from "@/models/product";
import type { BrandDivision, Product, ProductSort, StockStatus } from "@/types/product";

type ProductQuery = {
  brandDivision?: BrandDivision;
  category?: string;
  categoryValues?: string[];
  featured?: boolean;
  active?: boolean;
  limit?: number;
  page?: number;
  perPage?: number;
  search?: string;
  sort?: ProductSort;
  stockStatus?: StockStatus;
};

type ProductDocumentWithId = {
  _id: { toString: () => string };
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
  featured: boolean;
  active: boolean;
  images: Product["images"];
  thumbnail: string;
  specifications: Product["specifications"];
  tags: string[];
  badge?: string;
  sortOrder: number;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: Date;
  updatedAt: Date;
};

function serializeProduct(product: ProductDocumentWithId): Product {
  return {
    id: product._id.toString(),
    name: product.name,
    slug: product.slug,
    shortDescription: product.shortDescription,
    description: product.description,
    brandDivision: product.brandDivision,
    category: product.category,
    subcategory: product.subcategory,
    sku: product.sku,
    regularPrice: product.regularPrice,
    salePrice: product.salePrice,
    priceDisplay: product.priceDisplay,
    stockQuantity: product.stockQuantity,
    stockStatus: product.stockStatus,
    featured: product.featured,
    active: product.active,
    images: product.images,
    thumbnail: product.thumbnail,
    specifications: product.specifications,
    tags: product.tags,
    badge: product.badge,
    sortOrder: product.sortOrder,
    seoTitle: product.seoTitle,
    seoDescription: product.seoDescription,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
}

function getProductFilters(query: ProductQuery) {
  const categoryValues =
    query.categoryValues?.filter(Boolean) ??
    (query.category ? [query.category] : undefined);
  const filters: Record<string, unknown> = {
    ...(typeof query.active === "boolean" ? { active: query.active } : {}),
    ...(query.brandDivision ? { brandDivision: query.brandDivision } : {}),
    ...(categoryValues?.length ? { category: { $in: categoryValues } } : {}),
    ...(query.stockStatus ? { stockStatus: query.stockStatus } : {}),
    ...(typeof query.featured === "boolean" ? { featured: query.featured } : {}),
  };

  if (query.search) {
    filters.$or = [
      { name: { $regex: query.search, $options: "i" } },
      { sku: { $regex: query.search, $options: "i" } },
      { category: { $regex: query.search, $options: "i" } },
      { tags: { $regex: query.search, $options: "i" } },
    ];
  }

  return filters;
}

function getSort(sort: ProductSort = "featured"): Record<string, 1 | -1> {
  switch (sort) {
    case "newest":
      return { createdAt: -1, updatedAt: -1 };
    case "price-asc":
      return { regularPrice: 1, name: 1 };
    case "price-desc":
      return { regularPrice: -1, name: 1 };
    case "name":
      return { name: 1 };
    case "featured":
    default:
      return { featured: -1, sortOrder: 1, updatedAt: -1 };
  }
}

export async function getProducts(query: ProductQuery = {}) {
  await connectToDatabase();

  const filters = getProductFilters(query);
  const productQuery = ProductModel.find(filters)
    .sort(getSort(query.sort))
    .lean<ProductDocumentWithId[]>();

  if (query.limit) {
    productQuery.limit(query.limit);
  }

  if (query.page && query.perPage) {
    productQuery.skip((query.page - 1) * query.perPage).limit(query.perPage);
  }

  const products = await productQuery.exec();

  return products.map(serializeProduct);
}

export async function getProductCatalog(query: ProductQuery = {}) {
  await connectToDatabase();

  const page = Math.max(1, query.page ?? 1);
  const perPage = Math.min(48, Math.max(1, query.perPage ?? 12));
  const filters = getProductFilters(query);
  const [products, total] = await Promise.all([
    ProductModel.find(filters)
      .sort(getSort(query.sort))
      .skip((page - 1) * perPage)
      .limit(perPage)
      .lean<ProductDocumentWithId[]>()
      .exec(),
    ProductModel.countDocuments(filters).exec(),
  ]);

  return {
    page,
    perPage,
    products: products.map(serializeProduct),
    total,
    totalPages: Math.max(1, Math.ceil(total / perPage)),
  };
}

export async function getProductBySlug(slug: string) {
  await connectToDatabase();

  const product = await ProductModel.findOne({ slug, active: true })
    .lean<ProductDocumentWithId | null>()
    .exec();

  return product ? serializeProduct(product) : null;
}

export async function getProductById(id: string) {
  await connectToDatabase();

  const product = await ProductModel.findById(id)
    .lean<ProductDocumentWithId | null>()
    .exec();

  return product ? serializeProduct(product) : null;
}

export async function createProduct(input: unknown) {
  const validation = validateProductInput(input);

  if (!validation.success) {
    return validation;
  }

  await connectToDatabase();

  const product = await ProductModel.create(validation.data satisfies ProductInput);

  return {
    success: true as const,
    data: serializeProduct(product.toObject() as ProductDocumentWithId),
  };
}

export async function updateProduct(id: string, input: unknown) {
  const validation = validateProductInput(input);

  if (!validation.success) {
    return validation;
  }

  await connectToDatabase();

  const product = await ProductModel.findByIdAndUpdate(id, validation.data, {
    new: true,
    runValidators: true,
  })
    .lean<ProductDocumentWithId | null>()
    .exec();

  if (!product) {
    return { success: false as const, errors: ["Product not found."] };
  }

  return { success: true as const, data: serializeProduct(product) };
}

export async function deleteProduct(id: string) {
  await connectToDatabase();
  await ProductModel.findByIdAndDelete(id).exec();
}

export async function setProductActive(id: string, active: boolean) {
  await connectToDatabase();
  await ProductModel.findByIdAndUpdate(id, { active }, { runValidators: true }).exec();
}

export async function setProductFeatured(id: string, featured: boolean) {
  await connectToDatabase();
  await ProductModel.findByIdAndUpdate(id, { featured }, { runValidators: true }).exec();
}

export async function getProductStats() {
  await connectToDatabase();

  const [
    totalProducts,
    roxFitnessProducts,
    nexGamesProducts,
    inStock,
    lowStock,
    outOfStock,
  ] = await Promise.all([
    ProductModel.countDocuments({}).exec(),
    ProductModel.countDocuments({ brandDivision: "rox-fitness" }).exec(),
    ProductModel.countDocuments({ brandDivision: "nex-games" }).exec(),
    ProductModel.countDocuments({ stockStatus: "in-stock" }).exec(),
    ProductModel.countDocuments({ stockStatus: "low-stock" }).exec(),
    ProductModel.countDocuments({ stockStatus: "out-of-stock" }).exec(),
  ]);

  return {
    totalProducts,
    roxFitnessProducts,
    nexGamesProducts,
    inStock,
    lowStock,
    outOfStock,
  };
}
