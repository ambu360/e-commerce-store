import getCurrentUser from "./actions/getCurrentUser";
import getProducts from "./actions/getProductss";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/products/ListingCard";

export default async function Home() {
  const products = await getProducts();
  const currentUser = await getCurrentUser();
  console.log(products);
  if (products.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div
          className="
          pt-52
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
          {products.map((product) => {
            return (
              <ListingCard
                key={product.id}
                data={product}
                currentUser={currentUser}
              />
            );
          })}
        </div>
      </Container>
    </ClientOnly>
  );
}
