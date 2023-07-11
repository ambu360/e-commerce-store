import {create} from 'zustand'
import { SafeProduct } from '../types';

interface CartProps {
    isOpen:boolean;
    onOpen:()=>void;
    onClose:()=>void;
    products?:SafeProduct[]
}

const useCartHook = create<CartProps>((set)=>({
    isOpen:false,
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false}),
}))


export default useCartHook;