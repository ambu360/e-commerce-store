import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getCart() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return null;
    }

    const cart = await prisma.cart.findUnique({
      where: {
        userId: currentUser.id,
      },
      include: {
        Products: true,
      },
    });
    if(!cart){
        return null
    }
   
    const safeCart = {
      ...cart,
      Products: cart?.Products.map((product) => ({
        ...product,
        createdAt: product.createdAt.toISOString(),
      })),
    };
    return safeCart;
  } catch (error: any) {
    throw new Error(error);
  }
}
