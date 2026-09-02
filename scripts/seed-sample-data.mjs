import fs from "node:fs";
import path from "node:path";
import mongoose from "mongoose";

const root = process.cwd();
const envPath = path.join(root, ".env.local");

if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim();

    process.env[key] ??= value;
  }
}

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is required to seed sample data.");
}

const now = new Date();

const categories = [
  {
    name: "Fitness Equipment",
    slug: "fitness-equipment",
    description: "Training products for strength, movement, and everyday exercise.",
    image: "/catalog/category-fitness-equipment.svg",
    brandDivision: "rox-fitness",
    active: true,
    sortOrder: 10,
  },
  {
    name: "Strength Training",
    slug: "strength-training",
    description: "Weights, resistance products, and strength-focused essentials.",
    image: "/catalog/category-strength-training.svg",
    brandDivision: "rox-fitness",
    active: true,
    sortOrder: 20,
  },
  {
    name: "Accessories",
    slug: "accessories",
    description: "Training accessories for sports retail and active routines.",
    image: "/catalog/category-accessories.svg",
    brandDivision: "rox-fitness",
    active: true,
    sortOrder: 30,
  },
  {
    name: "Board Games",
    slug: "board-games",
    description: "Classic and modern tabletop products for family and strategy play.",
    image: "/catalog/category-board-games.svg",
    brandDivision: "nex-games",
    active: true,
    sortOrder: 40,
  },
  {
    name: "Indoor Games",
    slug: "indoor-games",
    description: "Compact indoor play products for homes, clubs, and game rooms.",
    image: "/catalog/category-indoor-games.svg",
    brandDivision: "nex-games",
    active: true,
    sortOrder: 50,
  },
  {
    name: "Sports Games",
    slug: "sports-games",
    description: "Recreation-led sports games with strong product shelf appeal.",
    image: "/catalog/category-sports-games.svg",
    brandDivision: "nex-games",
    active: true,
    sortOrder: 60,
  },
];

const products = [
  {
    name: "Rox Adjustable Dumbbell Set",
    slug: "rox-adjustable-dumbbell-set",
    shortDescription: "Compact adjustable dumbbell set for strength routines and gym displays.",
    description: "A clean strength training product with a rubber-coated feel, balanced grip, and compact storage profile for product showcases.",
    brandDivision: "rox-fitness",
    category: "Strength Training",
    subcategory: "Weights",
    sku: "ROX-DB-ADJ-01",
    regularPrice: 89,
    salePrice: 79,
    stockQuantity: 72,
    stockStatus: "in-stock",
    featured: true,
    active: true,
    thumbnail: "/catalog/product-dumbbell.svg",
    images: [{ url: "/catalog/product-dumbbell.svg", alt: "Rox adjustable dumbbell set", sortOrder: 0 }],
    specifications: [
      { label: "Material", value: "Rubber coated steel" },
      { label: "Weight Range", value: "5 kg to 20 kg" },
      { label: "Color", value: "Black and red" },
    ],
    tags: ["dumbbell", "strength", "gym"],
    badge: "Featured",
    sortOrder: 10,
    seoTitle: "Rox Adjustable Dumbbell Set",
    seoDescription: "Browse the Rox Adjustable Dumbbell Set for strength training product showcases.",
  },
  {
    name: "Rox Pro Resistance Band Kit",
    slug: "rox-pro-resistance-band-kit",
    shortDescription: "Multi-level resistance kit for training, stretching, and conditioning.",
    description: "A portable resistance band kit with multiple tension levels, useful for fitness routines, studio setups, and compact displays.",
    brandDivision: "rox-fitness",
    category: "Fitness Equipment",
    subcategory: "Resistance",
    sku: "ROX-RB-PRO-02",
    regularPrice: 28,
    salePrice: 24,
    stockQuantity: 240,
    stockStatus: "in-stock",
    featured: true,
    active: true,
    thumbnail: "/catalog/product-resistance-set.svg",
    images: [{ url: "/catalog/product-resistance-set.svg", alt: "Rox resistance band kit", sortOrder: 0 }],
    specifications: [
      { label: "Levels", value: "Light, medium, heavy" },
      { label: "Material", value: "Latex blend" },
      { label: "Included", value: "Bands, handles, door anchor" },
    ],
    tags: ["resistance", "fitness", "training"],
    badge: "Popular",
    sortOrder: 20,
    seoTitle: "Rox Pro Resistance Band Kit",
    seoDescription: "Browse Rox Pro Resistance Band Kit details, pricing, and stock status.",
  },
  {
    name: "Rox Core Training Mat",
    slug: "rox-core-training-mat",
    shortDescription: "Textured fitness mat for floor work, stretching, and daily movement.",
    description: "A durable training mat with a textured surface and comfortable support for stretching, floor workouts, and core training.",
    brandDivision: "rox-fitness",
    category: "Accessories",
    subcategory: "Mats",
    sku: "ROX-MAT-CORE-03",
    regularPrice: 22,
    stockQuantity: 118,
    stockStatus: "in-stock",
    featured: true,
    active: true,
    thumbnail: "/catalog/category-accessories.svg",
    images: [{ url: "/catalog/category-accessories.svg", alt: "Rox core training mat", sortOrder: 0 }],
    specifications: [
      { label: "Material", value: "Textured EVA" },
      { label: "Thickness", value: "8 mm" },
      { label: "Dimensions", value: "183 x 61 cm" },
    ],
    tags: ["mat", "fitness", "accessory"],
    badge: "New",
    sortOrder: 30,
    seoTitle: "Rox Core Training Mat",
    seoDescription: "Browse Rox Core Training Mat product details and stock availability.",
  },
  {
    name: "Rox Performance Jump Rope",
    slug: "rox-performance-jump-rope",
    shortDescription: "Speed rope for cardio training, warmups, and conditioning sessions.",
    description: "A lightweight jump rope designed for fast rotations, grip comfort, and everyday performance training.",
    brandDivision: "rox-fitness",
    category: "Accessories",
    subcategory: "Cardio",
    sku: "ROX-JR-PERF-04",
    regularPrice: 15,
    stockQuantity: 46,
    stockStatus: "low-stock",
    featured: true,
    active: true,
    thumbnail: "/catalog/category-fitness-equipment.svg",
    images: [{ url: "/catalog/category-fitness-equipment.svg", alt: "Rox performance jump rope", sortOrder: 0 }],
    specifications: [
      { label: "Cable", value: "Adjustable coated cable" },
      { label: "Handle", value: "Anti-slip grip" },
      { label: "Color", value: "Black and red" },
    ],
    tags: ["jump rope", "cardio", "training"],
    badge: "Low stock",
    sortOrder: 40,
    seoTitle: "Rox Performance Jump Rope",
    seoDescription: "Browse Rox Performance Jump Rope product details and availability.",
  },
  {
    name: "Nex Classic Board Game Set",
    slug: "nex-classic-board-game-set",
    shortDescription: "Tabletop game set with a clean product presentation for family play.",
    description: "A classic board game set designed for easy browsing, shelf display, and wide recreational use.",
    brandDivision: "nex-games",
    category: "Board Games",
    subcategory: "Tabletop",
    sku: "NEX-BG-CLASSIC-01",
    regularPrice: 18,
    stockQuantity: 310,
    stockStatus: "in-stock",
    featured: true,
    active: true,
    thumbnail: "/catalog/product-board-game.svg",
    images: [{ url: "/catalog/product-board-game.svg", alt: "Nex classic board game set", sortOrder: 0 }],
    specifications: [
      { label: "Players", value: "2 to 4" },
      { label: "Material", value: "Printed board and tokens" },
      { label: "Packaging", value: "Retail box" },
    ],
    tags: ["board game", "tabletop", "family"],
    badge: "Featured",
    sortOrder: 50,
    seoTitle: "Nex Classic Board Game Set",
    seoDescription: "Browse Nex Classic Board Game Set details, pricing, and stock status.",
  },
  {
    name: "Nex Indoor Target Game",
    slug: "nex-indoor-target-game",
    shortDescription: "Compact skill game for indoor recreation and active play shelves.",
    description: "An indoor target game with a compact footprint and bold visual style for recreational game assortments.",
    brandDivision: "nex-games",
    category: "Indoor Games",
    subcategory: "Skill Games",
    sku: "NEX-TG-INDOOR-02",
    regularPrice: 32,
    stockQuantity: 64,
    stockStatus: "in-stock",
    featured: true,
    active: true,
    thumbnail: "/catalog/product-target-game.svg",
    images: [{ url: "/catalog/product-target-game.svg", alt: "Nex indoor target game", sortOrder: 0 }],
    specifications: [
      { label: "Game Type", value: "Target skill game" },
      { label: "Use", value: "Indoor recreation" },
      { label: "Packaging", value: "Compact box" },
    ],
    tags: ["target", "indoor", "game"],
    badge: "Popular",
    sortOrder: 60,
    seoTitle: "Nex Indoor Target Game",
    seoDescription: "Browse Nex Indoor Target Game details and availability.",
  },
  {
    name: "Nex Strategy Chess Board",
    slug: "nex-strategy-chess-board",
    shortDescription: "Modern chess set for board game shelves and recreational buyers.",
    description: "A refined chess board product with a clean visual identity, durable board, and classic gameplay appeal.",
    brandDivision: "nex-games",
    category: "Board Games",
    subcategory: "Strategy",
    sku: "NEX-CHESS-03",
    regularPrice: 26,
    salePrice: 21,
    stockQuantity: 96,
    stockStatus: "in-stock",
    featured: true,
    active: true,
    thumbnail: "/catalog/category-board-games.svg",
    images: [{ url: "/catalog/category-board-games.svg", alt: "Nex strategy chess board", sortOrder: 0 }],
    specifications: [
      { label: "Players", value: "2" },
      { label: "Board", value: "Foldable board" },
      { label: "Pieces", value: "Full chess set" },
    ],
    tags: ["chess", "strategy", "board game"],
    badge: "New",
    sortOrder: 70,
    seoTitle: "Nex Strategy Chess Board",
    seoDescription: "Browse Nex Strategy Chess Board product details and stock availability.",
  },
  {
    name: "Nex Table Football Mini",
    slug: "nex-table-football-mini",
    shortDescription: "Small-format table football game for indoor play and gift displays.",
    description: "A compact table football product for indoor recreation, small spaces, and game-focused product ranges.",
    brandDivision: "nex-games",
    category: "Sports Games",
    subcategory: "Table Games",
    sku: "NEX-TF-MINI-04",
    regularPrice: 48,
    stockQuantity: 28,
    stockStatus: "low-stock",
    featured: true,
    active: true,
    thumbnail: "/catalog/category-sports-games.svg",
    images: [{ url: "/catalog/category-sports-games.svg", alt: "Nex table football mini", sortOrder: 0 }],
    specifications: [
      { label: "Game Type", value: "Table football" },
      { label: "Size", value: "Mini tabletop" },
      { label: "Players", value: "2 to 4" },
    ],
    tags: ["football", "table game", "indoor"],
    badge: "Low stock",
    sortOrder: 80,
    seoTitle: "Nex Table Football Mini",
    seoDescription: "Browse Nex Table Football Mini details, pricing, and stock status.",
  },
].map((product) => ({
  ...product,
  updatedAt: now,
}));

await mongoose.connect(uri, {
  serverSelectionTimeoutMS: 5000,
});

const database = mongoose.connection.db;

await Promise.all(
  categories.map((category) =>
    database.collection("categories").updateOne(
      { slug: category.slug },
      {
        $set: {
          ...category,
          updatedAt: now,
        },
        $setOnInsert: {
          createdAt: now,
        },
      },
      { upsert: true },
    ),
  ),
);

await Promise.all(
  products.map((product) =>
    database.collection("products").updateOne(
      { slug: product.slug },
      {
        $set: product,
        $setOnInsert: {
          createdAt: now,
        },
      },
      { upsert: true },
    ),
  ),
);

const [categoryCount, productCount] = await Promise.all([
  database.collection("categories").countDocuments({ active: true }),
  database.collection("products").countDocuments({ active: true }),
]);

await mongoose.disconnect();

console.log(`Seed complete: ${categoryCount} active categories, ${productCount} active products.`);
