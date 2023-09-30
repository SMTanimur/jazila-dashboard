'use client';

import { shopClient } from '@/services/shop.service';
import {
  ShopApproveSchema,
  TShop,
  TShopApprove,
  TShopDisApprove,
  disApproveSchema,
} from '@/validations/shop';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { toast } from 'sonner';
import { useCurrentUser } from '../user/useCurrentUser';
import { useGlobalAlertStateStore } from '@/store/alerts';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGlobalModalStateStore } from '@/store/modal';

export function useShop() {
  const { currentUser } = useCurrentUser();

  const setShowShopAlert = useGlobalAlertStateStore(
    state => state.setShowAlert
  );
  const setShopApprove = useGlobalModalStateStore(
    state => state.setShopApproveModal
  );
  const shopApproveData = useGlobalModalStateStore(state => state.modalData);
  const queryClient = useQueryClient();

  const shopApproveForm = useForm<TShopApprove>({
    resolver: zodResolver(ShopApproveSchema),
    defaultValues: {
      admin_commission_rate: 10,
      id: shopApproveData as string,
    },
  });
  
  const {
    mutateAsync: shopCreateMutation,
    isLoading: shopCreateLoading,
    isError: IsShopCreateError,
  } = useMutation(shopClient.createShop);

  const {
    mutateAsync: shopDeleteMutation,
    isLoading: shopDeleteLoading,
    isError: IsShopDeleteError,
  } = useMutation(shopClient.deleteShop);
  const {
    mutateAsync: shopUpdateMutation,
    isLoading: shopUpdateLoading,
    isError: IsShopUpdateError,
  } = useMutation(shopClient.updateShop);

  const {
    mutateAsync: shopApproveMutation,
    isLoading: shopApproveLoading,
    isError: IsShopApproveError,
  } = useMutation(shopClient.shopApprove);

  const {
    mutateAsync: shopDisApproveMutation,
    isLoading: shopDisApproveLoading,
    isError: IsShopDisApproveError,
  } = useMutation(shopClient.shopDisApprove);

  const attemptShopCreate = async (data: TShop) => {
    toast.promise(shopCreateMutation(data), {
      loading: 'updating...',
      success: data => {
        queryClient.invalidateQueries(['me']);
        queryClient.invalidateQueries(['shops']);
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
  const attemptToDeleteShop = async (id: string) => {
    toast.promise(shopDeleteMutation(id), {
      loading: 'Deleting...',
      success: data => {
        queryClient.invalidateQueries(['me']);
        queryClient.invalidateQueries(['shops']);
        queryClient.invalidateQueries(['my-shops']);
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
  const attemptToApproveShop = async (data: TShopApprove) => {
    toast.promise(
      shopApproveMutation({
        id: data.id as string,
        admin_commission_rate: Number(data.admin_commission_rate),
      }),
      {
        loading: 'approving...',
        success: data => {
          queryClient.invalidateQueries(['me']);
          queryClient.invalidateQueries(['shops']);
          setShopApprove(false, null);
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
  const attemptToDisApproveShop = async (data: TShopDisApprove) => {
    toast.promise(shopDisApproveMutation(data), {
      loading: 'disApproving...',
      success: data => {
        queryClient.invalidateQueries(['me']);
        queryClient.invalidateQueries(['shops']);
        setShowShopAlert(false, null);
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
    shopUpdateMutation,
    shopUpdateLoading,
    IsShopUpdateError,
    IsShopDeleteError,
    shopDeleteLoading,
    attemptToDeleteShop,
    attemptToApproveShop,
    attemptToDisApproveShop,
    shopApproveLoading,
    shopDisApproveLoading,
    IsShopApproveError,
    IsShopDisApproveError,
    shopApproveForm,
  };
}
