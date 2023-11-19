import { userClient } from "@/services/user.service";
import { IUser } from "@/types";
import { QueryParamsType, UserQueryOptionsType } from "@/types/custom.types";
import { PaginatorInfo } from "@/types/utils";
import { API_ENDPOINTS } from "@/utils/api/api-endpoints";
import { useQuery } from "@tanstack/react-query";

export const useGetUsersQuery = (options: UserQueryOptionsType) => {
  return useQuery<PaginatorInfo<IUser>, Error>(
    [API_ENDPOINTS.USERS, options],
    userClient.getUsers,
    {
      staleTime: 1000 * 60 * 5,
    }
  );
};
