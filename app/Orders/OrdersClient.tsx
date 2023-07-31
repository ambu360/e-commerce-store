"use client";
import { Order, OrderItem } from "@prisma/client";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeUser, SafeOrder, SafeProduct } from "../types";
import OrderHead from "../components/Orders/OrderHead";
import OrderInfo from "../components/Orders/OrderInfo";

export type OrderItemWithProduct = OrderItem & { product: SafeProduct };

// Define the type for a single order with updated orderDate and items
type OrderWithItems = SafeOrder & { items: OrderItemWithProduct[] };

// Define the prop types for the OrdersClient component
interface OrderProps {
  orders: OrderWithItems[] | null;
  currentUser?: SafeUser | null;
}

const OrdersClient: React.FC<OrderProps> = ({ orders, currentUser }) => {
  return (
    <Container>
      <Heading
        title={`${currentUser ? `${currentUser.name}'s` : "Your"} Orders!`}
        subTitle="View your order history"
      />
      <div className=" flex flex-col  gap-4 ">
        {orders &&
          orders.map((order) => (
            <div
              key={order.id}
              className="
              border-[2px] 
              bg-[#EDEBE8]
              border-amber-500 
              rounded-lg 
              flex 
              flex-col 
              px-4 
              py-2 
              mt-4 
              hover:shadow-xl"
            >
              <div>
                <OrderHead
                  id={order.id}
                  orderDate={order.orderDate}
                  status={order.status}
                />

                <div className="  flex flex-col justify-center items-center pt-2 w-full">
                  {order.items &&
                    order.items.map((item) => <OrderInfo item={item} />)}
                </div>
              </div>
            </div>
          ))}
      </div>
    </Container>
  );
};

export default OrdersClient;
