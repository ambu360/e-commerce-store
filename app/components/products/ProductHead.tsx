"use client";

import { SafeUser } from "@/app/types";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";

interface ProductHeadProps {
  title: string;
  imageSrc: string;
  id: string;
  brand: string;
  currentUser?: SafeUser | null;
}
const ProductHead: React.FC<ProductHeadProps> = ({
  title,
  imageSrc,
  id,
  brand,
  currentUser,
}) => {
  return (
    <>
      <Heading title={title.toUpperCase()} subTitle={brand} />
      <hr className=" border-amber-400/70 border-[2px] rounded-xl" />
      <div
        className="
    
            h-[35vh]
            w-[30vh]
            md:h-[30vh] 
            md:w-[25vh]
            lg:h-[50vh]
            lg:w-[45vh]
            overflow-hidden
            mt-2
            relative
        "
      >
        <Image
          alt="product image"
          src={imageSrc}
          fill
          className=" object-fit rounded-xl  h-fit  transition hover:scale-105 hover cursor-pointer"
          sizes=" (max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-5 right-5">
          <HeartButton id={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ProductHead;
