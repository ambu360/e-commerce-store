"use client";

import { SafeUser } from "@/app/types";
import { Category, Size } from "@prisma/client";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ProductCategory from "./ProductCategory";

interface ProductInfoProps {
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
  user: SafeUser;
  quantity: number;
  description: string;
  
  sizes: Size[];
  price:number;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  category,
  user,
  quantity,
  description,
  price,
  sizes,
}) => {
  return (
    <div
      className=" 
    md:col-span-4 
    flex flex-col 
   
    gap-5
    w-
    px-1
    py-1
    "
    >
      <div className="text-xl flex flex-row font-semibold gap-3 ">
        <div>Sold by - {user.name}</div>
        <Avatar src={user.image} />
      </div>
      <div className="font-light text-md">{description}</div>
      <div className="flex flex-row items-center gap-2">
        <span className="">Availaibes Sizes:</span>
        <div className="flex flex-row gap-3 items-center">
          {sizes &&
            sizes.map((item) => (
              <div
              key={item.id}
                className="
                  p-1 
                  font-light 
                  flex 
                  items-center 
                  bg-amber-100 
                  border-[1px] 
                  border-amber-300
                  rounded-lg
                  px-2 
                  hover:cursor-default
               "
              >
                {item.name}
              </div>
            ))}
        </div>
      </div>

      <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
        <div className="text-md">
          <span className="font-semibold">{quantity}</span> in Inventory!
        </div>
      </div>
      <hr className=" border-amber-400/70 border-[2px] rounded-xl" />
      <div className="flex felx-row font-light text-neutral-500 justify-between items-center">
        {category && (
          <ProductCategory
            icon={category.icon}
            label={category.label}
            description={category.description}
          />
        )}
        <div className="text-2xl text-neutral-900 pr-3">
          ${price}
        </div>
      </div>
      <hr className=" border-amber-400/70 border-[2px] rounded-xl" />
    </div>
  );
};

export default ProductInfo;
