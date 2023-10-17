import { z } from "zod";
import { TImage } from "./image";

export const tagSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Tag name must be 2 or more characters long" }),
  details: z
    .string()
    .min(2, { message: "Tag description must be 2 or more characters long" })
    .optional(),

  image: TImage.optional().nullable(),
  type: z.any(),
});

export type TTag = z.infer<typeof tagSchema>;
