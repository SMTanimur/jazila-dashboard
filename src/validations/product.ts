import { z } from "zod";

export const ProductType = z.enum(["simple", "variable"]);


const productValidationSchema = z.object({
  name: z.string().min(1),
  productTypeValue: ProductType.or(z.nullable(ProductType)).optional(),
  sku: z
    .string()
    .transform((value, ctx: any) => {
      if (ctx?.productTypeValue?.value === ProductType.Enum.simple) {
        return value.trim() !== "";
      }
      return value;
    })
    .optional(),
  price: z
    .number()
    .min(0)
    .transform((value, ctx: any) => {
      if (ctx.productTypeValue?.value === ProductType.Enum.simple) {
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
  type: z.string().optional().nullable(),
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
