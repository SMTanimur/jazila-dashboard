'use client';
import React from 'react';
import { Card, CardContent } from '../ui/card';
import { IShop } from '@/types';
import { useForm } from 'react-hook-form';
import { ShopSchema, TShop } from '@/validations/shop';
import { zodResolver } from '@hookform/resolvers/zod';
import { any } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { useShop } from '@/hooks/shops/useShop';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
interface ShopFormProps {
  initialData?: IShop;
}
const ShopForm = ({ initialData }: ShopFormProps) => {
  const { IsShopCreateError, attemptShopCreate, shopCreateLoading } = useShop();
  const shopForm = useForm<TShop>({
    resolver: zodResolver(ShopSchema),
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
      logo: {
        img_id: initialData?.logo?.img_id || '',
        img_url: initialData?.logo?.img_url || '',
      },
      cover_image: {
        img_id: initialData?.cover_image?.img_id || '',
        img_url: initialData?.cover_image?.img_url || '',
      },
      slug: initialData?.slug || '',
      address: {
        city: initialData?.address?.city || '',
        country: initialData?.address?.country || '',
        state: initialData?.address?.state || '',
        street_address: initialData?.address?.street_address || '',
        zip: initialData?.address?.zip || '',
      },
      balance: {
        payment_info: {
          account: initialData?.balance?.payment_info?.account || '',
          bank: initialData?.balance?.payment_info?.bank || '',
          email: initialData?.balance?.payment_info?.email || '',
          name: initialData?.balance?.payment_info?.name || '',
        },
      },
      settings: {
        contact: initialData?.settings?.contact || '',
        website: initialData?.settings?.website || '',
      },
    },
  });
  return (
    <React.Fragment>
      <Form {...shopForm}>
        <form
          className='grid gap-10 w-full'
          onSubmit={(...args) =>
            void shopForm.handleSubmit(attemptShopCreate)(...args)
          }
        >
          <div className='flex flex-col items-center gap-4 w-full lg:flex-row'>
            <div className='lg:w-1/3 w-full flex flex-col items-start gap-2'>
              <h4 className='text-stone-800 font-semibold'>Basic Info</h4>
              <p>Add some basic info about your shop from here</p>
            </div>
            <div className='lg:w-2/3 w-full'>
              <Card className='p-8  w-full'>
                <div className='my-4'>
                  <FormField
                    control={shopForm.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder='Jhon due' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='my-4'>
                  <FormField
                    control={shopForm.control}
                    name='description'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </Card>
            </div>
          </div>
          <div className='border-dotted w-full border-2 ' />

          <div className='flex flex-col items-center gap-4 w-full lg:flex-row'>
            <div className='lg:w-1/3 w-full flex flex-col items-start gap-2'>
              <h4 className='text-stone-800 font-semibold'>Payment Info</h4>
              <p>Add your payment information from here</p>
            </div>
            <div className='lg:w-2/3 w-full'>
              <Card className='p-8  w-full'>
                <div className='my-4'>
                  <FormField
                    control={shopForm.control}
                    name='balance.payment_info.account'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Holder Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='my-4'>
                  <FormField
                    control={shopForm.control}
                    name='balance.payment_info.email'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Holder Email</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='my-4'>
                  <FormField
                    control={shopForm.control}
                    name='balance.payment_info.bank'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bank Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='my-4'>
                  <FormField
                    control={shopForm.control}
                    name='balance.payment_info.account'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Number</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </Card>
            </div>
          </div>
          <div className='border-dotted w-full border-2 ' />

          <div className='flex flex-col items-center gap-4 w-full lg:flex-row'>
            <div className='lg:w-1/3 w-full flex flex-col items-start gap-2'>
              <h4 className='text-stone-800 font-semibold'>Shop Address</h4>
              <p>Add your physical shop address from here</p>
            </div>
            <div className='lg:w-2/3 w-full'>
              <Card className='p-8  w-full'>
                <div className='my-4'>
                  <FormField
                    control={shopForm.control}
                    name='address.country'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='my-4'>
                  <FormField
                    control={shopForm.control}
                    name='address.city'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='my-4'>
                  <FormField
                    control={shopForm.control}
                    name='address.state'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='my-4'>
                  <FormField
                    control={shopForm.control}
                    name='address.zip'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Zip</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='my-4'>
                  <FormField
                    control={shopForm.control}
                    name='address.street_address'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street Address</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </Card>
            </div>
          </div>
          <div className='border-dotted w-full border-2 ' />
          <div className='flex flex-col items-center gap-4 w-full lg:flex-row'>
            <div className='lg:w-1/3 w-full flex flex-col items-start gap-2'>
              <h4 className='text-stone-800 font-semibold'>Shop Settings</h4>
              <p>Add your shop settings information from here</p>
            </div>
            <div className='lg:w-2/3 w-full'>
              <Card className='p-8  w-full'>
                <div className='my-4'>
                  <FormField
                    control={shopForm.control}
                    name='settings.contact'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='my-4'>
                  <FormField
                    control={shopForm.control}
                    name='settings.website'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
    
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </React.Fragment>
  );
};

export default ShopForm;
