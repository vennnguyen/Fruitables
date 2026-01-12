import { Request, Response } from "express";
import { historyOrderService } from "services/order.service";
const getOrderHistoryPage = async (req: Request, res: Response) => {
  const { user } = req;
  if (!user) return res.redirect("/login");
  const historyOrder = await historyOrderService(user.id);

  //   console.log("history", historyOder);

  return res.render("client/order-history/show", {
    historyOrder,
  });
};
export { getOrderHistoryPage };
