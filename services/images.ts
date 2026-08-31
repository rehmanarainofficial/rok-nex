import "server-only";

import { mkdir, writeFile } from "fs/promises";
import { extname, join } from "path";
import { randomUUID } from "crypto";

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const ALLOWED_IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

export type StoredImage = {
  url: string;
  alt: string;
};

function hasValidImageSignature(buffer: Buffer, mimeType: string) {
  if (mimeType === "image/jpeg") {
    return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  }

  if (mimeType === "image/png") {
    return (
      buffer[0] === 0x89 &&
      buffer[1] === 0x50 &&
      buffer[2] === 0x4e &&
      buffer[3] === 0x47
    );
  }

  if (mimeType === "image/webp") {
    return (
      buffer.subarray(0, 4).toString("ascii") === "RIFF" &&
      buffer.subarray(8, 12).toString("ascii") === "WEBP"
    );
  }

  return false;
}

export async function storeProductImage(file: File): Promise<StoredImage | null> {
  if (!file.size) {
    return null;
  }

  const extension = extname(file.name).toLowerCase();

  if (!ALLOWED_IMAGE_TYPES.has(file.type) || !ALLOWED_IMAGE_EXTENSIONS.has(extension)) {
    throw new Error(`${file.name} is not a supported image type.`);
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    throw new Error(`${file.name} is larger than 5 MB.`);
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  if (!hasValidImageSignature(buffer, file.type)) {
    throw new Error(`${file.name} does not appear to be a valid image file.`);
  }

  const filename = `${randomUUID()}${extension.toLowerCase()}`;
  const uploadDir = join(process.cwd(), "public", "uploads", "products");
  const destination = join(uploadDir, filename);

  await mkdir(uploadDir, { recursive: true });
  await writeFile(destination, buffer);

  return {
    url: `/uploads/products/${filename}`,
    alt: file.name.replace(extension, "").replaceAll("-", " ").trim() || "Product image",
  };
}
