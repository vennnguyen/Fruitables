import { Request, Response } from "express";
import {
  getProductDetailService,
  postProductToCartService,
} from "services/client/product.service";
import { productFilter } from "services/client/productFilter";
import { countTotalProductPage, getAllProduct } from "services/product.service";

const getProductDetails = async (req: Request, res: Response) => {
  const { id } = req.params;
  const productDetail = await getProductDetailService(id);
  return res.render("client/detail-product/show", { productDetail });
};
const postProductToCart = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.user;
  await postProductToCartService(1, +id, user);
  return res.redirect("/");
};

const getFilterProductPage = async (req: Request, res: Response) => {
  const { page } = req.query;
  let currentPage = page ? +page : 1;
  if (currentPage <= 0) currentPage = 1;
  // const products = await getAllProduct(currentPage);
  // const totalPage = await countTotalProductPage();
  // return res.render("client/home/product-filter", {
  //   products,
  //   totalPages: +totalPage,
  //   page: +currentPage,
  // });
  const products = await productFilter(["APPLE", "DELL"]);
  res.status(200).json({
    data: products,
  });
};
export { getProductDetails, postProductToCart, getFilterProductPage };
