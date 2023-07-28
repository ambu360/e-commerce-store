import getCurrentUser from "../actions/getCurrentUser";
import getOrders from "../actions/getOrder";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import prisma from "@/app/libs/prismadb";
import OrdersClient from "./OrdersClient";
import { Order, OrderItem } from "@prisma/client";

const OrdersPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="please login" />
      </ClientOnly>
    );
  }

  const orders = await getOrders();
  if (!orders || orders.length === 0) {
    return (
      <ClientOnly>
        <EmptyState title="No orders" subtitle="Want to place one?" />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <OrdersClient orders={orders} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default OrdersPage;
