"use client";

import Container from "../components/Container";
import Heading from "../components/Heading";
import UserProducts from "../components/profile/UserProducts";
import { SafeProduct, SafeUser } from "../types";

interface ProfileProps {
  userProducts: SafeProduct[];
  currentUser?: SafeUser;
}

const ProfileClient: React.FC<ProfileProps> = ({
  userProducts,
  currentUser,
}) => {
  return (
    <Container>
      <Heading
        title={`${currentUser ? `${currentUser.name}'s` : "Your"} Profile`}
        subTitle="view your profile"
      />
      <div
        className="
        bg-neutral-200/20
            flex 
            flex-col 
            border-[2px] 
          border-amber-400/50
            rounded-2xl 
            hover:rounded-md
            tansition
            duration-300
            mt-2
            px-4
            py-3 "
      >
        <span className="text-2xl font-medium text-neutral-700">
          Products sold by you{" "}
        </span>
        <UserProducts userProducts={userProducts} currentUser={currentUser} />
      </div>
    </Container>
  );
};

export default ProfileClient;
