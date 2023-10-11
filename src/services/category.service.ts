import { IAddress, ICategory, IType } from '@/types';
import {
  CategoriesQueryOptionsType,
  QueryParamsType,
  ShopsQueryOptionsType,
  TypesQueryOptionsType,
} from '@/types/custom.types';
import { PaginatorInfo } from '@/types/utils';
import { API_ENDPOINTS } from '@/utils/api/api-endpoints';
import { HttpClient } from '@/utils/api/http';
import { TCategory } from '@/validations/category';
import { TGroup } from '@/validations/groups';

export interface ICategoryUpdateVariables {
  variables: {
    id: string;
    input: TCategory;
  };
}

export const categoryClient = {
  categoryCreate: (variables: TCategory) => {
    return HttpClient.post<{ message: string }>(`/categories`, variables);
  },

  updateCategory: ({ variables: { id, input } }: ICategoryUpdateVariables) => {
    return HttpClient.patch<{ message: string }>(`/categories/${id}`, input);
  },

  getCategories: async ({ queryKey }: QueryParamsType) => {
    const [_key, params] = queryKey;

    const {
      page,
      text,
      limit = 15,
      type,
      orderBy = 'updatedAt',
      sortedBy = 'desc',
    } = params as CategoriesQueryOptionsType;

    const url = `${API_ENDPOINTS.CATEGORIES}?${text ? `&search=${text}` : ''}${
      type ? `type=${type}&` : ''
    }&searchJoin=and&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
    return HttpClient.get<PaginatorInfo<ICategory>>(url);
  },

  getAllCategories: async ({ queryKey }: QueryParamsType) => {
    const [_key, params] = queryKey;

    const {
      page,
      text,
      limit = 15,
      type,
      orderBy = 'updatedAt',
      sortedBy = 'desc',
    } = params as CategoriesQueryOptionsType;

    const url = `${API_ENDPOINTS.CATEGORIES}/all?${text ? `&search=${text}` : ''}${
      type ? `type=${type}&` : ''
    }&searchJoin=and&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
    return HttpClient.get<PaginatorInfo<ICategory>>(url);
  },
  deleteCategory: async (id: string) => {
    return HttpClient.delete<{ message: string }>(
      `${API_ENDPOINTS.CATEGORIES}/${id}`
    );
  },

  getGroup: async (slug: string) => {
    return HttpClient.get<IType>(`${API_ENDPOINTS.TYPES}/${slug}`);
  },
};
