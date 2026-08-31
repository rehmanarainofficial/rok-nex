import { NextResponse } from "next/server";

import { getProductSummaries } from "@/services/products";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim() ?? "";

  if (query.length < 2) {
    return NextResponse.json({ products: [] });
  }

  try {
    const products = await getProductSummaries({
      active: true,
      limit: 8,
      search: query,
      sort: "featured",
    });

    return NextResponse.json({ products });
  } catch {
    return NextResponse.json(
      { error: "Search is temporarily unavailable.", products: [] },
      { status: 503 },
    );
  }
}
