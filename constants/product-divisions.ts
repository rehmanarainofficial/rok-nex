import type { ProductDivision } from "@/types/product";

export const PRODUCT_DIVISIONS: ProductDivision[] = [
  {
    id: "rox-fitness",
    name: "Rox Fitness",
    eyebrow: "Fitness division",
    description:
      "Strength, conditioning, exercise, and gym-ready products for wholesale buyers.",
    productFocus: [
      "Fitness Equipment",
      "Strength Training",
      "Training Accessories",
    ],
  },
  {
    id: "nex-games",
    name: "Nex Games",
    eyebrow: "Games division",
    description:
      "Board games, indoor games, sports games, and related products for bulk customers.",
    productFocus: ["Board Games", "Indoor Games", "Sports Games"],
  },
];

export const PRODUCT_DIVISION_IDS = PRODUCT_DIVISIONS.map((division) => division.id);
