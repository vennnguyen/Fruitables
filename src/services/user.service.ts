import getConnection from "config/db";

import { prisma } from "config/client";
import e from "express";
import { ACCOUNT_TYPE, TOTAL_ITEM_PAGE } from "config/constant";
import bcrypt, { compare } from "bcrypt";
const saltRounds = 10;
const hashPassword = async (plainText: string) => {
  return await bcrypt.hash(plainText, saltRounds);
};
const comparePassword = async (plainText: string, password: string) => {
  return await bcrypt.compare(plainText, password);
};
const handleSubmitForm = async (
  username: string,
  name: string,
  address: string,
  phone: string,
  avatar: string,
  roleId: string
) => {
  const password = await hashPassword("123456");
  await prisma.user.create({
    data: {
      fullName: name,
      username: username,
      address: address,
      phone: phone,
      accountType: ACCOUNT_TYPE.SYSTEM,
      avatar: avatar,
      password: password,
      roleId: +roleId,
    },
  });
};

const getAllUser = async (page: number) => {
  try {
    const pageSize = TOTAL_ITEM_PAGE;
    const skip = (page - 1) * pageSize;
    const user = await prisma.user.findMany({
      skip: skip,
      take: pageSize,
    });
    return user;
  } catch (err) {
    console.log(err);
    return [];
  }
};
const countTotalUserPage = async () => {
  const pageSize = TOTAL_ITEM_PAGE;
  const user = await prisma.user.count();
  return Math.ceil(user / pageSize);
};
// get roles
const getAllRole = async () => {
  try {
    const role = await prisma.role.findMany();
    return role;
  } catch (error) {
    console.log(error);
  }
};

const handleDeleteUser = async (id: string) => {
  await prisma.user.delete({ where: { id: +id } });
};

const getDetailUser = async (id: string) => {
  const user = await prisma.user.findUnique({ where: { id: +id } });
  return user;
};

const handleUpdateUser = async (
  id: string,
  name: string,
  phone: string,
  roleId: string,
  address: string,
  avatar?: string
) => {
  try {
    const userId = Number(id);
    const role = Number(roleId);

    const updateUser = await prisma.user.update({
      where: { id: userId },
      data: {
        fullName: name,
        phone,
        roleId: role,
        address,
        ...(avatar !== undefined && avatar !== "" && { avatar }),
      },
    });

    return updateUser;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export {
  hashPassword,
  handleSubmitForm,
  getAllUser,
  handleDeleteUser,
  getDetailUser,
  handleUpdateUser,
  getAllRole,
  comparePassword,
  countTotalUserPage,
};
