import getCurrentUser from "./getCurrentUser";
import prisma from "@/app/libs/prismadb";
export async function getUserProducts() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const products = await prisma.product.findMany({
      where: {
        userId: currentUser.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeProducts = products.map((product) => ({
      ...product,
      createdAt: product.createdAt.toISOString(),
    }));
    //console.log(safeProducts)
    return safeProducts;
  } catch (error: any) {
    throw new Error(error);
  }
}
