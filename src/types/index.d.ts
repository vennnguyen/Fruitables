import { User as TUser, Role } from "@prisma/client";

// type TUserRole = User & Role;
declare global {
  namespace Express {
    interface User extends TUser {
      role?: Role;
      sumCart?: number;
      cartId?: number;
    }
  }
}
