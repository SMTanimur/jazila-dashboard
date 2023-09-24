'use client';

import { shopClient } from '@/services/shop.service';

import { TShop } from '@/validations/shop';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { toast } from 'sonner';
import { useCurrentUser } from '../user/useCurrentUser';

export function useShop() {
  const { currentUser } = useCurrentUser();
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    mutateAsync: shopCreateMutation,
    isLoading: shopCreateLoading,
    isError: IsShopCreateError,
  } = useMutation(shopClient.createShop);
  const {
    mutateAsync: shopUpdateMutation,
    isLoading: shopUpdateLoading,
    isError: IsShopUpdateError,
  } = useMutation(shopClient.updateShop);

  const attemptShopCreate = async (data: TShop) => {
    toast.promise(shopCreateMutation(data), {
      loading: 'updating...',
      success: data => {
        queryClient.invalidateQueries(['me']);
        queryClient.invalidateQueries(['shops']);
        queryClient.invalidateQueries(['currentUser']);
        router.push(
          currentUser?.role == 'seller' ? '/seller/dashboard' : '/admin'
        );
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
    shopUpdateMutation,
    shopUpdateLoading,
    IsShopUpdateError,

  };
}
