import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getCart from "@/app/actions/getCart";

interface IParams {
  productId: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    const cart = await getCart();
    const currentUser = await getCurrentUser();
    const { productId } = params;
    const body = await request.json()
    const {selectedSize} = body;
    //check if logged in
    if (!currentUser) {
      return null;
    }

    //check if valid prodcutId
    if (!productId || typeof productId !== "string") {
      throw new Error("Invalid Product Id");
    }

    //check if cart exists for user
    if (!cart) {
      const cart = await prisma.cart.create({
        data: {
          user: { connect: { id: currentUser.id } },
        },
      });
      //create cartItem
      const newCartItem = await prisma.cartItem.create({
        data: {
          product: { connect: { id: productId } },
          cart: { connect: { id: cart.id } },
          size: selectedSize,
          Quantity: 1,
        },
      });

      return NextResponse.json(newCartItem);
    }
    const cartItems = cart.cartItems;
    const productInCart = cartItems.find(
      (item) => (item.product.id === productId)&&(item.size===selectedSize)
    );

    if (productInCart && productInCart.size === selectedSize) {
      const updatedCartItem = await prisma.cartItem.update({
        where: {
          id: productInCart.id,
        },
        data: {
          Quantity: productInCart.Quantity + 1,
        },
      });

      return NextResponse.json(updatedCartItem);
    } else {
      const cartItem = await prisma.cartItem.create({
        data: {
          product: { connect: { id: productId } },
          cart: { connect: { id: cart.id } },
          size: selectedSize,
          Quantity: 1,
        },
      });
      return NextResponse.json(cartItem);
    }
  } catch (error: any) {
    console.log(error);

    return NextResponse.error();
  }
}
