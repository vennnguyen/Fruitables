import { isEmailExist } from "services/auth/auth.service";
import z from "zod";
export const registerSchema = z
  .object({
    firstName: z.string().min(1, { message: "Tên không được bỏ trống" }),
    lastName: z.string().min(1, { message: "Tên không được bỏ trống" }),
    email: z
      .string()
      .min(1, { message: "Email không được bỏ trống" })
      .email("Email không đúng định dạng")
      .refine(
        async (e) => {
          const result = await isEmailExist(e);
          return result;
        },
        { message: "Email đã tồn tại" }
      ),
    password: z
      .string({
        required_error: "Required",
        message: "Mật khẩu không được để trống",
      })
      .min(8, { message: "min 8" }),
    password_confirmation: z.string({
      required_error: "Required",
      message: "Xác nhận mật khẩu không được trống",
    }),
  })
  .refine(
    (values) => {
      return values.password === values.password_confirmation;
    },
    { message: "Mật khẩu không trùng khớp", path: ["password_confirmation"] }
  );

export type TRegisterSchema = z.infer<typeof registerSchema>;
