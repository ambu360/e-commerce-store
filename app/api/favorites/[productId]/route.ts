import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
interface IParams {
  productId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { productId } = params;

  if (!productId || typeof productId !== "string") {
    throw new Error("Invalid Id");
  }

  let favoriteId = [...(currentUser.favoriteId || [])];

  favoriteId.push(productId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteId,
    },
  });

  return NextResponse.json(user);
}
