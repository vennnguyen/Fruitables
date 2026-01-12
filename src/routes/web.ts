import express, { Express } from "express";
import {
  deleteUser,
  getHomePage,
  getUserPage,
  handleViewUser,
  postUserPage,
  updateUser,
} from "../controllers/user.controller";
import {
  getAdminOrderPage,
  getAdminProductPage,
  getAdminUserPage,
  getDashBoardPage,
} from "controllers/admin/dashboard.controller";
import fileUploadMiddleware from "src/middleware/multer";
import {
  getFilterProductPage,
  getProductDetails,
  postProductToCart,
} from "controllers/client/product.controller";
import {
  getAdminCreateProduct,
  postCreateProduct,
  postDeleteProduct,
  getDetailProduct,
  postUpdateProduct,
} from "controllers/admin/product.controller";
import {
  getPageLogin,
  getPageRegister,
  getSuccessRedirectPage,
  postCreateAccount,
  postLogout,
} from "controllers/auth/auth.controller";
import passport from "passport";
import configPassportLocal from "src/middleware/passport.local";
import { isAdmin, isLogin } from "src/middleware/auth";
import {
  addProductToCartFromDetail,
  getCartPage,
  postDeleteCartItem,
  postHandleCartToCheckout,
} from "controllers/client/cart.controller";
import {
  getCheckoutPage,
  getThankPage,
  postPlaceOrder,
} from "controllers/client/checkout.controller";
import { getDetailOrder } from "controllers/admin/order.controller";
import { getOrderHistoryPage } from "controllers/client/order-history.controller";

const routes = express.Router();

const webRoutes = (app: Express) => {
  // login && register
  routes.get("/login", getPageLogin); //routes -> middleware -> controller -> service
  routes.get("/success-redirect", getSuccessRedirectPage);
  routes.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/success-redirect",
      failureRedirect: "/login",
      failureMessage: true,
    })
  );

  routes.get("/register", getPageRegister);
  routes.post("/register/create-account", postCreateAccount);

  // logout
  routes.post("/logout", postLogout);

  //home
  routes.get("/", getHomePage);
  routes.get("/products", getFilterProductPage);

  routes.post("/handle-update-user/:id", updateUser);

  // admin
  routes.get("/admin", getDashBoardPage);
  routes.get("/admin/user", getAdminUserPage);
  routes.get("/admin/user/create.ejs", getUserPage);
  routes.post(
    "/admin/handle-create-user",
    fileUploadMiddleware("avatar"),
    postUserPage
  );
  routes.post("/admin/delete-user/:id", deleteUser);
  routes.get("/admin/view-user/:id", handleViewUser);
  routes.post(
    "/admin/update-user/:id",
    fileUploadMiddleware("avatar"),
    updateUser
  );

  // Order
  routes.get("/admin/order", getAdminOrderPage);
  routes.get("/admin/order/order-detail/:id", getDetailOrder);

  // product
  routes.get("/admin/product", getAdminProductPage);
  routes.get("/admin/product/create.ejs", getAdminCreateProduct);
  routes.post(
    "/admin/create-product",
    fileUploadMiddleware("image", "images/product"),
    postCreateProduct
  );
  routes.post("/admin/product/delete/:id", postDeleteProduct);
  routes.get("/admin/product/view/:id", getDetailProduct);
  routes.post(
    "/admin/product/update/:id",
    fileUploadMiddleware("image", "images/product"),
    postUpdateProduct
  );

  //client
  routes.get("/product/detail-product/:id", getProductDetails);
  routes.post("/add-product-to-cart/:id", postProductToCart);
  routes.get("/cart", getCartPage);
  routes.post("/cart/delete-item/:id", postDeleteCartItem);
  routes.post("/handle-cart-to-checkout", postHandleCartToCheckout);
  routes.get("/checkout", getCheckoutPage);
  routes.post("/place-order", postPlaceOrder);
  routes.get("/thanks", getThankPage);
  routes.get("/order-history", getOrderHistoryPage);
  routes.post("/add-to-cart-from-detail-page/:id", addProductToCartFromDetail);

  app.use("/", isAdmin, routes); // tất cả url đều phải qua middleware isAdmin
};
export default webRoutes;
