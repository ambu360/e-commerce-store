import getCurrentUser from "@/app/actions/getCurrentUser";
import getProductById from "@/app/actions/getProductbyId";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import ProductClient from "./ProductClient";
import { useCallback } from "react";
import axios from 'axios'
import toast from "react-hot-toast";
interface IParams {
  productId?: string;
}

const ProductPage = async ({ params }: { params: IParams }) => {
  const currentUser = await getCurrentUser();
  const product = await getProductById({ params });

  if (!product) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  
  return (
    <ClientOnly>
      <ProductClient product={product} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default ProductPage;
