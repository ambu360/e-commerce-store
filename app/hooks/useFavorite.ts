import { useRouter } from "next/navigation";
import { SafeUser } from "../types";
import useLoginModal from "./useLoginModal";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import getCurrentUser from "../actions/getCurrentUser";

interface IUseFavorite {
  productId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({ productId, currentUser }: IUseFavorite) => {
  const router = useRouter();

  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteId || [];

    return list.includes(productId);
  }, [currentUser, productId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (!currentUser) {
        return loginModal.onOpen();
      }
      try {
        let request;

        if (hasFavorited) {
          console.log(hasFavorited)
          request = () => axios.delete(`/api/favorites/${productId}`);
        } else {
          request = () => axios.post(`/api/favorites/${productId}`);
        }

        await request();
        router.refresh();
        toast.success("Success");
      } catch (error) {
        toast.error("something went wrong");
      }
    },
    [currentUser, loginModal, router, hasFavorited, productId]
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite
