"use client";
import Search from "./Search";
import Logo from "./Logo";
import Container from "../Container";
import React from "react";
import UserMenu from "./UserMenu";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { User } from "@prisma/client";
import { SafeUser } from "@/app/types";
import Categories from "./Categories";
interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className="fixed w-full bg-[#EDEBE8] z-10 shadow-sm shadow-amber-400">
      <div className="py-2 ">
        <Container>
          <div
            className="
                        flex
                        flex-row
                        items-center
                        justify-between
                        gap-3
                        md:gap-0
                    "
          >
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
};

export default Navbar;
