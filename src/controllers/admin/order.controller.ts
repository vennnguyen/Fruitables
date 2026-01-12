import { Request, Response } from "express";
import { getDetailOrderService } from "services/order.service";
const getDetailOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const getOrderDetail = await getDetailOrderService(id);
  const detailOrder = getOrderDetail.map((item) => ({
    ...item,
    totalPrice: item.quantity * item.price,
  }));
  return res.render("admin/order/detail", {
    detailOrder,
  });
};
export { getDetailOrder };
