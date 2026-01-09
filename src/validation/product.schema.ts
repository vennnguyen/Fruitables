import z from "zod";
export const productSchema = z.object({
  name: z.string().trim().min(1, { message: "Tên không được để trống" }),
  price: z
    .string()
    .transform((val) => (val === "" ? 0 : Number(val)))
    .refine((num) => num > 0, {
      message: "Số tiền tối thiểu là 1",
    }),

  detailDesc: z
    .string()
    .trim()
    .min(1, { message: "Mô tả không được để trống" }),
  shortDesc: z
    .string()
    .trim()
    .min(1, { message: "Mô tả ngắn không được để trống" }),
  quantity: z
    .string()
    .transform((val) => (val === "" ? 0 : Number(val)))
    .refine((num) => num > 0, {
      message: "Số lượng tối thiểu là 1",
    }),
  image: z.string()?.trim().optional(),
  factory: z.string().trim().min(1, { message: "factory không được để trống" }),
  target: z.string().trim().min(1, { message: "target không được để trống" }),
});

export type TProductSchema = z.infer<typeof productSchema>;
