import { TImage } from './image';
import * as z from 'zod';

export const categorySchema = z.object({
  name: z.string({
    required_error: 'Category name is required',
    invalid_type_error: 'Category name must be a string',
  }),

  type: z.any(),

  image: TImage.optional().nullable(),
  icon: z.any().optional(),
  parent: z.any().optional(),
});

export type TCategory = z.infer<typeof categorySchema>;
