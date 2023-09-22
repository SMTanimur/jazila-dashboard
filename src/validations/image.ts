import { z } from "zod"

export const TImage = z.object({
  img_url: z.string({
    required_error: "Image URL is required",
    invalid_type_error: "Image URL must be a valid string",
 
  }),
  img_id: z.string({
    required_error: "Image URL is required",
    invalid_type_error: "Image URL must be a valid string",
  }),
})