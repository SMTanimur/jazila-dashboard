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
import { useGlobalAlertStateStore } from '@/store/alerts';
import { TGroup, groupsSchema } from '@/validations/groups';
import { groupClient } from '@/services/group.service';

export function useGroup() {
 
  const router = useRouter();
  const queryClient = useQueryClient();

 
  const setShowGroupAlert = useGlobalAlertStateStore(
    state => state.setShowGroupAlert
  );

 
  const {
    mutateAsync: GroupCreateMutation,
    isLoading: GroupCreateLoading,
    isError: IsGroupCreateError,
  } = useMutation(groupClient.groupCreate);
  const {
    mutateAsync: GroupDeleteMutation,
    isLoading: GroupDeleteLoading,
    isError: IsGroupDeleteError,
  } = useMutation(groupClient.deleteGroup);
  const {
    mutateAsync: GroupUpdateMutation,
    isLoading: GroupUpdateLoading,
    isError: IsGroupUpdateError,
  } = useMutation(groupClient.updateGroup);

  const attemptGroupCreate = async (data: TGroup) => {
    toast.promise(GroupCreateMutation(data), {
      loading: 'creating...',
      success: data => {
        queryClient.invalidateQueries(['types']);
       router.push('/admin/groups');
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
  const attemptGroupDelete = async (id:string) => {
    toast.promise(GroupDeleteMutation(id), {
      loading: 'deleting...',
      success: data => {
        queryClient.invalidateQueries(['types']);
        setShowGroupAlert(false,null)
       router.push('/admin/groups');
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
    attemptGroupCreate,
    GroupCreateLoading,
    IsGroupCreateError,
    GroupUpdateLoading,
    IsGroupUpdateError,
    GroupUpdateMutation,
    attemptGroupDelete,
    GroupDeleteLoading,
    IsGroupDeleteError,
    
   
  };
}
