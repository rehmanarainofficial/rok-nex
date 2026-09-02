export const siteConfig = {
  name: "Rox & Nex",
  description:
    "Browse Rox & Nex sports, fitness, board games, indoor games, and recreation products from Rox Fitness and Nex Games.",
  divisions: ["Rox Fitness", "Nex Games"],
  email: "karachisports07@gmail.com",
  phone: "+92 347 3716036",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
} as const;
