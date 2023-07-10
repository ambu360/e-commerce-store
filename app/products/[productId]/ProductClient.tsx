"use client";
import Button from "@/app/components/Button";
import Container from "@/app/components/Container";
import { categories } from "@/app/components/navbar/Categories";
import ProductHead from "@/app/components/products/ProductHead";
import ProductInfo from "@/app/components/products/ProductInfo";
import { SafeProduct, SafeUser } from "@/app/types";
import { Category, Size } from "@prisma/client";
import { useMemo } from "react";

interface ProductClientProps {
  product: SafeProduct & {
    user: SafeUser;
    category: Category;
    sizes:Size[]
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
        pt-20
        md:pt-24
        md:mb-2
        max-w-screen 
        justify-center
        md:justify-start
        grid 
        items-center 
        md:grid-cols-3
        gap-4
        whitespace-normal
        overflow-y-none
        "
      >
        <div
          className="
            flex
            justify-center
            md:col-span-2
            w-fit
            py-3
            md:px-1
            "
        >
          <div className="flex flex-col md:flex-row w-full  gap-4 md:gap-6 lg:gap-8 md:pl-3">
            <div className="flex flex-col gap-2">
            <ProductHead
              title={product.name}
              imageSrc={product.image}
              id={product.id}
              currentUser={currentUser}
              brand={product.brand}
            />
            </div>
            <div
              className=" 
               flex
                flex-col
                mt-6
                justify-center
                items-center
                gap-4
                
            "
            >
              <ProductInfo
                user={product.user}
                category={category}
                description={product.description}
                quantity={product.currentInventory}
                tags={product.tags}
                sizes = {product.sizes}
              />
            
            <div className="w-full mt-3">
              <Button
                onClick={()=>{}}
                label="Add to cart"
              />
            </div>
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
