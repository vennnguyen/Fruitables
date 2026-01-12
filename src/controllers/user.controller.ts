import { log } from "console";
import { Request, Response } from "express";
import { getAllProductService } from "services/client/product.service";
import { countTotalProductPage, getAllProduct } from "services/product.service";
import {
  getAllRole,
  getAllUser,
  getDetailUser,
  handleDeleteUser,
  handleSubmitForm,
  handleUpdateUser,
} from "services/user.service";

const getHomePage = async (req: Request, res: Response) => {
  const { page } = req.query;
  let currentPage = page ? +page : 1;
  if (currentPage <= 0) currentPage = 1;
  const products = await getAllProduct(currentPage);
  const totalPage = await countTotalProductPage();
  res.render("client/home/show", {
    products,
    totalPages: +totalPage,
    page: +currentPage,
  });
};

const getUserPage = async (req: Request, res: Response) => {
  const role = await getAllRole();
  res.render("admin/user/create", {
    role,
  });
};

const postUserPage = async (req: Request, res: Response) => {
  const { username, email, address, role, phone } = req.body;
  const avatar = req.file?.filename ?? "";

  await handleSubmitForm(email, username, address, phone, avatar, role);

  res.redirect("/admin/user");
};

const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  await handleDeleteUser(id);
  return res.redirect("/admin/user");
};

const handleViewUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await getDetailUser(id);
  const role = await getAllRole();
  res.render("admin/user/detail", {
    id: id,
    user: user,
    role,
  });
};

const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const avatar = req.file?.filename ?? undefined;
  // console.log(req.body);

  const { username, address, roleId, phone } = req.body;

  await handleUpdateUser(id, username, phone, roleId, address, avatar);
  return res.redirect("/admin/user");
};

export {
  getHomePage,
  getUserPage,
  postUserPage,
  deleteUser,
  handleViewUser,
  updateUser,
};
