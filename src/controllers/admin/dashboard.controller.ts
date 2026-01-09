import { Request, Response } from "express";
import { getAllProduct } from "services/product.service";
import { getAllRole, getAllUser } from "services/user.service";

const getDashBoardPage = (req: Request, res: Response) => {
  return res.render("admin/dashboard/dashboard.ejs");
};

const getAdminUserPage = async (req: Request, res: Response) => {
  const user = await getAllUser();

  return res.render("admin/user/user.ejs", {
    user,
  });
};

const getAdminOrderPage = (req: Request, res: Response) => {
  return res.render("admin/order/order.ejs");
};

const getAdminProductPage = async (req: Request, res: Response) => {
  const products = await getAllProduct();
  return res.render("admin/product/product.ejs", { products });
};
export {
  getDashBoardPage,
  getAdminUserPage,
  getAdminOrderPage,
  getAdminProductPage,
};
