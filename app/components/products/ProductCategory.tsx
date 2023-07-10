'use client'

import { IconType } from "react-icons"

interface ProductCategoryProps {
    icon:IconType;
    label:string;
    description:string;
}

const ProductCategory:React.FC<ProductCategoryProps> = ({
    icon:Icon,
    label,
    description
}) =>{

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-row items-center gap-4  hover:text-amber-600/90 hover:cursor-pointer">
                <Icon size={40} className=""/>
                <div className="flex flex-col">
                    <div className="text-lg font-semibold">
                        {label}
                    </div>
                    <div className="text-neutral-500  text-md font-light">
                        {description}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ProductCategory