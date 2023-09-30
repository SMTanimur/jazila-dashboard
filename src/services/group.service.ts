import { IAddress, IType } from '@/types';
import {
  QueryParamsType,
  ShopsQueryOptionsType,
  TypesQueryOptionsType,
} from '@/types/custom.types';
import { PaginatorInfo } from '@/types/utils';
import { API_ENDPOINTS } from '@/utils/api/api-endpoints';
import { HttpClient } from '@/utils/api/http';
import { TGroup } from '@/validations/groups';

export interface IGroupUpdateVariables {
  variables: {
    id: string;
    input: TGroup;
  };
}

export const groupClient = {
  groupCreate: (variables: TGroup) => {
    return HttpClient.post<{ message: string }>(`/types`, variables);
  },

  updateGroup: ({ variables: { id, input } }: IGroupUpdateVariables) => {
    return HttpClient.put<{ message: string }>(`/types/${id}`, input);
  },

  getGroups: async ({ queryKey }: QueryParamsType) => {
    const [_key, params] = queryKey;

    const {
      page,
      text,
      limit = 15,
      orderBy = 'updatedAt',
      sortedBy = 'desc',
    } = params as TypesQueryOptionsType;

    const url = `${API_ENDPOINTS.TYPES}?${
      text ? `&search=${text}` : ''
    }&searchJoin=and&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
    return HttpClient.get<PaginatorInfo<IType>>(url);
  },

  getAllGroups: async () => {
    return HttpClient.get<IType[]>(`${API_ENDPOINTS.TYPES}/all`);
  },
  deleteGroup: async (id: string) => {
    return HttpClient.delete<{ message: string }>(
      `${API_ENDPOINTS.TYPES}/${id}`
    );
  },
};
