import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { category, title, description, quantity, imageSrc, price,brand } = body;

  const product = await prisma.product.create({
    data: {
      category: { connect: { id: category } },
      name: title,
      description: description,
      currentInventory: quantity,
      brand:brand,
      image: imageSrc,
      price: parseInt(price, 10),
      user: {connect:{id:currentUser.id}},
    },
  });

  return NextResponse.json(product);
}
