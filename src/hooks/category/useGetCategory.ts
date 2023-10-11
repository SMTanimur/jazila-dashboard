import { categoryClient } from '@/services/category.service';
import { ICategory, IType } from '@/types';
import { API_ENDPOINTS } from '@/utils/api/api-endpoints';
import { useQuery } from '@tanstack/react-query';

export const useCategoryQuery = (slug: string) => {
  return useQuery<ICategory, Error>(
    [API_ENDPOINTS.CATEGORIES, slug],
    () => categoryClient.getCategory(slug),
    {
      keepPreviousData: true,
    }
  );
};
