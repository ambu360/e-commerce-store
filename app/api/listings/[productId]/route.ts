import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb'

interface Iparams {
    productId:string,
}

export async function DELETE(request: Request,{params}:{params:Iparams}) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const {productId} = params

  if(!productId || typeof productId !== 'string'){
    return NextResponse.error()
  }

  const product = await prisma.product.delete({
    where:{
        id:productId
    }
  })

  return NextResponse.json(product)
}
