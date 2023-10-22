import { attributeClient } from "@/services/attribute.service";
import { IAttribute, IShop, IType } from "@/types";
import { QueryOptionsType, ShopsQueryOptionsType, TypesQueryOptionsType } from "@/types/custom.types";
import { PaginatorInfo } from "@/types/utils";
import { useQuery } from "@tanstack/react-query";

 export const useGetAttributesQuery = (options: QueryOptionsType) => {
  return useQuery<PaginatorInfo<IAttribute>, Error>(
    ["attributes", options],
    attributeClient.getAttributes,
    {
      keepPreviousData: true,
    }
  );
};