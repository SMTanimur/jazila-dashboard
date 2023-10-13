import { groupClient } from "@/services/group.service";
import {  IType } from "@/types";
import { useQuery } from "@tanstack/react-query";
 export const useGetAllTypesQuery = () => {
  return useQuery<IType[], Error>(
    ['types_all'],
    groupClient.getAllGroups,
    {
      keepPreviousData: true,
    }
  );
};