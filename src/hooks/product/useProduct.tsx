'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { productClient } from '@/services/product.service';
import { CreateProduct } from '@/types';
import { useCurrentUser } from '../user/useCurrentUser';
import { useGlobalAlertStateStore } from '@/store/alerts';

type  Params ={
  shop?: string
}
export function useProduct({shop}:Params) {
 
  const setShowProductAlert = useGlobalAlertStateStore(
    state => state.setShowProductAlert
  );

  const router = useRouter();
  const queryClient = useQueryClient();
  const {currentUser}=useCurrentUser()
  const {
    mutateAsync: ProductCreateMutation,
    isLoading: ProductCreateLoading,
    isError: IsProductCreateError,
  } = useMutation(productClient.productCreate);

  const {
    mutateAsync: ProductUpdateMutation,
    isLoading: ProductUpdateLoading,
    isError: IsProductUpdateError,
  } = useMutation(productClient.updateProduct);

  const {
    mutateAsync: ProductDeleleMutation,
    isLoading: ProductDeleleLoading,
    isError: IsProductDeleleError,
  } = useMutation(productClient.deleteProduct);
  
  

  const attemptProductCreate = async (data: CreateProduct) => {
    toast.promise(ProductCreateMutation(data), {
      loading: 'creating...',
      success: data => {
        queryClient.invalidateQueries(['products']);
        router.push(`/${shop}/products` );
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

  const attemptProductDelete = async (id:string) => {
    toast.promise(ProductDeleleMutation(id), {
      loading: 'deleting...',
      success: data => {
        queryClient.invalidateQueries(['products']);
        setShowProductAlert(false,null)

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
    attemptProductCreate,
    ProductCreateLoading,
    IsProductCreateError,
  ProductUpdateMutation,
     ProductUpdateLoading,
    IsProductUpdateError,
    attemptProductDelete,
    ProductDeleleLoading,
  };
}
