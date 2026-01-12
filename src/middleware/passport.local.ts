import {
  getCartByIdUser,
  getUserSumCart,
} from "controllers/client/cart.controller";
import passport from "passport";
import { Strategy as localStrategy } from "passport-local";
import {
  getUserWithRoleByIdService,
  handleLogin,
} from "services/auth/auth.service";
import { getDetailUser } from "services/user.service";
// import { TUserRole } from "src/types";

const configPassportLocal = () => {
  passport.use(
    new localStrategy({ passReqToCallback: true }, function verify(
      req,
      username,
      password,
      cb
    ) {
      const { session } = req as any;
      if (session?.messages?.length) {
        session.messages = [];
      }

      return handleLogin(username, password, cb);
    })
  );

  passport.serializeUser(function (user: any, cb) {
    // trả ra client
    return cb(null, {
      id: user.id,
      username: user.username,
    });
  });

  passport.deserializeUser(async function (user: any, cb) {
    // từ trên query db lấy user
    const { id } = user;
    const userDB: any = await getUserWithRoleByIdService(id);
    const cartId = await getCartByIdUser(id);
    const sumCart = await getUserSumCart(id);

    return cb(null, { ...userDB, sumCart: sumCart, cartId: cartId });
  });
};

export default configPassportLocal;
