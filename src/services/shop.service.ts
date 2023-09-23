import { IShop } from '@/types';
import { QueryParamsType, ShopsQueryOptionsType } from '@/types/custom.types';
import { PaginatorInfo } from '@/types/utils';
import { HttpClient } from '@/utils/api/http';
import { TShop } from '@/validations/shop';

export const shopClient = {
  createShop: (variables: TShop) => {
    return HttpClient.post<{ message: string }>(`/shops`, variables);
  },

  getShops: async ({queryKey}:QueryParamsType) => {
    const [_key, params] = queryKey;
    const {
      page,
      text,
      limit = 15,
      orderBy = 'updatedAt',
      sortedBy = 'desc',
    } = params as ShopsQueryOptionsType;
    return HttpClient.get<PaginatorInfo<IShop>>(`/shops`, {
      params: {
        page,
        limit,
        orderBy,
        sortedBy,
        search: text,
      },
    });
  }
};
