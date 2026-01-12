import { prisma } from "config/client";

const productFilter = async (minPrice: string[]) => {
  return await prisma.product.findMany({
    where: {
      factory: {
        in: minPrice,
      },
    },
  });
};
export { productFilter };
