"use client";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useFavorite from "../hooks/useFavorite";
import { SafeUser } from "../types";

interface HeartButtonProps {
  id: string;
  currentUser?: SafeUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({ id, currentUser }) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    productId: id,
    currentUser,
  });
  return (
    <div
      onClick={toggleFavorite}
      className="
            relative
            hover:opacity-80
            group
            transition
            cursor-pointer
        "
    >
      <AiOutlineHeart
        size={28}
        className="
                    fill-white
                    absolute
                    -top-[2px]
                    -right-[2px]
                    group-hover:scale-110
                "
      />
      <AiFillHeart
        size={24}
        className={`${hasFavorited ? "fill-amber-500/80" : "fill-neutral-500/70"}`}
      />
    </div>
  );
};

export default HeartButton;
