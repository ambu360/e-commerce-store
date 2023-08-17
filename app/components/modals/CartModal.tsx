"use client";

import useCartHook from "@/app/hooks/useCartHook";
import Modal from "./Modal";
import Heading from "../Heading";
import { useCallback, useEffect, useState } from "react";
import { SafeProduct, SafeUser } from "@/app/types";
import { Cart, CartItem } from "@prisma/client";
import { FaTrash, FaPlus, FaMinus } from "react-icons/Fa";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

interface CartModalProps {
  currentUser?: SafeUser | null;
  cart: {
    id: string;
    userId: string;
    cartItems: {
      id: string;
      productId: string;
      cartId: string;
      size: string;
      Quantity: number;
      product: {
        createdAt: string;
        id: string;
        name: string;
        image: string;
        price: number;
        brand: string;
        tags: string[];
        categoryID: string;
        currentInventory: number;
        description: string;
        userId: string;
      };
    }[];
  } | null;
}

const CartModal: React.FC<CartModalProps> = ({ currentUser, cart }) => {
  const cartModel = useCartHook()
  const router = useRouter();
  const cartDiv = useCartHook();
  const [isLoading, setIsLoading] = useState(false);
  const [cartItems, setCartItems] = useState(cart?.cartItems);
  const [totalPrice,setTotalPrice] = useState(0)

  //place order 

  const handleOrderSubmit = useCallback(()=>{
    try{
      setIsLoading(true)
      if(cart && cart.cartItems.length !== 0){
        axios.post('/api/orders')
        .then(()=>{
          router.push('/')
          cartModel.onClose()
          toast.success('order placed')
          deleteCart(cart.id)
        
        }).catch((error)=>{
          toast.error('something went wrong')
        }).finally(()=>{
          setIsLoading(false)
        })
      }
    }catch(error:any){
      toast.error(error.message)
    }
  },[cart,cartModel,router])

  //delete cart if order placed

  const deleteCart = useCallback((id:string)=>{
    axios.delete(`/api/orders/${id}`)
    .then(()=>{
      router.refresh()
    }).catch((error)=>{
      toast.error('something went wrong')
    })
  },[router])

  //reroute to product
  const handleProductRoute = useCallback(
    (id: string) => {
      router.push(`/products/${id}`);
      cartDiv.onClose();
    },
    [router, cartDiv, cart?.cartItems]
  );

  //handle deleteting a cartItem
  const onDelete = useCallback(
    (id: string) => {
      setIsLoading(true);
      axios
        .delete(`/api/cartItem/${id}`)
        .then(() => {
          toast.success("Item deleted");
          router.refresh();
        })
        .catch((error) => {
          toast.error("Something whent wrong");
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [isLoading, router]
  );

  const onUpdate = useCallback(
    (id: string, q: number) => {
      setIsLoading(true);
      axios
        .post(`/api/cartItem/${id}`, q)
        .then(() => {
          toast.success("updated");
          router.refresh();
        })
        .catch((error) => {
          toast.error("something went wrong");
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [isLoading, router]
  );

  const onAdd = useCallback(
    (id: string, item: CartItem) => {
      onUpdate(id, item.Quantity + 1);
    },
    [cart]
  );

  const onReduce = useCallback((id: string, item: CartItem) => {
    if (item.Quantity > 1) {
      onUpdate(id, item.Quantity - 1);
    }
  }, []);

  //update total price
  useEffect(() => {
    if (cart && cart.cartItems.length > 0) {
      const total = cart.cartItems.reduce(
        (acc, item) => acc + item.Quantity * item.product.price,
        0
      );
      setTotalPrice(total);
    }
     else {
      setTotalPrice(0);
    }
  }, [cart?.cartItems]);


  let bodyContent;
  if (!cart || cart.cartItems.length === 0) {
    bodyContent = (
      <div>
        <Heading title="Empty Cart" subTitle="Add some products!" />
      </div>
    );
  } else {
    bodyContent = (
      <div>
        <Heading title="Cart Items" subTitle="Here are your items!!" />
        {cart?.cartItems && (
          <div className=" flex flex-col gap-2 items-center mt-3 ">
            {cart.cartItems.map((item) => (
              <div key={item.id} className="grid grid-cols-5 gap-6 border-b-[2px] border-amber-600/70 items-center  py-3  ">
                <div
                  onClick={() => {
                    handleProductRoute(item.productId);
                  }}
                >
                  <Image
                    alt={item.product.name}
                    src={item.product.image}
                    width={100}
                    height={120}
                    className="
                     border-[1px]
                     border-neutral-700
                     hover:border-amber-400
                     hover:cursor-pointer
                     w-full
                     rounded-lg
                   "
                  />
                </div>
                <div className="col-span-3 grid  w-full grid-row-2">
                  <span className=" text-2xl">{item.product.name}</span>
                  <div className="flex flex-row gap-4 py-2">
                    <span className="text-neutral-500 cols-span-1">
                      {item.size}
                    </span>
                    <div className="flex flex-row gap-4 md:gap-6 items-center">
                      <span onClick={() => onReduce(item.id, item)}>
                        <FaMinus
                          size={20}
                          className="text-neutral-500 hover:text-orange-400 hover:cursor-pointer"
                        />
                      </span>
                      <span className="text-lg font-semibold">
                        {item.Quantity}
                      </span>
                      <span
                        onClick={() => {
                          onAdd(item.id, item);
                        }}
                      >
                        <FaPlus
                          size={20}
                          className="text-neutral-500 hover:text-green-600 hover:cursor-pointer"
                        />
                      </span>
                      <span onClick={() => onDelete(item.id)}>
                        <FaTrash
                          size={20}
                          className="text-rose-400 hover:text-rose-600 hover:cursor-pointer"
                        />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center items-center text-2xl text-neutral-950">
                  ${item.Quantity * item.product.price}
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="grid grid-cols-5 justify-center items-center pt-3 gap-6">
                        <div className="flex justify-center items-center col-span-4 text-xl ">Total Price:</div>
                        <div className="flex justify-center items-center text-2xl font-light">${totalPrice}</div>
        </div>
      </div>
    );
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={cartDiv.isOpen}
      actionLabel="Checkout"
      onSubmit={() => {handleOrderSubmit()}}
      onClose={cartDiv.onClose}
      title={`${currentUser?.name}'s shopping cart`}
      body={bodyContent}
    />
  );
};

export default CartModal;
