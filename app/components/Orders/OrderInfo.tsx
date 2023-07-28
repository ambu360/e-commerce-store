import OrderItemWithProduct from "@/app/Orders/OrdersClient";
import { SafeProduct } from "@/app/types";
import { OrderItem } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface OrderInfoProps {
  item: OrderItem & { product: SafeProduct };
}

const OrderInfo: React.FC<OrderInfoProps> = ({ item }) => {
  const router = useRouter();
  return (
    <div
      className="
    grid  
    grid-cols-3
    grid-rows-2 
    md:grid-rows-none 
    md:grid-cols-3 
    items-center 
    gap-y-2
    gap-x-8
    md:gap-x-2
    md:gap-y-6 
    justify-center 
    w-full 
    py-2"
    >
      <div className="row-span-2 col-span-2 md:col-span-1 flex justify-start md:pl-10 lg:pl-16">
        <div className=" flex flex-row items-center gap-2 justify-center  ">
          <span className=" rounded-md group">
            <Image
              alt="product image"
              src={item.product.image}
              width={80}
              height={150}
              className="
              rounded-md 
              hover:cursor-pointer 
              transition 
              group-hover:scale-105 "
            />
          </span>
          <span
            className="
            font-semibold 
            text-md 
            md:text-lg 
            hover:cursor-pointer 
            transition 
            hover:scale-105
            text-neutral-700"
            onClick={() => router.push(`/products/${item.product.id}`)}
          >
            {item.product.name}
          </span>
        </div>
      </div>
      <div className="flex flex-row justify-start md:justify-center items-center gap-2 md:row-span-2">
        <span className="text-sm lg:text-md">Quantity:</span>
        <span className="font-semibold text-neutral-800 text-md lg:text-lg">
          {item.quantity}
        </span>
      </div>
      <div className="flex flex-row gap-2 justify-start md:justify-center items-center md:row-span-2">
        <span className="text-sm lg:text-md">size:</span>
        <span className="font-semibold text-neutral-800 text-md lg:text-lg">
          {item.size}
        </span>
      </div>
    </div>
  );
};

export default OrderInfo;
