import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    category,
    title,
    description,
    quantity,
    imageSrc,
    price,
    brand,
    tags,
    sizes,
  } = body;

  //get and validate tags from prisma
  const tagsDb = await prisma.tag.findMany();

  const product = await prisma.product.create({
    data: {
      category: { connect: { id: category } },
      name: title,
      description: description,
      currentInventory: quantity,
      brand: brand,
      image: imageSrc,
      price: parseFloat(price),
      user: { connect: { id: currentUser.id } },
      tags: tags,
      sizes: {
        create: sizes,
      },
    },
  });

  const createTag = async (tag: string, id: string) => {
    const newTag = await prisma.tag.create({
      data: {
        name: tag,
        productIds: [id],
      },
    });
  };

  const updatedTag = async (tag:string,id:string,tagId:string,tagList:string[]) =>{
    tagList.push(tagId)
    const updatedTag = await prisma.tag.update({
      where:{
        id:tagId
      },
      data:{
        productIds:tagList
      }
    })
  }

  if (product.tags.length !== 0) {
    product.tags.forEach((item)=>{
      const exists = tagsDb.find((tagObj)=> tagObj.name === item)
      if(exists){
        updatedTag(item,product.id,exists.id,exists.productIds)
      }else{
        createTag(item,product.id);
      }
    });
  }

  return NextResponse.json(product);
}
