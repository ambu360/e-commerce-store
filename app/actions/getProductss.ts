import prisma from "@/app/libs/prismadb";

export interface IProductParams {
  userId?: String;
  category?: string;
  search?: string;
}

export default async function getProducts(params: IProductParams) {
  try {
    const { userId, category, search } = params;

    let query: any = {isActive:true};
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
      const tag = await prisma.tag.findFirst({
        where: {
          name: search,
          
        },
        select: {
          productIds: true, // This will only select the productIds field
        },
      });

      // console.log(tag?.productIds);
      if (tag && tag.productIds.length !== 0) {
        query = {
          ...query,
          id: { in: tag.productIds },
        };
      }
    }

    products = await prisma.product.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });
    //console.log(products)
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
