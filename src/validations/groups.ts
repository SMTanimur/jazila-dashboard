import { z } from 'zod';
import { TImage } from './image';

export const bannerSchema = z
  .object({
    title: z
      .string({
        required_error: 'Title is required',
        invalid_type_error: 'Title must be a valid string',
      })
      .min(2, { message: 'Title is must be 2 or more characters long' }),

    description: z
      .string({
        required_error: 'Description is required',
        invalid_type_error: 'Description must be a valid string',
      })
      .min(2, {
        message: 'Description is must be 2 or more characters long',
      }),

    image: TImage,
  })
  .optional();

export const groupsSchema = z.object({
  name: z
    .string({
      required_error: 'Name Address is required',
      invalid_type_error: 'Name Address must be a valid string',
    })
    .min(2, { message: 'Name Address is must be 2 or more characters long' }),

  banners: z.array(bannerSchema).optional().nullable(),

  icon: z.any().optional(),

  promotional_sliders: z.array(TImage).optional().nullable(),
});

export type TGroup = z.infer<typeof groupsSchema>;
