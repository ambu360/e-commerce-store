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
  tags: string[];
  sizes: Size[];
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  category,
  user,
  quantity,
  description,
  tags,
  sizes,
}) => {
  return (
    <div
      className=" 
    md:col-span-4 
    flex flex-col 
    gap-6 
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
        {/* {tags.length > 0 && (
          <div className="grid grid-cols-4 md:grid-cols-4 gap-4 items-center  ">
            {tags.map((tag) => (
              <div
                className="flex 
              justify-center 
              items-center 
              bg-amber-200 
              px-4
              py-1 
              rounded-lg 
              text-xs
              font-semibold 
              hover:bg-amber-500 
              hover:text-neutral-50 
              hover:cursor-pointer"
              >
                {tag}
              </div>
            ))}
          </div>
        )} */}
      </div>
      <hr className=" border-amber-400/70 border-[2px] rounded-xl" />
      <div className="flex felx-row font-light text-neutral-500">
        {category && (
          <ProductCategory
            icon={category.icon}
            label={category.label}
            description={category.description}
          />
        )}
      </div>
      <hr className=" border-amber-400/70 border-[2px] rounded-xl" />
    </div>
  );
};

export default ProductInfo;
