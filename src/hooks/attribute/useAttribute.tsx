'use client';


import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { toast } from 'sonner';
import { useGlobalAlertStateStore } from '@/store/alerts';
import { attributeClient } from '@/services/attribute.service';
import { TAttribute } from '@/validations/attribute';
import { useCurrentUser } from '../user/useCurrentUser';


type  Params ={
    shop?: string

}
export function useAttribute({shop}:Params) {

  const {currentUser}=useCurrentUser()
  const router = useRouter();
  const queryClient = useQueryClient();
  const setShowAttributeAlert = useGlobalAlertStateStore(
    state => state.setShowAttributeAlert
  );

 
  const {
    mutateAsync: attributeCreateMutation,
    isLoading: attributeCreateLoading,
    isError: IsAttributeCreateError,
  } = useMutation(attributeClient.attributeCreate);
  const {
    mutateAsync: attributeDeleteMutation,
    isLoading: attributeDeleteLoading,
    isError: IsattributeDeleteError,
  } = useMutation(attributeClient.deleteAttribute);
  const {
    mutateAsync: attributeUpdateMutation,
    isLoading: attributeUpdateLoading,
    isError: IsattributeUpdateError,
  } = useMutation(attributeClient.updateAttribute);

  const attemptattributeCreate = async (data: TAttribute) => {
    toast.promise(attributeCreateMutation(data), {
      loading: 'creating...',
      success: data => {
        queryClient.invalidateQueries(['attributes']);
       router.push(currentUser?.role === 'seller' ? `/${shop}/attributes` : '/admin/attributes');
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
  const attemptattributeDelete = async (id:string) => {
    toast.promise(attributeDeleteMutation(id), {
      loading: 'deleting...',
      success: data => {
        queryClient.invalidateQueries(['attributes']);
        setShowAttributeAlert(false,null)

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
    attemptattributeCreate,
    attributeCreateLoading,
    IsAttributeCreateError,
    attributeUpdateLoading,
    IsattributeUpdateError,
    attributeUpdateMutation,
    attemptattributeDelete,
    attributeDeleteLoading,
    IsattributeDeleteError,
    
   
  };
}
