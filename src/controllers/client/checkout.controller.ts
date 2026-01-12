import { Request, Response } from "express";
import { getDetailCartService } from "services/client/cart.service";
import { handlePlaceOrder } from "services/client/checkout.service";
const getCheckoutPage = async (req: Request, res: Response) => {
  const { user } = req;

  if (user.cartId == null) {
    return res.render("client/checkout/show", {
      cartDetails: [],
      totalPrice: 0,
    });
  }
  const cartDetails = await getDetailCartService(user.cartId);
  const totalPrice = cartDetails.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  return res.render("client/checkout/show", { cartDetails, totalPrice });
};
const postPlaceOrder = async (req: Request, res: Response) => {
  const { user } = req;
  if (!req.user) return res.redirect("/login");
  const { receiverName, receiverAddress, receiverPhone, totalPrice } = req.body;
  const success = await handlePlaceOrder(
    user.id,
    receiverName,
    receiverAddress,
    receiverPhone,
    totalPrice
  );
  if (!success) {
    return res.redirect("/checkout");
  }
  return res.redirect("/thanks");
};
const getThankPage = async (req: Request, res: Response) => {
  if (!req.user) return res.redirect("/login");
  return res.render("client/checkout/thanks");
};
export { getCheckoutPage, postPlaceOrder, getThankPage };
