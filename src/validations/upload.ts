import { z } from "zod"

export const deleteImageSchema = z.object({
  public_id: z.string()
})
export const deleteImagesSchema = z.object({
  public_id: z.array(z.string())
})

export type TDeleteImage = z.infer<typeof deleteImageSchema>;
export type TDeleteImages = z.infer<typeof deleteImagesSchema>;