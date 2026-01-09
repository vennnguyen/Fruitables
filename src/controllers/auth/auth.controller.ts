import { Request, Response } from "express";
import { postCreateAccountService } from "services/auth/auth.service";
import { registerSchema, TRegisterSchema } from "src/validation/auth.schema";
const getPageLogin = (req: Request, res: Response) => {
  const { session } = req as any;
  const message = session?.messages ?? [];
  return res.render("auth/login", { message });
};
const getPageRegister = (req: Request, res: Response) => {
  const error = [];
  const oldData = {};
  return res.render("auth/register", { error, oldData });
};
const postCreateAccount = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password, password_confirmation } =
    req.body as TRegisterSchema;
  const oldData = {
    firstName,
    lastName,
    email,
    password,
    password_confirmation,
  };
  const result = await registerSchema.safeParseAsync(req.body);
  if (result.error) {
    const errorZod = result.error.issues;

    const error = errorZod?.map((e) => {
      return `${e.message} [${e.path[0]}]`;
    });
    console.log(error);

    return res.render("auth/register", { error, oldData });
  } else {
    const fullName = firstName + " " + lastName;
    await postCreateAccountService(fullName, email, password);
    return res.render("auth/login");
  }
};
export { getPageLogin, getPageRegister, postCreateAccount };
