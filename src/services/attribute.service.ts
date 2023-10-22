
import { IAttribute } from '@/types';
import {
  CategoriesQueryOptionsType,
  QueryOptionsType,
  QueryParamsType
} from '@/types/custom.types';
import { PaginatorInfo } from '@/types/utils';
import { API_ENDPOINTS } from '@/utils/api/api-endpoints';
import { HttpClient } from '@/utils/api/http';
import { TAttribute } from '@/validations/attribute';


export interface IAttributeUpdateVariables {
  variables: {
    id: string;
    input: TAttribute
  };
}

export const attributeClient = {
  attributeCreate: (variables: TAttribute) => {
    return HttpClient.post<{ message: string }>(`/attributes`, variables);
  },

  updateAttribute: ({ variables: { id, input } }: IAttributeUpdateVariables) => {
    return HttpClient.put<{ message: string }>(`/attributes/${id}`, input);
  },

  getAttributes: async ({ queryKey }: QueryParamsType) => {
    const [_key, params] = queryKey;

    const {
      page,
      text,
      limit = 15,
      shop_id,
      orderBy = 'updatedAt',
      sortedBy = 'desc',
    } = params as QueryOptionsType

    const url = `/attributes?${text ? `&search=${text}` : ''}${
      shop_id ? `shop_id=${shop_id}&` : ''
    }&searchJoin=and&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
    return HttpClient.get<PaginatorInfo<IAttribute>>(url);
  },

 
  deleteAttribute: async (id: string) => {
    return HttpClient.delete<{ message: string }>(
      `/attributes/${id}`
    );
  },

  getAttribute: async (slug: string) => {
    return HttpClient.get<IAttribute>(`/attributes/${slug}`);
  },
};
