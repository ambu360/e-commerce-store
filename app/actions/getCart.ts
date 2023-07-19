import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getCart() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return null;
    }

    interface CartItem {
      id: string;
      productId: string;
      cartId: string;
      size: string;
      Quantity: number;
      product: {
        createdAt: string;
        id: string;
        name: string;
        image: string;
        price: number;
        brand: string;
        tags: string[];
        categoryID: string;
        currentInventory: number;
        description: string;
        userId: string;
      };
    }

    interface Cart {
      id: string;
      userId: string;
      cartItems: CartItem[];
    }

    // Get cart from the database
    const cart = await prisma.cart.findUnique({
      where: {
        userId: currentUser.id,
      },
      include: {
        cartItems: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart) {
      return null;
    }

    // Format product.createdAt, Date => String
    const safeCart: Cart = {
      ...cart,
      cartItems: cart.cartItems.map((item) => ({
        ...item,
        product: {
          ...item.product,
          createdAt: item.product.createdAt.toISOString(),
        },
      })),
    };

    return safeCart;
  } catch (error: any) {
    throw new Error(error);
  }
}
