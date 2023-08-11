import prisma from "@/app/libs/prismadb";

export interface IProductParams {
  userId?: String;
  category?: string;
  search?: string;
}

export default async function getProducts(params: IProductParams) {
  try {
    const { userId, category, search } = params;

    let query: any = {};
    let products;

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query = {
        category: {
          name: category,
        },
      };
    }

    if (search) {
      console.log(search);
    }
    products = await prisma.product.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeProducts = products.map((product) => ({
      ...product,
      createdAt: product.createdAt.toISOString(),
    }));
    return safeProducts;
  } catch (error: any) {
    throw new Error(error);
  }
}
