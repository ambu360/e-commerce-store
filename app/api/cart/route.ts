import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb'



export async function POST(request:Request){

    const currentUser = await getCurrentUser()

    if(!currentUser){
        return NextResponse.error()
    }

    
    const body = await request.json()

    
    
    const {productId} = body;

    const cart = await prisma.cart.upsert({
        where: {
          userId: currentUser.id,
        },
        update: {},
        create: {
          userId: currentUser.id,
        },
        include: {
          user: true,
        },
      });
    
      // Add the productId to the user's cart
      const updatedCart = await prisma.cart.update({
        where: {
          id: cart.id,
        },
        data: {
          productIds: {
            push: productId,
          },
        },
        include: {
          user: true,
        },
      });
    

    return NextResponse.json(cart)
}