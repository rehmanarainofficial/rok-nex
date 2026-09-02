import type { Metadata } from "next";
import { redirect } from "next/navigation";

type ProductRedirectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const metadata: Metadata = {
  title: "Products",
  description: "Browse Rox & Nex sports, fitness, and games products.",
  alternates: {
    canonical: "/products",
  },
};

export default async function ProductRedirectPage({
  params,
}: ProductRedirectPageProps) {
  const { slug } = await params;

  redirect(`/products?q=${encodeURIComponent(slug)}`);
}
