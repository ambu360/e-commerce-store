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
import { useRouter } from "next/navigation";
import { RiShoppingCart2Fill } from "react-icons/ri";
import useCartHook from "@/app/hooks/useCartHook";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const sellModal = useSellModal();
  const cartDiv = useCartHook();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const innerRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  useEffect(() => {
    const handleClickOutsideRef = (event: MouseEvent) => {
      if (
        innerRef.current &&
        !innerRef.current.contains(event.target as Node) &&
        outerRef.current &&
        !outerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutsideRef);
  }, [innerRef]);
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3 bg-[#fcf9f3] justify-between rounded-full  py-3 px-4  shadow-sm hover:shadow-md">
        <span
          className="hidden md:block text-sm font-semibold py-3 px-3 rounded-full hover:bg-amber-200 transition cursor-pointer "
          onClick={() => cartDiv.onOpen()}
        >
          <RiShoppingCart2Fill size={18} className="text-neutral-600" />
        </span>
        <div
          ref={outerRef}
          onClick={toggleOpen}
          className="hidden md:block text-sm font-semibold py-3 px-3 rounded-full hover:bg-amber-200 transition cursor-pointer"
        >
          <AiOutlineMenu />
        </div>
        <div className="hidden md:block  px-3 hover:cursor-pointer">
          <Avatar src={currentUser?.image} />
        </div>
      </div>
      {isOpen && (
        <div
          ref={innerRef}
          className="absolute mt-2 z-10 rounded-xl shadow-md w-[60vw] md:w-5/6 bg-white overflow-hidden right-0 top-12 text-sm"
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  label={`${currentUser?.name}'s profile`}
                  onClick={() => router.push('/profile')}
                />
                <MenuItem label="Orders" onClick={() => router.push('/Orders')} />
                <MenuItem
                  label="favourties"
                  onClick={() => router.push("/favorites")}
                />
                <MenuItem label="Sell an Item" onClick={sellModal.onOpen} />
                <hr className="border-amber-400" />
                <MenuItem
                  label="signOut"
                  onClick={() => signOut()}
                  isSignOut={true}
                />
              </>
            ) : (
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
