import { Request, Response } from "express";
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

const getAdminProductPage = (req: Request, res: Response) => {
  return res.render("admin/product/product.ejs");
};
export {
  getDashBoardPage,
  getAdminUserPage,
  getAdminOrderPage,
  getAdminProductPage,
};
