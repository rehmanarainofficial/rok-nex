import "server-only";

import { randomUUID, scryptSync, timingSafeEqual } from "crypto";

const KEY_LENGTH = 64;

function hashPassword(password: string, salt: string) {
  return scryptSync(password, salt, KEY_LENGTH);
}

export function createPasswordHash(password: string) {
  const salt = randomUUID();
  const hash = hashPassword(password, salt).toString("hex");

  return `scrypt:${salt}:${hash}`;
}

export function verifyPassword(password: string, configuredSecret: string) {
  const [scheme, salt, storedHash] = configuredSecret.split(":");

  if (scheme === "scrypt" && salt && storedHash) {
    const candidate = hashPassword(password, salt);
    const stored = Buffer.from(storedHash, "hex");

    return stored.length === candidate.length && timingSafeEqual(stored, candidate);
  }

  const candidate = Buffer.from(password);
  const configured = Buffer.from(configuredSecret);

  return (
    candidate.length === configured.length && timingSafeEqual(candidate, configured)
  );
}
