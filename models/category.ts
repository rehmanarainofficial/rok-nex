import "server-only";

import { model, models, Schema, type InferSchemaType } from "mongoose";

import { PRODUCT_DIVISION_IDS } from "@/constants/product-divisions";

const categorySchema = new Schema(
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
    description: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
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
    active: {
      type: Boolean,
      default: true,
      index: true,
    },
    sortOrder: {
      type: Number,
      default: 0,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

categorySchema.index({ brandDivision: 1, active: 1, sortOrder: 1 });
categorySchema.index({ name: "text", description: "text" });

export type CategoryDocument = InferSchemaType<typeof categorySchema>;

export const CategoryModel =
  models.Category || model<CategoryDocument>("Category", categorySchema);
