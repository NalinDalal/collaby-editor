import { seedDemoData } from "@/lib/prisma";

seedDemoData()
  .then(() => {
    console.log("🌱 Seeding completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  });
