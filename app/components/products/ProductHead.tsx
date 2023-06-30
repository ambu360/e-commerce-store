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
      <hr className=" border-amber-500/70"/>
      <div
        className="
    
            h-[35vh]
            w-[30vh]
            md:h-[30vh] 
            md:w-[25vh]
            lg:h-[50vh]
            lg:w-[45vh]
            overflow-hidden
            md:ml-5
            relative
        "
      >
        <Image
          alt="product image"
          src={imageSrc}
          fill
          className=" object-fit rounded-xl  h-fit  "
        />
        <div className="absolute top-5 right-5">
          <HeartButton id={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ProductHead;
