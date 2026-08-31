"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdminSession } from "@/lib/auth/session";
import { setInquiryStatus } from "@/services/inquiries";
import type { InquiryStatus } from "@/types/product";

async function requireAdminAction() {
  const session = await requireAdminSession();

  if (!session) {
    redirect("/admin/login");
  }
}

function readText(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function readInquiryStatus(value: string): InquiryStatus | null {
  if (value === "new" || value === "contacted" || value === "closed") {
    return value;
  }

  return null;
}

export async function updateInquiryStatusAction(formData: FormData) {
  await requireAdminAction();

  const status = readInquiryStatus(readText(formData, "status"));

  if (!status) {
    redirect("/admin/inquiries?error=Invalid%20status");
  }

  const result = await setInquiryStatus(readText(formData, "id"), status);

  if (!result.success) {
    redirect(`/admin/inquiries?error=${encodeURIComponent(result.errors.join(" "))}`);
  }

  revalidatePath("/admin/inquiries");
  redirect("/admin/inquiries?saved=updated");
}
