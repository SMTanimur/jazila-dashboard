import { z } from "zod";

export enum ProductType {
  Simple = "simple",
  Variable = "variable",
}

const productValidationSchema = z.object({
  name: z.string().min(1),
  descriptions: z.string(),
  productTypeValue: z.object({}),
  sku: z
    .string()
    .transform((value, ctx: any) => {
      if (ctx?.productTypeValue?.value === ProductType.Simple) {
        return value.trim() !== "";
      }
      return value;
    })
    .optional(),
  price: z
    .number()
    .min(0)
    .transform((value, ctx: any) => {
      if (ctx.productTypeValue?.value === ProductType.Simple) {
        return value;
      }
      return value;
    })

    .optional()
    .transform((value: any) => (!isNaN(value) ? value : null))
    .optional(),
  sale_price: z
    .number()
    .min(0)
    .transform((value) => (!isNaN(value) ? value : null))
    .transform((value: any, ctx: any) => {
      return value < ctx.price ? value : null;
    })

    .optional(),
  quantity: z
    .number()
    .min(0)
    .int()
    .transform((value) => (!isNaN(value) ? value : null))
    .optional(),
  unit: z.string().min(1),
  type: z.any(),
  status: z.string().min(1),
  variation_options: z.array(
    z.object({
      price: z
        .number()
        .min(0, "form:error-price-must-positive")
        .transform((value) => (!isNaN(value) ? value : null))
        .optional(),
      sale_price: z
        .number()
        .transform((value) => (!isNaN(value) ? value : null))
        .transform((value: any, ctx: any) => {
          return value < ctx.price ? value : null;
        })

        .optional(),
      quantity: z
        .number()
        .min(0)
        .int()
        .transform((value) => (!isNaN(value) ? value : null))
        .optional(),
      sku: z.string().min(1),
    })
  ),
});


export { productValidationSchema };
