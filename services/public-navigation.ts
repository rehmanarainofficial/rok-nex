import "server-only";

import { getCategories } from "@/services/categories";

export async function getPublicCategories() {
  try {
    return await getCategories({ active: true });
  } catch {
    return [];
  }
}
