'use client';

import { shopClient } from '@/services/shop.service';

import { TShop } from '@/validations/shop';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'sonner';
import { useFileHandler } from '../useFileHandler';
import { IImage } from '@/types';
const initImageState = { id: '', file: null, url: '' };
export function useShop() {
  const { imageFile, onFileChange, clearFiles, removeImage } =
    useFileHandler<IImage>('single', initImageState);

  const queryClient = useQueryClient();
  const {
    mutateAsync: shopCreateMutation,
    isLoading: shopCreateLoading,
    isError: IsShopCreateError,
  } = useMutation(shopClient.createShop);

  const attemptShopCreate = async (data: TShop) => {
    // const shopData = {
    //   ...data,
    //   logo: {
    //     img_id: data.logo.img_id,
    //     img_url: data.logo.img_url,
    //   },
    //   cover_image: {
    //     img_id: data.cover_image.img_id,
    //     img_url: data.cover_image.img_url,
    //   },
    // };
    console.log(data, 'data');
    toast.promise(
      shopCreateMutation({
        logo: {
          img_id: data.logo.img_id,
          img_url: data.logo.img_url,
        },
        cover_image:{
          img_id: data.cover_image.img_id,
          img_url: data.cover_image.img_url,
        },
        balance:{
         payment_info:{
          account: data.balance.payment_info.account,
         
          bank:data.balance.payment_info.bank,
          email:data.balance.payment_info.email,
          name:data.balance.payment_info.name,
         }
        },
        address:{
          city:data.address.city,
          country:data.address.country,
          state:data.address.state,
          street_address:data.address.street_address,
          zip: data.address.zip,
        },
        name:data.name,
        description:data.description,
        settings:{
          contact:data?.settings?.contact,
          website: data?.settings?.website,
        }
        
      }),
      {
        loading: 'updating...',
        success: data => {
          queryClient.invalidateQueries(['me']);
          queryClient.invalidateQueries(['currentUser']);
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

  return {
    attemptShopCreate,
    shopCreateLoading,
    IsShopCreateError,
    imageFile,
    onFileChange,
    clearFiles,
    removeImage,
  };
}
