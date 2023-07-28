import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import getCart from "@/app/actions/getCart";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const cart = await getCart();

    if (!currentUser || !cart) {
      return NextResponse.error();
    }

    let total = 0;
    cart.cartItems.forEach((item) => {
      total += item.Quantity * item.product.price;
    });

    const order = await prisma.order.create({
      data: {
        user: { connect: { id: currentUser.id } },
        status: "created",
        total: Number(total),
        items: {
          createMany: {
            data: cart.cartItems.map((item) => ({
              productId: item.productId,
              size: item.size,
              quantity: item.Quantity,
            })),
          },
        },
      },
      include: { items: true }, // To include the order items in the response.
    });

    return NextResponse.json(order);
  } catch (error) {
    console.log(error);
  }
}
