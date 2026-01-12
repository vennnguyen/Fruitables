import { Request, Response } from "express";
import { getInfoService } from "services/dashnoard.service";
import { countTotalOrderPage, getOrderService } from "services/order.service";
import { countTotalProductPage, getAllProduct } from "services/product.service";
import {
  countTotalUserPage,
  getAllRole,
  getAllUser,
} from "services/user.service";

const getDashBoardPage = async (req: Request, res: Response) => {
  const info = await getInfoService();
  return res.render("admin/dashboard/dashboard.ejs", {
    info,
  });
};

const getAdminUserPage = async (req: Request, res: Response) => {
  const { page } = req.query;
  let currentPage = page ? +page : 1;
  if (currentPage <= 0) currentPage = 1;
  const user = await getAllUser(currentPage);
  const totalPage = await countTotalUserPage();

  return res.render("admin/user/user.ejs", {
    user,
    totalPage: +totalPage,
    page: +currentPage,
  });
};

const getAdminOrderPage = async (req: Request, res: Response) => {
  if (!req.user) return res.redirect("/login");
  const { page } = req.query;
  let currentPage = page ? +page : 1;
  if (currentPage <= 0) currentPage = 1;
  const totalPage = await countTotalOrderPage();
  const orders = await getOrderService(currentPage);
  return res.render("admin/order/order.ejs", {
    orders,
    totalPage: +totalPage,
    page: +currentPage,
  });
};

const getAdminProductPage = async (req: Request, res: Response) => {
  const { page } = req.query;
  let currentPage = page ? +page : 1;
  if (currentPage <= 0) currentPage = 1;
  const products = await getAllProduct(currentPage);
  const totalPage = await countTotalProductPage();
  return res.render("admin/product/product.ejs", {
    products,
    totalPage: +totalPage,
    page: +currentPage,
  });
};
export {
  getDashBoardPage,
  getAdminUserPage,
  getAdminOrderPage,
  getAdminProductPage,
};
