import "server-only";

import { model, models, Schema, type InferSchemaType } from "mongoose";

const inquirySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    companyName: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    productInterest: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    source: {
      type: String,
      enum: ["contact-page", "product-page"],
      required: true,
      index: true,
    },
    productSlug: {
      type: String,
      trim: true,
      lowercase: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["new", "contacted", "closed"],
      default: "new",
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

inquirySchema.index({ createdAt: -1, status: 1 });
inquirySchema.index({ name: "text", companyName: "text", phone: "text", email: "text" });

export type InquiryDocument = InferSchemaType<typeof inquirySchema>;

export const InquiryModel =
  models.Inquiry || model<InquiryDocument>("Inquiry", inquirySchema);
