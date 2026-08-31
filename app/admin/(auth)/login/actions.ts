"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { clearLoginRateLimit, checkLoginRateLimit } from "@/lib/auth/rate-limit";
import { createAdminSession } from "@/lib/auth/session";
import { verifyPassword } from "@/lib/auth/password";

export type LoginState = {
  error?: string;
};

function getAdminPasswordSecret() {
  if (process.env.ADMIN_PASSWORD_HASH) {
    return {
      secret: process.env.ADMIN_PASSWORD_HASH,
    };
  }

  if (process.env.NODE_ENV !== "production" && process.env.ADMIN_PASSWORD) {
    return {
      secret: process.env.ADMIN_PASSWORD,
    };
  }

  return {
    error:
      process.env.NODE_ENV === "production"
        ? "ADMIN_PASSWORD_HASH is required in production."
        : "Admin password is not configured.",
  };
}

export async function loginAction(
  _previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const passwordConfig = getAdminPasswordSecret();
  const headerStore = await headers();
  const ip =
    headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headerStore.get("x-real-ip") ??
    "local";
  const rateLimitKey = `${ip}:${email || "unknown"}`;
  const limit = checkLoginRateLimit(rateLimitKey);

  if (!limit.allowed) {
    return {
      error: `Too many login attempts. Try again in ${limit.retryAfterSeconds} seconds.`,
    };
  }

  if (!adminEmail || !passwordConfig.secret) {
    return {
      error: passwordConfig.error ?? "Admin credentials are not configured.",
    };
  }

  if (!email || !password) {
    return {
      error: "Email and password are required.",
    };
  }

  const isValidEmail = email === adminEmail;
  const isValidPassword = verifyPassword(password, passwordConfig.secret);

  if (!isValidEmail || !isValidPassword) {
    return {
      error: "Invalid admin credentials.",
    };
  }

  clearLoginRateLimit(rateLimitKey);
  await createAdminSession(adminEmail);

  redirect("/admin");
}
