"use client";

import { SafeUser } from "@/app/types";
import { Category } from "@prisma/client";
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
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  category,
  user,
  quantity,
  description,
}) => {
  return (
    <div className=" col-span-4 flex flex-col gap-4 ">
      <div className="text-xl flex flex-row font-semibold gap-3">
        <div>Sold by - {user.name}</div>
        <Avatar src={user.image} />
      </div>
      <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
        <div>{quantity} in Inventory!</div>
      </div>
      <hr className=" border-amber-500/80"/>
      <div className="flex felx-row font-light text-neutral-500">
           {category && (
            <ProductCategory 
                icon={category.icon}
                label={category.label}
                description={category.description}
            />
           )}
      </div>
    </div>
  );
};

export default ProductInfo;
