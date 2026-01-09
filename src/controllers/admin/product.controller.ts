import { Request, Response } from "express";
import {
  createProductService,
  deleteProductService,
  getDetailProductService,
  postUpdateProductService,
} from "services/product.service";
import { productSchema, TProductSchema } from "src/validation/product.schema";

const getAdminCreateProduct = (req: Request, res: Response) => {
  const errorZod = [];
  const oldData = {};
  return res.render("admin/product/create.ejs", { errorZod, oldData });
};
const postCreateProduct = async (req: Request, res: Response) => {
  const { name, detailDesc, price, quantity, shortDesc, factory, target } =
    req.body as TProductSchema;
  const result = productSchema.safeParse(req.body);
  if (result.error) {
    const error = result.error.issues;
    const errorZod = error?.map((e) => {
      return `${e.message} [${e.path[0]}]`;
    });
    const oldData = { name, detailDesc, price, quantity, shortDesc };

    return res.render("admin/product/create.ejs", { errorZod, oldData });
  } else {
    await createProductService({
      name,
      price: Number(price),
      quantity: Number(quantity),
      detailDesc,
      shortDesc,
      image: req.file?.filename ?? "",
      factory,
      target,
    });
  }
  return res.redirect("/admin/product");
};

const postDeleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  await deleteProductService(id);
  return res.redirect("/admin/product");
};

const getDetailProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  const productDetail = await getDetailProductService(id);
  res.render("admin/product/detail", { productDetail });
};

const postUpdateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, detailDesc, price, quantity, shortDesc, factory, target } =
    req.body as TProductSchema;
  const image = req.file?.filename;
  await postUpdateProductService(id, {
    name,
    detailDesc,
    price,
    quantity,
    shortDesc,
    image,
    factory,
    target,
  });
  return res.redirect("/admin/product");
};
export {
  getAdminCreateProduct,
  postCreateProduct,
  postDeleteProduct,
  getDetailProduct,
  postUpdateProduct,
};
