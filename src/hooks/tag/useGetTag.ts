import { tagClient } from "@/services/tag.service";
import { ITag } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetTagQuery = (slug: string) => {
  return useQuery<ITag, Error>(["tags", slug], () => tagClient.getTag(slug), {
    keepPreviousData: true,
  });
};
