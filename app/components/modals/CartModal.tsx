"use client";

import useCartHook from "@/app/hooks/useCartHook";
import Modal from "./Modal";
import Heading from "../Heading";
import { useState } from "react";
import { SafeProduct, SafeUser } from "@/app/types";
import { Cart } from "@prisma/client";
import Image from "next/image";

interface CartModalProps {
  currentUser?: SafeUser | null;
  cart:
    | (Cart & {
        Products?: SafeProduct[];
      })
    | null;
}

const CartModal: React.FC<CartModalProps> = ({ currentUser, cart }) => {
  const cartDiv = useCartHook();
  const [isLoading, setIsLoading] = useState(false);
  let bodyContent = (
    <div>
      <Heading title="Cart Items" subTitle="Here are your items!!" />
      {cart?.Products && (
        <div className=" flex flex-col gap-2 items-center mt-3 ">
          {cart.Products?.map((item) => (
            <div
              key={item.id}
              className=" 
                    flex 
                    flex-row 
                    items-center 
                    justify-between border-[1px] 
                    px-3 py-2
                    w-full
                    rounded-lg "
            >
                <span>
                    <Image
                        alt='product image'
                        src={item.image}
                        width={60}
                        height={80}
                        className="rounded-lg"
                    />
                </span>
              <span>{item.name}</span>
              <span>{}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={cartDiv.isOpen}
      actionLabel="Cart"
      onSubmit={() => {}}
      onClose={cartDiv.onClose}
      title={`${currentUser?.name}'s shopping cart`}
      body={bodyContent}
    />
  );
};

export default CartModal;
