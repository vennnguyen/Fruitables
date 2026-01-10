import { NextFunction, Request, Response } from "express";

const isLogin = (req: Request, res: Response, next: NextFunction) => {
  const isAuthenticated = req.isAuthenticated();
  if (isAuthenticated) {
    res.redirect("/");
    return;
  }
  next();
};

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.path.startsWith("/admin")) {
    const user = req.user as any;
    if (user?.role.name === "ADMIN") {
      next();
      return;
    } else {
      res.render("status/403");
    }
    return;
  }
  //client routes
  next();
};
export { isLogin, isAdmin };
