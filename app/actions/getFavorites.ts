import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export async function getFavorites() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const favlistings = await prisma.product.findMany({
      where: {
        id: { in: [...(currentUser.favoriteId || [])] },
      },
    });

    const safeFaveoriteListings = favlistings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeFaveoriteListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
