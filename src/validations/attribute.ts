import { z } from "zod";


export const attributeValueSchema = z.object({
  meta: z.string().optional(),
  value: z.string()
})
export const attributeSchema = z.object({
  name: z.string({
    required_error: 'Attribute name is required',
    invalid_type_error: 'Attribute name must be a string',
  }),

  shop: z.any(),
  values: z.array(attributeValueSchema).optional(),

})

export type TAttribute = z.infer<typeof attributeSchema>