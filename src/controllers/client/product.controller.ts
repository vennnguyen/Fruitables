import { Request, Response } from "express";
import { getProductDetailService } from "services/client/product.service";

const getProductDetails = async (req: Request, res: Response) => {
  const { id } = req.params;
  const productDetail = await getProductDetailService(id);
  return res.render("client/detail-product/show", { productDetail });
};

export { getProductDetails };
