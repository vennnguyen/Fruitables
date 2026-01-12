import { prisma } from "config/client";

const getDetailCartService = async (id: number) => {
  const cartDetail = await prisma.cartDetail.findMany({
    where: {
      cartId: id,
    },
    include: {
      product: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
  if (cartDetail) return cartDetail;
  return [];
};

const deleteCartItemService = async (id: string, user: Express.User) => {
  // Xoá cartDetail
  await prisma.cartDetail.delete({
    where: { id: +id },
  });

  // Tính tổng quantity còn lại trong cart
  const cartSummary = await prisma.cartDetail.aggregate({
    where: {
      cartId: user.cartId, // id giỏ hàng
    },
    _sum: {
      quantity: true,
    },
  });

  //Nếu không còn sản phẩm → xoá cart
  if (!cartSummary._sum.quantity || cartSummary._sum.quantity < 1) {
    await prisma.cart.delete({
      where: { id: user.cartId },
    });
  }
};

const updateCartBeforeCheckout = async (
  data: {
    id: string;
    quantity: string;
  }[],
  cardId: string
) => {
  let quantity = 0;
  data.map(async (item, index) => {
    quantity += +data[index].quantity;
    await prisma.cartDetail.update({
      where: { id: +item.id },
      data: { quantity: +item.quantity },
    });
  });
  console.log(cardId);

  // update cart sum
  await prisma.cart.update({
    where: { id: +cardId },
    data: {
      sum: quantity,
    },
  });
};

export {
  getDetailCartService,
  deleteCartItemService,
  updateCartBeforeCheckout,
};
