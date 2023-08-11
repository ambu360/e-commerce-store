import { NextResponse } from "next/server";
import Prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getCart from "@/app/actions/getCart";

interface IParams {
  cartItemId: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    const body = await request.json();
    const { q } = body;

    const { cartItemId } = params;

    if (!cartItemId || typeof cartItemId !== "string") {
      return NextResponse.error();
    }
    if (!q || q <= 0) {
      NextResponse.error();
    }
    const cartItem = await Prisma?.cartItem.update({
      where: {
        id: cartItemId,
      },
      data: {
        Quantity: body,
      },
    });
    return NextResponse.json(cartItem);
  } catch (error) {
    NextResponse.error();
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const currentUser = await getCurrentUser();
    const cart = await getCart();
    if (!currentUser) {
      return null;
    }
    if (!cart) {
      return null;
    }
    const { cartItemId } = params;
    const cartItem = await Prisma.cartItem.delete({
      where: {
        id: cartItemId,

      },
    });

    return NextResponse.json(cartItem);
  } catch (error) {
    NextResponse.error();
  }
}
