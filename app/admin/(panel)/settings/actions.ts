"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdminSession } from "@/lib/auth/session";
import { updateSiteSettings } from "@/services/site-settings";

async function requireAdminAction() {
  const session = await requireAdminSession();

  if (!session) {
    redirect("/admin/login");
  }
}

function readText(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function updateSiteSettingsAction(formData: FormData) {
  await requireAdminAction();

  const result = await updateSiteSettings({
    businessName: readText(formData, "businessName"),
    logoText: readText(formData, "logoText"),
    favicon: readText(formData, "favicon"),
    phone: readText(formData, "phone"),
    whatsapp: readText(formData, "whatsapp"),
    email: readText(formData, "email"),
    address: readText(formData, "address"),
    businessHours: readText(formData, "businessHours"),
    facebook: readText(formData, "facebook"),
    instagram: readText(formData, "instagram"),
    linkedin: readText(formData, "linkedin"),
    youtube: readText(formData, "youtube"),
    footerText: readText(formData, "footerText"),
    homepageSeoTitle: readText(formData, "homepageSeoTitle"),
    homepageSeoDescription: readText(formData, "homepageSeoDescription"),
    defaultSeoImage: readText(formData, "defaultSeoImage"),
  });

  if (!result.success) {
    redirect(`/admin/settings?error=${encodeURIComponent(result.errors.join(" "))}`);
  }

  revalidatePath("/");
  revalidatePath("/contact");
  revalidatePath("/admin/settings");
  redirect("/admin/settings?saved=updated");
}
