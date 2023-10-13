import { groupClient } from "@/services/group.service";
import { shopClient } from "@/services/shop.service";
import { IShop, IType } from "@/types";
import { ShopsQueryOptionsType, TypesQueryOptionsType } from "@/types/custom.types";
import { PaginatorInfo } from "@/types/utils";
import { API_ENDPOINTS } from "@/utils/api/api-endpoints";
import { useQuery } from "@tanstack/react-query";

 export const useGetTypesQuery = (options: TypesQueryOptionsType) => {
  return useQuery<PaginatorInfo<IType>, Error>(
    [API_ENDPOINTS.TYPES, options],
    groupClient.getGroups,
    {
      keepPreviousData: true,
    }
  );
};