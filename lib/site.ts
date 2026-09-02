export const siteConfig = {
  name: "Rox & Nex",
  description:
    "A premium sports products showcase for Rox Fitness and Nex Games.",
  divisions: ["Rox Fitness", "Nex Games"],
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
} as const;
