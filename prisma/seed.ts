import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  await db.shop.create({
    data: {
      name: "my-cool-development-store",
    },
  });
}

seed();
