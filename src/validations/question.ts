import { z } from "zod";

export const questionAnswerSchema = z.object({
    answer: z.string(),
})