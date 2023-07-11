"use client";

import { SafeProduct, SafeUser } from "@/app/types";
import Image from "next/image";
import HeartButton from "../HeartButton";
import { useRouter } from "next/navigation";

interface ListingCardProps {
  data: SafeProduct;
  currentUser?: SafeUser | null;
}
const ListingCard: React.FC<ListingCardProps> = ({ data, currentUser }) => {
  const router = useRouter();
  return (
    <div className="cols-span-1 cursor-pointer group">
      <div
        onClick={() => router.push(`/products/${data.id}`)}
        className="flex flex-col gap-2 w-full"
      >
        <div
          className="
                    aspect-square
                    w-full
                    relative
                    overflow-hidden
                    rounded-xl
                "
        >
          <Image
            fill
            alt="listing"
            src={data.image}
            className=" 
                        object-cover
                        h-full
                        w-full
                        group-hover:scale-110
                        transition
                        "
          />
          <div className="absolute top-3 right-3">
            <HeartButton id={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="flex flex-row justify-between px-1 items-center">
          <div className="font-medium text-md">{data.name}</div>

          <div className="font-light">${data.price}</div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
