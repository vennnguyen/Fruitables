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
import { getProductDetails } from "controllers/client/product.controller";
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
  postCreateAccount,
} from "controllers/auth/auth.controller";
import passport from "passport";
import configPassportLocal from "src/middleware/passport.local";

const routes = express.Router();

const webRoutes = (app: Express) => {
  // login && register
  routes.get("/login", getPageLogin);
  routes.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
      failureMessage: true,
    })
  );
  routes.get("/register", getPageRegister);
  routes.post("/register/create-account", postCreateAccount);

  //home
  routes.get("/", getHomePage);

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

  app.use("/", routes);
};
export default webRoutes;
