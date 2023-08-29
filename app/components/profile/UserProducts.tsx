"use client";

import { SafeProduct, SafeUser } from "@/app/types";
import ListingCard from "../products/ListingCard";
import Button from "../Button";
import { BsFillTrash3Fill } from "react-icons/bs";
import { useCallback } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
interface UserProductsProps {
  userProducts: SafeProduct[];
  currentUser?: SafeUser;
}

const UserProducts: React.FC<UserProductsProps> = ({
  userProducts,
  currentUser,
}) => {
  const router = useRouter();
  const handleDelete = useCallback(
    (productId: string, creatorId: string) => {
      if (creatorId === currentUser?.id) {
        axios
          .delete(`/api/listings/${productId}`)
          .catch((error) => {
            toast.error("error");
          })
          .finally(() => {
            toast.success("deleted");
            router.refresh();
          });
      }
    },
    [router, userProducts, currentUser]
  );

  return (
    <div
      className="w-full 
    grid 
    grid-cols-1
    sm:grid-cols-2
    md:grid-cols-3
    lg:grid-cols-4
    xl:grid-cols-5
    2xl:grid-cols-6
    gap-8 
    pt-3
    "
    >
      {userProducts.map((item) => (
        <div className="flex flex-col  gap-1 justify-around">
          <ListingCard
            key={item.id}
            data={item}
            currentUser={currentUser}
            actionLabel="Delete"
            onAction={() => {}}
          />
          <div className="flex flex-row gap-2">
            <Button label="update" onClick={() => {}} outline />
            {item.isActive ? (
              <Button
                label="Delete"
                onClick={() => handleDelete(item.id, item.userId)}
                icon={BsFillTrash3Fill}
              />
            ) : (
              <Button label="Activate" onClick={() => {}} />
            )}
            {/* <Button label="Delete" onClick={() => handleDelete(item.id,item.userId)} icon={BsFillTrash3Fill} /> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserProducts;
