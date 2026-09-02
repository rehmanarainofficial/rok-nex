import fs from "node:fs";
import path from "node:path";
import mongoose from "mongoose";

const envPath = path.join(process.cwd(), ".env.local");

if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const index = line.indexOf("=");

    if (index > 0) {
      process.env[line.slice(0, index)] ??= line.slice(index + 1);
    }
  }
}

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is required.");
}

await mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 5000,
});

await mongoose.connection.db.collection("sitesettings").updateOne(
  { _id: "site-settings" },
  {
    $set: {
      phone: "+92 347 3716036",
      whatsapp: "+92 347 3716036",
      email: "karachisports07@gmail.com",
      address: "https://maps.app.goo.gl/JVh6kZQAeukm4evm9",
      updatedAt: new Date(),
    },
    $setOnInsert: {
      businessName: "Rox & Nex",
      logoText: "ROX & NEX",
      favicon: "",
      businessHours: "Add business hours",
      facebook: "",
      instagram: "",
      linkedin: "",
      youtube: "",
      footerText: "Premium sports product showcase for Rox Fitness and Nex Games customers.",
      homepageSeoTitle: "Rox & Nex Sports Products",
      homepageSeoDescription:
        "Browse Rox & Nex sports, fitness, indoor games, board games, and recreation products.",
      defaultSeoImage: "",
      createdAt: new Date(),
    },
  },
  { upsert: true },
);

await mongoose.disconnect();

console.log("Contact settings updated.");
