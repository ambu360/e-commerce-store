import prisma from "@/app/libs/prismadb";
interface Iparams {
  productId?: string;
}

export default async function getProductById({ params }: { params: Iparams }) {
  try {
    const { productId } = params;

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        user: true,
        category:true,
        sizes:true,
      },
    });

    if(!product){
        return null
    }

    return {
        ...product,
        createdAt:product.createdAt.toString(),
        user:{
            ...product.user,
            createdAt:product.user.createdAt.toString(),
            updatedAt:product.user.updatedAt.toString(),
            emailVerified:product.user.emailVerified?.toString() || null
        },
        
        
    }
  } catch (error: any) {
    throw new Error(error);
  }
}
