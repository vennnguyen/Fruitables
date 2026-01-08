import { Request, Response } from "express";

const getAdminCreateProduct = (req: Request, res: Response) => {
  return res.render("admin/product/create.ejs");
};
const postCreateProduct = (req: Request, res: Response) => {
  console.log(req.body);
  console.log(req.file.filename);
};

export { getAdminCreateProduct, postCreateProduct };
