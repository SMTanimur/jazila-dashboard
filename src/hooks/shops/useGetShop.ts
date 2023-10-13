import { shopClient } from '@/services/shop.service';
import { IShop } from '@/types';
import { API_ENDPOINTS } from '@/utils/api/api-endpoints';
import { useQuery } from '@tanstack/react-query';

export const useShopQuery = (slug: string) => {
  return useQuery<IShop, Error>(
    [API_ENDPOINTS.SHOPS, slug],
    () => shopClient.getShop(slug),
    {
      keepPreviousData: true,
    }
  );
};
