import "server-only";

import { model, models, Schema, type InferSchemaType } from "mongoose";

export const SITE_SETTINGS_ID = "site-settings";

const siteSettingsSchema = new Schema(
  {
    _id: {
      type: String,
      default: SITE_SETTINGS_ID,
    },
    businessName: {
      type: String,
      required: true,
      trim: true,
    },
    logoText: {
      type: String,
      trim: true,
      default: "ROX & NEX",
    },
    favicon: {
      type: String,
      trim: true,
      default: "",
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    whatsapp: {
      type: String,
      trim: true,
      default: "",
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },
    address: {
      type: String,
      trim: true,
      default: "",
    },
    businessHours: {
      type: String,
      trim: true,
      default: "",
    },
    facebook: {
      type: String,
      trim: true,
      default: "",
    },
    instagram: {
      type: String,
      trim: true,
      default: "",
    },
    linkedin: {
      type: String,
      trim: true,
      default: "",
    },
    youtube: {
      type: String,
      trim: true,
      default: "",
    },
    footerText: {
      type: String,
      trim: true,
      default: "",
    },
    homepageSeoTitle: {
      type: String,
      trim: true,
      default: "",
    },
    homepageSeoDescription: {
      type: String,
      trim: true,
      default: "",
    },
    defaultSeoImage: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

export type SiteSettingsDocument = InferSchemaType<typeof siteSettingsSchema>;

export const SiteSettingsModel =
  models.SiteSettings ||
  model<SiteSettingsDocument>("SiteSettings", siteSettingsSchema);
