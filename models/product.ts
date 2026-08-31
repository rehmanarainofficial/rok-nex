import "server-only";

import { model, models, Schema, type InferSchemaType } from "mongoose";

import { PRODUCT_DIVISION_IDS } from "@/constants/product-divisions";

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

const productSchema = new Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    division: {
      type: String,
      enum: PRODUCT_DIVISION_IDS,
      required: true,
      index: true,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    wholesalePrice: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      required: true,
      default: "USD",
      uppercase: true,
      trim: true,
    },
    stockStatus: {
      type: String,
      enum: ["in-stock", "low-stock", "out-of-stock", "on-request"],
      required: true,
      default: "on-request",
      index: true,
    },
    stockQuantity: {
      type: Number,
      min: 0,
    },
    specifications: {
      type: [productSpecificationSchema],
      default: [],
    },
    imageUrls: {
      type: [String],
      default: [],
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

export type ProductDocument = InferSchemaType<typeof productSchema>;

export const ProductModel =
  models.Product || model<ProductDocument>("Product", productSchema);
