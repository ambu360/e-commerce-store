import prisma from '@/app/libs/prismadb'


export default async function getAllCategories(){

    try{
        const categories = await prisma.category.findMany({
            select: {
              id: true,
              name: true,
            },
          })

        return categories;
    }catch(error){
        console.log(error)
    }
}