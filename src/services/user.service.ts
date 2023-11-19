import { API_ENDPOINTS } from '@/utils/api/api-endpoints';
import { HttpClient } from '@/utils/api/http';
import {
  TChangePassword,
  TLogin,
  TProfile,
  TSignup,
  TVerify,
  loginResponseSchema,
  mutationResponseSchema,
} from '@/validations/auth';
import { IUser } from '@/types';
import { QueryOptionsType, QueryParamsType } from '@/types/custom.types';
import { PaginatorInfo } from '@/types/utils';

export const userClient = {
  me: () => {
    return HttpClient.get<IUser>(`/users/${API_ENDPOINTS.ME}`);
  },
  login: (variables: TLogin) => {
    return HttpClient.post<loginResponseSchema>(
      `/auth/${API_ENDPOINTS.LOGIN}`,
      variables
    );
  },
  emailVerify: (variables: TVerify) => {
    return HttpClient.post<loginResponseSchema>(
      `/auth/${API_ENDPOINTS.ACTIVATE}`,
      variables
    );
  },

  changePassword: (variables: TChangePassword) => {
    return HttpClient.post<{ message: string }>(
      `/auth/${API_ENDPOINTS.CHANGE_PASSWORD}`,
      variables
    );
  },

  updateUser: (variables: TProfile) => {
    return HttpClient.patch<{ message: string }>(`/users`, variables);
  },
  logout: () => {
    return HttpClient.post<any>(`/auth/${API_ENDPOINTS.LOGOUT}`, {});
  },

  loginWithGoogle: (variables: { credential: string }) => {
    return HttpClient.post<loginResponseSchema>(
      `/auth/${API_ENDPOINTS.GOOGLE}`,
      variables
    );
  },

  register: (variables: TSignup) => {
    return HttpClient.post<mutationResponseSchema>(
      `/auth/${API_ENDPOINTS.REGISTER}`,
      variables
    );
  },

  getUsers:({ queryKey }: QueryParamsType) => {
    const [_key, params] = queryKey;
    const {
      page,
      text,
      limit = 15,
      orderBy = 'updatedAt',
      sortedBy = 'desc',
    } = params as QueryOptionsType;
    const url = `${API_ENDPOINTS.USERS}?${
      text ? `search=${text}` : ''
    }&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;

    return HttpClient.get<PaginatorInfo<IUser>>(url);
  }
};
