'use client';
import React from 'react';
import { Card } from '../ui/card';
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
  UncontrolledFormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Icons } from '../ui/icons';

import { FileDialog } from '../common/shared/file-dialog';
import { Zoom } from '../common/shared/zoom-image';
import { IUploadedImage } from '@/services/upload.service';
import Image from 'next/image';
import { useShop } from '@/hooks/shops/useShop';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { useCurrentUser } from '@/hooks/user/useCurrentUser';
import { useRouter } from 'next/navigation';

interface ShopFormProps {
  initialData?: IShop | null;
}
const defaultValues = {};
const ShopForm = ({ initialData }: ShopFormProps) => {
  const {
    IsShopCreateError,
    attemptShopCreate,
    shopCreateLoading,
    IsShopUpdateError,
    shopUpdateLoading,
    shopUpdateMutation,
  } = useShop();
  const [files, setFiles] = React.useState<IUploadedImage | null>(null);
  const [coverImage, setCoverImage] = React.useState<IUploadedImage | null>(
    null
  );
  const router = useRouter()
  const {currentUser}=useCurrentUser()
  const queryClient = useQueryClient();
  const shopForm = useForm<TShop>({
    resolver: zodResolver(ShopSchema),
    defaultValues: initialData
      ? {
          ...initialData,
        }
      : defaultValues,

    // defaultValues: {
    //   name: initialData?.name || '',
    //   description: initialData?.description || '',
    //   logo: {
    //     img_id: initialData?.logo?.img_id || undefined,
    //     img_url: initialData?.logo?.img_url || undefined,
    //   },
    //   cover_image: {
    //     img_id: initialData?.cover_image?.img_id || null,
    //     img_url: initialData?.cover_image?.img_url || null,
    //   },
    //   address: {
    //     city: initialData?.address?.city || '',
    //     country: initialData?.address?.country || '',
    //     state: initialData?.address?.state || '',
    //     street_address: initialData?.address?.street_address || '',
    //     zip: initialData?.address?.zip || '',
    //   },
    //   balance: {
    //     payment_info: {
    //       account: initialData?.balance?.payment_info?.account || '',
    //       bank: initialData?.balance?.payment_info?.bank || '',
    //       email: initialData?.balance?.payment_info?.email || '',
    //       name: initialData?.balance?.payment_info?.name || '',
    //     },
    //   },
    //   settings: {
    //     contact: initialData?.settings?.contact || '',
    //     website: initialData?.settings?.website || '',
    //   },
    // },
  });

  const attemptShopUpdate = async (data: TShop) => {
    toast.promise(
      shopUpdateMutation({
        variables: { id: initialData?._id as string, input: data },
      }),
      {
        loading: 'updating...',
        success: data => {
          queryClient.invalidateQueries(['me']);
          queryClient.invalidateQueries(['shops']);
          queryClient.invalidateQueries(['currentUser']);
           if(currentUser?.role==='admin'){
             router.push('/admin/shops')
           }else{
              router.push('/seller/dashboard')
           }
          return <b>{data.message}</b>;
        },
        error: error => {
          const {
            response: { data },
          }: any = error ?? {};

          return <b> {data?.message}</b>;
        },
      }
    );
  };

  return (
    <React.Fragment>
      <Form {...shopForm}>
        <form
          className='grid gap-10 w-full'
          onSubmit={
            initialData
              ? (...args) =>
                  void shopForm.handleSubmit(attemptShopUpdate)(...args)
              : (...args) =>
                  void shopForm.handleSubmit(attemptShopCreate)(...args)
          }
        >
          <div className='flex flex-col items-center gap-4 w-full lg:flex-row'>
            <div className='lg:w-1/3 w-full flex flex-col items-start gap-2'>
              <h4 className='text-stone-800 font-semibold'>Logo</h4>
              <p>Upload your shop logo from here</p>
            </div>
            <div className='lg:w-2/3 w-full'>
              <Card className='p-8  w-full'>
                <div className='my-4'>
                  <FormItem className='flex w-full flex-col gap-1.5'>
                    <FormLabel>Logo</FormLabel>
                    {initialData?.logo || files ? (
                      <div className='flex items-center gap-2'>
                        <Zoom>
                          <Image
                            src={
                              files?.img_url ||
                              (initialData?.logo.img_url as any)
                            }
                            alt={
                              (initialData?.logo.img_id as any) || files?.img_id
                            }
                            className='h-20 w-20 shrink-0 rounded-md object-cover object-center'
                            width={80}
                            height={80}
                          />
                        </Zoom>
                      </div>
                    ) : null}
                    <FormControl>
                      <FileDialog
                        setValue={shopForm.setValue}
                        name='logo'
                        maxFiles={1}
                        maxSize={1024 * 1024 * 4}
                        multiple={false}
                        files={
                          initialData
                            ? initialData.logo
                            : (files as IUploadedImage)
                        }
                        setFiles={setFiles}
                      />
                    </FormControl>
                    <UncontrolledFormMessage
                      message={shopForm.formState.errors.logo?.message}
                    />
                  </FormItem>
                </div>
              </Card>
            </div>
          </div>
          <div className='border-dotted w-full border-2 ' />
          <div className='flex flex-col items-center gap-4 w-full lg:flex-row'>
            <div className='lg:w-1/3 w-full flex flex-col items-start gap-2'>
              <h4 className='text-stone-800 font-semibold'>Cover Image</h4>
              <p>
                Upload your shop cover image from here Dimension of the cover
                image should be 1170 x 435px
              </p>
            </div>
            <div className='lg:w-2/3 w-full'>
              <Card className='p-8  w-full'>
                <div className='my-4'>
                  <FormItem className='flex w-full flex-col gap-1.5'>
                    <FormLabel>Cover Image</FormLabel>
                    {initialData?.cover_image || coverImage ? (
                      <div className='flex items-center gap-2'>
                        <Zoom>
                          <Image
                            src={
                              coverImage?.img_url ||
                              (initialData?.cover_image.img_url as any)
                            }
                            alt={
                              (initialData?.cover_image.img_id as any) ||
                              coverImage?.img_id
                            }
                            className='h-20 w-20 shrink-0 rounded-md object-cover object-center'
                            width={80}
                            height={80}
                          />
                        </Zoom>
                      </div>
                    ) : null}
                    <FormControl>
                      <FileDialog
                        setValue={shopForm.setValue}
                        name='cover_image'
                        maxFiles={1}
                        maxSize={1024 * 1024 * 4}
                        multiple={false}
                        files={
                          initialData
                            ? initialData.cover_image
                            : (coverImage as IUploadedImage)
                        }
                        setFiles={setCoverImage}
                      />
                    </FormControl>
                    <UncontrolledFormMessage
                      message={shopForm.formState.errors.logo?.message}
                    />
                  </FormItem>
                </div>
              </Card>
            </div>
          </div>
          <div className='border-dotted w-full border-2 ' />
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
                    name='balance.payment_info.name'
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
          <div className='flex items-end justify-end'>
            <Button
              disabled={shopUpdateLoading || shopCreateLoading}
              className='w-[200px] '
            >
              {}
              {shopCreateLoading || shopUpdateLoading ? (
                <Icons.spinner
                  className='mr-2 h-4 w-4 animate-spin'
                  aria-hidden='true'
                />
              ) : (
                <React.Fragment>
                  <span>{initialData ? 'Update' : 'Save'}</span>
                </React.Fragment>
              )}
              <span className='sr-only'>Save</span>
            </Button>
          </div>
        </form>
      </Form>
    </React.Fragment>
  );
};

export default ShopForm;
