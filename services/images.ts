import "server-only";

import { createHash, randomUUID } from "crypto";
import { extname } from "path";

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const ALLOWED_IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1";

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

function getCloudinaryConfig() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME?.trim();
  const apiKey = process.env.CLOUDINARY_API_KEY?.trim();
  const apiSecret = process.env.CLOUDINARY_API_SECRET?.trim();
  const folder = process.env.CLOUDINARY_UPLOAD_FOLDER?.trim() || "rox-nex/products";

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary image upload is not configured.");
  }

  return { apiKey, apiSecret, cloudName, folder };
}

function signCloudinaryParams(
  params: Record<string, string | number>,
  apiSecret: string,
) {
  const payload = Object.entries(params)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return createHash("sha1").update(`${payload}${apiSecret}`).digest("hex");
}

type CloudinaryUploadResponse = {
  secure_url?: string;
};

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

  const { apiKey, apiSecret, cloudName, folder } = getCloudinaryConfig();
  const timestamp = Math.floor(Date.now() / 1000);
  const publicId = randomUUID();
  const uploadParams = {
    folder,
    public_id: publicId,
    timestamp,
  };
  const formData = new FormData();

  formData.set("file", new Blob([buffer], { type: file.type }), file.name);
  formData.set("api_key", apiKey);
  formData.set("folder", folder);
  formData.set("public_id", publicId);
  formData.set("timestamp", String(timestamp));
  formData.set("signature", signCloudinaryParams(uploadParams, apiSecret));

  const response = await fetch(`${CLOUDINARY_UPLOAD_URL}/${cloudName}/image/upload`, {
    body: formData,
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Cloudinary image upload failed.");
  }

  const payload = (await response.json()) as CloudinaryUploadResponse;

  if (!payload.secure_url) {
    throw new Error("Cloudinary image upload failed.");
  }

  return {
    url: payload.secure_url,
    alt: file.name.replace(extension, "").replaceAll("-", " ").trim() || "Product image",
  };
}
