export const siteConfig = {
  name: "Rox & Nex",
  description:
    "A premium wholesale sports products showcase for Rox Fitness and Nex Games.",
  divisions: ["Rox Fitness", "Nex Games"],
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001",
} as const;
