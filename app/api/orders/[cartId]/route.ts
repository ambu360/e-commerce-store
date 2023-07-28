import { NextApiResponse } from "next";
import prisma from '@/app/libs/prismadb'
import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";


interface IParams{
    cartId:string
}

export async function DELETE(request:Request,{params}:{params:IParams}){
    
    const currentUser = await getCurrentUser()

    if(!currentUser){
        return NextResponse.error()
    }

    const {cartId} = params;

    if(!cartId || typeof cartId !== 'string'){
        return NextResponse.error()
    }

    const cart = await prisma.cart.delete({
        where:{
            id:cartId
        }
    })

    return NextResponse.json(cart)
}