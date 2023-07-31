import prisma from "@/app/libs/prismadb";

export interface IProductParams {
  userId?:String;
  category?:string
}

export default async function getProducts(params:IProductParams) {
  try {
    const {userId,
    category} = params

    let query:any = {}
    
    if(userId){
      query.userId = userId
    }

    if(category){
      query={
       
          category:{
            name:category
          }
        
      }
      console.log(`thisis ${category}`)
    }
    const products = await prisma.product.findMany({
      where:query,
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeProducts = products.map((product) => ({
      ...product,
      createdAt: product.createdAt.toISOString(),
    }));
    return safeProducts;
  } catch (error: any) {
    throw new Error(error);
  }
}
