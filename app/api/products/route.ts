import { NextRequest, NextResponse } from "next/server";

import { PRODUCT_DIVISION_IDS } from "@/constants/product-divisions";
import { getProducts } from "@/services/products";
import type { ProductDivisionId } from "@/types/product";

export async function GET(request: NextRequest) {
  const division = request.nextUrl.searchParams.get("division");
  const featured = request.nextUrl.searchParams.get("featured");

  if (division && !PRODUCT_DIVISION_IDS.includes(division as ProductDivisionId)) {
    return NextResponse.json(
      { error: "Unsupported product division." },
      { status: 400 },
    );
  }

  try {
    const products = await getProducts({
      division: division ? (division as ProductDivisionId) : undefined,
      featured: featured === null ? undefined : featured === "true",
    });

    return NextResponse.json({ products });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to load products.";

    return NextResponse.json({ error: message }, { status: 503 });
  }
}
