import { groupClient } from "@/services/group.service";
import {  IType } from "@/types";
import { TypesQueryOptionsType } from "@/types/custom.types";
import { useQuery } from "@tanstack/react-query";
 export const useGetAllTypesQuery = (options: TypesQueryOptionsType) => {
  return useQuery<IType[], Error>(
    ['types',options],
    groupClient.getAllGroups,
    {
      keepPreviousData: true,
    }
  );
};