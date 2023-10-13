import { shopClient } from "@/services/shop.service";
import { IShop } from "@/types";
import { ShopsQueryOptionsType } from "@/types/custom.types";
import { PaginatorInfo } from "@/types/utils";
import { API_ENDPOINTS } from "@/utils/api/api-endpoints";
import { useQuery } from "@tanstack/react-query";

 export const useShopsQuery = (options: ShopsQueryOptionsType) => {
  return useQuery<PaginatorInfo<IShop>, Error>(
    [API_ENDPOINTS.SHOPS, options],
    shopClient.getShops,
    {
      keepPreviousData: true,
    }
  );
};