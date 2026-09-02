import "server-only";

import { cache } from "react";

import { connectToDatabase } from "@/lib/mongodb";
import {
  validateSiteSettingsInput,
  type SiteSettingsInput,
} from "@/lib/validation/site-settings";
import { SITE_SETTINGS_ID, SiteSettingsModel } from "@/models/site-settings";
import type { SiteSettings } from "@/types/product";

type SiteSettingsDocumentWithId = SiteSettingsInput & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
};

export const defaultSiteSettings: SiteSettings = {
  id: SITE_SETTINGS_ID,
  businessName: "Rox & Nex",
  logoText: "ROX & NEX",
  favicon: "",
  phone: "+92 347 3716036",
  whatsapp: "+92 347 3716036",
  email: "karachisports07@gmail.com",
  address: "https://maps.app.goo.gl/JVh6kZQAeukm4evm9",
  businessHours: "Add business hours",
  facebook: "",
  instagram: "",
  linkedin: "",
  youtube: "",
  footerText:
    "Premium sports product showcase for Rox Fitness and Nex Games customers.",
  homepageSeoTitle: "Rox & Nex Sports Products",
  homepageSeoDescription:
    "Browse Rox & Nex sports, fitness, indoor games, board games, and recreation products.",
  defaultSeoImage: "",
  createdAt: new Date(0),
  updatedAt: new Date(0),
};

function cleanPublicCopy(value: string) {
  const legacySupplyPattern = new RegExp("\\bwhole" + "sale\\s+", "gi");

  return value
    .replace(legacySupplyPattern, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function serializeSiteSettings(settings: SiteSettingsDocumentWithId): SiteSettings {
  return {
    id: settings._id,
    businessName: settings.businessName,
    logoText: settings.logoText,
    favicon: settings.favicon,
    phone: settings.phone,
    whatsapp: settings.whatsapp,
    email: settings.email,
    address: settings.address,
    businessHours: settings.businessHours,
    facebook: settings.facebook,
    instagram: settings.instagram,
    linkedin: settings.linkedin,
    youtube: settings.youtube,
    footerText: settings.footerText,
    homepageSeoTitle: settings.homepageSeoTitle,
    homepageSeoDescription: settings.homepageSeoDescription,
    defaultSeoImage: settings.defaultSeoImage,
    createdAt: settings.createdAt,
    updatedAt: settings.updatedAt,
  };
}

export const getSiteSettings = cache(async () => {
  await connectToDatabase();

  const settings = await SiteSettingsModel.findById(SITE_SETTINGS_ID)
    .lean<SiteSettingsDocumentWithId | null>()
    .exec();

  return settings ? serializeSiteSettings(settings) : defaultSiteSettings;
});

export const getPublicSiteSettings = cache(async () => {
  try {
    const settings = await getSiteSettings();

    return {
      ...settings,
      footerText: cleanPublicCopy(settings.footerText),
      homepageSeoTitle: cleanPublicCopy(settings.homepageSeoTitle),
      homepageSeoDescription: cleanPublicCopy(settings.homepageSeoDescription),
    };
  } catch {
    return defaultSiteSettings;
  }
});

export async function updateSiteSettings(input: unknown) {
  const validation = validateSiteSettingsInput(input);

  if (!validation.success) {
    return validation;
  }

  await connectToDatabase();

  const settings = await SiteSettingsModel.findByIdAndUpdate(
    SITE_SETTINGS_ID,
    { _id: SITE_SETTINGS_ID, ...validation.data },
    {
      new: true,
      runValidators: true,
      setDefaultsOnInsert: true,
      upsert: true,
    },
  )
    .lean<SiteSettingsDocumentWithId>()
    .exec();

  if (!settings) {
    return { success: false as const, errors: ["Unable to save site settings."] };
  }

  return { success: true as const, data: serializeSiteSettings(settings) };
}
