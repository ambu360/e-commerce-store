import getCurrentUser from "@/app/actions/getCurrentUser";
import getProductById from "@/app/actions/getProductbyId";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import ProductClient from "./ProductClient";

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
