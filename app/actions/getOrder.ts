import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getOrders() {
  try {
    const currentuser = await getCurrentUser();
    if (!currentuser) {
      return null;
    }
    const order = await prisma.order.findMany({
      where: {
        userId: currentuser.id,
      },
      orderBy:{
        orderDate:'desc'
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    const safeOrders = order.map((singleOrder) => ({
      ...singleOrder,
      orderDate: singleOrder.orderDate.toISOString(),
      items: singleOrder.items.map((item) => ({
        ...item,
        product: {
          ...item.product,
          createdAt: item.product.createdAt.toISOString(),
        },
      })),
    }));
    return safeOrders;
  } catch (error: any) {
    throw new Error(error);
  }
}
