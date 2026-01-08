import { hashPassword } from "services/user.service";
import { prisma } from "./client";
import { ACCOUNT_TYPE } from "./constant";

const initDatabase = async () => {
  const countUser = await prisma.user.count();
  const countRole = await prisma.role.count();
  if (countRole === 0) {
    await prisma.role.createMany({
      data: [
        {
          name: "ADMIN",
          description: "Toàn quyền hệ thống",
        },
        {
          name: "USER",
          description: "Quyền cơ bản",
        },
      ],
    });
  }
  if (countUser === 0) {
    const roleAdmin = await prisma.role.findFirst({
      where: {
        name: "ADMIN",
      },
    });
    if (roleAdmin) {
      await prisma.user.createMany({
        data: [
          {
            fullName: "test",
            username: "Data1",
            password: await hashPassword("123456"),
            address: "Quận 12",
            accountType: ACCOUNT_TYPE.SYSTEM,
            avatar: "",
            roleId: roleAdmin.id,
          },
          {
            fullName: "Admin",
            username: "Data2",
            password: await hashPassword("123456"),
            address: "Quận 11",
            accountType: ACCOUNT_TYPE.SYSTEM,
            avatar: "",
            roleId: roleAdmin.id,
          },
        ],
      });
    }
  }

  if (countUser !== 0 && countRole !== 0) {
    console.log("<<< ALREADY INIT DATA...");
  }
};
export { initDatabase };
