import { z } from "zod"

export const TImage = z.object({
  img_url: z.string(),
  img_id: z.string(),
})