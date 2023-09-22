import { z } from 'zod';
import { TImage } from './image';
import { AddressSchema } from './user';

export const paymentInfo = z.object({
  account: z.string().optional(),

  name: z.string().optional(),

  bank: z.string().optional(),
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .trim()
    .email({ message: 'Invalid email address' })
    .optional(),
});

export const IBalance = z.object({
  id: z.string().optional(),
  payment_info: paymentInfo,
});

export const IShopSettings = z
  .object({
    contact: z.string().optional(),
    website: z.string().optional(),
  })
  .optional();
export const ShopSchema = z.object({
  name: z
    .string({
      required_error: 'Name Address is required',
      invalid_type_error: 'Name Address must be a valid string',
    })
    .min(2, { message: 'Name Address is must be 2 or more characters long' }),

  description: z
    .string({
      invalid_type_error: 'Description  must be a valid string',
    })
    .min(8, { message: 'Description  is must be 2 or more characters long' }),
  logo: TImage,
  cover_image: TImage,
  balance: IBalance,
  address: AddressSchema,
  settings: IShopSettings,
});

export type TShop = z.infer<typeof ShopSchema>;
