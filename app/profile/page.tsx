import { useRouter } from "next/navigation";
import getCurrentUser from "../actions/getCurrentUser";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import useLoginModal from "../hooks/useLoginModal";
import { getUserProducts } from "../actions/getUserProducts";
import ProfileClient from "./ProfileClient";

const ProfilePage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="please login" />
      </ClientOnly>
    );
  }

  const userProducts = await getUserProducts();
  

  return (
    <ClientOnly>
        <ProfileClient userProducts={userProducts} currentUser={currentUser}/>
    </ClientOnly>
  );
};

export default ProfilePage;
