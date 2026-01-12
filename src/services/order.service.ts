import { prisma } from "config/client";
import { TOTAL_ITEM_PAGE } from "config/constant";

const getOrderService = async (page: number) => {
  try {
    const pageSize = TOTAL_ITEM_PAGE;
    const skip = (page - 1) * pageSize;
    const product = await prisma.order.findMany({
      skip: skip,
      take: pageSize,
      include: {
        user: true,
      },
    });
    return product;
  } catch (err) {
    console.log(err);
    return [];
  }
};
const countTotalOrderPage = async () => {
  const pageSize = TOTAL_ITEM_PAGE;
  const product = await prisma.order.count();
  return Math.ceil(product / pageSize);
};
const getDetailOrderService = async (id: string) => {
  const orderDetail = await prisma.orderDetail.findMany({
    where: { id: +id },
    include: {
      product: true,
    },
  });
  return orderDetail;
};
const historyOrderService = async (id: number) => {
  const orders = await prisma.order.findMany({
    where: {
      userId: id,
    },
    include: {
      orderDetails: {
        include: {
          product: true,
        },
      },
    },
  });
  if (orders) return orders;
  return [];
};
export {
  getOrderService,
  getDetailOrderService,
  historyOrderService,
  countTotalOrderPage,
};
