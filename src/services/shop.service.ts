import { IShop } from '@/types';
import { QueryParamsType, ShopsQueryOptionsType } from '@/types/custom.types';
import { PaginatorInfo } from '@/types/utils';
import { API_ENDPOINTS } from '@/utils/api/api-endpoints';
import { HttpClient } from '@/utils/api/http';
import { TShop, TShopApprove, TShopDisApprove } from '@/validations/shop';

export interface IShopUpdateVariables {
  variables: {
    id: string;
    input: TShop;
  };
}
export const shopClient = {
  createShop: (variables: TShop) => {
    return HttpClient.post<{ message: string }>(`/shops`, variables);
  },

  updateShop: ({ variables: { id, input } }: IShopUpdateVariables) => {
    return HttpClient.put<{ message: string }>(`/shops/${id}`, input);
  },

  getShops: async ({ queryKey }: QueryParamsType) => {
    const [_key, params] = queryKey;

    const {
      page,
      text,
      limit = 15,
      orderBy = 'updatedAt',
      sortedBy = 'desc',
    } = params as ShopsQueryOptionsType;

    const url = `${API_ENDPOINTS.SHOPS}?${
      text ? `&search=${text}` : ''
    }&searchJoin=and&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
    return HttpClient.get<PaginatorInfo<IShop>>(url, {
      params: {
        page,
        limit,
        orderBy,
        sortedBy,
        search: text,
      },
    });
  },
  getMyShops: async ({ queryKey }: QueryParamsType) => {
    const [_key, params] = queryKey;

    const {
      page,
      text,
      limit = 15,
      orderBy = 'updatedAt',
      sortedBy = 'desc',
    } = params as ShopsQueryOptionsType;

    const url = `${API_ENDPOINTS.SHOPS}/my-shops?${
      text ? `&search=${text}` : ''
    }&searchJoin=and&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
    return HttpClient.get<PaginatorInfo<IShop>>(url, {
      params: {
        page,
        limit,
        orderBy,
        sortedBy,
        search: text,
      },
    });
  },

  getShop: async (slug: string) => {
    return HttpClient.get<IShop>(`/shops/${slug}`);
  },

  deleteShop: async (id: string) => {
    return HttpClient.delete<{ message: string }>(`/shops/${id}`);
  },

  shopApprove: async (variables: TShopApprove) => {
    return HttpClient.post<{ message: string }>(
      `${API_ENDPOINTS.SHOPS}/approve-shop`,
      variables
    );
  },
  shopDisApprove: async (variables: TShopDisApprove) => {
    return HttpClient.post<{ message: string }>(
      `${API_ENDPOINTS.SHOPS}/disapprove-shop`,
      variables
    );
  },
};
