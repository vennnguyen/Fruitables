import { prisma } from "config/client";
import { Request, Response } from "express";
import {
  deleteCartItemService,
  getDetailCartService,
  updateCartBeforeCheckout,
} from "services/client/cart.service";
import { postProductToCart } from "./product.controller";
import { postProductToCartService } from "services/client/product.service";

const getCartPage = async (req: Request, res: Response) => {
  if (!req.user) return res.redirect("/login");
  const { user } = req;
  console.log("check: ", user.cartId);

  if (user.cartId == null) {
    return res.render("client/product/cart", {
      cartDetail: [],
      totalPrice: 0,
    });
  }

  const cartDetail = await getDetailCartService(user.cartId);
  const totalPrice = cartDetail.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
  const cartId = cartDetail.length ? cartDetail[0].cartId : 0;
  return res.render("client/product/cart", { cartDetail, totalPrice, cartId });
};
const getUserSumCart = async (id: string) => {
  const user = await prisma.cart.findFirst({
    where: {
      userId: +id,
    },
  });
  return user?.sum ?? 0;
};
const getCartByIdUser = async (id: string) => {
  const cart = await prisma.cart.findFirst({ where: { userId: +id } });
  if (cart) {
    return cart.id;
  }
  return null;
};

const postDeleteCartItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { user } = req;
  await deleteCartItemService(id, user);
  return res.redirect("/cart");
};
const postHandleCartToCheckout = async (req: Request, res: Response) => {
  const { user } = req;
  const { cartId } = req.body;
  console.log("Check:", cartId);

  if (!user) return res.redirect("/login");

  const cartDetail: { id: string; quantity: string }[] =
    req.body?.cartDetails ?? [];
  await updateCartBeforeCheckout(cartDetail, cartId);

  return res.redirect("/checkout");
};
const addProductToCartFromDetail = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { quantity } = req.body;
  const { user } = req;
  if (!user) return res.redirect("/login");
  await postProductToCartService(+quantity, +id, user);

  return res.redirect(`/product/detail-product/${id}`);
};
export {
  getCartPage,
  getUserSumCart,
  postDeleteCartItem,
  getCartByIdUser,
  postHandleCartToCheckout,
  addProductToCartFromDetail,
};
