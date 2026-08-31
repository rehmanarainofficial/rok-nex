import { NextRequest, NextResponse } from "next/server";

import { PRODUCT_DIVISION_IDS } from "@/constants/product-divisions";
import { getCategories } from "@/services/categories";
import type { BrandDivision } from "@/types/product";

export async function GET(request: NextRequest) {
  const brandDivision =
    request.nextUrl.searchParams.get("brandDivision") ??
    request.nextUrl.searchParams.get("division");

  if (brandDivision && !PRODUCT_DIVISION_IDS.includes(brandDivision as BrandDivision)) {
    return NextResponse.json(
      { error: "Unsupported product division." },
      { status: 400 },
    );
  }

  try {
    const categories = await getCategories({
      brandDivision: brandDivision ? (brandDivision as BrandDivision) : undefined,
      active: true,
    });

    return NextResponse.json({ categories });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to load categories.";

    return NextResponse.json({ error: message }, { status: 503 });
  }
}
