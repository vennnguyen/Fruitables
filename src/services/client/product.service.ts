import { prisma } from "config/client";

const getAllProductService = async () => {
  return await prisma.product.findMany();
};

const getProductDetailService = async (id: string) => {
  return await prisma.product.findUnique({ where: { id: +id } });
};
export { getAllProductService, getProductDetailService };
