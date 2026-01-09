import { prisma } from "config/client";
import { error } from "console";
import { TProductSchema } from "src/validation/product.schema";
const getAllProduct = async () => {
  return prisma.product.findMany();
};
const createProductService = async ({
  name,
  detailDesc,
  price,
  quantity,
  shortDesc,
  image,
  factory,
  target,
}: TProductSchema) => {
  return prisma.product.create({
    data: {
      name,
      detailDesc,
      price,
      quantity,
      shortDesc,
      image,
      factory,
      target,
    },
  });
};

const deleteProductService = async (id: string) => {
  await prisma.product.delete({ where: { id: +id } });
};
const getDetailProductService = async (id: string) => {
  return await prisma.product.findFirst({ where: { id: +id } });
};

const postUpdateProductService = async (
  id: string,
  {
    name,
    detailDesc,
    price,
    quantity,
    shortDesc,
    image,
    factory,
    target,
  }: TProductSchema
) => {
  return await prisma.product.update({
    where: { id: +id },
    data: {
      name,
      detailDesc,
      price: +price,
      quantity: +quantity,
      shortDesc,
      image,
      factory,
      target,
    },
  });
};
export {
  createProductService,
  getAllProduct,
  deleteProductService,
  getDetailProductService,
  postUpdateProductService,
};
