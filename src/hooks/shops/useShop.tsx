'use client';

import { shopClient } from '@/services/shop.service';

import { TShop } from '@/validations/shop';


import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'sonner';
import { useFileHandler } from '../useFileHandler';
import { IImage } from '@/types';
const initImageState = { id: '', file: null, url: '' };
export function useShop() {
  const { imageFile, onFileChange, clearFiles, removeImage } = useFileHandler<IImage>('single',initImageState);

  const queryClient = useQueryClient();
  const {
    mutateAsync: shopCreateMutation,
    isLoading:  shopCreateLoading,
    isError: IsShopCreateError,
  } = useMutation(shopClient.createShop);


  const attemptShopCreate = async (data: TShop) => {
    toast.promise( shopCreateMutation(data), {
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
    });
  };

  return {
  
    attemptShopCreate,
    shopCreateLoading,
    IsShopCreateError,
    imageFile,
    onFileChange,
    clearFiles,
    removeImage
    
  };
}
