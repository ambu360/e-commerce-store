import getCurrentUser from "../actions/getCurrentUser";
import { getFavorites } from "../actions/getFavorites";
import ClientOnly from "../components/ClientOnly";
import Container from "../components/Container";
import EmptyState from "../components/EmptyState";
import ListingCard from "../components/products/ListingCard";

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="please login" />
      </ClientOnly>
    );
  }

  const favListings = await getFavorites();
  if (favListings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title={`No favorites for ${
            currentUser ? `${currentUser.name}` : "you"
          }`}
          subtitle="Go ahead and favorite a listing"
        />
      </ClientOnly>
    );
  }
  return (
    <Container>
      <div
        className="
                pt-28
                grid
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
                2xl:grid-cols-6
                gap-8
            "
      >
        {favListings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavoritesPage;
