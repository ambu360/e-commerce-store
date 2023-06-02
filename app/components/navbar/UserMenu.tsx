'use client';
import Avatar from '../Avatar'
import { useState, useCallback} from "react";
import {AiOutlineMenu} from 'react-icons/ai'
const UserMenu = () =>{
    const [isOpen,setIsOpen] = useState<boolean>(false);
    
    const toggleOpen = useCallback(()=>{
        setIsOpen((value)=>!value)
    },[])
    
    return (
        <div className='relative'>
            <div className= 'flex flex-row items-center gap-3'>
                <div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-amber-300 transition cursor-pointer">
                <AiOutlineMenu/>
                </div>
                <div className="hidden md:block">
                <Avatar/>
                </div>
            </div>
        </div>
    )
}

export default UserMenu