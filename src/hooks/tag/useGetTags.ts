import { tagClient } from "@/services/tag.service";
import { ITag } from "@/types";
import { TagsQueryOptionsType } from "@/types/custom.types";
import { PaginatorInfo } from "@/types/utils";
import { useQuery } from "@tanstack/react-query";

export const useGetTagsQuery = (options: TagsQueryOptionsType) => {
  return useQuery<PaginatorInfo<ITag>, Error>(
    ["tags", options],
    tagClient.getTags,
    {
      keepPreviousData: true,
    }
  );
};
