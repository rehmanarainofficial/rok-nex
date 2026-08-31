import { NextRequest, NextResponse } from "next/server";

import { PRODUCT_DIVISION_IDS } from "@/constants/product-divisions";
import { getProducts } from "@/services/products";
import type { BrandDivision } from "@/types/product";

export async function GET(request: NextRequest) {
  const brandDivision =
    request.nextUrl.searchParams.get("brandDivision") ??
    request.nextUrl.searchParams.get("division");
  const category = request.nextUrl.searchParams.get("category");
  const featured = request.nextUrl.searchParams.get("featured");
  const limit = request.nextUrl.searchParams.get("limit");

  if (brandDivision && !PRODUCT_DIVISION_IDS.includes(brandDivision as BrandDivision)) {
    return NextResponse.json(
      { error: "Unsupported product division." },
      { status: 400 },
    );
  }

  try {
    const products = await getProducts({
      brandDivision: brandDivision ? (brandDivision as BrandDivision) : undefined,
      category: category ?? undefined,
      active: true,
      featured: featured === null ? undefined : featured === "true",
      limit: limit ? Number(limit) : undefined,
    });

    return NextResponse.json({ products });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to load products.";

    return NextResponse.json({ error: message }, { status: 503 });
  }
}
