import "server-only";

import { createHmac, randomUUID, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "rox_nex_admin_session";

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

type AdminSession = {
  email: string;
  expiresAt: number;
  id: string;
};

function getSessionSecret() {
  const secret =
    process.env.ADMIN_SESSION_SECRET ??
    process.env.ADMIN_PASSWORD_HASH ??
    process.env.ADMIN_PASSWORD;

  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not configured.");
  }

  return secret;
}

function encodeBase64Url(value: string) {
  return Buffer.from(value).toString("base64url");
}

function decodeBase64Url(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function sign(payload: string) {
  return createHmac("sha256", getSessionSecret()).update(payload).digest("base64url");
}

function createToken(session: AdminSession) {
  const payload = encodeBase64Url(JSON.stringify(session));
  const signature = sign(payload);

  return `${payload}.${signature}`;
}

function readToken(token: string): AdminSession | null {
  const [payload, signature] = token.split(".");

  if (!payload || !signature) {
    return null;
  }

  const expected = sign(payload);
  const expectedBuffer = Buffer.from(expected);
  const signatureBuffer = Buffer.from(signature);

  if (
    expectedBuffer.length !== signatureBuffer.length ||
    !timingSafeEqual(expectedBuffer, signatureBuffer)
  ) {
    return null;
  }

  try {
    const session = JSON.parse(decodeBase64Url(payload)) as AdminSession;

    if (!session.email || !session.expiresAt || session.expiresAt <= Date.now()) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export async function createAdminSession(email: string) {
  const cookieStore = await cookies();
  const token = createToken({
    email,
    expiresAt: Date.now() + SESSION_MAX_AGE_SECONDS * 1000,
    id: randomUUID(),
  });

  cookieStore.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    maxAge: SESSION_MAX_AGE_SECONDS,
    path: "/admin",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export async function destroyAdminSession() {
  const cookieStore = await cookies();

  cookieStore.delete(ADMIN_SESSION_COOKIE);
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  return token ? readToken(token) : null;
}

export async function requireAdminSession() {
  const session = await getAdminSession();

  if (!session) {
    return null;
  }

  return session;
}
