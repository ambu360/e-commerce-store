const { PrismaClient } = require("@prisma/client");

const prisma1 = new PrismaClient();


async function seedData() {
  try {
    const categories = [
      { name: "T-shirt" },
      { name: "Trousers" },
      { name: "Shorts" },
      { name: "Jackets" },
      { name: "Shoes" },
      { name: "Hats" },
      { name: "Sportswear" },
      { name: "Dress" },
    ];

    await prisma1.category.createMany({
      data: categories,
    });
  } catch (error) {
    console.error("error seeding data", error);
  } finally {
    await prisma1.$disconnect();
  }
}



seedData();
