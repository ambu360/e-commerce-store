"use client";
import Avatar from "../Avatar";
import { useState, useCallback, useRef, useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import MenuItem from "./MenuItem";
const UserMenu = () => {
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
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-amber-300 transition cursor-pointer"
        >
          <AiOutlineMenu />
        </div>
        <div className="hidden md:block">
          <Avatar />
        </div>
      </div>
      {isOpen && (
        <div ref={innerRef} className="absolute mt-2 rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            <>
              <MenuItem onClick={() => {}} label="sign In" />
              <MenuItem onClick={() => {}} label="sign up" />
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
