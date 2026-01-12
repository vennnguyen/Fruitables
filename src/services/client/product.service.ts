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
      userId: user.id,
    },
  });
  console.log("CHECK: ", cart);

  if (cart) {
    // cập nhật giỏ hàng
    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        sum: {
          increment: quantity,
        },
      },
    });
    const cartDetails = await prisma.cartDetail.findFirst({
      where: {
        cartId: cart.id,
        productId: productId,
      },
    });
    await prisma.cartDetail.upsert({
      where: {
        id: cartDetails?.id ?? 0,
      },
      update: {
        quantity: {
          increment: quantity,
        },
      },
      create: {
        cartId: cart.id,
        price: product.price,
        quantity,
        productId: productId,
      },
    });
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
export {
  getAllProductService,
  getProductDetailService,
  postProductToCartService,
};
