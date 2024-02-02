import { z } from "zod";
import { TImage } from "./image";

export enum ProductType {
  Simple = "simple",
  Variable = "variable",
}

const productValidationSchema = z.object({
  name: z
    .string({
      required_error: "Product name is required",
      invalid_type_error: "Product name must be a string",
    })
    .min(1),

  width: z.coerce
    .number({
      invalid_type_error: "Amount must be a number",
      required_error: "Amount is required",
    })
    .optional(),

  height: z.coerce
    .number({
      invalid_type_error: "Amount must be a number",
      required_error: "Amount is required",
    })
    .optional(),

  length: z.coerce
    .number({
      invalid_type_error: "Amount must be a number",
      required_error: "Amount is required",
    })
    .optional(),

  description: z
    .string({
      required_error: "Description is required",
      invalid_type_error: "Description must be a string",
    })
    .min(3),
  image: TImage,
  gallary: TImage.array().optional(),
  sku: z
    .string({
      required_error: "SKU is required",
      invalid_type_error: "SKU must be a string",
    })
    .optional(),
  price: z.coerce
  .number({
    invalid_type_error: 'Price must be a number',
    required_error: 'Price is required'
  })
  .nonnegative({
    message: 'Price must be a postive number'
  })
  
  .optional(),
  sale_price:  z.coerce
  .number({
    invalid_type_error: 'Price must be a number',
    required_error: 'Price is required'
  })
  .nonnegative({
    message: 'Price must be a postive number'
  })
  
  .optional(),

  quantity:  z.coerce
  .number({
    invalid_type_error: 'Quantity must be a number',
    required_error: 'Quantity is required'
  })
  .nonnegative({
    message: 'Quantity must be a postive number'
  })
  
  .optional(),

 
  
});

export { productValidationSchema };
