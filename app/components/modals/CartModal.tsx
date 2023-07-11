'use client'

import useCartHook from "@/app/hooks/useCartHook"
import Modal from "./Modal"
import Heading from "../Heading"
import { useState } from "react"
import { SafeUser } from "@/app/types"

interface CartModalProps {
    currentUser?:SafeUser | null;
}

const CartModal:React.FC<CartModalProps> = ({
    currentUser
}) =>{
    const cartDiv = useCartHook()
    const [isLoading,setIsLoading] = useState(false)
    let bodyContent = (
        <div>
             <Heading title="Cart Items" subTitle="Here are your items!!" />
        </div>
    )

    return (
       <Modal
       disabled={isLoading}
       isOpen={cartDiv.isOpen}
        actionLabel="Cart"
        onSubmit={()=>{}}
        onClose={cartDiv.onClose}
        title={`${currentUser?.name}'s shopping cart`}
        body={bodyContent}
       />
    )
}

export default CartModal;