import { categoryClient } from '@/services/category.service';
import { useGlobalAlertStateStore } from '@/store/alerts';
import { TCategory } from '@/validations/category';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useCategory() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const setShowCategoryAlert = useGlobalAlertStateStore(
    state => state.setShowCategoryAlert
  );
  const {
    mutateAsync: categoryCreateMutation,
    isLoading: categoryCreateLoading,
    isError: IsCategoryCreateError,
  } = useMutation(categoryClient.categoryCreate);
  const {
    mutateAsync: categoryUpdateMutation,
    isLoading: categoryUpdateLoading,
    isError: IsCategoryUpdateError,
  } = useMutation(categoryClient.updateCategory);

  const {
    mutateAsync: categoryDeleteMutation,
    isLoading: categoryDeleteLoading,
    isError: IsCategoryDeleteError,
  } = useMutation(categoryClient.deleteCategory);

  const attemptCategoryCreate = async (data: TCategory) => {
    console.log(data);
    toast.promise(categoryCreateMutation(data), {
      loading: 'creating...',
      success: data => {
        queryClient.invalidateQueries(['types']);
        router.push('/admin/categories');
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

  const attemptCategoryDelete = async (id: string) => {
    toast.promise(categoryDeleteMutation(id), {
      loading: 'deleting...',
      success: data => {
        queryClient.invalidateQueries(['categories']);
        setShowCategoryAlert(false, null);
        router.push('/admin/categories');
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
    attemptCategoryCreate,
    categoryCreateLoading,
    IsCategoryCreateError,
    categoryUpdateLoading,
    IsCategoryUpdateError,
    categoryUpdateMutation,
    attemptCategoryDelete,
    categoryDeleteLoading,
    IsCategoryDeleteError,
  };
}
