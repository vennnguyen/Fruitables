import { Request, Response } from "express";
import {
  getProductDetailService,
  postProductToCartService,
} from "services/client/product.service";
import { getProductWithFilter } from "services/client/productFilter";
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
  const {
    page,
    factory = "",
    target = "",
    price = "",
    sort = "",
  } = req.query as {
    page?: string;
    factory: string;
    target: string;
    price: string;
    sort: string;
  };

  let currentPage = page ? +page : 1;
  if (currentPage <= 0) currentPage = 1;

  const data = await getProductWithFilter(
    currentPage,
    6,
    factory,
    target,
    price,
    sort
  );
  return res.render("client/home/product-filter", {
    products: data.products,
    totalPages: +data.totalPage,
    page: +currentPage,
  });
};
export { getProductDetails, postProductToCart, getFilterProductPage };
