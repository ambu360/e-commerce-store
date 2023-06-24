"use client";
import Avatar from "../Avatar";
import { useState, useCallback, useRef, useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeUser } from "@/app/types";
import { signOut } from "next-auth/react";
import useSellModal from "@/app/hooks/useSellModal";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu:React.FC<UserMenuProps> = ({
  currentUser
}) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal()
  const sellModal = useSellModal()

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const innerRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  useEffect(()=>{
    const handleClickOutsideRef=(event: MouseEvent) =>{
        if (innerRef.current && !innerRef.current.contains(event.target as Node) && outerRef.current &&!outerRef.current.contains(event.target as Node)) {
            setIsOpen(false);
          }
    }
    document.addEventListener("mousedown", handleClickOutsideRef);
  },[innerRef])
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3 rounded-full border-b-[1px] py-3 px-4 shadow-sm hover:shadow-md">
        <div ref={outerRef}
          onClick={toggleOpen}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-amber-200 transition cursor-pointer"
        >
          <AiOutlineMenu />
        </div>
        <div className="hidden md:block">
          
          <Avatar src={currentUser?.image}/>
        </div>
      </div>
      {isOpen && (
        <div ref={innerRef} className="absolute mt-2 rounded-xl shadow-md w-[60vw] md:w-5/6 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser?(
              <>
               <MenuItem
                  label={`${currentUser?.name}'s profile`}
                  onClick={()=>{}}
                />
                <MenuItem 
                  label='Orders'
                  onClick={()=>{}}
                />
                <MenuItem
                  label='favourties'
                  onClick={()=>{}}
                />
                <MenuItem
                  label='Sell an Item'
                  onClick={sellModal.onOpen}
                />
                <hr/>
                <MenuItem 
                  label='signOut'
                  onClick={()=>signOut()}
                  isSignOut={true}
                />
              </>
            ):(
              <>
                <MenuItem onClick={loginModal.onOpen} label="login" />
                <MenuItem onClick={registerModal.onOpen} label="sign up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
