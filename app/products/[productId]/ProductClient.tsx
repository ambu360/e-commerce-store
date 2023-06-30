"use client";
import Container from "@/app/components/Container";
import { categories } from "@/app/components/navbar/Categories";
import ProductHead from "@/app/components/products/ProductHead";
import ProductInfo from "@/app/components/products/ProductInfo";
import { SafeProduct, SafeUser } from "@/app/types";
import { Category } from "@prisma/client";
import { data } from "autoprefixer";
import { useMemo } from "react";

interface ProductClientProps {
  product: SafeProduct & {
    user: SafeUser;
    category: Category;
  };
  currentUser?: SafeUser | null;
}

const ProductClient: React.FC<ProductClientProps> = ({
  product,
  currentUser,
}) => {
  const category = useMemo(() => {
    return categories.find(
      (category) => category.label === product.category.name
    );
  }, [categories, product]);

  return (
    <Container>
      <div
        className="
        h-full
        pt-28 
    md:mb-2
        max-w-screen 
        justify-center
        md:justify-start
        grid 
        items-center 
        md:grid-cols-2
        gap-4
        whitespace-normal
        overflow-y-none
        "
      >
        <div
          className="
            flex
            justify-center
            w-full
            py-3
            md:px-1
            "
        >
          <div className="flex flex-col w-full  gap-4 md:gap-4 lg:gap-6 md:pl-3">
            <ProductHead
              title={product.name}
              imageSrc={product.image}
              id={product.id}
              currentUser={currentUser}
              brand={product.brand}
            />
            <div
              className=" 
                grid
                grid-cols-1
                md:grid-cols-4
                md:gap-10
                mt-6
            "
            >
              <ProductInfo
                user={product.user}
                category={category}
                description={product.description}
                quantity={product.currentInventory}
              />
            </div>
          </div>
        </div>
        <div
          className="
            w-full
            flex
            py-3
            md:px-5
            justify-center
            md:justify-end
            "
        >
          recomended
        </div>
      </div>
    </Container>
  );
};

export default ProductClient;
