import "server-only";

import { mkdir, writeFile } from "fs/promises";
import { extname, join } from "path";
import { randomUUID } from "crypto";

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/svg+xml"]);

export type StoredImage = {
  url: string;
  alt: string;
};

export async function storeProductImage(file: File): Promise<StoredImage | null> {
  if (!file.size) {
    return null;
  }

  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    throw new Error(`${file.name} is not a supported image type.`);
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    throw new Error(`${file.name} is larger than 5 MB.`);
  }

  const extension = extname(file.name) || ".jpg";
  const filename = `${randomUUID()}${extension.toLowerCase()}`;
  const uploadDir = join(process.cwd(), "public", "uploads", "products");
  const destination = join(uploadDir, filename);

  await mkdir(uploadDir, { recursive: true });
  await writeFile(destination, Buffer.from(await file.arrayBuffer()));

  return {
    url: `/uploads/products/${filename}`,
    alt: file.name.replace(extension, "").replaceAll("-", " ").trim() || "Product image",
  };
}
