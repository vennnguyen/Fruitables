import passport from "passport";
import { Strategy as localStrategy } from "passport-local";
import { handleLogin } from "services/auth/auth.service";

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
    process.nextTick(function () {
      return cb(null, {
        id: user.id,
        username: user.username,
      });
    });
  });

  passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, user);
    });
  });
};

export default configPassportLocal;
