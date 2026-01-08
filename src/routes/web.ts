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

const routes = express.Router();

const webRoutes = (app: Express) => {
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
  routes.get("/admin/product", getAdminProductPage);

  app.use("/", routes);
};
export default webRoutes;
