import { Request, Response } from "express";

const getProductDetails = (req: Request, res: Response) => {
  return res.render("client/detail-product/show");
};

export { getProductDetails };
