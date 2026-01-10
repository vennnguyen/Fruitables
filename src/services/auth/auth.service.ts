import { prisma } from "config/client";
import { ACCOUNT_TYPE } from "config/constant";
import { error } from "console";
import { comparePassword, hashPassword } from "services/user.service";

const isEmailExist = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { username: email } });
  if (user) {
    return false;
  }
  return true;
};

const postCreateAccountService = async (
  fullName: string,
  email: string,
  password: string
) => {
  const hash_password = await hashPassword(password);
  const role = await prisma.role.findUnique({ where: { name: "USER" } });
  if (role) {
    return await prisma.user.create({
      data: {
        fullName: fullName,
        username: email,
        password: hash_password,
        accountType: ACCOUNT_TYPE.SYSTEM,
        roleId: role.id,
      },
    });
  }
};

const handleLogin = async (username: string, password: string, cb: any) => {
  const user = await prisma.user.findUnique({ where: { username: username } });
  if (!user) {
    return cb(null, false, {
      message: `Not found user ${username}`,
    });
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    return cb(null, false, {
      message: "Incorrect password.",
    });
  }
  return cb(null, user);
};
const getUserWithRoleByIdService = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id: +id },
    include: {
      role: true,
    },
    omit: {
      password: true,
    },
  });
  return user;
};
export {
  isEmailExist,
  postCreateAccountService,
  handleLogin,
  getUserWithRoleByIdService,
};
