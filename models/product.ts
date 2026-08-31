import "server-only";

import { model, models, Schema, type InferSchemaType } from "mongoose";

import { PRODUCT_DIVISION_IDS } from "@/constants/product-divisions";

const stockStatuses = ["in-stock", "low-stock", "out-of-stock"] as const;

const productSpecificationSchema = new Schema(
  {
    label: {
      type: String,
      required: true,
      trim: true,
    },
    value: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false },
);

const productImageSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },
    alt: {
      type: String,
      required: true,
      trim: true,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  { _id: false },
);

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    shortDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: 220,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    brandDivision: {
      type: String,
      enum: PRODUCT_DIVISION_IDS,
      required: true,
      index: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    subcategory: {
      type: String,
      trim: true,
    },
    sku: {
      type: String,
      trim: true,
      uppercase: true,
      sparse: true,
      unique: true,
    },
    regularPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    salePrice: {
      type: Number,
      min: 0,
    },
    priceDisplay: {
      type: String,
      trim: true,
    },
    stockQuantity: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    stockStatus: {
      type: String,
      enum: stockStatuses,
      required: true,
      default: "in-stock",
      index: true,
    },
    featured: {
      type: Boolean,
      default: false,
      index: true,
    },
    active: {
      type: Boolean,
      default: true,
      index: true,
    },
    images: {
      type: [productImageSchema],
      default: [],
    },
    thumbnail: {
      type: String,
      required: true,
      trim: true,
    },
    specifications: {
      type: [productSpecificationSchema],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
      index: true,
    },
    badge: {
      type: String,
      trim: true,
    },
    sortOrder: {
      type: Number,
      default: 0,
      index: true,
    },
    seoTitle: {
      type: String,
      trim: true,
    },
    seoDescription: {
      type: String,
      trim: true,
      maxlength: 180,
    },
  },
  {
    timestamps: true,
  },
);

productSchema.index({ active: 1, featured: -1, sortOrder: 1 });
productSchema.index({ brandDivision: 1, active: 1, sortOrder: 1 });
productSchema.index({ category: 1, active: 1, sortOrder: 1 });
productSchema.index({ name: "text", shortDescription: "text", description: "text" });

export type ProductDocument = InferSchemaType<typeof productSchema>;

export const ProductModel =
  models.Product || model<ProductDocument>("Product", productSchema);
