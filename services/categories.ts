import "server-only";

import { connectToDatabase } from "@/lib/mongodb";
import { validateCategoryInput, type CategoryInput } from "@/lib/validation/catalog";
import { CategoryModel } from "@/models/category";
import { ProductModel } from "@/models/product";
import type { BrandDivision, Category } from "@/types/product";

type CategoryQuery = {
  brandDivision?: BrandDivision;
  active?: boolean;
};

type CategoryDocumentWithId = {
  _id: { toString: () => string };
  name: string;
  slug: string;
  description: string;
  image: string;
  brandDivision: BrandDivision;
  active: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
};

function serializeCategory(category: CategoryDocumentWithId): Category {
  return {
    id: category._id.toString(),
    name: category.name,
    slug: category.slug,
    description: category.description,
    image: category.image,
    brandDivision: category.brandDivision,
    active: category.active,
    sortOrder: category.sortOrder,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt,
  };
}

export async function getCategories(query: CategoryQuery = {}) {
  await connectToDatabase();

  const categories = await CategoryModel.find({
    ...(typeof query.active === "boolean" ? { active: query.active } : {}),
    ...(query.brandDivision ? { brandDivision: query.brandDivision } : {}),
  })
    .sort({ sortOrder: 1, name: 1 })
    .lean<CategoryDocumentWithId[]>()
    .exec();

  return categories.map(serializeCategory);
}

export async function getCategoryById(id: string) {
  await connectToDatabase();

  const category = await CategoryModel.findById(id)
    .lean<CategoryDocumentWithId | null>()
    .exec();

  return category ? serializeCategory(category) : null;
}

export async function getCategoryBySlug(slug: string) {
  await connectToDatabase();

  const category = await CategoryModel.findOne({ slug: slug.toLowerCase(), active: true })
    .lean<CategoryDocumentWithId | null>()
    .exec();

  return category ? serializeCategory(category) : null;
}

export async function getSitemapCategories(limit = 5000) {
  await connectToDatabase();

  return CategoryModel.find(
    { active: true },
    { slug: 1, updatedAt: 1 },
  )
    .sort({ sortOrder: 1, name: 1 })
    .limit(limit)
    .lean<Array<Pick<CategoryDocumentWithId, "slug" | "updatedAt">>>()
    .exec();
}

export async function createCategory(input: unknown) {
  const validation = validateCategoryInput(input);

  if (!validation.success) {
    return validation;
  }

  await connectToDatabase();

  const category = await CategoryModel.create(validation.data satisfies CategoryInput);

  return {
    success: true as const,
    data: serializeCategory(category.toObject() as CategoryDocumentWithId),
  };
}

export async function updateCategory(id: string, input: unknown) {
  const validation = validateCategoryInput(input);

  if (!validation.success) {
    return validation;
  }

  await connectToDatabase();

  const category = await CategoryModel.findByIdAndUpdate(id, validation.data, {
    new: true,
    runValidators: true,
  })
    .lean<CategoryDocumentWithId | null>()
    .exec();

  if (!category) {
    return { success: false as const, errors: ["Category not found."] };
  }

  return { success: true as const, data: serializeCategory(category) };
}

export async function deleteCategory(id: string) {
  await connectToDatabase();
  const category = await CategoryModel.findById(id)
    .lean<CategoryDocumentWithId | null>()
    .exec();

  if (!category) {
    return { success: false as const, errors: ["Category not found."] };
  }

  const connectedProducts = await ProductModel.countDocuments({
    category: { $in: [category.name, category.slug] },
  }).exec();

  if (connectedProducts > 0) {
    return {
      success: false as const,
      errors: [
        `Category is connected to ${connectedProducts} product${
          connectedProducts === 1 ? "" : "s"
        }. Deactivate it instead or move products first.`,
      ],
    };
  }

  await CategoryModel.findByIdAndDelete(id).exec();

  return { success: true as const };
}

export async function setCategoryActive(id: string, active: boolean) {
  await connectToDatabase();

  const category = await CategoryModel.findByIdAndUpdate(
    id,
    { active },
    { new: true, runValidators: true },
  )
    .lean<CategoryDocumentWithId | null>()
    .exec();

  if (!category) {
    return { success: false as const, errors: ["Category not found."] };
  }

  return { success: true as const, data: serializeCategory(category) };
}
