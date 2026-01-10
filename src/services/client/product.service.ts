import { prisma } from "config/client";

const getAllProductService = async () => {
  return await prisma.product.findMany();
};

const getProductDetailService = async (id: string) => {
  return await prisma.product.findUnique({ where: { id: +id } });
};
const postProductToCartService = async (
  quantity: number,
  productId: number,
  user: Express.User
) => {
  const product = await prisma.product.findUnique({ where: { id: productId } });
  const cart = await prisma.cart.findUnique({
    where: {
      id: user.id,
    },
  });
  if (cart) {
  } else {
    await prisma.cart.create({
      data: {
        sum: quantity,
        userId: user.id,
        cartDetails: {
          create: [
            {
              price: product.price,
              quantity: quantity,
              productId: productId,
            },
          ],
        },
      },
    });
  }
};
export { getAllProductService, getProductDetailService };
